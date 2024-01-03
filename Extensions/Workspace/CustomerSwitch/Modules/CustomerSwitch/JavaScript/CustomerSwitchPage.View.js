/*
 * @name CustomerSwitchPage.View.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 *
 * @file This view displays a list of customers a user can log in as, and allows the user to switch.
 */

define('CustomerSwitchPage.View',
[
	'customer_switch_page.tpl',
    'CustomerSwitch.Model', 
    'Backbone',
    'Utils',
    'Profile.Model'
],
function (
	customer_switch_page_tpl,
    CustomerSwitchModel,
    Backbone,
    Utils,
    ProfileModule
) {
    'use strict';

	return Backbone.View.extend({

		template: customer_switch_page_tpl,
        
        title: Utils.translate('Switch To Another Account'),
        
        events: {
			'keyup [name="customer-switch-search"]': 'searchCustomer',
			'click .switch-customer-rows': 'switchAccess'
		},
        
        initialize: function (options) {
			console.log('cust switch page view', ProfileModule)
			var profileModel = _.has(ProfileModule,'ProfileModel')? ProfileModule.ProfileModel: ProfileModule,
				profile = profileModel.getInstance();
				console.log('profileModel', profile)
			this.customers = profile.get('customers') || [];
			this.contactId = profile.get('contactId') || '';
            console.log('done')
		},
        
        /**
         * Filter customer rows to display by the search input.
         * @param {Event Object} e 
         */
        searchCustomer: function(e){
		
			var query = this.$(e.currentTarget).val();
			var $customer_rows = this.$('.switch-customer-rows');
				
            $customer_rows.each(function(){
                
                var $row = $(this);
                var customerName = $row.text().toLowerCase();
                
                customerName.indexOf(query.toLowerCase()) == -1 
                    ? $row.hide()
                    : $row.show();
                
            });
				
		},
        
        /**
         * Attempt to switch which customer to log in as.
         * @param {Event Object} e 
         */
        switchAccess: function(e){

			var $target = this.$(e.currentTarget),
				selectedCustomer = $target.attr('data-id'),
				isActive = $target.hasClass('active');
				
			if (isActive)
				return;
			

			var model = new CustomerSwitchModel(),
				self = this;
			
			this.$('.customer-switch-processing').show();
			
			model.save({
				'selectedCustomer': selectedCustomer,
				'contactId': this.contactId
			})
                .then(function(res){
				
                    if (_.has(res,'status') && res.status == 'OK') {
                        window.location.reload();
                    } else {
                        var error = JSON.parse(res.error);
                        console.log('error', error)
                        self.showError(error.details);
                    }

                    self.$('.customer-switch-processing').hide();
                });
		},
        
        getContext: function getContext() {
			return {
				customers: this.customers,
				title: this.title
			};
		}
	});
});
