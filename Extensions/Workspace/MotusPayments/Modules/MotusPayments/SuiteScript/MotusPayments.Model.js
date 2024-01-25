// Model.js
// -----------------------
// @module SezzleSdk.Model
define("MotusPayments.Model",  [
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
    
        name: "MotusPayments.Model",
        getTokens: function()
        {
            nlapiLogExecution('DEBUG', 'getTokens', nlapiGetUser());
            var filters = [
                            ["custrecord_motus_cc_token_customer","anyof", nlapiGetUser()], 
                            "AND", 
                            ["isinactive","is","F"]
                            ];
            var columns = [
                //new nlobjSearchColumn('custrecord_motus_cc_csc'),
                new nlobjSearchColumn('custrecord_sd_motus_cc_last_4'),
                new nlobjSearchColumn('custrecord_motus_cc_token_card_type'),
                new nlobjSearchColumn('custrecord_motus_cc_token_card_name'),
                new nlobjSearchColumn('custrecord_sd_motus_is_default_card'),
                new nlobjSearchColumn('custrecord_motus_cc_token_exp_month'),
                new nlobjSearchColumn('custrecord_motus_cc_token_exp_year'),
                new nlobjSearchColumn('custrecord_motus_cc_token_token'),
                new nlobjSearchColumn('internalid')
            ];
            var search_results = Application.getAllSearchResults('customrecord_motus_cc_token', filters, columns);
            nlapiLogExecution('DEBUG', 'search_results', search_results);
            var motusCardsArr = [];
            if(search_results && search_results.length){
                search_results.forEach(function (card) {
                    nlapiLogExecution('ERROR', 'card', JSON.stringify(card));
                    var motus_card = {};
                    motus_card.last_four = card.getValue('custrecord_sd_motus_cc_last_4');
                    motus_card.card_type = card.getValue('custrecord_motus_cc_token_card_type');
                    motus_card.card_name = card.getValue('custrecord_motus_cc_token_card_name');
                    motus_card.exp_month = card.getValue('custrecord_motus_cc_token_exp_month');
                    motus_card.exp_year = card.getValue('custrecord_motus_cc_token_exp_year');
                    motus_card.token = card.getValue('custrecord_motus_cc_token_token');
                    //motus_card.csc = card.getValue('custrecord_motus_cc_csc');
                    motus_card.id = card.getValue('internalid');
                    motus_card.active = false;
            
                    if(card.getValue('custrecord_sd_motus_is_default_card') == 'T'){
                        motus_card.default_card = true 
                    }else{
                        motus_card.default_card = false 
                    }
                    motusCardsArr.push(motus_card)
                })
            }
            //Push a placeholder model for 'New Card' icon in front end
            motusCardsArr.push({
                isNewPaymentMethod : true,
                last_four: "",
                card_type: "",
                card_name: "",
                exp_month: "",
                exp_year: ""
            });
            return JSON.stringify(motusCardsArr);
        },
        submitToken: function(data){
            nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));
            var userId = nlapiGetUser();

            //Removed for Paytrace since there is no storage of profile or card data
            //var motusProfileSubmit = this.submitCustomerProfile(data, userId);
            
            
            // if(motusProfileSubmit.status == 'Success'){

            try{    
                // var customerUpdate = {
                //     internalid: parseInt(nlapiGetUser(), 10),
                //     custentity_profile_id_motus:motusProfileSubmit.profileid
                // };
                // ModelsInit.customer.updateProfile(customerUpdate);
                var tokenRec = this.createTokenRecord(data)

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
            
            // }else{
            //     nlapiLogExecution('ERROR', 'ERR_CARDPOINTE_TOKEN_CREATE_FAILURE', {
            //         message: motusProfileSubmit,
            //         user: userId,
            //         action: 'Token not created.'
            //     });
            //     return{
            //         status: 'Failed to create token'
            //     }
            // }

            if(tokenRec){
                try{
                    //Since we will want to make the new card the default card, we will need to remove the default from the other card
                    this.resetTokenDefaults(userId,tokenRec);
                    return{
                        status: 'Success',
                        id:tokenRec,
                        //type: motusProfileSubmit.accttype
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

                nlapiDeleteRecord('customrecord_motus_cc_token', id)
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
            var motusCredentials = this.getMotusCredentials(user)
            //var custInfo = nlapiLookupField('customer', user, ['firstname','lastname','phone']);
            // //Build body object



            //build body
            var motusBody = {
                "phone"		: data.phone,
                "email"		: data.email,
                "expiry"	: data.expiry,
                "merchid"	: motusCredentials.merchantId,
                "name"		: data.first_name + " " + data.last_name,
                "account"	: data.token
            }

            var userMotusId = nlapiLookupField('customer', user, 'custentity_profile_id_motus');
            nlapiLogExecution('DEBUG', 'userMotusId', userMotusId);
            if(userMotusId !== ""){
                motusBody.profile = userMotusId;
                motusBody.profileupdate = 'Y';
            }

            //Build header object
            var headerObj = {
                "Authorization" : motusCredentials.tokenKey,
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Content-Type": "application/json"
            }
            var motusPaymentsApiUrl = motusCredentials.baseurl + '/profile'

            nlapiLogExecution('DEBUG', 'body', JSON.stringify(motusBody));
            nlapiLogExecution('DEBUG', 'motusPaymentsApiUrl', motusPaymentsApiUrl);
            nlapiLogExecution('DEBUG', 'headers', JSON.stringify(headerObj));
            // var response = nlapiRequestURL(motusPaymentsApiUrl, body, headerObj)
            nlapiLogExecution('ERROR', 'PROFILE submit', JSON.stringify(motusBody));
            var response = nlapiRequestURL(motusPaymentsApiUrl, JSON.stringify(motusBody), headerObj, 'POST')
            // var response = nlapiRequestURL(url, body, header, null, "POST");
            
            var responseBody = JSON.parse(response.getBody());
            nlapiLogExecution('ERROR', 'PROFILE_RESPONSE', JSON.stringify(responseBody));
            
            if (response.getCode() == 200 && responseBody.respcode == "09") {
            
                //if new profile, submit id to customer
                if(userMotusId == ""){
                    nlapiSubmitField('customer', user, 'custentity_profile_id_motus', responseBody.profileid);
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
        createTokenRecord: function(tokenData){

            // Reference: Data from Front End
            // newPaymentModel.set('name', 'Motus' + ' ' + cardType + ' ' + lastFour);
            // newPaymentModel.set('exp_month', expiryMonth);
            // newPaymentModel.set('exp_year', expiryYear);
            // newPaymentModel.set('last_four', lastFour);
            // newPaymentModel.set('token', token_number);
            // //Profile information
            // newPaymentModel.set('first_name', userProfile.firstname);
            // newPaymentModel.set('last_name', userProfile.lastname);
            // newPaymentModel.set('phone', userProfile.phoneinfo.phone);
            // newPaymentModel.set('email', userProfile.email);
            // newPaymentModel.set('motus_id', _.findWhere(userProfile.customfields,{ id: "custentity_profile_id_motus" }).value);


            //nlapiLogExecution('ERROR', 'createTokenRecord', JSON.stringify(profileData));
            motusTokenRecord = nlapiCreateRecord('customrecord_motus_cc_token');
            motusTokenRecord.setFieldValue('custrecord_motus_cc_token_customer', nlapiGetUser());
            //motusTokenRecord.setFieldValue('custrecord_motus_cc_token_card_type', profileData.accttype);
            motusTokenRecord.setFieldValue('name', tokenData.name);
            motusTokenRecord.setFieldValue('custrecord_motus_cc_token_exp_month', tokenData.exp_month);
            motusTokenRecord.setFieldValue('custrecord_motus_cc_token_exp_year', tokenData.exp_year);
            motusTokenRecord.setFieldValue('custrecord_motus_cc_token_token', tokenData.token);
            motusTokenRecord.setFieldValue('custrecord_sd_motus_cc_last_4', tokenData.last_four);
            motusTokenRecord.setFieldValue('custrecord_motus_cc_token_card_type', tokenData.card_type);
            motusTokenRecord.setFieldValue('custrecord_motus_cc_csc', tokenData.csc);
            //motusTokenRecord.setFieldValue('custrecord_sd_motus_cc_per_token_json', profileData);
            motusTokenRecord.setFieldValue('custrecord_sd_motus_is_default_card', 'T');
            //motusTokenRecord.setFieldValue('name', profileData.accttype + " " + tokenData.last_four);

            newRec = nlapiSubmitRecord(motusTokenRecord);
            nlapiLogExecution('ERROR', 'newRec id', newRec);
            return newRec;
        },
        submitTokenAuth: function(cardData, user){
            nlapiLogExecution('DEBUG', 'submittokenauth', JSON.stringify(cardData));
            var credentials_object = this.getMotusCredentials()
            if (credentials_object) {

                var oauthTokenData = this.getOauthToken(credentials_object);
                nlapiLogExecution('DEBUG', 'oauthToken', JSON.stringify(oauthTokenData.getBody()));
                var authReponse = this.getAuthResponse(credentials_object,JSON.parse(oauthTokenData.getBody()),cardData);

                var responseBody = JSON.parse(authReponse.getBody());
                var myresponse_code = authReponse.getCode();
                nlapiLogExecution('DEBUG', 'AUTH_RESPONSE_CODE', JSON.stringify(myresponse_code));
                if (myresponse_code == 101 || myresponse_code == '101' || myresponse_code == 200 || myresponse_code == '200') {
                    
                    return{
                        status: 'Success',
                        response: responseBody
                    }
                }else{
                        nlapiLogExecution('ERROR', 'ERR_NS_AUTH_FAILURE', JSON.stringify({
                        message: JSON.stringify(response),
                        user: userId,
                        action: 'AUTH Failure. No Authorization occured'
                    }));
                    return{
                        status: 'Error',
                        response: responseBody
                    }
                }

            }
        },

        getOauthToken: function(credentialsObj){
            var response = null;
            try {
                if (credentialsObj) {
                    var urlBase = "";
                    var username = credentialsObj.username;
                    var password = credentialsObj.password;
                    var grantType = credentialsObj.granttype;
                    urlBase = credentialsObj.baseurl;
    
                    var headerObj = {
                        "Access-Control-Allow-Origin": "*",
                        "Accept": "*/*",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Content-Type": "application/json"
                    };
    
                    var requestBody = {
                        "username": username,
                        "password": password,
                        "grant_type": grantType
                    }
    
                    //var stringifyObj = JSON.stringify(requestBody);
                    var response = nlapiRequestURL(urlBase + '/oauth/token', JSON.stringify(requestBody), headerObj, 'POST')
                    nlapiLogExecution('DEBUG', 'RAW_OAUTH_RESPONSE', JSON.stringify(response));

                    return response;
                }
    
            } catch (error) {
                nlapiLogExecution('ERROR', 'ERR_NS_TOKEN_CREATE_FAILURE', JSON.stringify({
                    message: error,
                    user: userId,
                    action: 'Error on Oauth token retrieval'
                }));
                return{
                    status: 'Error',
                    response: error
                }
                
            }
    
            return response;
        },

        getAuthResponse: function(credentialsObj,tokenData,data){
            nlapiLogExecution('DEBUG', 'AUTH_TOKENData', JSON.stringify(tokenData));
            nlapiLogExecution('DEBUG', 'AUTH_TOKENtype', tokenData.token_type);
            nlapiLogExecution('DEBUG', 'AUTH_TOKENtoken', tokenData.access_token);
            var response = null;
            try {
                var urlBase = "";
                urlBase = credentialsObj.baseurl;

                var motusPaymentsApiUrl = credentialsObj.baseurl + '/auth'
                //var orderid = newRecord.getValue('transactionnumber');

                var headerObjKeyed = {
                    'Authorization': tokenData.token_type + " " + tokenData.access_token,
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Content-Type": "application/json"
                };

                var requestBodyKeyed = {
                    "amount": data.amount,
                    "credit_card": {
                        "number": data.token,
                        "expiration_month": data.exp_month,
                        "expiration_year": data.exp_year
                    },
                    "integrator_id": credentialsObj.integrationid,
                    "csc": data.csc,
                    //INPUT LATER
                    // "billing_address": {
                    //     "name": nameCustomer,
                    //     "street_address": address,
                    //     "city": city,
                    //     "state": state,
                    //     "zip": zip
                    // }
                }

                nlapiLogExecution('DEBUG', 'motusPaymentsApiUrl', motusPaymentsApiUrl);
                nlapiLogExecution('DEBUG', 'Auth Header', JSON.stringify(headerObjKeyed));
                nlapiLogExecution('DEBUG', 'base url', urlBase);
                // var stringifyObj = JSON.stringify(requestBodyKeyed);
                var response = nlapiRequestURL(urlBase + 'v1/transactions/authorization/keyed', JSON.stringify(requestBodyKeyed), headerObjKeyed, 'POST')
                // var myresponse_body = response.body;
                // nlapiLogExecution('DEBUG', 'RAW_RESPONSE', JSON.stringify(response));
                // var responseBody = JSON.parse(response.getBody());
                // nlapiLogExecution('DEBUG', 'AUTH_RESPONSE', JSON.stringify(responseBody));
                // var myresponse_code = response.getCode();
                // // nlapiLogExecution('DEBUG', 'AUTH_RESPONSE_CODE', myresponse_code);
                return response;
    
            } catch (error) {
                nlapiLogExecution('ERROR', 'AUTH_RESPONSE_ERROR', JSON.stringify(error));
                return{
                    status: 'Error',
                    response: error
                }
                
            }
    
            return response;
        },

        voidAuth: function(auth){
            if (auth.merchid && auth.retref) {

                var credentials_object = this.getMotusCredentials();
                var motusVoidApiUrl = credentials_object.baseurl + '/void'
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
                var voidResponse = nlapiRequestURL(motusVoidApiUrl, JSON.stringify(requestBody), headerObj, 'POST')
                // var myresponse_body = response.body;
                nlapiLogExecution('DEBUG', 'RAW_VOID_RESPONSE', JSON.stringify(voidResponse));
                var responseBody = JSON.parse(voidResponse.getBody());
                nlapiLogExecution('DEBUG', 'RAW_VOID_RESPONSE_BODY', JSON.stringify(responseBody));
            }
        },

        resetTokenDefaults: function(user,newTokenRec){
            nlapiLogExecution('DEBUG', 'resetTokenDefaults', newTokenRec);
            var filters = [
                ["custrecord_motus_cc_token_customer","anyof", user], 
                "AND", 
                ["custrecord_sd_motus_is_default_card","is","T"],
                "AND", 
                ["internalid","noneof",newTokenRec]
                ];
            var columns = [
                new nlobjSearchColumn('internalid')
            ];
            var search_results = Application.getAllSearchResults('customrecord_motus_cc_token', filters, columns);
            if(search_results && search_results.length){
            search_results.forEach(function (card) {
                var removeDefaultId = card.getValue('internalid');
                nlapiLogExecution('DEBUG', 'remove default card', removeDefaultId);
                nlapiSubmitField('customrecord_motus_cc_token', removeDefaultId, 'custrecord_sd_motus_is_default_card', 'F');
            })
            }
            return;
        },
        getMotusCredentials: function(){
            var motusCreds = nlapiSearchRecord(
                'customrecord_motus_credentials',
                null,
                null,
                [
                new nlobjSearchColumn('custrecord_motus_cred_token_key'),
                new nlobjSearchColumn('custrecord_sd_motus_merchantid'),
                new nlobjSearchColumn('custrecord_motus_cred_base_url'),
                new nlobjSearchColumn('custrecord_motus_grant_type'),
                new nlobjSearchColumn('custrecord_motus_username'),
                new nlobjSearchColumn('custrecord_motus_password'),
                new nlobjSearchColumn('custrecord_motus_integration_id')
                // new nlobjSearchColumn('id')
                ]
            );

            var result = {};
            if(motusCreds.length > 0){
                for (var i = 0; i < motusCreds.length; i++) {
                    nlapiLogExecution('DEBUG', 'result', motusCreds[i].getValue("custrecord_motus_cred_base_url"));
                    result.tokenKey = motusCreds[i].getValue("custrecord_motus_cred_token_key");
                    result.merchantid = motusCreds[i].getValue("custrecord_sd_motus_merchantid");
                    result.baseurl = motusCreds[i].getValue("custrecord_motus_cred_base_url");
                    result.granttype = motusCreds[i].getValue("custrecord_motus_grant_type");
                    result.username = motusCreds[i].getValue("custrecord_motus_username");
                    result.password = motusCreds[i].getValue("custrecord_motus_password");
                    result.integrationid = motusCreds[i].getValue("custrecord_motus_integration_id");
                }
            }
            // var sitchCreds = nlapiLookupField('customrecord_motus_credentials', 1, ['custrecord_motus_cred_base_url','custrecord_motus_cred_token_key','custrecord_sd_motus_merchantid']);
            nlapiLogExecution('DEBUG', 'get credentials', JSON.stringify(result));
            return result;
        },
        updateToken: function(data){

            if(data.data.submit == true){
                
                return this.submitTokenAuth(data)

            }else{
                nlapiLogExecution('DEBUG', 'put default', data.id);
                nlapiSubmitField('customrecord_motus_cc_token', data.id, 'custrecord_sd_motus_is_default_card', 'T');
                
                this.resetTokenDefaults(nlapiGetUser(),data.id);
                
                return{
                    status: 'Success'
                }
            }

        }
    });
    
});