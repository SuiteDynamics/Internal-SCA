// @module Case
define("SuiteDynamics.MotusPayments.MotusPayments.Collection", ["SuiteDynamics.MotusPayments.MotusPayments.Model", "Backbone", "underscore"], function(
    MotusPaymentsModel,
    Backbone,
    _
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Collection.extend({
        model: MotusPaymentsModel,
        url: _.getAbsoluteUrl("services/MotusPayments.Service.ss")
    })
});
 