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

	LiveOrderModel.prototype.getPaymentMethods = _.wrap(LiveOrderModel.prototype.getPaymentMethods, function (fn) {

		var context = fn.apply(this, _.toArray(arguments).slice(1));
		nlapiLogExecution('DEBUG', 'live order context', context);
		
		return context;
	});

    return SCModel.extend({
    
		name: 'StitchPayments.Model',
		
		processOrder: function(data){

			nlapiLogExecution('DEBUG', 'start', data);
			
			var returnString = {};
			try{
				ModelsInit.order.setShippingAddress(data.shipaddress);
				ModelsInit.order.setBillingAddress(data.billaddress);
				
				if(data.purchaseNumber){
					ModelsInit.order.setPurchaseNumber(data.purchaseNumber);
				}
				
				
				
				LiveOrderModel.checkItemsAvailability();
				
				data.options = _.extend(data.options,{
					
					//TODO: Make Dynamic
					'custbody_sd_reference_pay_id': "1234",
					'custbody_sd_stitch_token_response': "1234"
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
				new nlobjSearchColumn('custrecord_stitch_cred_base_url'),
				new nlobjSearchColumn('custrecord_stitch_cred_pub_key'),
				new nlobjSearchColumn('custrecord_stitch_environment'),

				//TODO: This brings back error. Fix and link to frontend
				// new nlobjSearchColumn('custrecord_stitch_payment_method')
			];

			var search_results = Application.getAllSearchResults('customrecord_stitch_credentials', filters, columns);
			
			var stitch_creds = {};
			
			if(search_results && search_results.length){
				
				stitch_creds.api_url = search_results[0].getValue('custrecord_stitch_cred_base_url');
				stitch_creds.public_key = search_results[0].getValue('custrecord_stitch_cred_pub_key');
				stitch_creds.api_mode = search_results[0].getValue('custrecord_stitch_environment');
				// stitch_creds.payment_method = search_results[0].getValue('custrecord_stitch_payment_method');
			}
			return stitch_creds;
		}

	});
});
