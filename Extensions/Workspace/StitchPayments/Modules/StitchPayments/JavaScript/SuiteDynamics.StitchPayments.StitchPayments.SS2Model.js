// Model.js
// -----------------------
// @module Case
define("SuiteDynamics.StitchPayments.StitchPayments.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/StitchPayments/SuiteScript2/StitchPayments.Service.ss"
            ),
            true
        )
});
});
