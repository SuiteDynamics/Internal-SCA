
define(
	'SD.StitchPayments.StitchPaymentsModule'
,   [
		'underscore',
		'jQuery',
		'SD.StitchPayments.PaymentMethodSelector',
		'SD.StitchPayments.StitchPaymentsModule.Model',
		'Configuration',
		'SD.StitchPayments.StitchPaymentsModule.View',
		'order_wizard_paymentmethod_others_module.tpl'
	]
,   function (
		_,
		jQuery,
		StitchPaymentMethodSelector,
		StitchPaymentsModel,
		Configuration,
		StitchPaymentsModuleView,
		order_wizard_paymentmethod_others_module_tpl
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{


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
			
			var model = new StitchPaymentsModel().fetch();
			console.log('model',model)
			StitchPaymentMethodSelector.loadModule(container,model, StitchModalView);

		}
	};
});
