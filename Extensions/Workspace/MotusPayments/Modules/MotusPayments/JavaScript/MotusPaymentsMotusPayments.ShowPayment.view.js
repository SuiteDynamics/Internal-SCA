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
		// this.on('afterViewRender',function(){
		// 	//$('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
        //     $('head').append('<script src="https://api.paytrace.com/assets/e2ee/paytrace-e2ee.js"></script>');
        //     $('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
        //     console.log('add init listener')
        //     jQuery(document).ready(function(){
        //         console.log('view render')
		// 		$('head').append('<script src="https://api.paytrace.com/assets/e2ee/paytrace-e2ee.js"></script>');
		// 		$('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
                
        //         // PTPayment.setup({    
        //         //     authorization: { clientKey: this.options.collection.models[0].get('clientkey') }
        //         //   }).then(function(instance){
        //         //        console.log('instance', instance)
        //         //       //use instance object to process and tokenize sensitive data payment fields.
        //         //   });
        //         // console.log('setpaytrace', paytrace)
        //         // paytrace.setKeyAjax("https://7050356-sb1.app.netsuite.com/core/media/media.nl?id=15579&c=7050356_SB1&h=GyGcwcnLfnS9NWCfcjBji8Ttk2kbyhmRI7WnbemgxZpU5kQE&_xt=.cer");
        //     })
		// })
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
