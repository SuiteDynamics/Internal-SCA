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
    Configuration.overwriteByDomain({"www.suitedynamics.co":{"MyCoolModule":{"config":"Default config example"},"MotusPayments":{"config":"Default config example"},"blog":{"blogHomeTitle":"Blog","readMoreLabel":"Read More","allArticlesTaxonomyName":"All Articles","showFeaturedArticlesInPagination":true,"moreArticlesLabel":"More Articles","searchLabel":"Search This Blog","searchHint":"Search","searchResultsLabel":"Search Results","noSearchResultsLabel":"Not many results for [[term]]","noResultsArticleSuggestionMessage":"Search again or see these articles:","searchCloseButtonLabel":"Close","taxonomyNavigationTitle":"Categories","paginationLabel":"Read More Articles","backToTopLabel":"Back To Top","largeImageResizeId":"zoom","thumbnailImageResizeId":"zoom","articlesByPage":"20","emptyStateLabel":"Articles are coming soon!","emptyStateMessage":"Meanwhile, visit our shop","emptyStateButtonLabel":"Shop Now","showLatestPostsSection":true,"latestPostsLabel":"Latest Articles","latestPostsCarouselInterval":"5 sec","showRssFeedLink":false}}});
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
    extensions['SD.LodgeReservationDemo.1.0.0'] = function(extensionName){
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
    define("SD.LodgeReservationDemo.MyCoolModule.ServiceController", ["ServiceController"], function(
      ServiceController
    ) {
      "use strict";
      return ServiceController.extend({
        name: "SD.LodgeReservationDemo.MyCoolModule.ServiceController",
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
    // SD.LodgeReservationDemo.MyCoolModule.js
    // Load all your starter dependencies in backend for your extension here
    // ----------------
    define('SD.LodgeReservationDemo.MyCoolModule'
    ,	[
            'SD.LodgeReservationDemo.MyCoolModule.ServiceController'
        ]
    ,	function (
            MyCoolModuleServiceController
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
                                            var response = nlapiRequestURL(urlBase + 'oauth/token', JSON.stringify(requestBody), headerObj, 'POST')
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
                                            "billing_address": data.data.billingAddrObj
                                        }
                                        nlapiLogExecution('DEBUG', 'motusPaymentsApiUrl', motusPaymentsApiUrl);
                                        nlapiLogExecution('DEBUG', 'Auth Header', JSON.stringify(headerObjKeyed));
                                        nlapiLogExecution('DEBUG', 'requestBodyKeyed', JSON.stringify(requestBodyKeyed));
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
        extensions['SD.LodgeReservationDemo.1.0.0']('SD.LodgeReservationDemo.1.0.0');
        require('SD.LodgeReservationDemo.MyCoolModule');
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
        "1": "extensions/SuiteDynamics/SuiteDynamics_Custom_Theme/0.1.0/"
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
    