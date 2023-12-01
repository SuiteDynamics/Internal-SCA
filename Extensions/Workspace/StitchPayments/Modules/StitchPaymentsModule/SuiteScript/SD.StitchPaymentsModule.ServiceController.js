define("SD.StitchPayments.ServiceController", ["ServiceController","SD.StitchPayments.Model", "LiveOrder.Model","underscore"], function(
  ServiceController,
  StitchPaymentsModel,
  LiveOrderModel,
  _
) {
  "use strict";

  LiveOrderModel.prototype.getPaymentMethods = _.wrap(LiveOrderModel.prototype.getPaymentMethods, function (fn) {

		var context = fn.apply(this, _.toArray(arguments).slice(1));
		nlapiLogExecution('DEBUG', 'live order context', context);
		
		return context;
	});

  return ServiceController.extend({
    name: "SD.StitchPayments.ServiceController",

    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },

    get: function get() {
      return StitchPaymentsModel.getStitchKeys();
    },

    post: function post() {
      return StitchPaymentsModel.processOrder(this.data.stitch);
    },

    put: function put() {
      // not implemented
    },

    delete: function() {
      // not implemented
    }
  });
});
