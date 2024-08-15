// @module SD.MotusPDP.MotusPDP
define('SD.MotusPDP.MotusPDP.View'
,	[
	'sd_motuspdp_motuspdp.tpl'
	
	,	'Backbone'
    ]
, function (
	sd_motuspdp_motuspdp_tpl
	
	,	Backbone
)
{
    'use strict';

	// @class SD.MotusPDP.MotusPDP.View @extends Backbone.View
	return Backbone.View.extend({

		template: sd_motuspdp_motuspdp_tpl

	,	initialize: function (options) {
		var self = this

		this.itemInfo = self.options.container.getComponent("PDP").getItemInfo();

		this.on('afterViewRender',function(){

		   jQuery(document).ready(function(){

			   if(self.itemInfo.item.displayname.includes('Motus')){
					$('#product-views-price').after( '<span style="margin-left:5px; font-size:12pt; font-style: italic;">Price includes one-time install fee and 1st month of service</span>' );
			   }
			})
	   })

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
			return {
				isMotus: this.itemInfo.item.displayname.includes('Motus')
			};
		}
	});
});
