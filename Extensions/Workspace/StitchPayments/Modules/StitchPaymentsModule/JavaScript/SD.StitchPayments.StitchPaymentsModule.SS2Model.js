// Model.js
// -----------------------
// @module Case
define("SD.StitchPayments.StitchPaymentsModule.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/StitchPaymentsModule/SuiteScript2/StitchPaymentsModule.Service.ss"
            ),
            true
        )
});
});
