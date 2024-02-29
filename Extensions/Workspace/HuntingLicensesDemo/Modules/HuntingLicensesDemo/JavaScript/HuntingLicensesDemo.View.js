// @module SD.HuntingLicensesDemo.HuntingLicensesDemo
define('SD.HuntingLicensesDemo.HuntingLicensesDemo.View'
,	[
	'sd_huntinglicensesdemo_huntinglicensesdemo.tpl'
	
	,	'SD.HuntingLicensesDemo.HuntingLicensesDemo.SS2Model'
	
	,	'Backbone'
    ]
, function (
	sd_huntinglicensesdemo_huntinglicensesdemo_tpl
	
	,	HuntingLicensesDemoSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class SD.HuntingLicensesDemo.HuntingLicensesDemo.View @extends Backbone.View
	return Backbone.View.extend({

		template: sd_huntinglicensesdemo_huntinglicensesdemo_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new HuntingLicensesDemoModel();
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

		//@method getContext @return SD.HuntingLicensesDemo.HuntingLicensesDemo.View.Context
	,	getContext: function getContext()
		{
			//@class SD.HuntingLicensesDemo.HuntingLicensesDemo.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
