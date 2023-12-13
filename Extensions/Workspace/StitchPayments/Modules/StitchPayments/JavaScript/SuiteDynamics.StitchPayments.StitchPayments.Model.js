// Model.js
// -----------------------
// @module Case
define("SuiteDynamics.StitchPayments.StitchPayments.Model", ["Backbone", "Utils", "underscore"], function(
    Backbone,
    Utils,
    _
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

        
        //@property {String} urlRoot
        urlRoot: _.getAbsoluteUrl("services/StitchPayments.Service.ss")
        
});
});
