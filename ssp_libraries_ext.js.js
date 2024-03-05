try{
    function _getDomain(){
        var session = nlapiGetWebContainer().getShoppingSession();
        var domain;
        if(_.isFunction(session.getEffectiveShoppingDomain)){
            domain = session.getEffectiveShoppingDomain();
        }
        else{
            var home = session.getSiteSettings(['touchpoints']).touchpoints.home;
            var home_match = home.match(/https?:\/\/([^#?\/]+)[#?\/]?/);
            if(!home_match){
                home_match = home.match(/\?btrgt=https?%3A%2F%2F([^#?\/]+)[#?\/]?/);
            }
            domain = home_match[1];
        }
        return domain;
    }
    var current_domain = _getDomain();
    var Configuration = require('Configuration');
    Configuration.overwriteByDomain({"www.suitedynamics.co":{"customFields":{"checkout":{"requiredError":"Field {{field}} is required.","requiredGeneralError":"Please fill required fields below before continuing.","loadingMessage":"Loading additional information...","loadingError":"There was a problem loading the section. Please reload the page.","savingError":"There was a problem saving. Please reload the page."},"pdp":{"fields":[{"fieldid":"UPC CODE: [[upccode]]","show":false,"schema":""},{"fieldid":"MANUFACTURER: [[manufacturer]]","show":false,"schema":"manufacturer"},{"fieldid":"MPN: [[mpn]]","show":false,"schema":"mpn"},{"fieldid":"MANUFACTURER COUNTRY: [[countryofmanufacture]]","show":false,"schema":""},{"fieldid":"ITEM WEIGHT: [[weight]] [[weightunit]]","show":false,"schema":"weight"}]}},"MotusPDP":{"config":"Default config example"},"MotusPayments":{"config":"Default config example"},"blog":{"blogHomeTitle":"Blog","readMoreLabel":"Read More","allArticlesTaxonomyName":"All Articles","showFeaturedArticlesInPagination":true,"moreArticlesLabel":"More Articles","searchLabel":"Search This Blog","searchHint":"Search","searchResultsLabel":"Search Results","noSearchResultsLabel":"Not many results for [[term]]","noResultsArticleSuggestionMessage":"Search again or see these articles:","searchCloseButtonLabel":"Close","taxonomyNavigationTitle":"Categories","paginationLabel":"Read More Articles","backToTopLabel":"Back To Top","largeImageResizeId":"zoom","thumbnailImageResizeId":"zoom","articlesByPage":"20","emptyStateLabel":"Articles are coming soon!","emptyStateMessage":"Meanwhile, visit our shop","emptyStateButtonLabel":"Shop Now","showLatestPostsSection":true,"latestPostsLabel":"Latest Articles","latestPostsCarouselInterval":"5 sec","showRssFeedLink":false},"featuredproduct":{"fieldset":""},"contactUsForm":{"subsidiary":"","defaultName":"No Name","defaultLastname":"No Last Name","defaultCompany":"No Company","defaultSubject":"No Subject"}}});
    require('SCA');
    var extensions = {};
     var srcDefine = define;
      ProxyPolyfill = function(target, handler) {
          var proxy = this;
            const getter = handler.get ? function(prop) {
             return handler.get(this, prop, proxy);
            } : function(prop) {
             return this[prop];
          };
          const propertyNames = Object.getOwnPropertyNames(target);
          propertyNames.forEach(function(prop) {
              const desc = {
                  get: getter.bind(target, prop)
              };
              Object.defineProperty(proxy, prop, desc);
          });
          return proxy;
      };
    extensions['SD.MotusPDP.1.0.0'] = function(extensionName){
      var define = function(moduleName, dependencies, callback) {
          for (var i = 0; i < dependencies.length; i++){
              var dep = dependencies[i];
              if (dep === 'Application' && dep.indexOf(extensionName + '.Plugin!') === -1) {
                  dependencies[i] = extensionName + '.Plugin!' + dep;
              }
          }
          return srcDefine(moduleName, dependencies, callback);
      };
      define(extensionName + '.Plugin', [], function (){
          return {
                load: function (name, req, onload, config){
                  try{
                        req(
                          [name],
                          function (value) {
                              const proxy = new ProxyPolyfill(value, {
                                  get: function (target, prop, receiver){
                                      var targetProp = target[prop];
                                      if(typeof targetProp === 'function'){
                                          targetProp = function() {
                                              var args = Array.prototype.slice.call(arguments)
                                              if(prop === 'getComponent'){
                                                  args.push(extensionName);
                                              }
                                              return target[prop].apply(target, args);
                                          }
                                      }                                  return targetProp;
                                  }
                              });
                              onload(proxy);
                          },
                          function () {
                              onload(null);
                          });
                  }catch (e) {}
              }
          };
      });
    define("SD.MotusPDP.MotusPDP.ServiceController", ["ServiceController"], function(
      ServiceController
    ) {
      "use strict";
      return ServiceController.extend({
        name: "SD.MotusPDP.MotusPDP.ServiceController",
        // The values in this object are the validation needed for the current service.
        options: {
          common: {}
        },
        get: function get() {
          return JSON.stringify({
            message: "Hello World I'm an Extension using a Service!"
          });
        },
        post: function post() {
          // not implemented
        },
        put: function put() {
          // not implemented
        },
        delete: function() {
          // not implemented
        }
      });
    });
    // SD.MotusPDP.MotusPDP.js
    // Load all your starter dependencies in backend for your extension here
    // ----------------
    define('SD.MotusPDP.MotusPDP'
    ,	[
            'SD.MotusPDP.MotusPDP.ServiceController'
        ]
    ,	function (
            MotusPDPServiceController
        )
    {
        'use strict';
    });
    };
    extensions['SuiteDynamics.CustomerSwitch.1.0.0'] = function(extensionName){
      var define = function(moduleName, dependencies, callback) {
          for (var i = 0; i < dependencies.length; i++){
              var dep = dependencies[i];
              if (dep === 'Application' && dep.indexOf(extensionName + '.Plugin!') === -1) {
                  dependencies[i] = extensionName + '.Plugin!' + dep;
              }
          }
          return srcDefine(moduleName, dependencies, callback);
      };
      define(extensionName + '.Plugin', [], function (){
          return {
                load: function (name, req, onload, config){
                  try{
                        req(
                          [name],
                          function (value) {
                              const proxy = new ProxyPolyfill(value, {
                                  get: function (target, prop, receiver){
                                      var targetProp = target[prop];
                                      if(typeof targetProp === 'function'){
                                          targetProp = function() {
                                              var args = Array.prototype.slice.call(arguments)
                                              if(prop === 'getComponent'){
                                                  args.push(extensionName);
                                              }
                                              return target[prop].apply(target, args);
                                          }
                                      }                                  return targetProp;
                                  }
                              });
                              onload(proxy);
                          },
                          function () {
                              onload(null);
                          });
                  }catch (e) {}
              }
          };
      });
    /*
     * @name CustomerSwitch.Checkout.Entry.js
     *
     * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
     *
     * @since 2023-12-21
     *
     *
     */
    define('CustomerSwitch.Model',
    [
        'SC.Model',
        'SC.Models.Init'
    ],
    function (
        SCModel,
        ModelsInit
    ) {
        'use strict';
        return SCModel.extend({
            name: 'CustomerSwitch.Model',
            
            /**
             * Attempt to switch the access of the logged in user.
             * @param {Object} data 
             * @returns {Object}
             */
            switchAccess: function (data) {
                
                var responseObj = {};
                
                try {
                    var userId = nlapiGetUser(),
                        userRole = nlapiGetRole(),
                        context = nlapiGetContext(),
                        userEmail = context.getEmail();
                    
                    var contact_password = context.getSessionObject('cont_pswd');
                    
                    if (!contact_password) {
                        return {'status': 'NO_PASSWORD'};
                    }
                    
                    var suiteletURL = nlapiResolveURL('SUITELET', 'customscript_sd_sl_custswitch', 'customdeploy_sd_sl_custswitch', 'external'),
                    
                    postData = {
                        userId: userId,
                        contactId: data.contactId,
                        userRole: userRole,
                        password: contact_password,
                        selectedCustomer: data.selectedCustomer
                    },
                    
                    //Trigger the suitelet to change access.
                    suiteletResponse = nlapiRequestURL(suiteletURL, postData, {}, 'POST');
                    
                    if (suiteletResponse.getCode() == 200) {
                        
                        var suiteletResponseBody = JSON.parse(suiteletResponse.getBody());
                        
                        if (suiteletResponseBody.status == 'OK') {
                            
                            ModelsInit.session.logout();
                    
                            ModelsInit.session.login({
                                email: userEmail,
                                password: contact_password
                            });
                            
                            context.setSessionObject('cont_pswd', contact_password );
                            
                            responseObj.status = 'OK';
                        }
                        else {
                            responseObj.error = suiteletResponseBody.error;
                        }
                    }
                    
                }
                catch (error) {
                   responseObj.error = error;
                }
                
                return responseObj;
            }
        });
    });
    /*
     * @name CustomerSwitch.Checkout.Entry.js
     *
     * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
     *
     * @since 2023-12-21
     *
     *
     */
    define("CustomerSwitch.ServiceController", 
    [
        "ServiceController",
        "CustomerSwitch.Model"
    ],
    function(
        ServiceController,
        CustomerSwitchModel
    ){
        "use strict";
        return ServiceController.extend({
            name: "CustomerSwitch.ServiceController",
            options: function() {
                return {
                    common: {
                        requireLogin: true
                    }
                };
            },
            get: function get() {
                // not implemented
            },
            post: function post() {
                return CustomerSwitchModel.switchAccess(this.data);
            },
            put: function put() {
                // not implemented
            },
            delete: function() {
            // not implemented
            }
        });
    });
    /*
     * @name CustomerSwitch.Entry.js
     *
     * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
     *
     * @since 2023-12-21
     *
     *
     */
    define('CustomerSwitch.Entry',
    [
        // 'CustomerSwitch.ServiceController',
        // 'CustomerSwitch.Model',
        'Application',
        'Account.Model',
        'underscore',
        'SC.Models.Init'
    ],	
    function (
        // CustomerSwitchModuleServiceController,
        // CustomerSwitchModel,
        Application,
        AccountModel,
        _,
        ModelsInit
    ) {
        'use strict';
        
        Application.on('after:Profile.get', function (Model, profile) {
            
            if (ModelsInit.session.isLoggedIn2()) {
                try{
                    var filters = [
                        new nlobjSearchFilter('email', null, 'is', profile.email), 
                        new nlobjSearchFilter('isinactive', null, 'is', 'F')
                    ],
                    columns = [
                        new nlobjSearchColumn('internalid', 'customer', null),
                        new nlobjSearchColumn('entityid', 'customer', null),
                        new nlobjSearchColumn('companyname', 'customer', null),
                        new nlobjSearchColumn("shipaddress","customer",null), 
                        new nlobjSearchColumn("phone","customer",null), 
                        new nlobjSearchColumn("email","customer",null), 
                        new nlobjSearchColumn("salesrep","customer",null),
                        new nlobjSearchColumn("isinactive","customer",null)
                    ],
                    
                    searchResults = Application.getAllSearchResults('contact', filters, columns),
                    customers = [],
                    contactId;
                    
                    if (searchResults && searchResults.length) {
                        
                        var contactResults = _.filter(searchResults, function (result) {
                            return result.getValue('internalid', 'customer', null) == profile.internalid;
                        });
                        contactId = contactResults[0].getId();
                        
                        _.each(searchResults, function(result){
                            
                            var customerId = result.getValue('internalid', 'customer', null);
                            
                            if( contactId == result.getId() ){
                                
                                customers.push({
                                    internalid: customerId,
                                    entityid: result.getValue('entityid', 'customer', null),
                                    companyname: result.getValue('companyname', 'customer', null),
                                    shipaddress: result.getValue('shipaddress', 'customer', null),
                                    phone: result.getValue('phone', 'customer', null),
                                    email: result.getValue('email', 'customer', null),
                                    salesrep: result.getText('salesrep', 'customer', null),
                                    isinactive: result.getValue('isinactive', 'customer', null),
                                    isActive: (customerId == profile.internalid)? true: false
                                });
                            }
                        });
                    }
                    
                    profile.customers = _.sortBy(customers,'companyname');
                    profile.contactId = contactId;
                    
                }
                catch(e){
                    profile.error = e.toString();
                }
            }
            return profile;	
        });
        
        AccountModel.login = _.wrap(AccountModel.login, function (fn) {
            var params = _.toArray(arguments).splice(1),
                returnObj = fn.apply(this, params),
                user = returnObj.user,
                password = params[1];
            
            if (user.isLoggedIn == 'T' && user.customers && user.customers.length) {
                var context = nlapiGetContext();
                
                context.setSessionObject('cont_pswd', password );
            }
            
            return returnObj;
        });
    });
    };
    extensions['SuiteDynamics.MotusPayments.1.0.0'] = function(extensionName){
      var define = function(moduleName, dependencies, callback) {
          for (var i = 0; i < dependencies.length; i++){
              var dep = dependencies[i];
              if (dep === 'Application' && dep.indexOf(extensionName + '.Plugin!') === -1) {
                  dependencies[i] = extensionName + '.Plugin!' + dep;
              }
          }
          return srcDefine(moduleName, dependencies, callback);
      };
      define(extensionName + '.Plugin', [], function (){
          return {
                load: function (name, req, onload, config){
                  try{
                        req(
                          [name],
                          function (value) {
                              const proxy = new ProxyPolyfill(value, {
                                  get: function (target, prop, receiver){
                                      var targetProp = target[prop];
                                      if(typeof targetProp === 'function'){
                                          targetProp = function() {
                                              var args = Array.prototype.slice.call(arguments)
                                              if(prop === 'getComponent'){
                                                  args.push(extensionName);
                                              }
                                              return target[prop].apply(target, args);
                                          }
                                      }                                  return targetProp;
                                  }
                              });
                              onload(proxy);
                          },
                          function () {
                              onload(null);
                          });
                  }catch (e) {}
              }
          };
      });
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
    define("SuiteDynamics.MotusPayments.MotusPayments.ServiceController", ["ServiceController", "MotusPayments.Model", "LiveOrder.Model","underscore"], function(
      ServiceController,
      MotusPaymentsModel,
      LiveOrderModel,
      _
    ) {
      "use strict";
      return ServiceController.extend({
        name: "SuiteDynamics.MotusPayments.MotusPayments.ServiceController",
        // The values in this object are the validation needed for the current service.
        options: {
          common: {}
        },
        get: function get() {
            nlapiLogExecution('DEBUG', 'get', 'get');
          return MotusPaymentsModel.getTokens();
        },
        post: function post() {
            nlapiLogExecution('DEBUG', 'post', 'post');
            //Here we will submit the token to Netsuite and create/update the customer profile in CardPointe
            return MotusPaymentsModel.submitToken(this.data);
        },
        put: function put() {
            nlapiLogExecution('DEBUG', 'put', JSON.stringify(this.data));
            //Here we will update the token and submit Authorization
            return MotusPaymentsModel.updateToken(this.data);
        },
        delete: function() {
            nlapiLogExecution('DEBUG', 'delete', this.request.getParameter('id'));
            return MotusPaymentsModel.deleteToken(this.request.getParameter('id'));
        }
      });
    });
    // SuiteDynamics.MotusPayments.MotusPayments.js
    // Load all your starter dependencies in backend for your extension here
    // ----------------
    define('SuiteDynamics.MotusPayments.MotusPayments'
    ,	[
            // 'SuiteDynamics.MotusPayments.MotusPayments.ServiceController',
            'LiveOrder.Model',
            'underscore'
        ]
    ,	function (
            // MotusPaymentsServiceController,
            LiveOrderModel,
            _
        )
    {
        'use strict';
        nlapiLogExecution('DEBUG', 'start backend module', 'start backend module');
    });
    };
    extensions['CXExtensibility.CoreContent.1.0.5'] = function(extensionName){
      var define = function(moduleName, dependencies, callback) {
          for (var i = 0; i < dependencies.length; i++){
              var dep = dependencies[i];
              if (dep === 'Application' && dep.indexOf(extensionName + '.Plugin!') === -1) {
                  dependencies[i] = extensionName + '.Plugin!' + dep;
              }
          }
          return srcDefine(moduleName, dependencies, callback);
      };
      define(extensionName + '.Plugin', [], function (){
          return {
                load: function (name, req, onload, config){
                  try{
                        req(
                          [name],
                          function (value) {
                              const proxy = new ProxyPolyfill(value, {
                                  get: function (target, prop, receiver){
                                      var targetProp = target[prop];
                                      if(typeof targetProp === 'function'){
                                          targetProp = function() {
                                              var args = Array.prototype.slice.call(arguments)
                                              if(prop === 'getComponent'){
                                                  args.push(extensionName);
                                              }
                                              return target[prop].apply(target, args);
                                          }
                                      }                                  return targetProp;
                                  }
                              });
                              onload(proxy);
                          },
                          function () {
                              onload(null);
                          });
                  }catch (e) {}
              }
          };
      });
    define('CXExtensibility.CoreContent.CoreContentModule', [], function (CoreContentModuleServiceController) {
        'use strict';
    });
    };
    extensions['SuiteCommerce.CustomFields.1.1.4'] = function(extensionName){
      var define = function(moduleName, dependencies, callback) {
          for (var i = 0; i < dependencies.length; i++){
              var dep = dependencies[i];
              if (dep === 'Application' && dep.indexOf(extensionName + '.Plugin!') === -1) {
                  dependencies[i] = extensionName + '.Plugin!' + dep;
              }
          }
          return srcDefine(moduleName, dependencies, callback);
      };
      define(extensionName + '.Plugin', [], function (){
          return {
                load: function (name, req, onload, config){
                  try{
                        req(
                          [name],
                          function (value) {
                              const proxy = new ProxyPolyfill(value, {
                                  get: function (target, prop, receiver){
                                      var targetProp = target[prop];
                                      if(typeof targetProp === 'function'){
                                          targetProp = function() {
                                              var args = Array.prototype.slice.call(arguments)
                                              if(prop === 'getComponent'){
                                                  args.push(extensionName);
                                              }
                                              return target[prop].apply(target, args);
                                          }
                                      }                                  return targetProp;
                                  }
                              });
                              onload(proxy);
                          },
                          function () {
                              onload(null);
                          });
                  }catch (e) {}
              }
          };
      });
    /// <amd-module name="SuiteCommerce.CustomFields.Checkout.Data"/>
    define("SuiteCommerce.CustomFields.Checkout.Data", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var Enum = {
            Position: {
                BEFORE: 'BEFORE',
                AFTER: 'AFTER',
            },
            Module: {
                SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
                SHIPPING_METHOD: 'SHIPPING_METHOD',
                GIFT_CERTIFICATE: 'GIFT_CERTIFICATE',
                PAYMENT_METHOD: 'PAYMENT_METHOD',
                BILLING_ADDRESS: 'BILLING_ADDRESS',
                REVIEW_SHIPPING: 'REVIEW_SHIPPING',
                REVIEW_PAYMENT: 'REVIEW_PAYMENT',
            },
            Type: {
                TEXT_INPUT: 'TEXT_INPUT',
                TEXT_AREA: 'TEXT_AREA',
                CHECKBOX: 'CHECKBOX',
                DATE: 'DATE',
                HEADING: 'HEADING',
            },
        };
        exports.Data = {
            Enum: Enum,
            ConfigMap: {
                Position: {
                    Before: Enum.Position.BEFORE,
                    After: Enum.Position.AFTER,
                },
                Module: {
                    'Shipping Address': Enum.Module.SHIPPING_ADDRESS,
                    'Shipping Method': Enum.Module.SHIPPING_METHOD,
                    'Gift Certificate': Enum.Module.GIFT_CERTIFICATE,
                    'Payment Method': Enum.Module.PAYMENT_METHOD,
                    'Billing Address': Enum.Module.BILLING_ADDRESS,
                    'Review Shipping': Enum.Module.REVIEW_SHIPPING,
                    'Review Payment': Enum.Module.REVIEW_PAYMENT,
                },
                Type: {
                    'Free-Form Text': Enum.Type.TEXT_INPUT,
                    'Text Area': Enum.Type.TEXT_AREA,
                    'Check Box': Enum.Type.CHECKBOX,
                    Date: Enum.Type.DATE,
                    Header: Enum.Type.HEADING,
                },
            },
            OrderWizardMap: {
                SHIPPING_ADDRESS: {
                    step: 'shipping/address',
                    module: 'order_wizard_address_module',
                },
                SHIPPING_METHOD: {
                    step: 'shipping/address',
                    module: 'order_wizard_shipmethod_module',
                },
                GIFT_CERTIFICATE: {
                    step: 'billing',
                    module: 'order_wizard_paymentmethod_giftcertificates_module',
                },
                PAYMENT_METHOD: {
                    step: 'billing',
                    module: 'order_wizard_paymentmethod_selector_module',
                },
                BILLING_ADDRESS: {
                    step: 'billing',
                    module: 'order_wizard_address_module',
                },
                REVIEW_SHIPPING: {
                    step: 'review',
                    module: 'order_wizard_showshipments_module',
                },
                REVIEW_PAYMENT: {
                    step: 'review',
                    module: 'order_wizard_showpayments_module',
                },
            },
        };
    });
    /// <amd-module name="SuiteCommerce.CustomFields.Checkout.Helper"/>
    define("SuiteCommerce.CustomFields.Checkout.Helper", ["require", "exports", "underscore", "SuiteCommerce.CustomFields.Checkout.Data", "Configuration"], function (require, exports, _, Checkout_Data_1, Configuration) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Helper = {
            getFields: function (fieldIds) {
                var _this = this;
                var fieldsConfig = Configuration.get('customFields.checkout.fields', []);
                var fields = [];
                fieldsConfig.forEach(function (fieldConfig) {
                    var field = _this.parseFieldConfig(fieldConfig);
                    if (!fieldIds ||
                        (fieldIds.length > 0 && fieldIds.indexOf(field.internalid) >= 0)) {
                        field.internalid = field.internalid.trim();
                        fields.push(field);
                    }
                });
                return fields;
            },
            parseFieldConfig: function (field) {
                return _.extend({}, field, {
                    position: this.mapPositionEnum(field.position),
                    module: this.mapModuleEnum(field.module),
                    type: this.mapTypeEnum(field.type),
                });
            },
            // Data
            mapPositionEnum: function (configValue) {
                return this.mapConfigEnum('Position', configValue);
            },
            mapModuleEnum: function (configValue) {
                return this.mapConfigEnum('Module', configValue);
            },
            mapTypeEnum: function (configValue) {
                return this.mapConfigEnum('Type', configValue);
            },
            mapConfigEnum: function (configMapKey, configValue) {
                var configMap;
                if (configMapKey in Checkout_Data_1.Data.ConfigMap) {
                    configMap = Checkout_Data_1.Data.ConfigMap[configMapKey];
                    if (configValue && configValue in configMap) {
                        return configMap[configValue];
                    }
                }
                return null;
            },
            // Type Helpers
            isFieldTypeWritable: function (type) {
                return type && !this.isTypeHeading(type);
            },
            isTypeText: function (type) {
                return this.isTypeTextInput(type) || this.isTypeTextArea(type);
            },
            isTypeTextInput: function (type) {
                return type === Checkout_Data_1.Data.Enum.Type.TEXT_INPUT;
            },
            isTypeTextArea: function (type) {
                return type === Checkout_Data_1.Data.Enum.Type.TEXT_AREA;
            },
            isTypeCheckbox: function (type) {
                return type === Checkout_Data_1.Data.Enum.Type.CHECKBOX;
            },
            isTypeDate: function (type) {
                return type === Checkout_Data_1.Data.Enum.Type.DATE;
            },
            isTypeHeading: function (type) {
                return type === Checkout_Data_1.Data.Enum.Type.HEADING;
            },
        };
    });
    /// <amd-module name="SuiteCommerce.CustomFields.Checkout.Model"/>
    define("SuiteCommerce.CustomFields.Checkout.Model", ["require", "exports", "underscore", "SC.Models.Init", "SuiteCommerce.CustomFields.Checkout.Helper"], function (require, exports, _, ModelsInit, Checkout_Helper_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var Model = /** @class */ (function () {
            function Model() {
            }
            Model.get = function (data) {
                var _this = this;
                var result = {};
                var customFields = ModelsInit.order.getCustomFieldValues() || {};
                var fields = data.fields;
                fields.forEach(function (field) {
                    if (Checkout_Helper_1.Helper.isFieldTypeWritable(field.type)) {
                        result[field.internalid] = _this.getFieldValueForLoad(customFields, field);
                    }
                });
                return result;
            };
            Model.update = function (data) {
                var _this = this;
                var fields = data.fields;
                var customFields = {};
                fields.forEach(function (field) {
                    if (Checkout_Helper_1.Helper.isFieldTypeWritable(field.type)) {
                        customFields[field.internalid] = _this.getFieldValueForSave(data, field);
                    }
                });
                if (_(customFields).size() > 0) {
                    ModelsInit.order.setCustomFieldValues(customFields);
                }
                return this.get(data);
            };
            // Utils
            Model.getFieldValueForSave = function (data, field) {
                var value = data[field.internalid];
                return this.formatValueForSave(field, value);
            };
            Model.formatValueForSave = function (field, value) {
                var type = field.type;
                if (Checkout_Helper_1.Helper.isTypeDate(type)) {
                    return this.formatDateValueForSave(value);
                }
                if (Checkout_Helper_1.Helper.isTypeCheckbox(type)) {
                    return this.formatCheckboxValueForSave(value);
                }
                if (Checkout_Helper_1.Helper.isTypeText(type)) {
                    return this.formatTextValueForSave(value);
                }
                return value;
            };
            Model.formatDateValueForSave = function (value) {
                var date;
                if (value) {
                    date = value.split('-');
                    return nlapiDateToString(new Date(date[0], date[1] - 1, date[2]));
                }
                return '';
            };
            Model.formatCheckboxValueForSave = function (value) {
                return !value || value === 'off' ? 'F' : 'T';
            };
            Model.formatTextValueForSave = function (value) {
                return value || '';
            };
            Model.getFieldValueForLoad = function (customFields, field) {
                var customField = _(customFields).findWhere({ name: field.internalid });
                var value = customField ? customField.value : null;
                return this.formatValueForLoad(field, value);
            };
            Model.formatValueForLoad = function (field, value) {
                var type = field.type;
                if (Checkout_Helper_1.Helper.isTypeDate(type)) {
                    return this.formatDateValueForLoad(value);
                }
                if (Checkout_Helper_1.Helper.isTypeCheckbox(type)) {
                    return this.formatCheckboxValueForLoad(value);
                }
                if (Checkout_Helper_1.Helper.isTypeText(type)) {
                    return this.formatTextValueForLoad(value);
                }
                return value;
            };
            Model.formatDateValueForLoad = function (value) {
                var date;
                if (value) {
                    if (value.indexOf('-') !== -1) {
                        var values = value.split('-');
                        value = nlapiDateToString(new Date(values[0], values[1] - 1, values[2]));
                    }
                    date = nlapiStringToDate(value);
                    return date.toISOString().slice(0, 10);
                }
                return '';
            };
            Model.formatCheckboxValueForLoad = function (value) {
                return value === 'T';
            };
            Model.formatTextValueForLoad = function (value) {
                return value || '';
            };
            return Model;
        }());
        exports.Model = Model;
    });
    /// <amd-module name="SuiteCommerce.CustomFields.Checkout.ServiceController"/>
    define("SuiteCommerce.CustomFields.Checkout.ServiceController", ["require", "exports", "ServiceController", "underscore", "SuiteCommerce.CustomFields.Checkout.Helper", "SuiteCommerce.CustomFields.Checkout.Model"], function (require, exports, ServiceController, _, Checkout_Helper_1, Checkout_Model_1) {
        "use strict";
        return ServiceController.extend({
            name: 'SuiteCommerce.CustomFields.Checkout.ServiceController',
            get: function () {
                var data = this.parseRequest();
                var result = Checkout_Model_1.Model.get(data);
                this.sendContent(result);
            },
            post: function () {
                var data = this.parseData();
                var result = Checkout_Model_1.Model.update(data);
                this.sendContent(result);
            },
            parseRequest: function () {
                var fieldsStr = this.request.getParameter('fields') || '';
                var fieldIds = fieldsStr ? fieldsStr.split(',') : [];
                var fields = Checkout_Helper_1.Helper.getFields(fieldIds);
                return {
                    fields: fields,
                };
            },
            parseData: function () {
                var data = this.data;
                var fieldIds = _(data.fields).pluck('internalid');
                data.fields = Checkout_Helper_1.Helper.getFields(fieldIds);
                return data;
            },
        });
    });
    /// <amd-module name="SuiteCommerce.CustomFields.Checkout"/>
    define("SuiteCommerce.CustomFields.Checkout", ["require", "exports", "SuiteCommerce.CustomFields.Checkout.ServiceController"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.CustomFieldsCheckout = {};
    });
    /// <amd-module name="SuiteCommerce.CustomFields.Main"/>
    define("SuiteCommerce.CustomFields.Main", ["require", "exports", "SuiteCommerce.CustomFields.Checkout"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    };
    extensions['SuiteCommerce.MapContactInfo.1.1.5'] = function(extensionName){
      var define = function(moduleName, dependencies, callback) {
          for (var i = 0; i < dependencies.length; i++){
              var dep = dependencies[i];
              if (dep === 'Application' && dep.indexOf(extensionName + '.Plugin!') === -1) {
                  dependencies[i] = extensionName + '.Plugin!' + dep;
              }
          }
          return srcDefine(moduleName, dependencies, callback);
      };
      define(extensionName + '.Plugin', [], function (){
          return {
                load: function (name, req, onload, config){
                  try{
                        req(
                          [name],
                          function (value) {
                              const proxy = new ProxyPolyfill(value, {
                                  get: function (target, prop, receiver){
                                      var targetProp = target[prop];
                                      if(typeof targetProp === 'function'){
                                          targetProp = function() {
                                              var args = Array.prototype.slice.call(arguments)
                                              if(prop === 'getComponent'){
                                                  args.push(extensionName);
                                              }
                                              return target[prop].apply(target, args);
                                          }
                                      }                                  return targetProp;
                                  }
                              });
                              onload(proxy);
                          },
                          function () {
                              onload(null);
                          });
                  }catch (e) {}
              }
          };
      });
    /// <amd-module name="SuiteCommerce.ContactUsForm.ServiceController"/>
    define("SuiteCommerce.ContactUsForm.ServiceController", ["require", "exports", "ServiceController"], function (require, exports, ServiceController) {
        "use strict";
        return ServiceController.extend({
            name: 'SuiteCommerce.ContactUsForm.ServiceController',
            post: function () {
                var suiteletInternalUrl = nlapiResolveURL('SUITELET', 'customscript_ns_sc_sl_contact_us_form', 'customdeploy_ns_sc_sl_contact_us_form', 'external');
                var headers = {
                    Accept: 'application/json',
                };
                var responseObj = nlapiRequestURL(suiteletInternalUrl, JSON.stringify(this.data), headers);
                var responseStatusCode = parseInt(responseObj.getHeader('Custom-Header-Status'), 10);
                if (responseStatusCode === 200) {
                    return JSON.parse(responseObj.getBody());
                }
                else {
                    throw '';
                }
            }
        });
    });
    /// <amd-module name="SuiteCommerce.ContactUsForm"/>
    define("SuiteCommerce.ContactUsForm", ["require", "exports"], function (require, exports) {
        "use strict";
        require('SuiteCommerce.ContactUsForm.ServiceController');
        return {};
    });
    };
    var coreLanguages = {"checkout":["cs_CZ","da_DK","de_DE","en_AU","en_CA","en_GB","en_US","es_AR","es_ES","fi_FI","fr_CA","fr_FR","id_ID","it_IT","ja_JP","ko_KR","nb_NO","nl_NL","no_NO","pt_BR","ru_RU","sv_SE","th_TH","tr_TR","vi_VN","zh_CN","zh_TW"],"myaccount":["cs_CZ","da_DK","de_DE","en_AU","en_CA","en_GB","en_US","es_AR","es_ES","fi_FI","fr_CA","fr_FR","id_ID","it_IT","ja_JP","ko_KR","nb_NO","nl_NL","no_NO","pt_BR","ru_RU","sv_SE","th_TH","tr_TR","vi_VN","zh_CN","zh_TW"],"shopping":["cs_CZ","da_DK","de_DE","en_AU","en_CA","en_GB","en_US","es_AR","es_ES","fi_FI","fr_CA","fr_FR","id_ID","it_IT","ja_JP","ko_KR","nb_NO","nl_NL","no_NO","pt_BR","ru_RU","sv_SE","th_TH","tr_TR","vi_VN","zh_CN","zh_TW"]};
     
    var SiteSettings = require('SiteSettings.Model').get();
    var website_id = SiteSettings.siteid;
    var key_mapping = {
        '2': {
            'www.suitedynamics.co': '1'
        }
    };
    var key;
    var ctx = nlapiGetContext();
    var subsidiary = ctx.getSubsidiary();
    var location = ctx.getLocation();
    var subsidiary_key = current_domain + '-' + subsidiary;
    var location_key = subsidiary_key + '-' + location;
    if(website_id === 2 && key_mapping[website_id]){
        var mapping = key_mapping[website_id];
        if(mapping[location_key]){
            key = mapping[location_key];
        }
        else if(mapping[subsidiary_key]){
            key = mapping[subsidiary_key];
        }
        else if(mapping[current_domain]){
            key = mapping[current_domain];
        }
        else if(mapping['activation_id']){
            key = mapping['activation_id'];
        }
    }
    if(key === '1'){
    try{
        extensions['CXExtensibility.CoreContent.1.0.5']('CXExtensibility.CoreContent.1.0.5');
        require('CXExtensibility.CoreContent.CoreContentModule');
    }
    catch(error){
        nlapiLogExecution('ERROR', 'ERROR_SSP_LIBRARIES_EXT', JSON.stringify(error));
    }
    try{
        extensions['SuiteDynamics.CustomerSwitch.1.0.0']('SuiteDynamics.CustomerSwitch.1.0.0');
        require('CustomerSwitch.Entry');
    }
    catch(error){
        nlapiLogExecution('ERROR', 'ERROR_SSP_LIBRARIES_EXT', JSON.stringify(error));
    }
    try{
        extensions['SuiteCommerce.CustomFields.1.1.4']('SuiteCommerce.CustomFields.1.1.4');
        require('SuiteCommerce.CustomFields.Main');
    }
    catch(error){
        nlapiLogExecution('ERROR', 'ERROR_SSP_LIBRARIES_EXT', JSON.stringify(error));
    }
    try{
        extensions['SuiteCommerce.MapContactInfo.1.1.5']('SuiteCommerce.MapContactInfo.1.1.5');
        require('SuiteCommerce.ContactUsForm');
    }
    catch(error){
        nlapiLogExecution('ERROR', 'ERROR_SSP_LIBRARIES_EXT', JSON.stringify(error));
    }
    try{
        extensions['SuiteDynamics.MotusPayments.1.0.0']('SuiteDynamics.MotusPayments.1.0.0');
        require('SuiteDynamics.MotusPayments.MotusPayments');
    }
    catch(error){
        nlapiLogExecution('ERROR', 'ERROR_SSP_LIBRARIES_EXT', JSON.stringify(error));
    }
    try{
        extensions['SD.MotusPDP.1.0.0']('SD.MotusPDP.1.0.0');
        require('SD.MotusPDP.MotusPDP');
    }
    catch(error){
        nlapiLogExecution('ERROR', 'ERROR_SSP_LIBRARIES_EXT', JSON.stringify(error));
    }
    }
    var include_mapping = {
        "2": {
            "1": {
                "shopping": {
                    "templates": [
                        "extensions/shopping-templates_1.js"
                    ],
                    "js": [
                        "javascript/shopping.js",
                        "extensions/shopping_1.js"
                    ],
                    "css": [
                        "extensions/shopping_1.css"
                    ],
                    "translations": {},
                    "core": {},
                    "ie": []
                },
                "myaccount": {
                    "templates": [
                        "extensions/myaccount-templates_1.js"
                    ],
                    "js": [
                        "javascript/myaccount.js",
                        "extensions/myaccount_1.js"
                    ],
                    "css": [
                        "extensions/myaccount_1.css"
                    ],
                    "translations": {},
                    "core": {},
                    "ie": []
                },
                "checkout": {
                    "templates": [
                        "extensions/checkout-templates_1.js"
                    ],
                    "js": [
                        "javascript/checkout.js",
                        "extensions/checkout_1.js"
                    ],
                    "css": [
                        "extensions/checkout_1.css"
                    ],
                    "translations": {},
                    "core": {},
                    "ie": []
                }
            }
        }
    };
    var theme_assets_paths = {
        "1": "extensions/SuiteDynamics/SuiteDynamics_Custom_Theme/1.2.0/"
    };
    var Application = require('Application');
    var app_includes;
    var isExtended = false;
    var themeAssetsPath = '';
    if(include_mapping[website_id] && include_mapping[website_id][key]){
        app_includes = include_mapping[website_id][key];
      isExtended = true;
      themeAssetsPath = theme_assets_paths[key];
    }
    else{
        app_includes = {
        "shopping": {
            "templates": [
                "shopping-templates.js"
            ],
            "js": [
                "javascript/shopping.js"
            ],
            "css": [
                "css/shopping.css"
            ],
            "core": {},
            "ie": []
        },
        "myaccount": {
            "templates": [
                "myaccount-templates.js"
            ],
            "js": [
                "javascript/myaccount.js"
            ],
            "css": [
                "css/myaccount.css"
            ],
            "core": {},
            "ie": []
        },
        "checkout": {
            "templates": [
                "checkout-templates.js"
            ],
            "js": [
                "javascript/checkout.js"
            ],
            "css": [
                "css/checkout.css"
            ],
            "core": {},
            "ie": []
        }
    };
        _.each(app_includes, function(app){
            app.templates = _.map(app.templates, function(file){
                return Application.getNonManageResourcesPathPrefix() + file;
            });
            app.css = _.map(app.css, function(file){
                return Application.getNonManageResourcesPathPrefix() + file;
            });
            if(Configuration.get().unmanagedResourcesFolderName)
            {
                app.js.unshift('backward-compatibility-amd-unclean.js');
            }
        });
    }
    _.each(app_includes, function(app, app_name){
        app.js = app.templates.concat(app.js);
        app.core.translations = coreLanguages[app_name];
    });
    var embEndpointUrl = {
        url: 'https://7050356.app.netsuite.com' + nlapiResolveURL('SUITELET', 'customscript_ext_mech_emb_endpoints', 'customdeploy_ext_mech_emb_endpoints') + '&callback=?'
    ,	method: 'GET'
    ,	dataType: 'jsonp'
    ,	data: {
            domain: current_domain
            }
    };
    }catch(error){ nlapiLogExecution('ERROR', 'ERROR_SSP_LIBRARIES_EXT', JSON.stringify(error)); }
    