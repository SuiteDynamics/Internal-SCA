        // Model.js
        // -----------------------
        // @module SezzleSdk.Model
        define("StitchPayments.Model",  [
            "SC.Model",
            "SC.Models.Init",
            "LiveOrder.Model",
            "Application",
            "underscore"
            ], function(
            SCModel,
            ModelsInit,
            LiveOrderModel,
            Application,
            _
        ) {
            "use strict";
            // @class SezzleSdk.Model @extends SC.Model
            return SCModel.extend({
            
                name: "StitchPayments.Model",
                getTokens: function()
                {
                    nlapiLogExecution('DEBUG', 'getTokens', nlapiGetUser());
                    var filters = [
                                    ["custrecord_stitch_cc_token_customer","anyof", nlapiGetUser()], 
                                    "AND", 
                                    ["isinactive","is","F"]
                                  ];
                    var columns = [
                        new nlobjSearchColumn('custrecord_sd_stitch_cc_last_4'),
                        new nlobjSearchColumn('custrecord_stitch_cc_token_card_type'),
                        new nlobjSearchColumn('custrecord_stitch_cc_token_card_name'),
                        new nlobjSearchColumn('custrecord_sd_stitch_is_default_card'),
                        new nlobjSearchColumn('custrecord_stitch_cc_token_exp_month'),
                        new nlobjSearchColumn('custrecord_stitch_cc_token_exp_year'),
                        new nlobjSearchColumn('custrecord_stitch_cc_token_token'),
                        new nlobjSearchColumn('internalid')
                    ];
                    var search_results = Application.getAllSearchResults('customrecord_stitch_cc_token', filters, columns);
                    nlapiLogExecution('DEBUG', 'search_results', search_results);
                    var stitchCardsArr = [];
                    if(search_results && search_results.length){
                    search_results.forEach(function (card) {
                        nlapiLogExecution('DEBUG', 'card', JSON.stringify(card));
                        var stitch_card = {};
                        stitch_card.last_four = card.getValue('custrecord_sd_stitch_cc_last_4');
                        stitch_card.card_type = card.getValue('custrecord_stitch_cc_token_card_type');
                        stitch_card.card_name = card.getValue('custrecord_stitch_cc_token_card_name');
                        stitch_card.exp_month = card.getValue('custrecord_stitch_cc_token_exp_month');
                        stitch_card.exp_year = card.getValue('custrecord_stitch_cc_token_exp_year');
                        stitch_card.token = card.getValue('custrecord_stitch_cc_token_token');
                        stitch_card.id = card.getValue('internalid');
                        stitch_card.active = false;
                
                        if(card.getValue('custrecord_sd_stitch_is_default_card') == 'T'){
                            stitch_card.default_card = true 
                        }else{
                            stitch_card.default_card = false 
                        }
                        stitchCardsArr.push(stitch_card)
                    })
                    }
                    return JSON.stringify(stitchCardsArr);
                },
                submitToken: function(data){
                    nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));
                    var userId = nlapiGetUser();
                    //var authResponse = this.submitTokenAuth(data,userId)

                    // if(authResponse.status !== 'Success'){
                    //     nlapiLogExecution('ERROR', 'ERR_NS_AUTH_FAILURE', JSON.stringify({
                    //         message: JSON.stringify(authResponse),
                    //         user: userId,
                    //         action: 'Auth failure, no authorization or Netsuite token created'
                    //     }));
                    //     return{
                    //         status: 'Failed to create token'
                    //     }
                    // }

                    var stitchProfileSubmit = this.submitCustomerProfile(data, userId);
                   
                   

                    if(stitchProfileSubmit.status == 'Success'){

                        try{    
                            var customerUpdate = {
                                internalid: parseInt(nlapiGetUser(), 10),
                                custentity_sd_stitch_profile_id:stitchProfileSubmit.profileid
                            };
                            ModelsInit.customer.updateProfile(customerUpdate);
                            var tokenRec = this.createTokenRecord(data, stitchProfileSubmit.response)

                        }catch(e){
                            nlapiLogExecution('ERROR', 'ERR_NS_TOKEN_CREATE_FAILURE', JSON.stringify({
                                message: e,
                                user: userId,
                                action: 'Token created in CardPointe, Netsuite token record failure'
                            }));
                            return{
                                status: 'Failed to create token'
                            }
                        }
                    }else{
                        nlapiLogExecution('ERROR', 'ERR_CARDPOINTE_TOKEN_CREATE_FAILURE', {
                            message: stitchProfileSubmit,
                            user: userId,
                            action: 'Token not created.'
                        });
                        return{
                            status: 'Failed to create token'
                        }
                    }

                    if(tokenRec){
                        try{
                            //Since we will want to make the new card the default card, we will need to remove the default from the other card
                            this.resetTokenDefaults(userId,tokenRec);
                            return{
                                status: 'Success',
                                id:tokenRec
                            }
                        }catch(e){
                            nlapiLogExecution('ERROR', 'ERR_NS_TOKEN_CREATE_FAILURE', JSON.stringify({
                                message: e,
                                user: userId,
                                action: 'Token created in CardPointe, Netsuite token record created, failed to restore defaults'
                            }));
                            return{
                                status: 'Failed to reset defaults'
                            }

                        }

                    }

                },
                updateTokens: function(data){
                    nlapiLogExecution('DEBUG', 'update', 'update');
                    return {'Test': 'test'};
                },
                deleteToken: function(id)
                {
                    nlapiLogExecution('DEBUG', 'deleteToken', id);
                    try{

                        nlapiDeleteRecord('customrecord_stitch_cc_token', id)
                        return{
                            status: 'Success'
                        }

                    }catch(e){

                        nlapiLogExecution('ERROR', 'ERR_TOKEN_DELETE_FAILURE', JSON.stringify({
                            message: e,
                            user: nlapiGetUser(),
                            action: 'Token not Deleted'
                        }));
                    }
                    
                    return {'Test': 'test'};
                },
                submitCustomerProfile: function(data, user){
                    nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));
                    var stitchCredentials = this.getStitchCredentials(user)
                    //var custInfo = nlapiLookupField('customer', user, ['firstname','lastname','phone']);
                    // //Build body object



                    //build body
                    var stitchBody = {
                        "phone"		: data.phone,
                        "email"		: data.email,
                        "expiry"	: data.expiry,
                        "merchid"	: stitchCredentials.merchantId,
                        "name"		: data.first_name + " " + data.last_name,
                        "account"	: data.token
                    }

                    var userStitchId = nlapiLookupField('customer', user, 'custentity_sd_stitch_profile_id');
                    nlapiLogExecution('DEBUG', 'userStitchId', userStitchId);
                    if(userStitchId !== ""){
                        stitchBody.profile = userStitchId;
                        stitchBody.profileupdate = 'Y';
                    }

                    //Build header object
                    var headerObj = {
                        "Authorization" : stitchCredentials.tokenKey,
                        "Access-Control-Allow-Origin": "*",
                        "Accept": "application/json",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Content-Type": "application/json"
                    }
                    var stitchPaymentsApiUrl = stitchCredentials.baseurl + '/profile'

                    nlapiLogExecution('DEBUG', 'body', JSON.stringify(stitchBody));
                    nlapiLogExecution('DEBUG', 'stitchPaymentsApiUrl', stitchPaymentsApiUrl);
                    nlapiLogExecution('DEBUG', 'headers', JSON.stringify(headerObj));
                    // var response = nlapiRequestURL(stitchPaymentsApiUrl, body, headerObj)
                    nlapiLogExecution('DEBUG', 'submit', JSON.stringify(stitchBody));
                    var response = nlapiRequestURL(stitchPaymentsApiUrl, JSON.stringify(stitchBody), headerObj, 'POST')
                    // var response = nlapiRequestURL(url, body, header, null, "POST");
                    
                    var responseBody = JSON.parse(response.getBody());
                    nlapiLogExecution('DEBUG', 'PROFILE_RESPONSE', JSON.stringify(responseBody));
                    if (response.getCode() == 200 && responseBody.respcode == "09") {
                    
                        //if new profile, submit id to customer
                        if(userStitchId == ""){
                            nlapiSubmitField('customer', user, 'custentity_sd_stitch_profile_id', responseBody.profileid);
                        }
                        
                        return{
                            status: 'Success',
                            response: responseBody
                        }
                        
                    }else{
                        nlapiLogExecution('ERROR', 'CUST_PROFILE_ERR', JSON.stringify(responseBody));
                        return{
                            status: 'Error',
                            response: responseBody
                        }
                    }
                },
                createTokenRecord: function(tokenData, profileData){
                    nlapiLogExecution('DEBUG', 'createTokenRecord', JSON.stringify(profileData));
                    stitchTokenRecord = nlapiCreateRecord('customrecord_stitch_cc_token');
                    stitchTokenRecord.setFieldValue('custrecord_stitch_cc_token_customer', nlapiGetUser());
                    stitchTokenRecord.setFieldValue('custrecord_stitch_cc_token_card_type', profileData.accttype);
                    stitchTokenRecord.setFieldValue('custrecord_stitch_cc_token_exp_month', tokenData.exp_month);
                    stitchTokenRecord.setFieldValue('custrecord_stitch_cc_token_exp_year', tokenData.exp_year);
                    stitchTokenRecord.setFieldValue('custrecord_stitch_cc_token_token', tokenData.token);
                    stitchTokenRecord.setFieldValue('custrecord_sd_stitch_cc_last_4', tokenData.last_four);
                    stitchTokenRecord.setFieldValue('custrecord_sd_stitch_cc_per_token_json', profileData);
                    stitchTokenRecord.setFieldValue('custrecord_sd_stitch_is_default_card', 'T');
                    stitchTokenRecord.setFieldValue('name', profileData.accttype + " " + tokenData.last_four);
        
                    newRec = nlapiSubmitRecord(stitchTokenRecord);
                    nlapiLogExecution('DEBUG', 'newRec id', newRec);
                    return newRec;
                },
                submitTokenAuth: function(data, user){
                    nlapiLogExecution('DEBUG', 'submittokenauth', JSON.stringify(data));
                    var credentials_object = this.getStitchCredentials()
                    if (credentials_object) {
                        var stitchPaymentsApiUrl = credentials_object.baseurl + '/auth'
                        //var orderid = newRecord.getValue('transactionnumber');
                        var customerId = user;

                        var headerObj = {
                            'Authorization': credentials_object.tokenKey,
                            "Access-Control-Allow-Origin": "*",
                            "Accept": "application/json",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Content-Type": "application/json"
                        };

                        var requestBody = {
                            "merchid": credentials_object.merchantId,
                            "account": data.token,
                            "expiry": data.exp_year + data.exp_month,
                            "ecomind": "E",
                            "amount": data.amount,
                            "name": data.first_name + " " + data.last_name,
                            "email": data.email,
                            "phone": data.phone,
                        }
                        nlapiLogExecution('DEBUG', 'stitchPaymentsApiUrl', stitchPaymentsApiUrl);
                        var stringifyObj = JSON.stringify(requestBody);
                        var response = nlapiRequestURL(stitchPaymentsApiUrl, JSON.stringify(requestBody), headerObj, 'POST')
                        // var myresponse_body = response.body;
                        nlapiLogExecution('DEBUG', 'RAW_RESPONSE', JSON.stringify(response));
                        var responseBody = JSON.parse(response.getBody());
                        nlapiLogExecution('DEBUG', 'AUTH_RESPONSE', JSON.stringify(responseBody));
                        var myresponse_code = response.getCode();
                        if (myresponse_code == 201 || myresponse_code == '201' || myresponse_code == 200 || myresponse_code == '200') {
                            
                            return{
                                status: 'Success',
                                response: responseBody
                            }
                        }else{
                            return{
                                status: 'Error',
                                response: responseBody
                            }
                        }
                    }
                },

                voidAuth: function(auth){
                    if (auth.merchid && auth.retref) {

                        var credentials_object = this.getStitchCredentials();
                        var stitchVoidApiUrl = credentials_object.baseurl + '/void'
                        var headerObj = {
                            'Authorization': credentials_object.tokenKey,
                            "Access-Control-Allow-Origin": "*",
                            "Accept": "application/json",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Content-Type": "application/json"
                        };
            
                        var requestBody = {
                            "merchid": auth.merchid,
                            "retref": auth.retref
                        }
                        nlapiLogExecution('DEBUG', 'void requestBody', JSON.stringify(requestBody));
                        //log.audit('stringifyObj98', stringifyObj)
                        var voidResponse = nlapiRequestURL(stitchVoidApiUrl, JSON.stringify(requestBody), headerObj, 'POST')
                        // var myresponse_body = response.body;
                        nlapiLogExecution('DEBUG', 'RAW_VOID_RESPONSE', JSON.stringify(voidResponse));
                        var responseBody = JSON.parse(voidResponse.getBody());
                        nlapiLogExecution('DEBUG', 'RAW_VOID_RESPONSE_BODY', JSON.stringify(responseBody));
                    }
                },

                resetTokenDefaults: function(user,newTokenRec){
                    nlapiLogExecution('DEBUG', 'resetTokenDefaults', newTokenRec);
                    var filters = [
                        ["custrecord_stitch_cc_token_customer","anyof", user], 
                        "AND", 
                        ["custrecord_sd_stitch_is_default_card","is","T"],
                        "AND", 
                        ["internalid","noneof",newTokenRec]
                      ];
                    var columns = [
                        new nlobjSearchColumn('internalid')
                    ];
                    var search_results = Application.getAllSearchResults('customrecord_stitch_cc_token', filters, columns);
                    if(search_results && search_results.length){
                    search_results.forEach(function (card) {
                        var removeDefaultId = card.getValue('internalid');
                        nlapiLogExecution('DEBUG', 'remove default card', removeDefaultId);
                        nlapiSubmitField('customrecord_stitch_cc_token', removeDefaultId, 'custrecord_sd_stitch_is_default_card', 'F');
                    })
                    }
                    return;
                },
                getStitchCredentials: function(){
                    var stitchCreds = nlapiSearchRecord(
                        'customrecord_stitch_credentials',
                        null,
                        null,
                        [
                        new nlobjSearchColumn('custrecord_stitch_cred_token_key'),
                        new nlobjSearchColumn('custrecord_sd_stitch_merchantid'),
                        new nlobjSearchColumn('custrecord_stitch_cred_base_url')
                        // new nlobjSearchColumn('id')
                        ]
                    );

                    var result = {};
                    if(stitchCreds.length > 0){
                        for (var i = 0; i < stitchCreds.length; i++) {
                            nlapiLogExecution('DEBUG', 'result', stitchCreds[i].getValue("custrecord_stitch_cred_base_url"));
                            result.baseurl = stitchCreds[i].getValue("custrecord_stitch_cred_base_url");
                            result.tokenKey = stitchCreds[i].getValue("custrecord_stitch_cred_token_key");
                            result.merchantId = stitchCreds[i].getValue("custrecord_sd_stitch_merchantid");
                        }
                    }
                   // var sitchCreds = nlapiLookupField('customrecord_stitch_credentials', 1, ['custrecord_stitch_cred_base_url','custrecord_stitch_cred_token_key','custrecord_sd_stitch_merchantid']);
                    nlapiLogExecution('DEBUG', 'get credentials', JSON.stringify(result));
                    return result;
                },
                updateToken: function(data){

                    if(data.data.submit == true){
                        
                        return this.submitTokenAuth(data)

                    }else{
                        nlapiSubmitField('customrecord_stitch_cc_token', data.id, 'custrecord_sd_stitch_is_default_card', 'T');
                        
                        this.resetTokenDefaults(nlapiGetUser(),data.id);
                        
                        return{
                            status: 'Success'
                        }
                   }

                }
            });
            
        });