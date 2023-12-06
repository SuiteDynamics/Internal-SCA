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
			// var filters = ['isinactive', 'is', 'F'];

			// var columns = [
			// 	new nlobjSearchColumn('custrecord_ag_sezzle_api_url'),
			// 	new nlobjSearchColumn('custrecord_ag_sezzle_public_key'),
			// 	new nlobjSearchColumn('custrecord_ag_sezzle_api_mode'),
			// 	new nlobjSearchColumn('custrecord_ag_sezzle_api_version'),
			// 	new nlobjSearchColumn('custrecord_ag_sezzle_payment_method'),
			// 	new nlobjSearchColumn('custrecord_ag_sezzle_logo_url')
			// ];

			// var search_results = Application.getAllSearchResults('customrecord_ag_sezzle_credentials', filters, columns);
			
			// var sezzle_creds = {};
			
			// if(search_results && search_results.length){
				
			// 	sezzle_creds.api_url = search_results[0].getValue('custrecord_ag_sezzle_api_url');
			// 	sezzle_creds.public_key = search_results[0].getValue('custrecord_ag_sezzle_public_key');
			// 	sezzle_creds.api_mode = search_results[0].getValue('custrecord_ag_sezzle_api_mode');
			// 	sezzle_creds.api_version = search_results[0].getValue('custrecord_ag_sezzle_api_version');
			// 	sezzle_creds.payment_method = search_results[0].getValue('custrecord_ag_sezzle_payment_method');
			// 	sezzle_creds.logo_url = search_results[0].getValue('custrecord_ag_sezzle_logo_url');
			// }
			return {'test':'test'};
		},
		updateTokens: function(data){
			
			return {'Test': 'test'};
		}

	});
});