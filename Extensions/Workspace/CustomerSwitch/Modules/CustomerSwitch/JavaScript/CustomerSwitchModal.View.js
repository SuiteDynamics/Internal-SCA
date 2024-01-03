/*
 * @name CustomerSwitchModel.Checkout.Entry.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 */

define('CustomerSwitchModal.View',
[
	'customer_switch_modal.tpl',
    'CustomerSwitch.Model',
    'Backbone',
    'Utils',
    'Configuration'
],
function (
    customer_switch_modal_tpl,
    CustomerSwitchModel,
    Backbone,
    Utils,
    ConfigurationModule
){
    'use strict';

	return Backbone.View.extend({

		template: customer_switch_modal_tpl,
        
        title: Utils.translate('Switch to another account'),
        
        events: {
			'keyup [name="customer-switch-search"]': 'searchCustomer',
			'click .customer-switch-customers': 'switchAccess'
		},
        
        initialize: function (options) {
		
			this.customers = options.customers;
			this.contactId = options.contactId;
		},
        
        /**
         * Filter customer rows to display by the search input.
         * @param {Event Object} e 
         */
        searchCustomer: function(e){
		
			var query = this.$(e.currentTarget).val();
			var $customer_rows = this.$('.customer-switch-customers');
				
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
				isActive = $target.hasClass('active'),
				layout = this.options.application.getLayout(),
				$alert_placeholder = this.$('[data-type="alert-placeholder"]'),
				alert_message = 'Switching account... <img src="'+ Utils.getThemeAbsoluteUrlOfNonManagedResources('img/ajax-loader.gif') + '"/>';
				
			if(isActive){
				this.redirect();
				return;
			}

			var errorMessage = this.options.environment.getConfig('CustomerSwitch.errorMessage'),
				model = new CustomerSwitchModel(),
				self = this;
			
			layout.showMessage($alert_placeholder, alert_message, 'warning', false);
			
			model.save({
				'selectedCustomer': selectedCustomer,
				'contactId': this.contactId
			})
                .then(function(res){
				
                    $alert_placeholder.html('');
                    
                    if (_.has(res,'status') && res.status == 'OK') {
                        self.redirect();
                    } else {
                        self.showError(errorMessage);
                    }
                });
		},

        /**
         * Determine how to redirect the user on login.
         */
        redirect: function(){
		
			var url_options = Utils.parseUrlOptions(window.location.search),
				touchpoints = this.options.environment.getSiteSetting('touchpoints'),
				siteloginrequired = this.options.environment.getSiteSetting('siteloginrequired'),
				isPasswordReset = url_options.passwdret,
				Configuration = _.has(ConfigurationModule,'Configuration')? ConfigurationModule.Configuration: ConfigurationModule;	
				
			if (
                !isPasswordReset &&
                (url_options.is === 'checkout' || url_options.origin === 'checkout')
            ) {
                window.location.reload();
            }
            else {
                // if we know from which touchpoint the user is coming from
                if (url_options.origin && touchpoints[url_options.origin]) {
                    // we save the URL to that touchpoint
                    let url = touchpoints[url_options.origin];
                    // if there is an specific hash
                    if (url_options.origin_hash) {
                        // we add it to the URL as a fragment
                        url = Utils.addParamsToUrl(url, { fragment: url_options.origin_hash });
                    }

                    window.location.href = url;
                } else {
                    // We've got to disable passwordProtectedSite feature if customer registration is disabled.
                    if (
                        Configuration.getRegistrationType() !== 'disabled' &&
                        siteloginrequired === 'T'
                    ) {
                        window.location.href = touchpoints.home;
                    } else {
                        // otherwise we need to take it to the customer center
                        window.location.href = touchpoints.customercenter;
                    }
                }
            }
		},
        
        getContext: function getContext() {	
			return {
				customers: this.customers
			};
		}
	});
});
