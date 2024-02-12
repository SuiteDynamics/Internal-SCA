// @module SD.LodgeReservationDemo.MyCoolModule
define('SD.LodgeReservationDemo.MyCoolModule.View'
,	[
	'sd_lodgereservationdemo_mycoolmodule.tpl'
	
	,	'SD.LodgeReservationDemo.MyCoolModule.SS2Model'
	,   'jQuery'
	,	'Backbone'

    ]
, function (
	sd_lodgereservationdemo_mycoolmodule_tpl
	
	,	MyCoolModuleSS2Model
	,   jQuery
	,	Backbone

)
{
    'use strict';

	// @class SD.LodgeReservationDemo.MyCoolModule.View @extends Backbone.View
	return Backbone.View.extend({

		template: sd_lodgereservationdemo_mycoolmodule_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new MyCoolModuleModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });

			  this.on('afterViewRender',function(){

				$(document).ready(function() {


				 })

			})
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return SD.LodgeReservationDemo.MyCoolModule.View.Context
	,	getContext: function getContext()
		{
			//@class SD.LodgeReservationDemo.MyCoolModule.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
