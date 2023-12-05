
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
Configuration.overwriteByDomain({"www.suitedynamics.co":{"StitchPayments":{"config":"Default config example"},"blog":{"blogHomeTitle":"Blog","readMoreLabel":"Read More","allArticlesTaxonomyName":"All Articles","showFeaturedArticlesInPagination":true,"moreArticlesLabel":"More Articles","searchLabel":"Search This Blog","searchHint":"Search","searchResultsLabel":"Search Results","noSearchResultsLabel":"Not many results for [[term]]","noResultsArticleSuggestionMessage":"Search again or see these articles:","searchCloseButtonLabel":"Close","taxonomyNavigationTitle":"Categories","paginationLabel":"Read More Articles","backToTopLabel":"Back To Top","largeImageResizeId":"zoom","thumbnailImageResizeId":"zoom","articlesByPage":"20","emptyStateLabel":"Articles are coming soon!","emptyStateMessage":"Meanwhile, visit our shop","emptyStateButtonLabel":"Shop Now","showLatestPostsSection":true,"latestPostsLabel":"Latest Articles","latestPostsCarouselInterval":"5 sec","showRssFeedLink":false},"contactUsForm":{"subsidiary":"","defaultName":"No Name","defaultLastname":"No Last Name","defaultCompany":"No Company","defaultSubject":"No Subject"}}});
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
define("SuiteDynamics.StitchPayments.StitchPayments.ServiceController", ["ServiceController","LiveOrder.Model","underscore"], function(
  ServiceController,
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
// SuiteDynamics.StitchPayments.StitchPayments.js
// Load all your starter dependencies in backend for your extension here
// ----------------
define('SuiteDynamics.StitchPayments.StitchPayments'
,	[
		// 'SuiteDynamics.StitchPayments.StitchPayments.ServiceController',
		'LiveOrder.Model',
		'SC.Models.Init',
        'Transaction.Model',
		'Utils',
		'underscore'
	]
,	function (
		// StitchPaymentsServiceController,
		LiveOrderModel,
		ModelsInit,
        TransactionModel,
		Utils,
		_
	)
{
    // _.extend(TransactionModel, {
	// 	getRecordPaymentMethod: function (order_fields) {

    //         nlapiLogExecution('DEBUG', 'Transaction Model', 'Get Payment Method');

	// 	}
	// });
    // _.extend(LiveOrderModel, {
	// 	submit: function (order_fields) {
    //         ModelsInit.order.setPayment({
    //             paymentterms: '',
    //             paymentmethod: 8
    //         });
	// 	}
	// });

	nlapiLogExecution('DEBUG', 'start backend module', 'start backend module');


    // LiveOrderModel.setPaymentMethods = function(data){
    //     nlapiLogExecution('DEBUG', 'set payment methods', 'set payment methods');
    //     try{
    //         ModelsInit.order.removePayment();
    //         ModelsInit.order.setPayment({
    //             paymentterms: 'Stitch',
    //             paymentmethod: 8
    //         });
    //     }catch(e){
    //         nlapiLogExecution('DEBUG', 'e', e);
    //     }

    // }

    //START
	// _.extend(LiveOrderModel, {
	// 	setPaymentMethods: function (data) {
    //         // Because of an api issue regarding Gift Certificates, we are going to handle them separately
    //         nlapiLogExecution('DEBUG', 'set payment methods', 'set payment methods');
    //         var gift_certificate_methods = _.where(data.paymentmethods, {
    //             type: 'giftcertificate'
    //         });
    //         const non_certificate_methods = _.difference(
    //             data.paymentmethods,
    //             gift_certificate_methods
    //         );


    //         //stitch

    //         // try{
    //         // // data.options = _.extend(data.options,{
    //         // //     'customform': 88
    //         // // });
            
    //         // // LiveOrderModel.setTransactionBodyField(data); //set options as custom body fields.
    //         // ModelsInit.order.removePayment();
    //         // ModelsInit.order.setPayment({
    //         //     paymentterms: 'Stitch',
    //         //     paymentmethod: 'Stitch'
    //         // });
    //         // }catch(e){
    //         //     nlapiLogExecution('DEBUG', 'e', e);
    //         // }
      
	// 		// stitch
	// 		// paymentmethods.push({
	// 		// 	type: 'stitch',
	// 		// 	primary: true,
	// 		// 	internalid: 8
	// 		// });
    //         //Payment Methods non gift certificate
    //         if (
    //             this.isSecure &&
    //             non_certificate_methods &&
    //             non_certificate_methods.length &&
    //             ModelsInit.session.isLoggedIn2()
    //         ) {
    //             _.each(non_certificate_methods, function (paymentmethod) {
    //                 if (paymentmethod.type === 'creditcard' && paymentmethod.creditcard) {
    //                     const credit_card = paymentmethod.creditcard;
    //                     const require_cc_security_code =
    //                         ModelsInit.session.getSiteSettings(['checkout']).checkout
    //                         .requireccsecuritycode === 'T';
    //                     const cc_obj = credit_card && {
    //                         ccnumber: credit_card.ccnumber,
    //                         ccname: credit_card.ccname,
    //                         ccexpiredate: credit_card.ccexpiredate,
    //                         expmonth: credit_card.expmonth,
    //                         expyear: credit_card.expyear,
    //                         paymentmethod: {
    //                             internalid:
    //                                 credit_card.paymentmethod.internalid ||
    //                                 credit_card.paymentmethod,
    //                             name: credit_card.paymentmethod.name,
    //                             creditcard: credit_card.paymentmethod.creditcard ? 'T' : 'F',
    //                             ispaypal: credit_card.paymentmethod.ispaypal ? 'T' : 'F',
    //                             key: credit_card.paymentmethod.key
    //                         }
    //                     };

    //                     if (credit_card.internalid !== '-temporal-') {
    //                         cc_obj.internalid = credit_card.internalid;
    //                     } else {
    //                         cc_obj.internalid = null;
    //                         cc_obj.savecard = 'F';
    //                     }

    //                     if (credit_card.ccsecuritycode) {
    //                         cc_obj.ccsecuritycode = credit_card.ccsecuritycode;
    //                     }

    //                     if (
    //                         !require_cc_security_code ||
    //                         (require_cc_security_code && credit_card.ccsecuritycode)
    //                     ) {
    //                         // the user's default credit card may be expired so we detect this using try & catch and if it is we remove the payment methods.
    //                         try {
    //                             // if the credit card is not temporal or it is temporal and the number is complete then set payment method.
    //                             if (
    //                                 cc_obj.internalid ||
    //                                 (!cc_obj.internalid && !~cc_obj.ccnumber.indexOf('*'))
    //                             ) {
    //                                 ModelsInit.order.removePayment();

    //                                 const cc_parameter = {
    //                                     paymentterms: 'CreditCard',
    //                                     creditcard: {
    //                                         internalid: cc_obj.internalid,
    //                                         ccsecuritycode: cc_obj.ccsecuritycode,
    //                                         paymentmethod: {
    //                                             internalid: cc_obj.paymentmethod.internalid
    //                                         }
    //                                     }
    //                                 };
    //                                 if (!cc_obj.internalid) {
    //                                     cc_parameter.creditcard.ccnumber = cc_obj.ccnumber;
    //                                     cc_parameter.creditcard.ccname = cc_obj.ccname;
    //                                     cc_parameter.creditcard.expmonth = cc_obj.expmonth;
    //                                     cc_parameter.creditcard.expyear = cc_obj.expyear;
    //                                     cc_parameter.creditcard.savecard = cc_obj.savecard;
    //                                 }
    //                                 ModelsInit.order.setPayment(cc_parameter);

    //                                 ModelsInit.context.setSessionObject('paypal_complete', 'F');
    //                             }
    //                         } catch (e) {
    //                             if (e && e.code && e.code === 'ERR_WS_INVALID_PAYMENT') {
    //                                 ModelsInit.order.removePayment();
    //                             }
    //                             throw e;
    //                         }
    //                     }
    //                     // if the the given credit card don't have a security code and it is required we just remove it from the order
    //                     else if (require_cc_security_code && !credit_card.ccsecuritycode) {
    //                         ModelsInit.order.removePayment();
    //                     }
    //                 } else if (paymentmethod.type === 'invoice') {
    //                     ModelsInit.order.removePayment();

    //                     try {
    //                         ModelsInit.order.setPayment({
    //                             paymentterms: 'Invoice'
    //                         });
    //                     } catch (e) {
    //                         if (e && e.code && e.code === 'ERR_WS_INVALID_PAYMENT') {
    //                             ModelsInit.order.removePayment();
    //                         }
    //                         throw e;
    //                     }

    //                     ModelsInit.context.setSessionObject('paypal_complete', 'F');
    //                 } else if (paymentmethod.type === 'paypal') {
    //                     if (ModelsInit.context.getSessionObject('paypal_complete') !== 'T') {
    //                         ModelsInit.order.removePayment();
    //                         const paypal = _.findWhere(ModelsInit.session.getPaymentMethods(), {
    //                             ispaypal: 'T'
    //                         });
    //                         paypal &&
    //                             ModelsInit.order.setPayment({
    //                                 paymentterms: '',
    //                                 paymentmethod: paypal.key
    //                             });
    //                     }
    //                 } else if (
    //                     paymentmethod.type &&
    //                     ~paymentmethod.type.indexOf('external_checkout')
    //                 ) {

    //                     nlapiLogExecution('DEBUG', 'EXTERNAL', 'EXTERNAL');
    //                     ModelsInit.order.removePayment();
    //                     nlapiLogExecution('DEBUG', 'EXTERNAL KEY', paymentmethod.key);
    //                     var payment = ModelsInit.order.setPayment({
    //                         paymentmethod: paymentmethod.key,
    //                         thankyouurl: paymentmethod.thankyouurl,
    //                         errorurl: paymentmethod.errorurl,
    //                         merchantid: paymentmethod.merchantid
    //                     })
    //                     nlapiLogExecution('DEBUG', 'EXTERNAL payment', payment);

    //                 } else {
    //                     ModelsInit.order.removePayment();
    //                 }
    //             });
    //         } else if (this.isSecure && ModelsInit.session.isLoggedIn2()) {
    //             ModelsInit.order.removePayment();
    //         }

    //         gift_certificate_methods = _.map(gift_certificate_methods, function (gift_certificate) {
    //             return gift_certificate.giftcertificate;
    //         });

    //         this.setGiftCertificates(gift_certificate_methods);
	// 	}
	// });
    //END
	
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
	extensions['SuiteCommerce.MapContactInfo.1.1.5']('SuiteCommerce.MapContactInfo.1.1.5');
	require('SuiteCommerce.ContactUsForm');
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
