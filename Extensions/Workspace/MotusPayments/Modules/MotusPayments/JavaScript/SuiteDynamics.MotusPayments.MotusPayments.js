//ENTRY POINT
//EXTENSION IMPROVEMENTS
	// 1.Figure out how to get the payment method selected attached to the order model. As a workaround we are attaching the Motus information to the wizard.
	// 2.Fix multiple renders on Motus payment method selection. 
define(
	'SuiteDynamics.MotusPayments.MotusPayments'
,   [
		'OrderWizard.Module.PaymentMethod.Selector',
		'SuiteDynamics.MotusPayments.MotusPaymentMethodSelector',
		'SuiteDynamics.MotusPayments.MotusPayments.Collection',

		'underscore',
		'jQuery',
		'Backbone',
		'Utils',
		'Tracker',
		'Configuration',

		'suitedynamics_motuspayments_paymentmethodselector.tpl',
		'order_wizard_paymentmethod_others_module.tpl'
	]
,   function (
		OrderWizardModulePaymentMethodSelector,
		SuitedynamicsMotusPaymentsMethodSelector,
		MotusPaymentsCollection,

		_,
		jQuery,
		Backbone,
		Utils,
		Tracker,
		Configuration,

		suitedynamics_motuspayments_paymentmethodselector_tpl,
		order_wizard_paymentmethod_others_module_tpl
		
	)
{
	'use strict';

	//Code initiates here
	return  {
		mountToApp: function mountToApp(container) {

			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			console.log('motus', this)
			var motusSelf = this
			motusSelf.motusCollection = new MotusPaymentsCollection();
			motusSelf.motusActive = false;
			motusSelf.motusCollection.on('add', function (model) {	
				console.log('add listener')				
				// motusSelf.render()
			});

			var checkout = container.getComponent("Checkout");
			//TOUCHPOINT 1: Add Module to final step of checkout on submit. This module will trigger the SDK Popup
			checkout.addModuleToStep({
				step_url: 'review',
				module: {
					id: 'SuiteDynamics_MotusPayments_Module',
					index: 11,
					classname: 'SuiteDynamics.MotusPayments.MotusPaymentsModule.View',
					options: { container: '#wizard-step-content-right', motusPayments: motusSelf},
				}
			}).catch(function(error){
				console.log('error',error);
			});

			//TOUCHPOINT 2: Add Module to native payment selector. This module will trigger on payment method display to display Motus as a payment option
			
			_.extend(OrderWizardModulePaymentMethodSelector.prototype,{
			
				template: suitedynamics_motuspayments_paymentmethodselector_tpl,

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
					var motus = _.findWhere(payment_methods,{ name: 'Motus' });

					// var	profile = _.has(ProfileModel,'ProfileModel')? ProfileModel.ProfileModel: ProfileModel;
					// 	self = this;

					this.modules.push({
						classModule: SuitedynamicsMotusPaymentsMethodSelector,
						name: 'Motus',
						type: 'external', //Changed from 'offline'
						isMotus: true,
						imageUrl: motus.imagesrc[0],
						options: {
							paymentmethod: _.findWhere(payment_methods,{ name: 'Motus' }),
							layout: container.getComponent('Layout'),
							checkout: container.getComponent('Checkout'),
							container: container,
							collection: motusSelf.motusCollection,
							images: motus.imagesrc
						}
					})
	
					var MotusModule = _.findWhere(this.modules,{ name: 'Motus' })
					var ModuleClass = MotusModule.classModule;

					MotusModule.instance = new ModuleClass(
						_.extend(
							{
								wizard: self.wizard,
								step: self.step,
								stepGroup: self.step.stepGroup
							},
							MotusModule.options
						)
					);
					console.log('after', this)		
					MotusModule.instance.on('ready', function(is_ready) {
						self.moduleReady(is_ready);
					});
			}),

			getContext: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.getContext, function (fn) {

				   
				var context = fn.apply(this, _.toArray(arguments).slice(1));
				context.isMotus = this.selectedModule.name == "Motus" ? true : false

				var motusModule = _.findWhere(context.activeModules,{ name: 'Motus' })

				motusModule.isMotus = true;
				motusModule.imagesrc =  _.findWhere(this.modules,{ name: 'Motus' }).imageUrl

				return context;

		}),

			//For some reason this was added into source code for 2020 and later to look for external, not others. As a result other payment methods were getting excluded from render. Changed code to to look for 'others'. 
			isOthersModule: function(type) {
				return type.indexOf('others') !== -1 && !!order_wizard_paymentmethod_others_module_tpl;
			},

			renderModule: function(module) {

				module.instance.isReady = false;
				module.instance.render();

				this.wizard.motusActive = false;

				this.$('#payment-method-selector-content')
					.empty()
					.append(module.instance.$el);
			},
			
		})
			
	
		// if(layout)
		// {
		// 	layout.addChildView('Header.Logo', function() { 
		// 		return new MotusPaymentsView({ container: container });
		// 	});
		// }

		}
	};
});
