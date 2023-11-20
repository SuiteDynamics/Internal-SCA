/*
 * @name SearchResultsModule.Modal.View
 */

define('SearchResultsModule.Modal.View',
[
	'sd_savedsearchresults_searchresultsmodule_modal.tpl',
    'Backbone',
    'Utils',
    'Configuration'
],
function (
    sd_savedsearchresults_searchresultsmodule_modal_tpl,
    Backbone,
    Utils,
    Configuration
){
    'use strict';

	return Backbone.View.extend({

		template: sd_savedsearchresults_searchresultsmodule_modal_tpl,
        
        title: Utils.translate('Subscription Detail'),
        
        events: {
			// 'keyup [name="switch-login-search"]': 'searchCustomer',
			// 'click .switch-login-customers': 'switchAccess'
		},
        
        initialize: function (options) {
		
            console.log('modal')
		},
        
        /**
         * Filter customer rows to display by the search input.
         * @param {Event Object} e 
         */
        searchCustomer: function(e){
				
		},

	    /**
         * Attempt to switch which customer to log in as.
         * @param {Event Object} e 
         */
        switchAccess: function(e){

		},

        /**
         * Determine how to redirect the user on login.
         */
        redirect: function(){
		
		},
        
        getContext: function getContext() {	
			return {
				customers: 'test'
			};
		}
	});
});
