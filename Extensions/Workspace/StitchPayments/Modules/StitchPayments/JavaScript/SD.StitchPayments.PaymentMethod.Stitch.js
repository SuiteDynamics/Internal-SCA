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
	,   'SuiteDynamics.StitchPayments.PaymentMethodList.View'
	,   'SuiteDynamics.StitchPayments.RemoveToken.View'
	,   'SuiteDynamics.StitchPayments.ShowPayment.View'

	,	'suitedynamics_stitchpayments_paymentmethod.tpl'

	,	'Backbone'
	,	'Backbone.CollectionView'
	,	'backbone_collection_view_row.tpl'
	,	'backbone_collection_view_cell.tpl'
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
	,   StitchPaymentsPaymentMethodListView
	,   StitchPaymentsRemoveTokenView
	,   StitchPaymentsShowPaymentView

	,	suitedynamics_stitchpayments_paymentmethod_tpl

	,	Backbone
	,	BackboneCollectionView
	,	backbone_collection_view_row_tpl
	,	backbone_collection_view_cell_tpl
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
    ,	childViews: {
			'StitchPayments.List': function () {
				// if (this.paymentMethodSelected) {
				// 	this.setCreditCard({
				// 		id: this.paymentMethodSelected
				// 	});
				// }
				console.log('child view', this)
				return new BackboneCollectionView({
					collection: this.options.collection,
					childView: StitchPaymentsPaymentMethodListView,
					childViewOptions: {
						collection: this.options.collection,
						userProfile: this.userProfile,
						orderWizard: this,
						images: this.options.paymentmethod.imagesrc
						// showDefaults: this.showDefaults,
						// showSelect: true,
						// hideSelector: false,
						// selectMessage: this.selectMessage,
						// showSecurityCodeForm:
						// 	this.requireccsecuritycode && paymentinstrument_creditcard_edit_tpl,
						// selectedCreditCardId:
						// 	this.paymentMethodSelected || this.getDefaultCreditCardId()
					},
					viewsPerRow:
						this.itemsPerRow ||
						(Utils.isDesktopDevice() ? 3 : Utils.isTabletDevice() ? 2 : 1),
					cellTemplate: backbone_collection_view_cell_tpl,
					rowTemplate: backbone_collection_view_row_tpl
				});
			},
	}
	,	initialize: function()
		{

			console.log('start', this)
			var self = this;
	
			var checkout = this.options.checkout
			checkout.on("afterShowContent", function() {
				checkout.getCurrentStep().then(function(step) {
					if (step.step_group_name == "Payment") {
						self.options.collection.fetch(
							{ data: { salesOrderId: "1" } }
			
						).done(function(result) {
							console.log('result', result)
							self.render();
						  })
					}
				});
			});
			
			this.layout = this.options.layout

			this.options.layout.addChildView('PaymentMethods.Collection', function () {
				return new StitchPaymentsShowPaymentView({
					stitch: self
				});
			});
		

			this.options.container.getComponent("UserProfile").getUserProfile().done(function(result){
				self.userProfile = result
			})

			OrderWizardModulePaymentMethod.prototype.initialize.apply(this, arguments);
			WizardStepModule.WizardStepModule.prototype.initialize.apply(this, arguments);
			
			self.on('afterViewRender', function(){
				
				let selectedInitialPayment = _.findWhere(self.$el.find("#stitch-payments-dropdown")[0],{ selected: true });

				if(selectedInitialPayment){
					self.setInitial(selectedInitialPayment.id)
				}

				this.options.container.getComponent("UserProfile").getUserProfile().done(function(result){
					self.userProfile = result
				})
				
			}, this);

			this.options.collection.on('sync', function (model) {	
				console.log('add listener')				
				self.render()
			});

		}

	,	render: function ()
		{

			const options = this.options.model && this.options.model.get('options');
			var modelSelected = this.options.collection.where({'active': true})[0]

			//if no model is active, just grab the default
			if(!modelSelected){
				modelSelected = this.options.collection.where({'default_card': true})[0]
			}
			//If no active or default, grab the first model
			if(!modelSelected){
				modelSelected = this.options.collection.first()
			}

			if (options) {
				_.extend(this.options, options);
			}
			if(this.options.paymentmethod.name == 'Stitch' && modelSelected){
				this.stitchActive = true;
				this.stitchSelected = modelSelected.get('id')
				this.setStitchPaymentMethod();
			}else if (modelSelected) {
				this.setPaymentMethod();
			}
			this.showInModal();
			this._render();
			//this.setInitial(modelSelected.get('id'));
			
		}

	,	setInitial: function (initial)
		{
			if(initial){
				
				this.setActive(initial)
				this.setStitchPaymentMethod();
				OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);

				this.setTransactionFields(initial);
			}
		}

	,	setStitchPaymentMethod: function ()
		{
			// console.log('stitchTokenSuccess', this)
			//TODO: Make key dynamic
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

	,	setActive: function(paymentSelected)
	{

		var modelSelected = this.options.collection.where({'id': paymentSelected})[0]


		//If no model is selected, grab the first one instead. 
		if(!modelSelected){
			modelSelected = this.options.collection.first()
		}

		modelSelected.set('active', true)
		modelSelected.set('default_card', true)
		//Profile information
		modelSelected.set('first_name', this.userProfile.firstname);
		modelSelected.set('last_name', this.userProfile.firstname);
		if(this.userProfile.phoneinfo){
			modelSelected.set('phone', this.userProfile.phoneinfo.phone);
		}else{
			modelSelected.set('phone', "");
		}
		modelSelected.set('email', this.userProfile.email);
		modelSelected.set('stitch_id', _.findWhere(this.userProfile.customfields,{ id: "custentity_profile_id_stitch" }).value);
		//Order information
		modelSelected.set('amount', Math.round(this.model.get('summary').total * 100));
		
		//reset the other defaults so other cards aren't active
		this.options.collection.each(function(token) {

			if(token.get('id') !== paymentSelected){
				token.set('active', false)
				token.set('default_card', false)
			}
		});

		console.log('set active after', modelSelected)
	}


	,	changeStitchPayment: function(e)
	{
		this.removeActive();

		var paymentSelected = _.findWhere(e.target,{ selected: true }).id
		this.setActive(paymentSelected)

		var modelSelected = this.options.collection.where({'id': paymentSelected})[0]

		modelSelected.save({internalid: paymentSelected , data: {submit: false}}).then(function(result){

			console.log('change result',result)

		})
	
		this.setStitchPaymentMethod();
		OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);

		this.wizard.stitchActive = true
		this.wizard.stitchSelected = paymentSelected

	}

	,	removeActive: function()
	{
		var activeCards = this.options.collection.where({'active': true})
		_.each(activeCards, function(card) {
			card.set('active', false)
		});
		console.log('after remove active', this)
		
	}

	,	setTransactionFields: function(paymentSelected)
	{

		this.model.set('options', _.extend(this.model.get('options'), {'custbody_sd_select_st_card': paymentSelected}));

		//put in wizard because it isn't being reflected in model on review page
		this.wizard.stitchActive = true
		this.wizard.stitchSelected = paymentSelected
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

			// @property {String} type
			type: this.paymentMethod ? this.paymentMethod.get('type') : null,
			isSelected:  this.options.paymentmethod.name == "Stitch" ? true : false,
			payments: this.options.collection

		};
	}
	});
});