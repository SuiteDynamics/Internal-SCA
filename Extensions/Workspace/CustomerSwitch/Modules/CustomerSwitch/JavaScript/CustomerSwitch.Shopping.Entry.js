/*
 * @name CustomerSwitch.Shopping.Entry.js
 *
 * @author SuiteDynamics : Eric Laylan <elaylan@suitedynamics.io>

 * @since 2023-12-21
 *
 *
 */

define('CustomerSwitch.Shopping.Entry',
[
    'CustomerSwitchLink.View',
    'CustomerSwitchPage.View'
],  
function (
    CustomerSwitchLinkView,
    CustomerSwitchPageView
){
	'use strict';

	return  {
		mountToApp: function mountToApp (container) {
			console.log('cust switch')
			var layout = container.getComponent('Layout'),
				environment = container.getComponent('Environment');
			
			layout.addChildView('Header.Profile', function () {
				
				return new CustomerSwitchLinkView({
					application: container,
					environment: environment
				});
			});
			
			var pageType = container.getComponent('PageType');
			
			pageType.registerPageType({
				name: 'CustomerSwitchPageView',
				routes: ['customer-switch'],
				view: CustomerSwitchPageView,
				options: {
					application: container,
					environment: environment
				}
			});
		}
	};
});
