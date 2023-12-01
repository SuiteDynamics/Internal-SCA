
define(
	'SD.StitchPayments.StitchPaymentsModule'
,   [
		'underscore',
		'jQuery',
		'SD.StitchPayments.PaymentMethodSelector',
		'SD.StitchPayments.StitchPaymentsModule.Model',
		'Configuration',
		'SD.StitchPayments.StitchPaymentsModule.View',
		'order_wizard_paymentmethod_others_module.tpl',
		'OrderWizard.Module.PaymentMethod.Selector',
		'OrderWizard.Module.PaymentMethod',
		'LiveOrder.Model',
		'Transaction.Model'
	]
,   function (
		_,
		jQuery,
		StitchPaymentMethodSelector,
		StitchPaymentsModel,
		Configuration,
		StitchPaymentsModuleView,
		order_wizard_paymentmethod_others_module_tpl,
		OrderWizardModulePaymentMethodSelector,
		OrderWizardModulePaymentMethod,
		LiveOrderModel,
		TransactionModel
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{

			// LiveOrderModel.prototype.getPaymentMethods = _.wrap(LiveOrderModel.prototype.getPaymentMethods, function (fn) {

			// 	var context = fn.apply(this, _.toArray(arguments).slice(1));
			// 	console.log('live order context', context);
			// 	console.log('live order this', this)
			// 	return context;
			// });

			LiveOrderModel.prototype.addPayment =  function (payment_method,save) {
				console.log('addpaymetn')
			}



			// OrderWizardModulePaymentMethodSelector.prototype.isValid = function (fn) {
			// 	console.log('valid')
			// 	return true
			// };


			LiveOrderModel.prototype.addPayment =  function (payment_method,save) {

				// console.log('live order PM', payment_method)
				// console.log('live order save', save)
				// console.log('live order this', this)
				const self = this;
				// var payment_method = this.attributes.paymentmethods.models[0]
				console.log(payment_method)
				// payment_method.set('name','Stitch');
				// payment_method.set('type','others');
				return this.cancelableTrigger('before:LiveOrder.addPayment', payment_method).pipe(
					function() {
						try {
							TransactionModel.prototype.addPayment.apply(self, [payment_method]);
	
							let promise = jQuery.Deferred().resolve();
							if (save) {
								promise = self.save();
							}
	
							return promise.then(function() {
								self.cancelableTrigger('after:LiveOrder.addPayment', payment_method);
							});
						} catch (error) {
							console.log('error',error)
							return jQuery.Deferred().reject(error);
						}
					}
				);
			
			};


			// LivePaymentModel.prototype.addPayment = _.wrap(LivePaymentModel.prototype.addPayment, function (fn) {

			// 	var context = fn.apply(this, _.toArray(arguments).slice(1));
			// 	console.log('LivePaymentModel',context)
			// 	console.log(this)
			// 	return context;
			// });


			var paymentMethods = Configuration.get('siteSettings.paymentmethods', []);
			console.log(order_wizard_paymentmethod_others_module_tpl)
			console.log(paymentMethods)
			//change url
			//var promise = jQuery.getScript("https://checkout-sdk.sezzle.com/checkout.min.js")
			
			let layout = container.getComponent('Layout');
			console.log('inititate');

			if (layout) {

				var StitchModalView = new StitchPaymentsModuleView();

				//layout.showContent(StitchModalView, {showInModal: true, options: {className: 'stitch-modal'}});
				
			}
			//container.waitForPromise(promise);
			//container.waitForPromise(model.fetch());
			
			var model = new StitchPaymentsModel();
			console.log('model',model)
			StitchPaymentMethodSelector.loadModule(container,model, StitchModalView);

		}
	};
});
