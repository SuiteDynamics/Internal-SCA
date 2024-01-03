/*
 * @name CustomerSwitch.MyAccount.Entry.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 */

define('CustomerSwitch.MyAccount.Entry',  
[
	'CustomerSwitchLink.View'
],
function (
    CustomerSwitchLinkView
){
	'use strict';

	return  {
		mountToApp: function mountToApp (container) {
			
			var layout = container.getComponent('Layout'),
				environment = container.getComponent('Environment');
			
			layout.addChildView('Header.Profile', function () {
				
				return new CustomerSwitchLinkView({
					application: container,
					environment: environment
				});
			});
		}
	};
});
