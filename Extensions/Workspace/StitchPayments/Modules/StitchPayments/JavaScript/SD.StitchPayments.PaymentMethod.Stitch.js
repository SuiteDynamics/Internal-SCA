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
	,   'Transaction.Model'
	,   'Wizard.StepModule'
	,   'SuiteDynamics.StitchPayments.StitchPayments.Collection'
	,   'SuiteDynamics.StitchPayments.StitchPayments.Model'
	,   'SuiteDynamics.StitchPayments.AddToken.View'
	,   'SuiteDynamics.StitchPayments.RemoveToken.View'

	,	'suitedynamics_stitchpayments_paymentmethod.tpl'

	,	'Backbone'
	, 	'jQuery'
	,	'underscore'
	,   'Utils'
	]
,	function (
		OrderWizardModulePaymentMethod
	,	TransactionPaymentmethodModel
	,   TransactionModel
	,	WizardStepModule
	,	StitchPaymentsCollection
	,	StitchPaymentsModel
	,   StitchPaymentsAddTokenView
	,   StitchPaymentsRemoveTokenView

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
			'click [data-action="stitch-add-token"]': 'addStitchPayment',
			'click [data-action="stitch-remove-token"]': 'removeStitchPayment'
		}

    ,	errors: ['ERR_WS_INVALID_CARD', 'ERR_CHK_INVALID_CARD']

	,	initialize: function()
		{

			// TransactionModel.prototype.addPayment = function addPayment(payment_method) {
			// 	// Gets the payment method collection

			// 	console.log('transaction', payment_method)
			// 	console.log('transaction 2', this)
			// 	const payment_methods = this.get('paymentmethods');
		
			// 	// Removes the primary if any
			// 	payment_methods.remove(payment_methods.where({ primary: true }));
		
			// 	// Sets it as primary
			// 	payment_method.set('primary', true);
		
			// 	// Adds it to the collection
			// 	payment_methods.add(payment_method);
			// }

			var self = this;
			console.log('start', this)
			this.layout = this.options.layout

			

			this.options.container.getComponent("UserProfile").getUserProfile().done(function(result){
				console.log('profile result', result)
				self.userProfile = result
			})

			//TODO:Remove static id
			this.options.collection.fetch(
				{ data: { salesOrderId: "1" } }

			).done(function(result) {

				console.log('model', result)

      		})
			// console.log('Collection', stitchCollection)
			// self.stitchCollection.on('reset sync add remove change destroy', function() {
			// 	self.render();
			// });

			OrderWizardModulePaymentMethod.prototype.initialize.apply(this, arguments);
			WizardStepModule.WizardStepModule.prototype.initialize.apply(this, arguments);
			
			self.on('afterViewRender', function(){
				
				let selectedInitialPayment = _.findWhere(self.$el.find("#stitch-payments-dropdown")[0],{ selected: true });

				if(selectedInitialPayment){
					self.setInitial(selectedInitialPayment.id)
				}
				
			}, this);

		}

	,	render: function ()
		{
			
			const options = this.options.model && this.options.model.get('options');

			if (options) {
				_.extend(this.options, options);
			}
			if(this.options.paymentmethod.name == 'Stitch'){
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

			if(initial){
				this.setStitchPaymentMethod();
				OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);

				this.setTransactionFields(initial);
			}
		}

	,	setStitchPaymentMethod: function ()
		{
			console.log('set stitch method', this)
			if(!this.paymentMethod){
				this.paymentMethod = new TransactionPaymentmethodModel({
					type: 'external_checkout',
					isexternal: this.options.paymentmethod.isexternal,
					internalid: this.options.paymentmethod.internalid,
					name: this.options.paymentmethod.name,
					key: 8,
				});
			}
		}

	,	stitchTokenSuccess: function()
		{

			let data = JSON.parse($('#stitchtoken')[0].value);

			if(data.token && data.token !== ""){
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
			console.log('change', this)



			let paymentSelected = _.findWhere(e.target,{ selected: true });
			console.log('payment selected', paymentSelected)

			var modelSelected = this.options.collection.where({'id': paymentSelected.id})[0]
			console.log('model selected', modelSelected)

			//this is the old active model that we will need to void the auth for
			var modelActive = this.options.collection.where({'active': true})[0]
			console.log('model active', modelActive)
			//modelSelected.set('active', true)
			console.log('model selected', modelSelected)
			//Profile information
			modelSelected.set('first_name', this.userProfile.firstname);
			modelSelected.set('last_name', this.userProfile.firstname);
			modelSelected.set('phone', this.userProfile.phoneinfo.phone);
			modelSelected.set('email', this.userProfile.email);
			modelSelected.set('stitch_id', _.findWhere(this.userProfile.customfields,{ id: "custentity_sd_stitch_profile_id" }).value);
			//Order information
			modelSelected.set('amount', this.model.get('summary').total);
	
			// modelSelected.save({internalid: paymentSelected.id, activeAuth:modelActive}).then(function(result){

			// 	console.log('result',result)
			// })
			
			//this.stitchCollection.add(newPaymentModel).save().then(function(result){})


			this.setStitchPaymentMethod();
			OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);


			this.setTransactionFields(paymentSelected.id);

		}

		,	setTransactionFields: function(paymentSelected)
		{
			console.log('set transaction options', this)
			let transactionBodyFields = {
				'custbody_sd_select_st_card': paymentSelected
			}
			this.model.set('options', transactionBodyFields);
		}

		,	addStitchPayment: function(e)
		{

			var addTokenView = new StitchPaymentsAddTokenView({
			   collection: this.options.collection,
			   container: this.options.container,
			   paymentMethodView: this,
			   userProfile: this.userProfile
			});

			addTokenView.title = "Add Card"
			
			this.layout.showContent(addTokenView, { showInModal: true });
		}
		,	removeStitchPayment: function(e)
		{

			var removeTokenView = new StitchPaymentsRemoveTokenView({
			   collection: this.options.collection,
			   container: this.options.container
			});

			removeTokenView.title = "Remove Card"
			
			this.layout.showContent(removeTokenView, { showInModal: true });
		}

	,	getContext: function ()
		{
			
			return {

				imageUrl: this.options.paymentmethod.imagesrc[0],
				// @property {String} name
				name: this.options.paymentmethod.name,
				isStitch: this.options.paymentmethod.name == "Stitch" ? true : false,
				// @property {String} description
				description:
					this.options.description ||
					Utils.translate(
						'You will be redirected to your external payment site after reviewing your order on next step. Once your order is placed, you will return to our site to see the confirmation of your purchase.'
					),
				// @property {String} type
				type: this.paymentMethod.get('type'),
				isSelected: this.paymentMethod.get('type') === this.options.selectedExternalId,
				payments: this.options.collection

			};
		}
	});
});