// @module SD.MotusPDP.MotusPDP
define('SD.MotusPDP.MotusPDP.View'
,	[
	'sd_motuspdp_motuspdp.tpl'
	
	,	'SD.MotusPDP.MotusPDP.SS2Model'
	
	,	'Backbone'
    ]
, function (
	sd_motuspdp_motuspdp_tpl
	
	,	MotusPDPSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class SD.MotusPDP.MotusPDP.View @extends Backbone.View
	return Backbone.View.extend({

		template: sd_motuspdp_motuspdp_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new MotusPDPModel();
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

		//@method getContext @return SD.MotusPDP.MotusPDP.View.Context
	,	getContext: function getContext()
		{
			//@class SD.MotusPDP.MotusPDP.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
