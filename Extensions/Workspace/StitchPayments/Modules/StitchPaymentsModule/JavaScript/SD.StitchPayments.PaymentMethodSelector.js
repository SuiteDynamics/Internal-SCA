
define(
	'SD.StitchPayments.PaymentMethodSelector'
,   [
		'LiveOrder.Model',
		'OrderWizard.Module.PaymentMethod.Selector',
		'underscore',
		'stitchpaymentsmodule.tpl',
		'jQuery',
		'Backbone',
		'SD.Profile.Model',
		'SD.StitchPayments.StitchPaymentsModule.View',
		'OrderWizard.Module.PaymentMethod.Others',
		'SD.StitchPayments.PaymentMethod.Stitch',
		'order_wizard_paymentmethod_others_module.tpl'
	]
,   function (
		LiveOrderModel,
		OrderWizardModulePaymentMethodSelector,
		_,
		stitchpaymentsmodule_tpl,
		jQuery,
		Backbone,
		ProfileModel,
		StitchModalView,
		OrderWizardModulePaymentMethodOthers,
		SitchPaymentMethod,
		order_wizard_paymentmethod_others_module_tpl

	)
{
	'use strict';

	return  { 
		
		loadModule: function (container,sdkData, StitchModuleView){
			
			
			_.extend(OrderWizardModulePaymentMethodSelector.prototype,{
				
				template: stitchpaymentsmodule_tpl,

				events:{
					'click [data-action="initiate-stitch"]': 'initiateStitch',
					'click [data-action="change-payment-method"]': 'selectPaymentMethod',
					'change [name="paymentmethod-external-option"]': 'selectPaymentMethodExternal',
					'click [name="paymentmethod-external-option"]': 'selectPaymentMethodExternal'
				},
				
				initiateStitch: function (options) {

					let layout = container.getComponent('Layout');
					console.log('initiate stitch',StitchModuleView)
					console.log('sdk data',sdkData)
					
					if (layout) {

						// var StitchModalView = new StitchModalView();

						layout.showContent(new StitchModalView({
							container: container,
							model: sdkData
						}), {showInModal: true, options: {className: 'stitch-modal'}});
						
					}
				},

				selectPaymentMethod: function(e) {
					console.log('select', this)
					const value = e.target.getAttribute('value') || jQuery(e.target).val();
					if (value) {
						// var paymentMethods = this.model.get('paymentmethods');
						// if(this.selectedModule.name == "Stitch" ){
						// 	this.model.set('paymentmethods', this.selectedModule)
						// 	// this.paymentMethod = this.selectedModule
						// }
						
						this.setModuleByType(value);
						console.log('after',this)
					}
				},

				selectPaymentMethodExternal: function(e) {
					this.setModuleByType(e.target.getAttribute('value'), true);
				},

				initialize: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.initialize, function (fn) {
					
					fn.apply(this, _.toArray(arguments).slice(1));
					
					var	profile = ProfileModel.getInstance(),
						self = this;
					

					this.modules.push({
                        classModule: SitchPaymentMethod,
                        name: 'Stitch',
                        type: 'stitch'
                    })
					const ModuleClass = this.modules[4].classModule;
					this.modules[4].instance = new ModuleClass(
						_.extend(
							{
								wizard: self.wizard,
								step: self.step,
								stepGroup: self.stepGroup
							},
							this.modules[4].options
						)
					);
					console.log(this.modules)
					this.modules[4].instance.on('ready', function(is_ready) {
						self.moduleReady(is_ready);
					});
					
					console.log(this);
					this.on('afterViewRender',function(){
						
						jQuery(document).ready(function(){
							
							//var stitchApiUrl = sdkData.get('api_url');

							//make dynamic
							// var stitch_payment_method = sdkData.get('payment_method'),
								// logo_url = sdkData.get('logo_url');
							var stitch_payment_method = 8,
								logo_url = "http://7050356.shop.netsuite.com/c.7050356/SiteImages/Stitch_logo.png"


							


							// var checkout = new Checkout({
							// 	'mode': "popup",
							// 	'publicKey': sdkData.get('public_key'),
							// 	'apiMode': sdkData.get('api_mode'),
							// 	'apiVersion': sdkData.get('api_version')
							// });
							
							// checkout.renderStitchButton("stitch-smart-button-container");
							
							// if(logo_url){
							// 	jQuery('.stitch-smart-button-logo-img').attr('src',logo_url);
							// }
							
							// checkout.init({
							// 	onClick: startCheckout,
							// 	onComplete : onCompleteHandler,
							// 	onCancel: function () {},
							// 	onFailure: function (event) {}
							// });
							
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
							function onCompleteHandler(event) {

							  console.log('complete event handler')

							  
							  var data = event.data || Object.create(null);

							  //console.log('checkout data:',data);
							  
							  if(data && data.status == "success"){
								  
								  var cart = LiveOrderModel.getInstance();
								  
								  data.shipaddress = cart.get('shipaddress') || '';
								  data.billaddress = cart.get('billaddress') || '';
								  data.purchase_order = cart.get('purchasenumber') || '';
								  data.options = cart.get('options') || {};
								  data.payment_method = stitch_payment_method;
								  
								  data.order_summary = cart.get('summary') || {};
								  
								  data.order_summary.lines = cart.get('lines').map(function(line){
									  return {
										  item: line.get('item').get('internalid'),
										  quantity: line.get('quantity'),
										  amount: line.get('total')
									  }
								  });
								  
								  //block UI
								  jQuery('body').append('<div id="stitch-checkout-blocker"></div>');
								  
								  sdkData.save({'stitch': data}).then(function(response){
									
									
									if( _.has(response,'orderCreated') ){
										
										cart.set('lines',[]);
										
										jQuery('.checkout-layout-content').html('<div class="order-wizard-confirmation-module alert fade in"><h2 class="order-wizard-confirmation-module-title">Thank you for shopping with us!</h2><p class="order-wizard-confirmation-module-body">We received your order and will process it right away.</p><p class="order-wizard-confirmation-module-body" data-type="additional-confirmation-message">You will receive an email with this confirmation in a few minutes.</p><a class="order-wizard-confirmation-module-continue" href="/" data-touchpoint="home" data-hashtag="#/">Continue shopping</a></div>');
									}
									  
									else if(_.has(response,'confirmation')){
										var confirmation = response.confirmation;
										
										cart.set('confirmation',confirmation);
										cart.set('lines',[]);
										Backbone.history.navigate('confirmation',{ trigger: true, replace: true });
									}
									else{
										var error = _.has(response,'error')? response.error : {};
										
										if(error.code == 'ERR_WS_REQUIRE_CUSTOMER_LOGIN'){
											
											window.location.reload();
										}
										else{
											if(error.code == 'ERR_WS_SET_SHIPPING_ADDRESS'){
												error.details = 'Please add a shipping address.';
											}
											self.$('#payment-method-selector-content').html('<div class="global-views-message global-views-message-error alert">'+ error.code +': '+ error.details +'</div></div>');
										}
										
									}
										
									jQuery('body').find('#stitch-checkout-blocker').remove();
								  });
							  }
							}
							
						});
						
					});


				}),
				
			});
		}
	};
});
