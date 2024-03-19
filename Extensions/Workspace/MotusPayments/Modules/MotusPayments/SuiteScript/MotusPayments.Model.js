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
                            new nlobjSearchColumn('custrecord_motus_cus_prof_id'),
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
                                motus_card.uuid = card.getValue('custrecord_motus_cus_prof_id');
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
                        
                        var motusCredentials = this.getMotusCredentials();
                        var oauthResp = this.getOauthToken(motusCredentials)
                        var oauthResponseBody = JSON.parse(oauthResp.getBody());
                        nlapiLogExecution('DEBUG', 'BODY', JSON.stringify(oauthResponseBody));
                        nlapiLogExecution('DEBUG', 'TOKEN', oauthResponseBody.access_token);
                        
                        var headerObj = {
                            "Authorization" : "Bearer " + oauthResponseBody.access_token,
                            "Content-Type": "application/json"
                        }
                        
                        var response = nlapiRequestURL(motusCredentials.baseurl + '/v1/payment_fields/token/create', null, headerObj, 'POST')
                        nlapiLogExecution('DEBUG', 'PROTECT TOKEN RESP', JSON.stringify(response));
                        motusCardsArr[0].clientkey = JSON.parse(response.getBody()).clientKey
                        
                        return JSON.stringify(motusCardsArr);
                    },
                    submitToken: function(data){
                        nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));
                        var userId = nlapiGetUser();
                        var credentials_object = this.getMotusCredentials()
                        var oauthTokenData = this.getOauthToken(credentials_object);
                        // var authReponse = this.getAuthResponse(credentials_object,JSON.parse(oauthTokenData.getBody()),cardData);
                        //Removed for Paytrace since there is no storage of profile or card data
                        
                        nlapiLogExecution('DEBUG', 'TOKEN REC CREATED', JSON.stringify(tokenRec));
                        var motusProfileSubmit = this.submitCustomerProfile(credentials_object,JSON.parse(oauthTokenData.getBody()), data, userId, tokenRec);
                        
                        nlapiLogExecution('DEBUG', 'motusProfileSubmit', JSON.stringify(motusProfileSubmit));
                        if(motusProfileSubmit.status == 'Success'){
                            try{    
                                var cardDetails = this.getCardDetails(motusProfileSubmit,JSON.parse(oauthTokenData.getBody()), credentials_object);
                                nlapiLogExecution('DEBUG', 'before', JSON.stringify(cardDetails));
                                var tokenRec = this.createTokenRecord(data, cardDetails)
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
                                message: motusProfileSubmit,
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
                                    id:tokenRec,
                                    cardDetails: cardDetails
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
                            var fields = [
                                'isinactive'
                            ];
                            var values = [
                                'T'
                            ];
                            nlapiSubmitField('customrecord_motus_cc_token', id, fields, values);
                            //nlapiDeleteRecord('customrecord_motus_cc_token', id)
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

                    submitCustomerProfile: function(motusCredentials, oauthToken, data, user, nstokenID){
                        // nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));
                        nlapiLogExecution('DEBUG', 'PROFILE_TOKENDataCSC', JSON.stringify(data));
                        nlapiLogExecution('DEBUG', 'PROFILE_OAUTHTOKENData', JSON.stringify(oauthToken));

                        //Use filler address because the customer has not submitted their address in checkout yet
                        var motusBody = {
                            "customer_id":data.uuid,
                            "hpf_token":data.hpf_token,
                            "enc_key":data.enc_key,
                            "integrator_id": motusCredentials.integrationid,
                            "phone"		: data.phone,
                            "email"		: data.email,
                            "billing_address":{
                                "name": data.billingAddr.name,
                                "street_address": data.billingAddr.street_address,
                                "street_address2": data.billingAddr.street_address2,
                                "city": data.billingAddr.city,
                                "state": data.billingAddr.state,
                                "zip": data.billingAddr.zip,
                                "country": data.billingAddr.country,
                            }
                        }

                        //Build header object
                        var headerObj = {
                            'Authorization': oauthToken.token_type + " " + oauthToken.access_token,
                            "Access-Control-Allow-Origin": "*",
                            "Accept": "application/json",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Content-Type": "application/json"
                        }
                        var motusPaymentsApiUrl = motusCredentials.baseurl + '/v1/customer/pt_protect_create'
                        nlapiLogExecution('DEBUG', 'body', JSON.stringify(motusBody));
                        nlapiLogExecution('DEBUG', 'motusPaymentsApiUrl', motusPaymentsApiUrl);
                        nlapiLogExecution('DEBUG', 'headers', JSON.stringify(headerObj));
                        // var response = nlapiRequestURL(motusPaymentsApiUrl, body, headerObj)
                        nlapiLogExecution('ERROR', 'PROFILE submit', JSON.stringify(motusBody));
                        var response = nlapiRequestURL(motusPaymentsApiUrl, JSON.stringify(motusBody), headerObj, 'POST')
                        // var response = nlapiRequestURL(url, body, header, null, "POST");
                        nlapiLogExecution('DEBUG', 'RAW_OAUTH_RESPONSE', JSON.stringify(response));
                        var responseBody = JSON.parse(response.getBody());
                        nlapiLogExecution('ERROR', 'PROFILE_RESPONSE', JSON.stringify(responseBody));
                        
                        if (response.getCode() == 200 && responseBody.success == true) {
                        
                            //if new profile, submit id to customer
                            // if(userMotusId == ""){
                            //     nlapiSubmitField('customer', user, 'custentity_profile_id_motus', responseBody.profileid);
                            // }
                            
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
                    submitBillingAddress: function(motusCredentials, oauthToken, data){
                        // nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));
                        nlapiLogExecution('DEBUG', 'submitBillingAddressdata', JSON.stringify(data));
                        nlapiLogExecution('DEBUG', 'submitBillingAddressoauth', JSON.stringify(oauthToken));

                        hpf_enc = nlapiLookupField('customrecord_motus_cc_token', data.id,['custrecord_motus_cc_token_enc','custrecord_motus_cc_token_hpf'])
                        
                        //Use filler address because the customer has not submitted their address in checkout yet
                        var motusBody = {
                            "customer_id": data.uuid,
                            "hpf_token":hpf_enc.custrecord_motus_cc_token_hpf,
                            "enc_key":hpf_enc.custrecord_motus_cc_token_enc,
                            "integrator_id": motusCredentials.integrationid,
                            "phone"		: data.phone,
                            "email"		: data.email,
                            "billing_address":{
                                "name": data.data.billingAddrObj.name,
                                "street_address":data.data.billingAddrObj.street_address,
                                //"street_address2":data.data.billingAddrObj.street_address2,
                                "city":data.data.billingAddrObj.city,
                                "state":data.data.billingAddrObj.state,
                                "zip":data.data.billingAddrObj.zip
                            }
                        }
                        nlapiLogExecution('DEBUG', 'submitBillingAddressbody', JSON.stringify(motusBody))
                        //Build header object
                        var headerObj = {
                            'Authorization': oauthToken.token_type + " " + oauthToken.access_token,
                            "Access-Control-Allow-Origin": "*",
                            "Accept": "application/json",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Content-Type": "application/json"
                        }
                        var motusUpdateCustApiUrl = motusCredentials.baseurl + '/v1/customer/pt_protect_update'
                        nlapiLogExecution('DEBUG', 'body', JSON.stringify(motusBody));
                        nlapiLogExecution('DEBUG', 'motusPaymentsApiUrl', motusUpdateCustApiUrl);
                        nlapiLogExecution('DEBUG', 'headers', JSON.stringify(headerObj));
                        // var response = nlapiRequestURL(motusUpdateCustApiUrl, body, headerObj)
                        nlapiLogExecution('ERROR', 'PROFILE submit', JSON.stringify(motusBody));
                        var response = nlapiRequestURL(motusUpdateCustApiUrl, JSON.stringify(motusBody), headerObj, 'POST')
                        // var response = nlapiRequestURL(url, body, header, null, "POST");
                        nlapiLogExecution('DEBUG', 'RAW_OAUTH_RESPONSE', JSON.stringify(response));
                        var responseBody = JSON.parse(response.getBody());
                        nlapiLogExecution('ERROR', 'PROFILE_RESPONSE', JSON.stringify(responseBody));
                        
                        if (response.getCode() == 200 && responseBody.success == true) {
                        
                            //if new profile, submit id to customer
                            // if(userMotusId == ""){
                            //     nlapiSubmitField('customer', user, 'custentity_profile_id_motus', responseBody.profileid);
                            // }
                            
                            return{
                                status: 'Success',
                                response: responseBody
                            }
                            
                        }else{
                            nlapiLogExecution('ERROR', 'UPDATE_CUST_PROFILE_ERR', JSON.stringify(responseBody));
                            return{
                                status: 'Error',
                                response: responseBody
                            }
                        }
                    },
                    getCardDetails: function(motusProfileSubmit, oauthToken, motusCredentials){
                        // nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));
                        // nlapiLogExecution('DEBUG', 'PROFILE_TOKENDataCSC', JSON.stringify(data));
                        nlapiLogExecution('DEBUG', 'GETPROFILE_OAUTHTOKENData', JSON.stringify(oauthToken));

                        var motusBody = {
                            "customer_id":motusProfileSubmit.response.customer_id,
                            "integrator_id": motusCredentials.integrationid
                        }

                        //Build header object
                        var headerObj = {
                            'Authorization': oauthToken.token_type + " " + oauthToken.access_token,
                            "Access-Control-Allow-Origin": "*",
                            "Accept": "application/json",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Content-Type": "application/json"
                        }
                        var motusgetProfileApiUrl = motusCredentials.baseurl + '/v1/customer/export'
                        nlapiLogExecution('DEBUG', 'body', JSON.stringify(motusBody));
                        nlapiLogExecution('DEBUG', 'motusGEtProfileApiUrl', motusgetProfileApiUrl);
                        nlapiLogExecution('DEBUG', 'headers', JSON.stringify(headerObj));
                        // var response = nlapiRequestURL(motusPaymentsApiUrl, body, headerObj)
                        nlapiLogExecution('ERROR', 'GET PROFILE submit', JSON.stringify(motusBody));
                        var response = nlapiRequestURL(motusgetProfileApiUrl, JSON.stringify(motusBody), headerObj, 'POST')
                        // var response = nlapiRequestURL(url, body, header, null, "POST");
                        nlapiLogExecution('DEBUG', 'RAW_GETPROFILE_RESPONSE', JSON.stringify(response));
                        var responseBody = JSON.parse(response.getBody());
                        nlapiLogExecution('ERROR', 'GETPROFILE_RESPONSE', JSON.stringify(responseBody));
                        
                        if (response.getCode() == 200 && responseBody.success == true) {
                        
                            //if new profile, submit id to customer
                            // if(userMotusId == ""){
                            //     nlapiSubmitField('customer', user, 'custentity_profile_id_motus', responseBody.profileid);
                            // }
                            
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
                    createTokenRecord: function(tokenData, cardDetails){

                        motusTokenRecord = nlapiCreateRecord('customrecord_motus_cc_token');
                        motusTokenRecord.setFieldValue('custrecord_motus_cc_token_customer', nlapiGetUser());
                        motusTokenRecord.setFieldValue('custrecord_motus_cus_prof_id', tokenData.uuid);
                        motusTokenRecord.setFieldValue('custrecord_motus_cc_token_exp_month', cardDetails.response.customers[0].credit_card.expiration_month.toString());
                        motusTokenRecord.setFieldValue('custrecord_motus_cc_token_exp_year', cardDetails.response.customers[0].credit_card.expiration_year.toString());
                        motusTokenRecord.setFieldValue('custrecord_sd_motus_cc_last_4', cardDetails.response.customers[0].credit_card.masked_number.slice(-4));
                        motusTokenRecord.setFieldValue('name', cardDetails.response.customers[0].credit_card.masked_number.slice(-4));
                        motusTokenRecord.setFieldValue('custrecord_motus_cc_token_hpf', tokenData.enc_key);
                        motusTokenRecord.setFieldValue('custrecord_motus_cc_token_enc', tokenData.enc_key);

                        newRec = nlapiSubmitRecord(motusTokenRecord);
                        nlapiLogExecution('ERROR', 'newRec id', newRec);
                        return newRec;
                    },
                    processOrder: function(cardData){
                        nlapiLogExecution('DEBUG', 'processOrder', JSON.stringify(cardData));
                        var credentials_object = this.getMotusCredentials()
                        if (credentials_object) {
                            var oauthTokenData = this.getOauthToken(credentials_object);
                            nlapiLogExecution('DEBUG', 'oauthToken', JSON.stringify(oauthTokenData.getBody()));
                            
                            
                            //this.submitBillingAddress(credentials_object,JSON.parse(oauthTokenData.getBody()), cardData)
                            
                            
                            var authReponse = this.getAuthResponse(credentials_object,JSON.parse(oauthTokenData.getBody()),cardData);
                            nlapiLogExecution('DEBUG', 'AUTH_RESPONSE_FULL', JSON.stringify(authReponse));
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
                                    // user: userId,
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
                                //user: userId,
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
                        nlapiLogExecution('DEBUG', 'AUTH_TOKENDataCSC', JSON.stringify(data));
                        nlapiLogExecution('DEBUG', 'AUTH_TOKENtype', tokenData.token_type);
                        nlapiLogExecution('DEBUG', 'AUTH_TOKENtoken', tokenData.access_token);
                        var response = null;
                        try {
                            var urlBase = "";
                            var uuid;
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
                            if(data.uuid){
                                uuid = data.uuid
                            }else{
                                uuid = nlapiLookupField('customrecord_motus_cc_token', data.id,'custrecord_motus_cus_prof_id')
                            }
                            nlapiLogExecution('DEBUG', 'AUTH_TOKENDataCSCuuid', uuid);
                            var requestBodyKeyed = {
                                "amount": data.amount,
                                "customer_id": uuid,    
                                "integrator_id": credentialsObj.integrationid
                            }
                            nlapiLogExecution('DEBUG', 'motusPaymentsApiUrl', motusPaymentsApiUrl);
                            nlapiLogExecution('DEBUG', 'Auth Header', JSON.stringify(headerObjKeyed));
                            nlapiLogExecution('DEBUG', 'requestBodyKeyed', JSON.stringify(requestBodyKeyed));
                            nlapiLogExecution('DEBUG', 'base url', urlBase);
                            // var stringifyObj = JSON.stringify(requestBodyKeyed);
                            var response = nlapiRequestURL(urlBase + '/v1/transactions/authorization/by_customer', JSON.stringify(requestBodyKeyed), headerObjKeyed, 'POST')

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

                            return this.processOrder(data)
                        }else{
                            nlapiLogExecution('DEBUG', 'put default', data.id);
                            nlapiSubmitField('customrecord_motus_cc_token', data.id, 'custrecord_sd_motus_is_default_card', 'T');
                            
                            this.resetTokenDefaults(nlapiGetUser(),data.id);
                            
                            return{
                                status: 'Success'
                            }
                        }
                    },
                });
                
            });
