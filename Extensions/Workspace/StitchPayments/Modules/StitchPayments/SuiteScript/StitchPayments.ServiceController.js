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
        //Here we will submit the token to Netsuite and create/update the customer profile in CardPointe
        return StitchPaymentsModel.submitToken(this.data);

    },
    put: function put() {
        nlapiLogExecution('DEBUG', 'put', JSON.stringify(this.data));
        //Here we will update the token and submit Authorization
        return StitchPaymentsModel.updateToken(this.data);

    },
    delete: function() {
        nlapiLogExecution('DEBUG', 'delete', this.request.getParameter('id'));
        return StitchPaymentsModel.deleteToken(this.request.getParameter('id'));

    }
  });
});