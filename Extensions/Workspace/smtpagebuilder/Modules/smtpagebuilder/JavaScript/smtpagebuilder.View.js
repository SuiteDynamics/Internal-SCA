// @module SD.smtpagebuilder.smtpagebuilder
define('SD.smtpagebuilder.smtpagebuilder.View'
,	[
	'sd_smtpagebuilder_smtpagebuilder.tpl'
	
	,	'Backbone'
    ]
, function (
	sd_smtpagebuilder_smtpagebuilder_tpl
	
	,	Backbone
)
{
    'use strict';

	// @class SD.smtpagebuilder.smtpagebuilder.View @extends Backbone.View
	return Backbone.View.extend({

		template: sd_smtpagebuilder_smtpagebuilder_tpl

	,	initialize: function (options) {
		console.log('init')
			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new smtpagebuilderModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return SD.smtpagebuilder.smtpagebuilder.View.Context
	,	getContext: function getContext()
		{
			//@class SD.smtpagebuilder.smtpagebuilder.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
