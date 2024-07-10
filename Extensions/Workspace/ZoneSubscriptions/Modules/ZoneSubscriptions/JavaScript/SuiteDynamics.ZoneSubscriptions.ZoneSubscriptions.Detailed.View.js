// ShippingStatus.View.js
// -----------------------
// @module ShippingStatus
define('SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.Detailed.View', [
    'SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.Model',
    'suitedynamics_zonesubscriptions_zonesubscriptions_detailed.tpl',
    'Backbone',
    'jQuery',
    'underscore'
], function ShippingStatusView(
    ZoneSubscriptionModel,
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
            console.log('DetailedView28', options)
            try {
                this.options = options;
                this.application = options.application;
                this.model = this.options && this.options.model ? this.options.model : this.model;
                this.template = suitedynamics_zonesubscriptions_zonesubscriptions_detailed

                this.render();
            } catch (error) {
                console.log("error:", error.message);
            }
        },
        getContext: function getContext() {


            return {
                subscriptions: this.subscriptions
            };
        }
    });
});
