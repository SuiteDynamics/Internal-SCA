// Model.js
// -----------------------
// @module Case
define("SuiteDynamics.MotusPayments.MotusPayments.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/MotusPayments/SuiteScript2/MotusPayments.Service.ss"
            ),
            true
        )
});
});
