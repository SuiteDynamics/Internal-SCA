// @module SuiteDynamics.MotusPayments.MotusPayments
define('SuiteDynamics.MotusPayments.ShowPayment.View'
,	[
	'suitedynamics_motuspayments_showpayment.tpl'

	,   'Wizard.Step'
	,   'OrderWizard.Module.PaymentMethod'

	,	'Backbone'
	,   'jQuery',
    ]
, function (
	suitedynamics_motuspayments_showpayment_tpl
	
	,	WizardStepModule
	,	OrderWizardModulePaymentMethod
	,	Backbone
	,   jQuery
)
{
    'use strict';

	// @class SuiteDynamics.MotusPayments.MotusPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_motuspayments_showpayment_tpl

	,	initialize: function (options) {

	}

	,	events: {

		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return SuiteDynamics.MotusPayments.MotusPayments.View.Context
	,	getContext: function getContext()
		{
			console.log('show paAYMENT GET CONTEXT')
			var activeCard = this.options.motus.options.collection.where({'active': true})[0]

			//@class SuiteDynamics.MotusPayments.MotusPayments.View.Context
	
			var cardType = null;
			var cardLastFour = null;

			if(activeCard){
				cardLastFour = activeCard.get('last_four');
				cardType = activeCard.get('card_type');
			}
			
			return {
				showMotus: this.options.motus.wizard.motusActive ? true : false,
				logo: this.options.motus.options.img,
				lastFour: cardLastFour,
				type: cardType
			}; 
		}
	});
});
