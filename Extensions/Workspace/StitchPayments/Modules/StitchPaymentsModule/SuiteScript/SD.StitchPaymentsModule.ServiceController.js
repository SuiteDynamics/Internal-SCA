define("SD.StitchPayments.StitchPaymentsModule.ServiceController", ["ServiceController","SD.StitchPayments.Model"], function(
  ServiceController,
  StitchPaymentsModel
) {
  "use strict";

  return ServiceController.extend({
    name: "SD.StitchPayments.StitchPaymentsModule.ServiceController",

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
