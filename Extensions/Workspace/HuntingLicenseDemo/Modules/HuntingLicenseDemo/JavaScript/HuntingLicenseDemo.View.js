// @module SD.HuntingLicenseDemo.HuntingLicenseDemo
define('SD.HuntingLicenseDemo.HuntingLicenseDemo.View'
,	[
	'sd_huntinglicensedemo_huntinglicensedemo.tpl'
	
	,	'SD.HuntingLicenseDemo.HuntingLicenseDemo.SS2Model'
	
	,	'Backbone'
    ]
, function (
	sd_huntinglicensedemo_huntinglicensedemo_tpl
	
	,	HuntingLicenseDemoSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class SD.HuntingLicenseDemo.HuntingLicenseDemo.View @extends Backbone.View
	return Backbone.View.extend({

		template: sd_huntinglicensedemo_huntinglicensedemo_tpl

	,	initialize: function (options) {
			console.log('hunt view')
			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new HuntingLicenseDemoModel();
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

		//@method getContext @return SD.HuntingLicenseDemo.HuntingLicenseDemo.View.Context
	,	getContext: function getContext()
		{
			//@class SD.HuntingLicenseDemo.HuntingLicenseDemo.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
