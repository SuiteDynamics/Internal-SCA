// @module SuiteDynamics.StitchPayments.StitchPayments
define('SuiteDynamics.StitchPayments.ShowPayment.View'
,	[
	'suitedynamics_stitchpayments_showpayment.tpl'

	,   'Wizard.Step'
	,   'OrderWizard.Module.PaymentMethod'

	,	'Backbone'
	,   'jQuery',
    ]
, function (
	suitedynamics_stitchpayments_showpayment_tpl
	
	,	WizardStepModule
	,	OrderWizardModulePaymentMethod
	,	Backbone
	,   jQuery
)
{
    'use strict';

	// @class SuiteDynamics.StitchPayments.StitchPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_stitchpayments_showpayment_tpl

	,	initialize: function (options) {

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
			
			var activeCard = this.options.stitch.options.collection.where({'active': true})[0]

			//@class SuiteDynamics.StitchPayments.StitchPayments.View.Context
	
			var cardType = null;
			var cardLastFour = null;

			if(activeCard){
				cardLastFour = activeCard.get('last_four');
				cardType = activeCard.get('card_type');
			}
			
			return {
				showStitch: this.options.stitch.wizard.stitchActive ? true : false,
				logo: this.options.stitch.options.img,
				lastFour: cardLastFour,
				type: cardType
			}; 
		}
	});
});
