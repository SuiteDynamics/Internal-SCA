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
        nlapiLogExecution('DEBUG', 'get', 'get');
      return StitchPaymentsModel.getTokens();
    },
    post: function post() {
        nlapiLogExecution('DEBUG', 'post', 'post');
        return StitchPaymentsModel.submitToken(this.data);
      // not implemented
    },
    put: function put() {
        nlapiLogExecution('DEBUG', 'put', 'put');
      // not implemented
    },
    delete: function() {
        nlapiLogExecution('DEBUG', 'delete', 'delete');
      // not implemented
    }
  });
});