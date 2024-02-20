
define(
	'SD.HuntingLicenseDemo.HuntingLicenseDemo'
,   [
		'SD.HuntingLicenseDemo.HuntingLicenseDemo.View'
	]
,   function (
		HuntingLicenseDemoView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			// using the 'Layout' component we add a new child view inside the 'Header' existing view 
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html
			console.log('hunt 2')
			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			
			if(layout)
			{
				console.log('layout')
				var checkout = container.getComponent("Checkout");
				//TOUCHPOINT 1: Add Module to final step of checkout on submit. This module will trigger the SDK Popup
				// checkout.addModuleToStep({
				// 	step_url: 'review',
				// 	module: {
				// 		id: 'SuiteDynamics_HuntingLicense_Module',
				// 		index: 5,
				// 		classname: 'SD.HuntingLicenseDemo.HuntingLicenseDemo.View',
				// 		options: { container: '#wizard-step-content', motusPayments: motusSelf},
				// 	}
				// }).catch(function(error){
				// 	console.log('error',error);
				// });
				// layout.registerView('ProductLimitedStock', function() {
				// 	return new ProductLimitedStockView({});
				// });
				layout.registerView('Hunting.License', function() { 
					console.log('inside')
					return new HuntingLicenseDemoView({ container: container });
				});
			}

		}
	};
});
