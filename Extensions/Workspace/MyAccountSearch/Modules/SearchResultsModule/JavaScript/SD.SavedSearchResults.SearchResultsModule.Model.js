// Model.js
// -----------------------
// @module Case
define("SD.SavedSearchResults.SearchResultsModule.Model", ["Backbone", "Utils","Configuration","underscore"], function(
    Backbone,
    Utils,
	ConfigurationModule,
	_
) {
    "use strict";

	var Configuration = _.has(ConfigurationModule,'Configuration')? ConfigurationModule.Configuration: ConfigurationModule;
	
    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

		urlRoot: Configuration.get('savedSearches.suiteletUrl','')
		
	});
});
