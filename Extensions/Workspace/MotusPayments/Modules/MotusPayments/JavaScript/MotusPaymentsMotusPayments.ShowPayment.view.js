// @module SuiteDynamics.MotusPayments.MotusPayments
//This view shows the selected payment on the review checkout page
define('SuiteDynamics.MotusPayments.ShowPayment.View'
,	[
	'suitedynamics_motuspayments_showpayment.tpl'

	,	'Backbone'
    ]
, function (
	suitedynamics_motuspayments_showpayment_tpl
	
	,	Backbone
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
			console.log('show paAYMENT GET CONTEXT', this)
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
				logo: this.options.motus.options.images[0],
				lastFour: cardLastFour,
				type: cardType
			}; 
		}
	});
});
