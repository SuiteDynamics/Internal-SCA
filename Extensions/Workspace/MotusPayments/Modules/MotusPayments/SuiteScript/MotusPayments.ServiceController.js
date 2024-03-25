define("SuiteDynamics.MotusPayments.MotusPayments.ServiceController", ["ServiceController", "MotusPayments.Model", "LiveOrder.Model","underscore"], function(
  ServiceController,
  MotusPaymentsModel,
  LiveOrderModel,
  _
) {
  "use strict";
  return ServiceController.extend({
    name: "SuiteDynamics.MotusPayments.MotusPayments.ServiceController",
    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },
    get: function get() {
        nlapiLogExecution('DEBUG', 'get', 'get');
      return MotusPaymentsModel.getTokens();
    },
    post: function post() {
        nlapiLogExecution('DEBUG', 'post', 'post');
        //Here we will submit the token to Netsuite and create/update the customer profile in CardPointe
        return MotusPaymentsModel.submitToken(this.data);

    },
    put: function put() {
        nlapiLogExecution('DEBUG', 'put', JSON.stringify(this.data));
        //Here we will update the token and submit Authorization
        return MotusPaymentsModel.updateToken(this.data);

    },
    delete: function() {
        nlapiLogExecution('DEBUG', 'delete', this.request.getParameter('id'));
        return MotusPaymentsModel.deleteToken(this.request.getParameter('id'));

    }
  });
});
