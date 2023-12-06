/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// OrderWizard.Module.PaymentMethod.Invoice.js
// --------------------------------
//
define(
	'SuiteDynamics.StitchPayments.PaymentMethod.Stitch'
,	[	'OrderWizard.Module.PaymentMethod'
	,	'Transaction.Paymentmethod.Model'
	,   'Wizard.StepModule'
	,   'SuiteDynamics.StitchPayments.StitchPayments.Model'

	,	'suitedynamics_stitchpayments_paymentmethod.tpl'

	,	'Backbone'
	, 	'jQuery'
	,	'underscore'
	,   'Utils'
	]
,	function (
		OrderWizardModulePaymentMethod
	,	TransactionPaymentmethodModel
	,	WizardStepModule
	,	StitchPaymentsModel

	,	suitedynamics_stitchpayments_paymentmethod_tpl

	,	Backbone
	,   jQuery
	,	_
	,   Utils
	)
{
	'use strict';

	return OrderWizardModulePaymentMethod.extend({

		template: suitedynamics_stitchpayments_paymentmethod_tpl

	,	events: {
			'click [data-action="stitch-token-success"]': 'stitchTokenSuccess'
		}

    ,	errors: ['ERR_WS_INVALID_CARD', 'ERR_CHK_INVALID_CARD']

	,	initialize: function()
		{

			this.stitchModel = new StitchPaymentsModel();
			var self = this;
         	this.stitchModel.fetch().done(function(result) {
				console.log('model', result)
      		});

			console.log('WizardStepModule', WizardStepModule)
			OrderWizardModulePaymentMethod.prototype.initialize.apply(this, arguments);
			WizardStepModule.WizardStepModule.prototype.initialize.apply(this, arguments);
			console.log('external init', this)
			this.on('afterShowContent',function(){
				console.log(jQuery('#tokenform'))
			})

		}

	,	render: function ()
		{
			const options = this.options.model && this.options.model.get('options');
			console.log('external render', this)
			if (options) {
				_.extend(this.options, options);
			}
			if(this.options.paymentmethod.name == 'Stitch'){
				console.log('RENDER set payment method')
				this.setStitchPaymentMethod();
			}else{
				this.setPaymentMethod();
			}
			this._render();
		}


	,	submit: function ()
		{
			console.log('external submit', this)

			// if(this.options.paymentmethod.name == 'Stitch'){
			// 	console.log('SUBMIT set payment method')
			// 	this.setStitchPaymentMethod();
			// }else{
			// 	this.setPaymentMethod();
			// }
			// OrderWizardModulePaymentMethod.prototype.submit.apply(this);
		}

	,	setStitchPaymentMethod: function ()
		{
			console.log('set stich external')

			//Add EL New. For Testing. TODO: Make Dynamic
			this.paymentMethod = new TransactionPaymentmethodModel({
				type: 'external_checkout',
				isexternal: 'T',
				internalid: "8",
				name: 'Stitch',
				key: "8"
			});
		}

	,	stitchTokenSuccess: function()
		{

			console.log('stitch success',this)
			console.log('complete event handler', $('#stitchtoken'))
			let data = JSON.parse($('#stitchtoken')[0].value);
			console.log('data', data);
			console.log('success this', this)

			if(data.token && data.token !== ""){
				console.log('success set stitch', this)
				this.setStitchPaymentMethod();
				OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);

				this.setTransactionFields(data);
			}else{
				this.wizard.manageError({
                errorCode: 'ERR_WS_INVALID_CARD',
                errorMessage: Utils.translate('Invalid Card')
           		});
				return jQuery.Deferred().reject({
					errorCode: 'ERR_WS_INVALID_CARD',
					errorMessage: Utils.translate('Invalid Card')
				});
			} 
		}

		,	setTransactionFields: function()
		{

			console.log('setTransactionFields',this)
			let transactionBodyFields = {

			}
			this.model.set('options', transactionBodyFields);
		}

	// ,	submit: function ()
	// 	{
	// 		var self = this;

	// 		return this.isValid().done(function ()
	// 		{
	// 			self.paymentMethod = new TransactionPaymentmethodModel(
	// 			{
	// 					type: 'Stitch',
    //                     name: 'Stitch'
	// 				// ,	terms: self.wizard.options.profile.get('paymentterms')
	// 			});

	// 			OrderWizardModulePaymentMethod.prototype.submit.apply(self);
	// 		});
	// 	}
	,	getContext: function ()
		{

			return {

				imageUrl: this.options.paymentmethod.imagesrc[0],
				// @property {String} name
				name: this.options.paymentmethod.name,
				// @property {String} description
				description:
					this.options.description ||
					Utils.translate(
						'You will be redirected to your external payment site after reviewing your order on next step. Once your order is placed, you will return to our site to see the confirmation of your purchase.'
					),
				// @property {String} type
				type: this.paymentMethod.get('type'),
				isSelected: this.paymentMethod.get('type') === this.options.selectedExternalId
					//@property {String} termsName
				// 	termsName: this.terms.name
				// 	//@property {Boolean} showTerms
				// ,	showTerms: this.wizard.application.getConfig('siteSettings.checkout.requiretermsandconditions') === 'T'
				// 	//@property {String} balanceAvailable
				// ,	balanceAvailable: this.wizard.options.profile.get('balance_available_formatted') || ''
			};
		}
	});
});