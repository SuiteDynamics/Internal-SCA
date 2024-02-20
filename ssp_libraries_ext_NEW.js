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
    Configuration.overwriteByDomain({"www.suitedynamics.co":{"MotusPDP":{"config":"Default config example"},"blog":{"blogHomeTitle":"Blog","readMoreLabel":"Read More","allArticlesTaxonomyName":"All Articles","showFeaturedArticlesInPagination":true,"moreArticlesLabel":"More Articles","searchLabel":"Search This Blog","searchHint":"Search","searchResultsLabel":"Search Results","noSearchResultsLabel":"Not many results for [[term]]","noResultsArticleSuggestionMessage":"Search again or see these articles:","searchCloseButtonLabel":"Close","taxonomyNavigationTitle":"Categories","paginationLabel":"Read More Articles","backToTopLabel":"Back To Top","largeImageResizeId":"zoom","thumbnailImageResizeId":"zoom","articlesByPage":"20","emptyStateLabel":"Articles are coming soon!","emptyStateMessage":"Meanwhile, visit our shop","emptyStateButtonLabel":"Shop Now","showLatestPostsSection":true,"latestPostsLabel":"Latest Articles","latestPostsCarouselInterval":"5 sec","showRssFeedLink":false}}});
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
    