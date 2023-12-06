define("SuiteDynamics.StitchPayments.StitchPayments.ServiceController", ["ServiceController", "StitchPayments.Model", "LiveOrder.Model","underscore"], function(
  ServiceController,
  StitchPaymentsModel,
  LiveOrderModel,
  _
) {
  "use strict";


  return ServiceController.extend({
    name: "SuiteDynamics.StitchPayments.StitchPayments.ServiceController",

    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },

    get: function get() {
      return StitchPaymentsModel.getTokens();
    },

    post: function post() {
      // not implemented
    },

    put: function put() {
      // not implemented
    },

    delete: function() {
      // not implemented
    }
  });
});
