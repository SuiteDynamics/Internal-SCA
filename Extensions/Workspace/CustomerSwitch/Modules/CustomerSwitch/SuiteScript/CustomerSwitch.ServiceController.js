/*
 * @name CustomerSwitch.Checkout.Entry.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 */

define("CustomerSwitch.ServiceController", 
[
    "ServiceController",
    "CustomerSwitch.Model"
],
function(
    ServiceController,
    CustomerSwitchModel
){
    "use strict";

    return ServiceController.extend({

        name: "CustomerSwitch.ServiceController",

        options: function() {
            return {
                common: {
                    requireLogin: true
                }
            };
        },

        get: function get() {
            // not implemented
        },

        post: function post() {
            return CustomerSwitchModel.switchAccess(this.data);
        },

        put: function put() {
            // not implemented
        },

        delete: function() {
        // not implemented
        }
    });
});
