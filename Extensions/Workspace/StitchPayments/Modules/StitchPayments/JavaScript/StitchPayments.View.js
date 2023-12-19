// @module SuiteDynamics.StitchPayments.StitchPayments
define('SuiteDynamics.StitchPayments.StitchPayments.View'
,	[
	'suitedynamics_stitchpayments_stitchpayments.tpl'
	
	,	'Wizard.Module'
	,	'Backbone'
	,   'jQuery',
    ]
, function (
	suitedynamics_stitchpayments_stitchpayments_tpl
	
	,   WizardModule
	,	Backbone
	,   jQuery
)
{
    'use strict';

	// @class SuiteDynamics.StitchPayments.StitchPayments.View @extends Backbone.View
	return WizardModule.extend({

		    template: suitedynamics_stitchpayments_stitchpayments_tpl

		,	errors: ['ERR_STITCH_AUTH','ERR_NO_CARD_PRESENT']

		,	initialize: _.wrap(WizardModule.prototype.initialize, function(fn){
				fn.apply(this, _.toArray(arguments).slice(1));
				console.log('stitch payments view', this)

				// this.render()
				//this.template = suitedynamics_stitchpayments_tpl
			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new StitchPaymentsModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		})

		,	setTransactionFields: function(response, activeCard)
		{
			console.log('set transaction options', this)
			let transactionBodyFields = {
				'custbody_sd_select_st_card': activeCard.get('id'),
				'custbody_sd_stitch_token_response': JSON.stringify(response)
			}
			this.model.set('options', transactionBodyFields);
		}

		,	retrieveAuth()	{

			var self = this

			console.log('retrieveAuth', this)

			var promise = jQuery.Deferred();

			if(this.wizard.stitchActive !== true)
			{
				// remove reject and promise
				console.log(this.model.get('paymentmethods').length)
				
				//Another payment method is selected, so coninute with order submit
				if(this.model.get('paymentmethods').length > 0){
					promise.resolve()
				}else{
					promise.reject({errorCode: 'ERR_SELECT_PAYMENT', errorMessage: 'Please select a Payment Method'});	
				}
				return promise;
			}
			
			var stitchCollection = this.options.stitchPayments.stitchCollection;

			//get the card selected from the id stored in the wizard
			var activeCard = stitchCollection.where({'id': this.wizard.stitchSelected})[0]

			console.log('active card', activeCard)

			if(activeCard){
				activeCard.save({internalid: activeCard.get('id'), data: {submit: true}}).always(function(response){
					
					console.log('result',response)

					// A = Cardpointe authorization sucess, all other codes represent failure
					if(response.response.respstat == "A"){
						self.setTransactionFields(response.response,activeCard)
						promise.resolve();
					}else{
						promise.reject({errorCode: 'ERR_STITCH_AUTH', errorMessage: 'Card Authorization failure. Please select a different card.'});
					}
				})

			}else{
				promise.reject({errorCode: 'ERR_NO_CARD_PRESENT', errorMessage: 'Please select a Stitch payment card'});
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

		//@method getContext @return SuiteDynamics.StitchPayments.StitchPayments.View.Context
	,	getContext: function getContext()
		{
			console.log('getcontext', this)
			//@class SuiteDynamics.StitchPayments.StitchPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				isReview: true,
				message: this.message
			};
		}
	});
});
