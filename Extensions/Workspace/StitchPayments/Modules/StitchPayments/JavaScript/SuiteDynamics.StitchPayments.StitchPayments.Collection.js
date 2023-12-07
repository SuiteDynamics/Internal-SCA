// @module Case
define("SuiteDynamics.StitchPayments.StitchPayments.Collection", ["SuiteDynamics.StitchPayments.StitchPayments.Model", "Backbone", "underscore"], function(
    StitchPaymentsModel,
    Backbone,
    _
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Collection.extend({
        model: StitchPaymentsModel,
        url: _.getAbsoluteUrl("services/StitchPayments.Service.ss")
    })
});
 