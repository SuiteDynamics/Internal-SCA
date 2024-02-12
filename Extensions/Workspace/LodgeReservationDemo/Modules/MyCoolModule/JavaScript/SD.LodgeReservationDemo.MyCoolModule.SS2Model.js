// Model.js
// -----------------------
// @module Case
define("SD.LodgeReservationDemo.MyCoolModule.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/MyCoolModule/SuiteScript2/MyCoolModule.Service.ss"
            ),
            true
        )
});
});
