//ENTRY POINT
//EXTENSION IMPROVEMENTS
	// 1.Figure out how to get the payment method selected attached to the order model. As a workaround we are attaching the Stitch information to the wizard.
	// 2.Fix multiple renders on Stitch payment method selection. 
define(
	'SuiteDynamics.StitchPayments.StitchPayments'
,   [
		'OrderWizard.Module.PaymentMethod.Selector',
		'SuiteDynamics.StitchPayments.StitchPaymentMethodSelector',
		'SuiteDynamics.StitchPayments.StitchPayments.Collection',

		'underscore',
		'jQuery',
		'Backbone',
		'Utils',
		'Tracker',
		'Configuration',

		'suitedynamics_stitchpayments_paymentmethodselector.tpl',
		'order_wizard_paymentmethod_others_module.tpl'
	]
,   function (
		OrderWizardModulePaymentMethodSelector,
		SuitedynamicsStitchPaymentsMethodSelector,
		StitchPaymentsCollection,

		_,
		jQuery,
		Backbone,
		Utils,
		Tracker,
		Configuration,

		suitedynamics_stitchpayments_paymentmethodselector_tpl,
		order_wizard_paymentmethod_others_module_tpl
		
	)
{
	'use strict';

	//Code initiates here
	return  {
		mountToApp: function mountToApp(container) {

			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			console.log('stitch', this)
			var stitchSelf = this
			stitchSelf.stitchCollection = new StitchPaymentsCollection();
			stitchSelf.stitchActive = false;
			stitchSelf.stitchCollection.on('add', function (model) {	
				console.log('add listener')				
				// stitchSelf.render()
			});

			var checkout = container.getComponent("Checkout");
			//TOUCHPOINT 1: Add Module to final step of checkout on submit. This module will trigger the SDK Popup
			checkout.addModuleToStep({
				step_url: 'review',
				module: {
					id: 'SuiteDynamics_StitchPayments_Module',
					index: 11,
					classname: 'SuiteDynamics.StitchPayments.StitchPaymentsModule.View',
					options: { container: '#wizard-step-content-right', stitchPayments: stitchSelf},
				}
			}).catch(function(error){
				console.log('error',error);
			});

			//TOUCHPOINT 2: Add Module to native payment selector. This module will trigger on payment method display to display Stitch as a payment option
			
			_.extend(OrderWizardModulePaymentMethodSelector.prototype,{
			
				template: suitedynamics_stitchpayments_paymentmethodselector_tpl,

				events:{
					'click [data-action="change-payment-method"]': 'selectPaymentMethod',
					'change [name="paymentmethod-external-option"]': 'selectPaymentMethodExternal',
					'click [name="paymentmethod-external-option"]': 'selectPaymentMethodExternal'
				},
				
				initialize: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.initialize, function (fn) {



					fn.apply(this, _.toArray(arguments).slice(1));
					var self = this
					const payment_methods = Configuration.get('siteSettings.paymentmethods', []);
					console.log('payment methods', payment_methods)
					// var stitch = _.findWhere(payment_methods,{ name: 'Stitch' });

					// var	profile = _.has(ProfileModel,'ProfileModel')? ProfileModel.ProfileModel: ProfileModel;
					// 	self = this;

					this.modules.push({
						classModule: SuitedynamicsStitchPaymentsMethodSelector,
						name: 'Stitch',
						type: 'external', //Changed from 'offline'
						options: {
							paymentmethod: _.findWhere(payment_methods,{ name: 'Stitch' }),
							layout: container.getComponent('Layout'),
							checkout: container.getComponent('Checkout'),
							container: container,
							collection: stitchSelf.stitchCollection
						}
					})
	
					var StitchModule = _.findWhere(this.modules,{ name: 'Stitch' })
					var ModuleClass = StitchModule.classModule;

					StitchModule.instance = new ModuleClass(
						_.extend(
							{
								wizard: self.wizard,
								step: self.step,
								stepGroup: self.step.stepGroup
							},
							StitchModule.options
						)
					);
					console.log('after', this)		
					StitchModule.instance.on('ready', function(is_ready) {
						self.moduleReady(is_ready);
					});
			}),

			//For some reason this was added into source code for 2020 and later to look for external, not others. As a result other payment methods were getting excluded from render. Changed code to to look for 'others'. 
			isOthersModule: function(type) {
				return type.indexOf('others') !== -1 && !!order_wizard_paymentmethod_others_module_tpl;
			},

			renderModule: function(module) {

				module.instance.isReady = false;
				module.instance.render();

				this.wizard.StitchActive = false;

				this.$('#payment-method-selector-content')
					.empty()
					.append(module.instance.$el);
			},
			
		})
			
	
		// if(layout)
		// {
		// 	layout.addChildView('Header.Logo', function() { 
		// 		return new StitchPaymentsView({ container: container });
		// 	});
		// }

		}
	};
});
