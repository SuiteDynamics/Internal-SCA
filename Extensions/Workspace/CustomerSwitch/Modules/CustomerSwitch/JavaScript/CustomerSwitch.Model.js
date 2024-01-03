/*
 * @name CustomerSwitch.Model.js
 *
 * @author SuiteDynamics : Eric Laylan <eric@suitedynamics.io>
 *
 * @since 2023-12-21
 *
 *
 */

define("CustomerSwitch.Model",
[
    "Backbone",
    "Utils"
],
function(
    Backbone,
    Utils
) {
    "use strict";

    return Backbone.Model.extend({

        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/CustomerSwitch.Service.ss"
            )
        )
        
});
});
