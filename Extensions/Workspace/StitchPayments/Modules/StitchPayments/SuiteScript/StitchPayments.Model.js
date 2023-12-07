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