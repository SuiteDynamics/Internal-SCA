
define(
	'SuiteDynamics.StitchPayments.StitchPayments'
,   [
		'OrderWizard.Module.PaymentMethod.Selector',
		'SuiteDynamics.StitchPayments.PaymentMethod.Stitch',
		'SuiteDynamics.StitchPayments.StitchPayments.Collection',
		'SuiteDynamics.StitchPayments.ShowPayment.View',
		'LiveOrder.Model',
		'OrderWizard.Module.ShowPayments',
		'Profile.Model',
		'OrderWizard.Module.PaymentMethod',

		'underscore',
		'jQuery',
		'Backbone',
		'Utils',
		'Tracker',
		'Configuration',

		'suitedynamics_stitchpayments_stitchpayments.tpl'
	]
,   function (
		OrderWizardModulePaymentMethodSelector,
		SitchPaymentMethod,
		StitchPaymentsCollection,
		StitchShowPaymentView,
		LiveOrderModel,
		OrderWizardShowPayments,
		ProfileModel,
		OrderWizardModulePaymentMethod,

		_,
		jQuery,
		Backbone,
		Utils,
		Tracker,
		Configuration,

		stitchpayments_tpl
		
	)
{
	'use strict';

	//Code initiates here
	return  {
		mountToApp: function mountToApp (container)
		{
			var stitchSelf = this

			var layout = container.getComponent('Layout');
			console.log('layout', layout)


			//Extend Source Code natives
			_.extend(OrderWizardModulePaymentMethodSelector.prototype, {
                selectPaymentMethod: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.selectPaymentMethod, function initialize(fn) {
                    var context = fn.apply(this, _.toArray(arguments).slice(1));
                    console.log('selectPaymentMethod',this);
					if(this.selectedModule.name !== 'Stitch'){
						this.wizard.stitchActive = false;
					}
					return context;
                }),
			});

			OrderWizardShowPayments.prototype.getContext = _.wrap(OrderWizardShowPayments.prototype.getContext, function (fn) {
				var context = fn.apply(this, _.toArray(arguments).slice(1));
				console.log('Globalpaymentviews',this);
				return context;
			});
			


			var checkout = container.getComponent("Checkout")

			stitchSelf.stitchCollection = new StitchPaymentsCollection();
			stitchSelf.stitchActive = false;

			checkout.addModuleToStep({
				step_url: 'review',
				module: {
					id: 'SuiteDynamics.StitchPayments.View',
					index: 11,
					classname: 'SuiteDynamics.StitchPayments.StitchPayments.View',
					options: { container: '#wizard-step-content-right', stitchPayments: stitchSelf },
				},
			}).catch(function(error){
				console.warn(error);
			});

			//unset stitchActive from wizard if payment method is changed from Stitch
			_.extend(OrderWizardModulePaymentMethodSelector.prototype, {
                selectPaymentMethod: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.selectPaymentMethod, function initialize(fn) {
                    fn.apply(this, _.toArray(arguments).slice(1));
                    console.log('selectPaymentMethod',this);
					if(this.selectedModule.name !== 'Stitch'){
						this.wizard.stitchActive = false;
					}
                }),
			});
			
			OrderWizardModulePaymentMethod.prototype.submit = function() {
				console.log('payment method', this )
				const payment_method = this.paymentMethod;
				return this.model.addPayment(payment_method);
			};

			_.extend(OrderWizardModulePaymentMethodSelector.prototype,{
				
				template: stitchpayments_tpl,

				events:{
					'click [data-action="change-payment-method"]': 'selectPaymentMethod',
					'change [name="paymentmethod-external-option"]': 'selectPaymentMethodExternal',
					'click [name="paymentmethod-external-option"]': 'selectPaymentMethodExternal'
				},
				

				//For some reason this was added into source code for 2020 and later to look for external, not others. As a result external payment methods were getting excluded from render. Changed code to to look for 'others'. 
				isOthersModule: function(type) {
					return type.indexOf('others') !== -1 && !!order_wizard_paymentmethod_others_module_tpl;
				},

				//Add Stitch logo to getContext handlebars
				getContext: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.getContext, function (fn) {
					var context = fn.apply(this, _.toArray(arguments).slice(1));
					var self = this
					
					_.each(context.activeModules,function(module){
						if(module.name == 'Stitch'){
							var stitch = _.findWhere(self.modules,{ name: 'Stitch' });

							module.stitchurl = stitch.img
							module.isStitch = true;
						}
					})
					return context
				}),

				//If Stitch method is removed, make sure it does not set Stitch token card on transaction body
				selectPaymentMethod: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.selectPaymentMethod, function (fn) {
					var context = fn.apply(this, _.toArray(arguments).slice(1));

					if(this.selectedModule.name !== "Stitch"){
						let transactionBodyFields = {
							'custbody_sd_select_st_card': ''
						}
						this.model.set('options', transactionBodyFields);
					}
					return context
				}),

				//Source code is not adding Stitch method, so we do this manually
				initialize: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.initialize, function (fn) {
					
					fn.apply(this, _.toArray(arguments).slice(1));

					const payment_methods = Configuration.get('siteSettings.paymentmethods', []);

					var stitch = _.findWhere(payment_methods,{ name: 'Stitch' });

					var	profile = _.has(ProfileModel,'ProfileModel')? ProfileModel.ProfileModel: ProfileModel;
						self = this;
					console.log('stitchSelf', stitchSelf)
					this.modules.push({
                        classModule: SitchPaymentMethod,
                        name: 'Stitch',
                        type: 'Offline',
						img: stitch.imagesrc[0],
						options: {
							paymentmethod: _.findWhere(payment_methods,{ name: 'Stitch' }),
							layout: container.getComponent('Layout'),
							container: container,
							img: stitch.imagesrc[0],
							collection: stitchSelf.stitchCollection
						}
                    })
	
					var stitchModule = _.findWhere(this.modules,{ name: 'Stitch' })
					var ModuleClass = stitchModule.classModule
					stitchModule.instance = new ModuleClass(
						_.extend(
							{
								wizard: self.wizard,
								step: self.step,
								stepGroup: self.stepGroup
							},
							stitchModule.options
						)
					);
				
					stitchModule.instance.on('ready', function(is_ready) {
						self.moduleReady(is_ready);
					});
					
					//
					this.on('afterViewRender',function(){

						
						jQuery(document).ready(function(){

							var stitch_payment_method = 8

							function startCheckout(event){
								
								var	promises = [];
								
								_.each(self.step.moduleInstances,function(module){
									
									if(module.module_id != "SD_stitchpayments_stitchpaymentsmodule"){
										
										promises.push(module.submit());
									}
								});
								jQuery.when(promises).then(function(){
									
									var cart = LiveOrderModel.getInstance(),
										billaddress = cart.get('billaddress') || '',
										shipaddress = cart.get('shipaddress') || '';
									
									if(!shipaddress){
									
										self.$('#payment-method-selector-content').html('<div class="global-views-message global-views-message-error alert">Please select shipping address.</div>');
										
										return;
									}
									if(!billaddress || (billaddress == '-------null')){
									
										self.$('#payment-method-selector-content').html('<div class="global-views-message global-views-message-error alert">Please select billing address.</div>');
										
										return;
									}
									
									var email = profile.get('email'),
										first_name = profile.get('firstname'),
										last_name = profile.get('lastname'),
										currency = SC.SESSION && SC.SESSION.currency && SC.SESSION.currency.code,
										cartTotal = (cart.get('summary') && cart.get('summary').total) || 0;
									
									checkout.startCheckout({
										
										checkout_payload: {
											"order": {
											  "intent": "AUTH",
											  "reference_id": "ord_cart",
											  "description": "Order from " + window.location.href,
											  "order_amount": {
												"amount_in_cents": Math.round(cartTotal * 100),
												"currency": currency
											  }
											},
											"customer": {
												"email": email,
												"first_name": first_name,
												"last_name": last_name
											}
										}
									});
								});					
							}				
						});					
					});
				}),		
			});



			console.log('trigger')
			// using the 'Layout' component we add a new child view inside the 'Header' existing view 
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html
			
			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			
			if(layout)
			{

			}
		}
	};
});
