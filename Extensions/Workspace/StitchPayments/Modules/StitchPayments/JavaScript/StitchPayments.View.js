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
		})

		,	setTransactionFields: function(response, activeCard)
		{
			let transactionBodyFields = {
				'custbody_sd_select_st_card': activeCard.get('id'),
				'custbody_sd_stitch_token_response': JSON.stringify(response)
			}
			this.model.set('options', transactionBodyFields);
		}

		,	retrieveAuth()	{

			var self = this

			var promise = jQuery.Deferred();

			if(this.wizard.stitchActive !== true)
			{
	
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

			if(activeCard){
				activeCard.save({internalid: activeCard.get('id'), data: {submit: true}}).always(function(response){

					// A = Cardpointe authorization sucess, all other codes represent non-success
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
