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
	,   'SuiteDynamics.StitchPayments.StitchPayments.Collection'
	,   'SuiteDynamics.StitchPayments.StitchPayments.Model'
	,   'SuiteDynamics.StitchPayments.AddToken.View'

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
	,	StitchPaymentsCollection
	,	StitchPaymentsModel
	,   StitchPaymentsAddTokenView

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
			'change [data-action="change-stitch-payment"]': 'changeStitchPayment',
			'click [data-action="stitch-add-token"]': 'addStitchPayment'
		}

    ,	errors: ['ERR_WS_INVALID_CARD', 'ERR_CHK_INVALID_CARD']

	,	initialize: function()
		{

			var self = this;

			this.layout = this.options.layout

			console.log(new StitchPaymentsModel())

			self.stitchCollection = new StitchPaymentsCollection();
			
			
			self.stitchCollection.fetch(
				{ data: { salesOrderId: "1" } }

			).done(function(result) {
				console.log('model', result)

      		}).then(function () {
                    
				console.log("Then done");
				
			});
			// console.log('Collection', stitchCollection)


			OrderWizardModulePaymentMethod.prototype.initialize.apply(this, arguments);
			WizardStepModule.WizardStepModule.prototype.initialize.apply(this, arguments);
			console.log('external init', self)
			self.on('afterViewRender', function(){
				console.log('setInitial', self.$el.find("#stitch-payments-dropdown"))

				let selectedInitialPayment = _.findWhere(self.$el.find("#stitch-payments-dropdown")[0],{ selected: true });

				console.log('selectedInitialPayment', selectedInitialPayment.id)
				self.setInitial(selectedInitialPayment.id)
			}, this);

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
			this.showInModal();
			this._render();

			this.setInitial();

			
		}

	,	setInitial: function (initial)
		{

			console.log('initial', initial)

			if(initial){
				console.log('inside initial', initial)
				this.setStitchPaymentMethod();
				OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);

				this.setTransactionFields(initial);
			}
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


		,	changeStitchPayment: function(e)
		{

			console.log('change payment',e)
			
			let paymentSelected = _.findWhere(e.target,{ selected: true });
			console.log('payment selected', paymentSelected);
			console.log('success set stitch', this)

			this.setStitchPaymentMethod();
			OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);


			this.setTransactionFields(paymentSelected.id);

		}

		,	setTransactionFields: function(paymentSelected)
		{

			console.log('setTransactionFields',paymentSelected)

			let transactionBodyFields = {
				'custbody_sd_select_st_card': paymentSelected
			}
			this.model.set('options', transactionBodyFields);
		}

		,	addStitchPayment: function(e)
		{

			console.log('add payment',this)

			var addTokenView = new StitchPaymentsAddTokenView({
			   collection: this.stitchCollection
			});

			addTokenView.title = "Add Card"
			//addTokenView.modalClass = "global-views-modal-large";
			//addTokenView.showInModal({title: "Inventory Status", className: "inventory-status-modal", modalOptions: {backdrop: false}})
			this.layout.showContent(addTokenView, { showInModal: true, title: "Inventory Status" });
		}

		// ,	setStitchToOrder: function(paymentSelected)
		// {

		// 	console.log('change payment',e)
			
		// 	let paymentSelected = _.findWhere(e.target,{ selected: true });

		// 	console.log('success set stitch', this)
		// 	this.setStitchPaymentMethod();
		// 	OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);

		// 	this.setTransactionFields(paymentSelected);
		// 	console.log('payment selected', paymentSelected.id);

			

		// }

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
				isSelected: this.paymentMethod.get('type') === this.options.selectedExternalId,
				payments: this.stitchCollection
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