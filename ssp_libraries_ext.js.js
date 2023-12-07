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
    Configuration.overwriteByDomain({"www.suitedynamics.co":{"StitchPayments":{"config":"Default config example"},"blog":{"blogHomeTitle":"Blog","readMoreLabel":"Read More","allArticlesTaxonomyName":"All Articles","showFeaturedArticlesInPagination":true,"moreArticlesLabel":"More Articles","searchLabel":"Search This Blog","searchHint":"Search","searchResultsLabel":"Search Results","noSearchResultsLabel":"Not many results for [[term]]","noResultsArticleSuggestionMessage":"Search again or see these articles:","searchCloseButtonLabel":"Close","taxonomyNavigationTitle":"Categories","paginationLabel":"Read More Articles","backToTopLabel":"Back To Top","largeImageResizeId":"zoom","thumbnailImageResizeId":"zoom","articlesByPage":"20","emptyStateLabel":"Articles are coming soon!","emptyStateMessage":"Meanwhile, visit our shop","emptyStateButtonLabel":"Shop Now","showLatestPostsSection":true,"latestPostsLabel":"Latest Articles","latestPostsCarouselInterval":"5 sec","showRssFeedLink":false}}});
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
    extensions['SuiteDynamics.StitchPayments.1.0.0'] = function(extensionName){
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
                    new nlobjSearchColumn('internalid')
                ];
                var search_results = Application.getAllSearchResults('customrecord_stitch_cc_token', filters, columns);
                nlapiLogExecution('DEBUG', 'search_results', search_results);
                var stitchCardsArr = [];

                if(search_results && search_results.length){

                search_results.forEach(function (card) {
                    var stitch_card = {};
                    nlapiLogExecution('DEBUG', 'card', card);
                    stitch_card.last_four = card.getValue('custrecord_sd_stitch_cc_last_4');
                    stitch_card.card_type = card.getValue('custrecord_stitch_cc_token_card_type');
                    stitch_card.card_name = card.getValue('custrecord_stitch_cc_token_card_name');
                    stitch_card.default_card = card.getValue('custrecord_sd_stitch_is_default_card');
                    stitch_card.exp_month = card.getValue('custrecord_stitch_cc_token_exp_month');
                    stitch_card.exp_year = card.getValue('custrecord_stitch_cc_token_exp_year');
                    stitch_card.id = card.getValue('internalid');
            
                    stitchCardsArr.push(stitch_card)

                })
                }
                return JSON.stringify(stitchCardsArr);
            },
            submitToken: function(data){


                nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));

                this.submitCustomerProfile(data, nlapiGetUser())

                return {'Test': 'test'};
            },
            updateTokens: function(data){
                nlapiLogExecution('DEBUG', 'update', 'update');
                return {'Test': 'test'};
            },

            submitCustomerProfile: function(data, user){


                nlapiLogExecution('DEBUG', 'submit', JSON.stringify(data));

                var custInfo = nlapiLookupField('customer', user, ['name','phone']);


                nlapiLogExecution('DEBUG', 'customer result', custInfo);



                // "region"	: "",
                // "phone"		: customerDetails.phone,
                // "accttype"	: fieldLookUp.custrecord_stitch_cc_token_card_type,
                // "postal"	: customerDetails.zipcode,
                // "expiry"	: expiryString,
                // "city"		: customerDetails.city,
                // "country"	: customerDetails.countrycode,
                // "address"	: customerDetails.address,
                // "merchid"	: credentials_object.merchantid,
                // "name"		: customerDetails.name,
                // "account"	: tokenNum

                return {'Test': 'test'};
            }
        });

        
    });
    define("SuiteDynamics.StitchPayments.StitchPayments.ServiceController", ["ServiceController", "StitchPayments.Model", "LiveOrder.Model","underscore"], function(
      ServiceController,
      StitchPaymentsModel,
      LiveOrderModel,
      _
    ) {
      "use strict";
      return ServiceController.extend({
        name: "SuiteDynamics.StitchPayments.StitchPayments.ServiceController",
        // The values in this object are the validation needed for the current service.
        options: {
          common: {}
        },
        get: function get() {
            nlapiLogExecution('DEBUG', 'get', 'get');
          return StitchPaymentsModel.getTokens();
        },
        post: function post() {
            nlapiLogExecution('DEBUG', 'post', 'post');
            return StitchPaymentsModel.submitToken(this.data);
          // not implemented
        },
        put: function put() {
            nlapiLogExecution('DEBUG', 'put', 'put');
          // not implemented
        },
        delete: function() {
            nlapiLogExecution('DEBUG', 'delete', 'delete');
          // not implemented
        }
      });
    });
    // SuiteDynamics.StitchPayments.StitchPayments.js
    // Load all your starter dependencies in backend for your extension here
    // ----------------
    define('SuiteDynamics.StitchPayments.StitchPayments'
    ,	[
            // 'SuiteDynamics.StitchPayments.StitchPayments.ServiceController',
            'LiveOrder.Model',
            'underscore'
        ]
    ,	function (
            // StitchPaymentsServiceController,
            LiveOrderModel,
            _
        )
    {
        'use strict';
        nlapiLogExecution('DEBUG', 'start backend module', 'start backend module');
        // _.extend(LiveOrderModel, {
        // 	getPaymentMethods: function (fn) {
        //         const paymentmethods = [];
        //         const giftcertificates = ModelsInit.order.getAppliedGiftCertificates();
        //         const payment = order_fields && order_fields.payment;
        //         const paypal =
        //             payment &&
        //             _.findWhere(ModelsInit.session.getPaymentMethods(), {
        //                 ispaypal: 'T'
        //             });
        //         const credit_card = payment && payment.creditcard;
        //         if (
        //             credit_card &&
        //             credit_card.paymentmethod &&
        //             credit_card.paymentmethod.creditcard === 'T'
        //         ) {
        //             // Main
        //             paymentmethods.push({
        //                 type: 'creditcard',
        //                 primary: true,
        //                 creditcard: {
        //                     internalid: credit_card.internalid || '-temporal-',
        //                     ccnumber: credit_card.ccnumber,
        //                     ccname: credit_card.ccname,
        //                     ccexpiredate: `${credit_card.expmonth}/${credit_card.expyear}`,
        //                     ccsecuritycode: credit_card.ccsecuritycode,
        //                     expmonth: credit_card.expmonth,
        //                     expyear: credit_card.expyear,
        //                     paymentmethod: {
        //                         internalid: credit_card.paymentmethod.internalid,
        //                         name: credit_card.paymentmethod.name,
        //                         creditcard: credit_card.paymentmethod.creditcard === 'T',
        //                         ispaypal: credit_card.paymentmethod.ispaypal === 'T',
        //                         isexternal: credit_card.paymentmethod.isexternal === 'T',
        //                         key: credit_card.paymentmethod.key,
        //                         iscardholderauthenticationsupported:
        //                             credit_card.paymentmethod.iscardholderauthenticationsupported
        //                     }
        //                 }
        //             });
        //         } else if (paypal && payment.paymentmethod === paypal.internalid) {
        //             paymentmethods.push({
        //                 type: 'paypal',
        //                 primary: true,
        //                 complete: ModelsInit.context.getSessionObject('paypal_complete') === 'T',
        //                 internalid: paypal.internalid,
        //                 name: paypal.name,
        //                 creditcard: paypal.creditcard === 'T',
        //                 ispaypal: paypal.ispaypal === 'T',
        //                 isexternal: paypal.isexternal === 'T',
        //                 key: paypal.key
        //             });
        //         } else if (
        //             credit_card &&
        //             credit_card.paymentmethod &&
        //             credit_card.paymentmethod.isexternal === 'T'
        //         ) {
        //             paymentmethods.push({
        //                 type: `external_checkout_${credit_card.paymentmethod.key}`,
        //                 primary: true,
        //                 internalid: credit_card.paymentmethod.internalid,
        //                 name: credit_card.paymentmethod.name,
        //                 creditcard: credit_card.paymentmethod.creditcard === 'T',
        //                 ispaypal: credit_card.paymentmethod.ispaypal === 'T',
        //                 isexternal: credit_card.paymentmethod.isexternal === 'T',
        //                 key: credit_card.paymentmethod.key,
        //                 errorurl: payment.errorurl,
        //                 thankyouurl: payment.thankyouurl
        //             });
        //         } else if (order_fields.payment && order_fields.payment.paymentterms === 'Invoice') {
        //             const customer_invoice = ModelsInit.customer.getFieldValues([
        //                 'paymentterms',
        //                 'creditlimit',
        //                 'balance',
        //                 'creditholdoverride'
        //             ]);
        //             paymentmethods.push({
        //                 type: 'invoice',
        //                 primary: true,
        //                 paymentterms: customer_invoice.paymentterms,
        //                 creditlimit: parseFloat(customer_invoice.creditlimit || 0),
        //                 creditlimit_formatted: Utils.formatCurrency(customer_invoice.creditlimit),
        //                 balance: parseFloat(customer_invoice.balance || 0),
        //                 balance_formatted: Utils.formatCurrency(customer_invoice.balance),
        //                 creditholdoverride: customer_invoice.creditholdoverride
        //             });
        //         }
        //         if (giftcertificates && giftcertificates.length) {
        //             _.forEach(giftcertificates, function (giftcertificate) {
        //                 paymentmethods.push({
        //                     type: 'giftcertificate',
        //                     giftcertificate: {
        //                         code: giftcertificate.giftcertcode,
        //                         amountapplied: Utils.toCurrency(giftcertificate.amountapplied || 0),
        //                         amountapplied_formatted: Utils.formatCurrency(
        //                             giftcertificate.amountapplied || 0
        //                         ),
        //                         amountremaining: Utils.toCurrency(giftcertificate.amountremaining || 0),
        //                         amountremaining_formatted: Utils.formatCurrency(
        //                             giftcertificate.amountremaining || 0
        //                         ),
        //                         originalamount: Utils.toCurrency(giftcertificate.originalamount || 0),
        //                         originalamount_formatted: Utils.formatCurrency(
        //                             giftcertificate.originalamount || 0
        //                         )
        //                     }
        //                 });
        //             });
        //         }
        //         return paymentmethods;
        // 	}
        // });
        
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
        extensions['SuiteDynamics.StitchPayments.1.0.0']('SuiteDynamics.StitchPayments.1.0.0');
        require('SuiteDynamics.StitchPayments.StitchPayments');
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
    