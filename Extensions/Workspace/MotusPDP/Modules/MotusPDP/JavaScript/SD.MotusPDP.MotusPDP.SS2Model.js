// Model.js
// -----------------------
// @module Case
define("SD.MotusPDP.MotusPDP.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/MotusPDP/SuiteScript2/MotusPDP.Service.ss"
            ),
            true
        )
});
});
