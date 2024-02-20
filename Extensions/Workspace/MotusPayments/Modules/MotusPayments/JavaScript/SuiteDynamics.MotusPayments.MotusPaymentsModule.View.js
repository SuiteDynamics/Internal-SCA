// @module SuiteDynamics.MotusPayments.MotusPayments
define('SuiteDynamics.MotusPayments.MotusPaymentsModule.View'
,	[
	'suitedynamics_motuspayments_motuspayments.tpl'
	
	,	'Wizard.Module'
	,	'Backbone'
	,   'jQuery',
    ]
, function (
	suitedynamics_motuspayments_motuspayments_tpl
	
	,   WizardModule
	,	Backbone
	,   jQuery
)
{
    'use strict';

	// @class SuiteDynamics.MotusPayments.MotusPayments.View @extends Backbone.View
	return WizardModule.extend({

		    // template: suitedynamics_motuspayments_motuspayments_tpl

			errors: ['ERR_STITCH_AUTH','ERR_NO_CARD_PRESENT']

		,	initialize: _.wrap(WizardModule.prototype.initialize, function(fn){
				fn.apply(this, _.toArray(arguments).slice(1));
				// this.on('afterViewRender',function(){
				// 	$('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
				// 	$('head').append('<script src="https://api.paytrace.com/assets/e2ee/paytrace-e2ee.js"></script>');
				// 	$('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
				   console.log('add init listener')
				   jQuery(document).ready(function(){
					   console.log('view render')
					   $('head').append('<script src="https://api.paytrace.com/assets/e2ee/paytrace-e2ee.js"></script>');
					   $('head').append('<script src="https://unpkg.com/node-forge@1.0.0/dist/forge.min.js"></script>');
					   jQuery('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
					   
		
					   // console.log('setpaytrace', paytrace)
					   // paytrace.setKeyAjax("https://7050356-sb1.app.netsuite.com/core/media/media.nl?id=15579&c=7050356_SB1&h=GyGcwcnLfnS9NWCfcjBji8Ttk2kbyhmRI7WnbemgxZpU5kQE&_xt=.cer");
				   })
			//    })
		})

		,	setTransactionFields: function(response, activeCard)
		{
			console.log('set 2', activeCard )
			let transactionBodyFields = {
				'custbody_sd_select_mt_card': activeCard.get('id'),
				'custbody_sd_motus_token_response': JSON.stringify(response)
			}
			this.model.set('options', transactionBodyFields);
		}

		,	retrieveAuth()	{
			console.log('retrieve auth', this)
			var self = this

			var promise = jQuery.Deferred();

			if(this.wizard.motusActive !== true)
			{
	
				//Another payment method is selected, so coninute with order submit
				if(this.model.get('paymentmethods').length > 0){
					promise.resolve()
				}else{
					promise.reject({errorCode: 'ERR_SELECT_PAYMENT', errorMessage: 'Please select a Payment Method'});	
				}
				return promise;
			}

			//get billing address
			var billAddress = this.model.get('addresses').where({'internalid': this.model.get('billaddress')})
			var billingAddrObj = {
				"name": billAddress[0].get('fullname'),
				"street_address": billAddress[0].get('addr1'),
				"city": billAddress[0].get('city'),
				"state": billAddress[0].get('state'),
				"zip": billAddress[0].get('zip')
			}
			console.log('billingAddrObj', billingAddrObj)

			var motusCollection = this.options.motusPayments.motusCollection;

			//get the card selected from the id stored in the wizard
			var activeCard = motusCollection.where({'id': this.wizard.motusSelected})[0]
			console.log('active card', activeCard)
			if(activeCard){
				activeCard.save({internalid: activeCard.get('id'), data: {submit: true, billingAddrObj: billingAddrObj}}).always(function(response){
					console.log('response', response)
					// A = Cardpointe authorization sucess, all other codes represent failure
					if(response.response.response_code == 101){
						self.setTransactionFields(response.response,activeCard)
						promise.resolve();
					}else{
						promise.reject({errorCode: 'ERR_MOTUS _AUTH', errorMessage: 'Card Authorization failure. Please select a different card.'});
					}
				})

			}else{
				promise.reject({errorCode: 'ERR_NO_CARD_PRESENT', errorMessage: 'Please select a Motus payment card'});
			}

			return promise;
		}

		,	submit: function () {
				return this.retrieveAuth();
			}
		

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return SuiteDynamics.MotusPayments.MotusPayments.View.Context
	,	getContext: function getContext()
		{
			console.log('getcontext', this)
			//@class SuiteDynamics.MotusPayments.MotusPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				isReview: true,
				message: this.message
			};
		}
	});
});
