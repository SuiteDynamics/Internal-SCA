// @module AG.LandingPages.LandingPagesModule
define('StitchPayments.View'
,	[
		'stitchpayments_widget.tpl'
	,	'Backbone'
    ]
, function (
		stitchpayments_widget_tpl
	,	Backbone
)
{
    'use strict';

	// @class AG.LandingPages.LandingPagesModule.View @extends Backbone.View
	return Backbone.View.extend({

		template: stitchpayments_widget_tpl
		
		//@method getContext @return AG.LandingPages.LandingPagesModule.View.Context
	,	getContext: function getContext()
		{
			var environment = this.options.environment;
			
			return {
				merchantId: environment.getConfig('StitchPaymentsModule.merchantId','')
				
			};
		}
	});
});
