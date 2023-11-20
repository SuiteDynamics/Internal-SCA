// Model.js
// -----------------------
// @module StitchPayments.Model
define("SD.StitchPayments.Model",  [
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
    // @class StitchPayments.Model @extends SC.Model
    return SCModel.extend({
    
		name: 'StitchPayments.Model',
		
		processOrder: function(data){
			
			var returnString = {};
			try{
				ModelsInit.order.setShippingAddress(data.shipaddress);
				ModelsInit.order.setBillingAddress(data.billaddress);
				
				if(data.purchaseNumber){
					ModelsInit.order.setPurchaseNumber(data.purchaseNumber);
				}
				
				
				
				LiveOrderModel.checkItemsAvailability();
				
				data.options = _.extend(data.options,{
					'custbody_sd_stitch_order_uuid': data.order_uuid,
					'custbody_sd_stitch_order_status': data.status,
					'custbody_sd_stitch_checkout_summary': JSON.stringify(data.order_summary)
				});
				
				LiveOrderModel.setTransactionBodyField(data); //set options as custom body fields.
				
				ModelsInit.order.setPayment({
					paymentterms: '',
					paymentmethod: data.payment_method
				});
				
				LiveOrderModel.setTermsAndConditions({'agreetermcondition': 'T'});
				
				returnString.confirmation = LiveOrderModel.submit();
				
			}
			catch(e){
				var errorCode = (e && e.code);
				
				if(errorCode == 'YOUR_ORDER_HAS_BEEN_SUBMITTED_PLEASE_WAIT_WHILE_YOUR_REQUEST_IS_BEING_PROCESSED'){
					
					//Sometimes these are the error codes received even after creation of sales order, so we treat them as sale order created.
		
					returnString.orderCreated = true;
				}
				else{
					
					var errData = {
						err: e.toString(),
						data: data,
						user: nlapiGetUser()
					};
					
					console.error('Failed to Create SO for ',JSON.stringify(errData));
				}
				returnString.error = {
					code: e.code,
					details: e.details
				};
			}
			return returnString;
		},
		getStitchKeys: function()
		{
			var filters = ['isinactive', 'is', 'F'];

			var columns = [
				new nlobjSearchColumn('custrecord_sd_stitch_api_url'),
				new nlobjSearchColumn('custrecord_sd_stitch_public_key'),
				new nlobjSearchColumn('custrecord_sd_stitch_api_mode'),
				new nlobjSearchColumn('custrecord_sd_stitch_api_version'),
				new nlobjSearchColumn('custrecord_sd_stitch_payment_method'),
				new nlobjSearchColumn('custrecord_sd_stitch_logo_url')
			];

			var search_results = Application.getAllSearchResults('customrecord_sd_stitch_credentials', filters, columns);
			
			var stitch_creds = {};
			
			if(search_results && search_results.length){
				
				stitch_creds.api_url = search_results[0].getValue('custrecord_sd_stitch_api_url');
				stitch_creds.public_key = search_results[0].getValue('custrecord_sd_stitch_public_key');
				stitch_creds.api_mode = search_results[0].getValue('custrecord_sd_stitch_api_mode');
				stitch_creds.api_version = search_results[0].getValue('custrecord_sd_stitch_api_version');
				stitch_creds.payment_method = search_results[0].getValue('custrecord_sd_stitch_payment_method');
				stitch_creds.logo_url = search_results[0].getValue('custrecord_sd_stitch_logo_url');
			}
			return stitch_creds;
		}

	});
});