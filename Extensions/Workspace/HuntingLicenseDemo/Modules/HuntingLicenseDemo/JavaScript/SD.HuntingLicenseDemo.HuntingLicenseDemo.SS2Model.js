// Model.js
// -----------------------
// @module Case
define("SD.HuntingLicenseDemo.HuntingLicenseDemo.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/HuntingLicenseDemo/SuiteScript2/HuntingLicenseDemo.Service.ss"
            ),
            true
        )
});
});
