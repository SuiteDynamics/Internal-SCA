// @module SuiteDynamics.StitchPayments.StitchPayments
define('SuiteDynamics.StitchPayments.PaymentMethodList.View'
,	[
	'suitedynamics_stitchpayments_paymentmethodlist.tpl'
	
	,	'SuiteDynamics.StitchPayments.StitchPayments.SS2Model'
    ,   'SuiteDynamics.StitchPayments.StitchPayments.Model'

    ,   'OrderWizard.Module.PaymentMethod'
    ,	'GlobalViews.Message.View'
	
	,	'Backbone'
    ]
, function (
	suitedynamics_stitchpayments_paymentmethodlist_tpl
	
	,	StitchPaymentsSS2Model
    ,   StitchPaymentsModel

    ,   OrderWizardModulePaymentMethod
    ,	GlobalViewsMessageView
	
	,	Backbone
)
{
    'use strict';

	const stitchTypeMap = {
		'MC' : 'master',
		'VISA' : 'visa',
		'DISC' : 'discover'
	}

	// @class SuiteDynamics.StitchPayments.StitchPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_stitchpayments_paymentmethodlist_tpl

	,	initialize: function (options) {
        console.log('payment list view init', this)
	}

	,	events: {

        'click [data-action="stitch-token-success"]': 'stitchTokenSuccess',
		'click [data-action="select"]': 'changeStitchPayment',
		'click [data-action="stitch-add-token"]': 'addStitchPayment'

		}

	,	bindings: {
		}

	, 	childViews: {

		}

	,	changeStitchPayment: function(e)
	{
		console.log('change payment', this)
		this.removeActive();

		var paymentSelected = this.model.get('id')
		this.setActive(paymentSelected)

		var modelSelected = this.options.collection.where({'id': paymentSelected})[0]

		modelSelected.save({internalid: paymentSelected , data: {submit: false}}).then(function(result){

			console.log('change result',result)

		})
	
		this.setStitchPaymentMethod();
		OrderWizardModulePaymentMethod.prototype.submit.apply(this.options.orderWizard, arguments);

		this.options.orderWizard.wizard.stitchActive = true
		this.options.orderWizard.wizard.stitchSelected = paymentSelected

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
		modelSelected.set('stitch_id', _.findWhere(this.options.userProfile.customfields,{ id: "custentity_profile_id_stitch" }).value);
		//Order information
		modelSelected.set('amount', Math.round(this.options.orderWizard.model.get('summary').total * 100));
		
		//reset the other defaults so other cards aren't active
		this.options.collection.each(function(token) {

			if(token.get('id') !== paymentSelected){
				token.set('active', false)
				token.set('default_card', false)
			}
		});

		console.log('set active after', modelSelected)
	}
	,	setStitchPaymentMethod: function ()
	{
		// console.log('stitchTokenSuccess', this)
		//TODO: Make key dynamic
		console.log('set stitch method', this)
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

		var cardType = stitchTypeMap[this.model.get('card_type')]

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

		//@method getContext @return SuiteDynamics.StitchPayments.StitchPayments.View.Context
	,	getContext: function getContext()
		{

			var image = this.getCardImage();

			console.log('list getcontext',this)
			//@class SuiteDynamics.StitchPayments.StitchPayments.View.Context
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
