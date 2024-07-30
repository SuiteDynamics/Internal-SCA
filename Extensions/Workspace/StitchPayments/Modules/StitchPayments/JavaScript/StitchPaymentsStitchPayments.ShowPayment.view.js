// @module SuiteDynamics.StitchPayments.StitchPayments
define('SuiteDynamics.StitchPayments.ShowPayment.View'
,	[
	'suitedynamics_stitchpayments_showpayment.tpl'

	,	'Backbone'
    ]
, function (
	suitedynamics_stitchpayments_showpayment_tpl
	
	,	Backbone
)
{
    'use strict';

	const stitchTypeMap = {
		'MC' : 'master',
		'VISA' : 'visa',
		'DISC' : 'discover'
	}

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

			console.log('show paAYMENT GET CONTEXT', this)
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
				logo: this.options.stitch.options.images[0],
				lastFour: cardLastFour,
				type: cardType
			}; 
		}
	});
});
