// Model.js
// -----------------------
// @module Case
define("SD.HuntingLicensesDemo.HuntingLicensesDemo.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/HuntingLicensesDemo/SuiteScript2/HuntingLicensesDemo.Service.ss"
            ),
            true
        )
});
});
