
define(
	'SD.smtpagebuilder.smtpagebuilder'
,   [
		'SD.smtpagebuilder.smtpagebuilder.View'
	]
,   function (
		smtpagebuilderView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			console.log('smt')

			var pageTypeComponent = container.getComponent("PageType");

			// ... do additional work with the collection

			var pageType = {
				name: 'netsuite-implementation-ext',
				view: smtpagebuilderView,
				routes: ['netsuite-implementation-ext'],
				defaultTemplate: {
					name: 'sd_smtpagebuilder_smtpagebuilder.tpl',
					displayName: 'SMT Page',
				}
			}

			pageTypeComponent.registerPageType(pageType);
			// using the 'Layout' component we add a new child view inside the 'Header' existing view 
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html
			
			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			
			// if(layout)
			// {
			// 	layout.addChildView('Header.Logo', function() { 
			// 		return new smtpagebuilderView({ container: container });
			// 	});
			// }

		}
	};
});
