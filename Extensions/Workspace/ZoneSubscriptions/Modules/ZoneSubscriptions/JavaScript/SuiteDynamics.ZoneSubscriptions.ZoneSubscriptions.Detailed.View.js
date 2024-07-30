// ShippingStatus.View.js
// -----------------------
// @module ShippingStatus
define('SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.Detailed.View', [
    'suitedynamics_zonesubscriptions_zonesubscriptions_detailed.tpl',
    'Backbone',
    'jQuery',
    'underscore'
], function ShippingStatusView(
    suitedynamics_zonesubscriptions_zonesubscriptions_detailed,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({

        template: suitedynamics_zonesubscriptions_zonesubscriptions_detailed,

        title: _.translate('Subscription Details'),

        showModalPageHeader: true,

        initialize: function initialize(options) {
            try {
                this.options = options;
                this.application = options.application;
                this.model = this.options && this.options.model ? this.options.model : this.model;




                // this.template = suitedynamics_zonesubscriptions_zonesubscriptions_detailed

                // this.render();
            } catch (error) {
                console.log("error:", error.message);
            }
        },
        events: {
            'click [data-action="requestCancellation"]': 'requestCancellation'
            // ,
            // 'click [data-action="expand-table"]': 'expandTable',
        },
        requestCancellation: function requestCancellation(e) {
            console.log('click')

        },
        getContext: function getContext() {

            return {
                hasResults: this.options.hasResults,
                subscriptions: this.options.subscriptions
            };
        }
    });
});
