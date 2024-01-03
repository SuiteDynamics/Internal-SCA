/*
 * @name CustomerSwitch.Checkout.Entry.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 */
define('CustomerSwitch.Checkout.Entry',
[
    'CustomerSwitchLink.View',
    'CustomerSwitchModal.View',
    'LoginRegister.Login.View'
],
function (
    CustomerSwitchLinkView,
    CustomerSwitchModal,
    LoginRegisterLoginView
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
			
			//Conditionally display a modal during login.
            LoginRegisterLoginView.prototype.redirect = _.wrap(LoginRegisterLoginView.prototype.redirect, function (fn) {
				
				var params = _.toArray(arguments).splice(1),
					response = params[1],
					profile = (response && response.user),
					customers = _.has(profile,'customers')? profile.customers : [],
					contactId = _.has(profile,'contactId')? profile.contactId : '';
					
				if (customers.length > 1) {
					
					var view = new CustomerSwitchModal({
						application: container,
						environment: environment,
						contactId: contactId,
						customers: customers
					});

					layout.showContent(view, { showInModal: true });
				}
				else {
					fn.apply(this, _.toArray(arguments).splice(1));
				}
			});
		}
	};
});
