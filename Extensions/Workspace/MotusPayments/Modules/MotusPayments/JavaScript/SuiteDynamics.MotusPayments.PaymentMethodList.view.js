// @module SuiteDynamics.MotusPayments.MotusPayments
define('SuiteDynamics.MotusPayments.PaymentMethodList.View'
,	[
	'suitedynamics_motuspayments_paymentmethodlist.tpl'
	
	,	'SuiteDynamics.MotusPayments.MotusPayments.SS2Model'
    ,   'SuiteDynamics.MotusPayments.MotusPayments.Model'

    ,   'OrderWizard.Module.PaymentMethod'
    ,	'GlobalViews.Message.View'
	
	,	'Backbone'
    ]
, function (
	suitedynamics_motuspayments_paymentmethodlist_tpl
	
	,	MotusPaymentsSS2Model
    ,   MotusPaymentsModel

    ,   OrderWizardModulePaymentMethod
    ,	GlobalViewsMessageView
	
	,	Backbone
)
{
    'use strict';

	const motusTypeMap = {
		'MC' : 'master',
		'VISA' : 'visa',
		'DISC' : 'discover'
	}

	// @class SuiteDynamics.MotusPayments.MotusPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_motuspayments_paymentmethodlist_tpl

	,	initialize: function (options) {
	}

	,	events: {

        'click [data-action="motus-token-success"]': 'motusTokenSuccess',
		'click [data-action="select"]': 'changeMotusPayment',
		'click [data-action="motus-add-token"]': 'addMotusPayment'

		}

	,	bindings: {
		}

	, 	childViews: {

		}

	,	changeMotusPayment: function(e)
	{
		console.log('change payment', this)
		this.removeActive();

		var paymentSelected = this.model.get('id')
		this.setActive(paymentSelected)

		var modelSelected = this.options.collection.where({'id': paymentSelected})[0]

		modelSelected.save({internalid: paymentSelected , data: {submit: false}}).then(function(result){

			console.log('change result',result)

		})
	
		this.setMotusPaymentMethod();
		OrderWizardModulePaymentMethod.prototype.submit.apply(this.options.orderWizard, arguments);

		this.options.orderWizard.wizard.motusActive = true
		this.options.orderWizard.wizard.motusSelected = paymentSelected

	}

	,	removeActive: function()
	{
		var activeCards = this.options.collection.where({'active': true})
		_.each(activeCards, function(card) {
			card.set('active', false)
		});
		console.log('after remove active', this)
		
	}
	,	setActive: function(paymentSelected)
	{

		var modelSelected = this.options.collection.where({'id': paymentSelected})[0]


		//If no model is selected, grab the first one instead. 
		if(!modelSelected){
			modelSelected = this.options.collection.first()
		}
		console.log('model', this.options.orderWizard.model)
		modelSelected.set('active', true)
		modelSelected.set('default_card', true)
		//Profile information
		modelSelected.set('first_name', this.options.userProfile.firstname);
		modelSelected.set('last_name', this.options.userProfile.firstname);
		if(this.options.userProfile.phoneinfo){
			modelSelected.set('phone', this.options.userProfile.phoneinfo.phone);
		}else{
			modelSelected.set('phone', "");
		}
		modelSelected.set('email', this.options.userProfile.email);
		//modelSelected.set('motus_id', _.findWhere(this.options.userProfile.customfields,{ id: "custentity_profile_id_motus" }).value);
		//Order information
		modelSelected.set('amount', this.options.orderWizard.model.get('summary').total);
		
		//reset the other defaults so other cards aren't active
		this.options.collection.each(function(token) {

			if(token.get('id') !== paymentSelected){
				token.set('active', false)
				token.set('default_card', false)
			}
		});

		console.log('set active after', modelSelected)
	}
	,	setMotusPaymentMethod: function ()
	{
		// console.log('motusTokenSuccess', this)
		//TODO: Make key dynamic
		console.log('set motus method', this)
		if(!this.options.orderWizard.paymentMethod){
			this.options.orderWizard.paymentMethod = new TransactionPaymentmethodModel({
				type: 'external_checkout',
				isexternal: this.options.orderWizard.options.paymentmethod.isexternal,
				internalid: this.options.orderWizard.options.paymentmethod.internalid,
				name: this.options.orderWizard.this.options.paymentmethod.name,
				key: 38,
			});
		}
	}

	,	getCardImage: function(e)
	{

		if(this.model.get('isNewPaymentMethod') == true){
			return null
		}

		var cardType = motusTypeMap[this.model.get('card_type')]

		let foundImg;
		
		_.each(this.options.images, function(img) {
			// console.log('img',img)
			let index = img.indexOf(cardType);
			// console.log(index)
			if (index !== -1){
				foundImg = img;
				return
			}
		});

		// console.log('foundIndex', foundImg)

		return foundImg;
	}

		//@method getContext @return SuiteDynamics.MotusPayments.MotusPayments.View.Context
	,	getContext: function getContext()
		{

			var image = this.getCardImage();

			//@class SuiteDynamics.MotusPayments.MotusPayments.View.Context
			this.message = this.message || 'Hello World!!'

			var expMonth = this.model.get('exp_month');
			if(expMonth.split("").length < 2){
				expMonth = "0" + expMonth
			}
			
			return {
				lastfourdigits: this.model.get('last_four'),
				type: this.model.get('card_type'),
				expirationDate: expMonth + "/" + this.model.get('exp_year'),
				logo: image,
				isSelected:this.model.get('active'),
				isNewPaymentMethod: this.model.get("isNewPaymentMethod")
			};
		}
	});
});
