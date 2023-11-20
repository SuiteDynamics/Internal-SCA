// @module SD.StitchPayments.StitchPaymentsModule
define('SD.StitchPayments.StitchPaymentsModule.View'
,	[
	'sd_stitchpayments_stitchpaymentsmodule.tpl'
	
	,	'SD.StitchPayments.StitchPaymentsModule.SS2Model'
	
	,	'Backbone'
    ]
, function (
	sd_stitchpayments_stitchpaymentsmodule_tpl
	
	,	StitchPaymentsModuleSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class SD.StitchPayments.StitchPaymentsModule.View @extends Backbone.View
	return Backbone.View.extend({

		template: sd_stitchpayments_stitchpaymentsmodule_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new StitchPaymentsModuleModel();
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

		//@method getContext @return SD.StitchPayments.StitchPaymentsModule.View.Context
	,	getContext: function getContext()
		{
			//@class SD.StitchPayments.StitchPaymentsModule.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
