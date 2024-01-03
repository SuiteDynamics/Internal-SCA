/*
 * @name CustomerSwitchLink.View.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 */
define('CustomerSwitchLink.View',
[
	'customer_switch_link.tpl',
    'Backbone',
    'Profile.Model'
],
function (
	customer_switch_link_tpl,
    Backbone,
    ProfileModule
){
    'use strict';

	return Backbone.View.extend({

		template: customer_switch_link_tpl,
        
        initialize: function (options) {
			
			var profileModel = _.has(ProfileModule,'ProfileModel')? ProfileModule.ProfileModel: ProfileModule,
				profile = profileModel.getInstance();
				
			this.customers = profile.get('customers') || [];
		},
        
        getContext: function getContext() {
			
			return {
				customers: this.customers
			};
		}
	});
});
