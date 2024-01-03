/*
 * @name CustomerSwitch.Entry.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 */

define('CustomerSwitch.Entry',
[
    // 'CustomerSwitch.ServiceController',
    // 'CustomerSwitch.Model',
    'Application',
    'Account.Model',
    'underscore',
    'SC.Models.Init'
],	
function (
    // CustomerSwitchModuleServiceController,
    // CustomerSwitchModel,
    Application,
    AccountModel,
    _,
    ModelsInit
) {

	'use strict';
	
	Application.on('after:Profile.get', function (Model, profile) {
		
		if (ModelsInit.session.isLoggedIn2()) {
			try{

				var filters = [
					new nlobjSearchFilter('email', null, 'is', profile.email), 
					new nlobjSearchFilter('isinactive', null, 'is', 'F')
				],

				columns = [
					new nlobjSearchColumn('internalid', 'customer', null),
					new nlobjSearchColumn('entityid', 'customer', null),
					new nlobjSearchColumn('companyname', 'customer', null),
					new nlobjSearchColumn("shipaddress","customer",null), 
					new nlobjSearchColumn("phone","customer",null), 
					new nlobjSearchColumn("email","customer",null), 
					new nlobjSearchColumn("salesrep","customer",null),
					new nlobjSearchColumn("isinactive","customer",null)
				],
				
				searchResults = Application.getAllSearchResults('contact', filters, columns),
				customers = [],
				contactId;
				
				if (searchResults && searchResults.length) {
					
					var contactResults = _.filter(searchResults, function (result) {
						return result.getValue('internalid', 'customer', null) == profile.internalid;
					});
					contactId = contactResults[0].getId();
					
					_.each(searchResults, function(result){
						
						var customerId = result.getValue('internalid', 'customer', null);
						
						if( contactId == result.getId() ){
							
							customers.push({
								internalid: customerId,
								entityid: result.getValue('entityid', 'customer', null),
								companyname: result.getValue('companyname', 'customer', null),
								shipaddress: result.getValue('shipaddress', 'customer', null),
								phone: result.getValue('phone', 'customer', null),
								email: result.getValue('email', 'customer', null),
								salesrep: result.getText('salesrep', 'customer', null),
								isinactive: result.getValue('isinactive', 'customer', null),
								isActive: (customerId == profile.internalid)? true: false
							});
						}
					});
				}
                
				profile.customers = _.sortBy(customers,'companyname');
				profile.contactId = contactId;
				
			}
			catch(e){
				profile.error = e.toString();
			}
		}

		return profile;	
	});
	
	AccountModel.login = _.wrap(AccountModel.login, function (fn) {

		var params = _.toArray(arguments).splice(1),
			returnObj = fn.apply(this, params),
			user = returnObj.user,
			password = params[1];
		
		if (user.isLoggedIn == 'T' && user.customers && user.customers.length) {

			var context = nlapiGetContext();
			
			context.setSessionObject('cont_pswd', password );
		}
		
		return returnObj;
	});
});