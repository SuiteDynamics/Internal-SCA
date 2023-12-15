// @module SuiteDynamics.StitchPayments.StitchPayments
define('SuiteDynamics.StitchPayments.StitchPayments.View'
,	[
	'suitedynamics_stitchpayments_stitchpayments.tpl'
	
	,	'Wizard.Module'
	,	'Backbone'
    ]
, function (
	suitedynamics_stitchpayments_stitchpayments_tpl
	
	,   WizardModule
	,	Backbone
)
{
    'use strict';

	// @class SuiteDynamics.StitchPayments.StitchPayments.View @extends Backbone.View
	return WizardModule.extend({

		    template: suitedynamics_stitchpayments_stitchpayments_tpl

		,	errors: ['ERR_STITCH_AUTH']

		,	initialize: _.wrap(WizardModule.prototype.initialize, function(fn){
				fn.apply(this, _.toArray(arguments).slice(1));
				console.log('stitch payments view', this)

				// this.render()
				//this.template = suitedynamics_stitchpayments_tpl
			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new StitchPaymentsModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		})

		,	submit: function () {

				var promise = jQuery.Deferred();
				console.log(this)
				promise.reject({errorCode: 'ERR_STITCH_AUTH', errorMessage: 'Card Authorization failure. Please select a different card.'});

				return promise.resolve();
			}
		

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return SuiteDynamics.StitchPayments.StitchPayments.View.Context
	,	getContext: function getContext()
		{
			console.log('getcontext', this)
			//@class SuiteDynamics.StitchPayments.StitchPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				isReview: true,
				message: this.message
			};
		}
	});
});
