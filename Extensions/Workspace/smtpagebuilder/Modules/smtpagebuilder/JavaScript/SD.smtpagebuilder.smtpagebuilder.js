
define(
	'SD.smtpagebuilder.smtpagebuilder'
	, [
		'SD.smtpagebuilder.smtpagebuilder.View',
		'jQuery'
	]
	, function (
		smtpagebuilderView,
		jQuery
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				console.log('smt')


				// jQuery(document).ready(function(){
				// 		console.log('elemetn', $("#schedule-your-consultation"))
					
				// 		document.getElementById("schedule-your-consultation").onclick = function () {
				// 		console.log('click')
				// 		location.href = "https://www.suitedynamics.co/schedule-a-consultation";
					
                //  }
				// });

				var pageTypeComponent = container.getComponent("PageType");

				// ... do additional work with the collection

				var netsuiteImplementation = {
					name: 'netsuite-implementation-ext',
					view: smtpagebuilderView,
					routes: ['netsuite-implementation-ext'],
					defaultTemplate: {
						name: 'sd_smtpagebuilder_smtpagebuilder.tpl',
						displayName: 'SMT Page',
					}
				}

				pageTypeComponent.registerPageType(netsuiteImplementation);

				var netsuiteServices = {
					name: 'netsuite-services-ext',
					view: smtpagebuilderView,
					routes: ['netsuite-services-ext'],
					defaultTemplate: {
						name: 'sd_smtpagebuilder_smtpagebuilder.tpl',
						displayName: 'SMT Page',
					}
				}

				pageTypeComponent.registerPageType(netsuiteServices);
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
