/*
 * @name CustomerSwitch.Checkout.Entry.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 */

define('CustomerSwitch.Model',
[
    'SC.Model',
    'SC.Models.Init'
],
function (
    SCModel,
    ModelsInit
) {
    'use strict';

    return SCModel.extend({

        name: 'CustomerSwitch.Model',
		
        /**
         * Attempt to switch the access of the logged in user.
         * @param {Object} data 
         * @returns {Object}
         */
        switchAccess: function (data) {
			
			var responseObj = {};
			
            try {
				var userId = nlapiGetUser(),
					userRole = nlapiGetRole(),
					context = nlapiGetContext(),
					userEmail = context.getEmail();
				
				var contact_password = context.getSessionObject('cont_pswd');
				
				if (!contact_password) {
					return {'status': 'NO_PASSWORD'};
				}
				
				var suiteletURL = nlapiResolveURL('SUITELET', 'customscript_sd_sl_custswitch', 'customdeploy_sd_sl_custswitch', 'external'),
				
                postData = {
                    userId: userId,
                    contactId: data.contactId,
                    userRole: userRole,
                    password: contact_password,
                    selectedCustomer: data.selectedCustomer
                },
				
				//Trigger the suitelet to change access.
                suiteletResponse = nlapiRequestURL(suiteletURL, postData, {}, 'POST');
				
				if (suiteletResponse.getCode() == 200) {
					
					var suiteletResponseBody = JSON.parse(suiteletResponse.getBody());
					
					if (suiteletResponseBody.status == 'OK') {
						
						ModelsInit.session.logout();
				
						ModelsInit.session.login({
							email: userEmail,
							password: contact_password
						});
						
						context.setSessionObject('cont_pswd', contact_password );
						
						responseObj.status = 'OK';
					}
					else {
						responseObj.error = suiteletResponseBody.error;
					}
				}
				
            }
			catch (error) {
               responseObj.error = error;
            }
            
            return responseObj;
        }
    });
});
