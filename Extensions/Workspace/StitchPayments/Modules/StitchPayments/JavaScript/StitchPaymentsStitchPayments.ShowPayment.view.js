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

        var self = this;
		//WizardStepModule.prototype.getContext.apply(this, arguments);
        
        // options.container.getComponent("UserProfile").getUserProfile().done(function(result){
        //     console.log('profile result', result)
        //     self.userProfile = result
        // })
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
			console.log('activeCard',activeCard)
			//@class SuiteDynamics.StitchPayments.StitchPayments.View.Context
			this.message = this.message || 'Hello World!!'
			
			if(activeCard){
				var cardLastFour = activeCard.get('last_four');
				var cardType = activeCard.get('card_type');
			}else{
				var cardLastFour = null
				var cardType = null
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
