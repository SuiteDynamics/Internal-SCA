// @module SuiteDynamics.StitchPayments.StitchPayments
define('SuiteDynamics.StitchPayments.AddToken.View'
,	[
	'suitedynamics_stitchpayments_addtoken.tpl'
	
	,	'SuiteDynamics.StitchPayments.StitchPayments.SS2Model'
    ,   'SuiteDynamics.StitchPayments.StitchPayments.Model'

    ,   'OrderWizard.Module.PaymentMethod'
	
	,	'Backbone'
    ]
, function (
	suitedynamics_stitchpayments_addtoken_tpl
	
	,	StitchPaymentsSS2Model
    ,   StitchPaymentsModel

    ,   OrderWizardModulePaymentMethod
	
	,	Backbone
)
{
    'use strict';

	// @class SuiteDynamics.StitchPayments.StitchPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_stitchpayments_addtoken_tpl

	,	initialize: function (options) {

        console.log('add token')

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new StitchPaymentsModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		}

	,	events: {

        'click [data-action="stitch-token-success"]': 'stitchTokenSuccess'

		}

	,	bindings: {
		}

	, 	childViews: {

		}

    ,	stitchTokenSuccess: function()
    {

        console.log('stitch success',this)
        console.log('complete event handler', $('#ccnumfield'))
        let data = JSON.parse($('#in-modal-stitchtoken')[0].value);
        console.log('data', data);
        console.log('success this', this)

        let token = data.token 
        let expiry = data.expiry 
        console.log('last 4', token.slice(-4))

        var newPaymentModel = new StitchPaymentsModel()

        newPaymentModel.set('default_card', "Add-on Parent Item ID");
        newPaymentModel.set('exp_month', expiry.slice(-1));
        newPaymentModel.set('exp_year', expiry.slice(0,4));
        newPaymentModel.set('last_four', token.slice(-4));

        console.log('newPaymentModel', newPaymentModel)
    

        this.collection.add(newPaymentModel).save().then(function(result){
        
            console.log('result', result)
        })

        console.log('final collection', this.collection)

        // if(data.token && data.token !== ""){
        //     console.log('success set stitch', this)
        //     this.setStitchPaymentMethod();
        //     OrderWizardModulePaymentMethod.prototype.submit.apply(this, arguments);

        //     this.setTransactionFields(data);
        // }else{
        //     this.wizard.manageError({
        //     errorCode: 'ERR_WS_INVALID_CARD',
        //     errorMessage: Utils.translate('Invalid Card')
        //     });
        //     return jQuery.Deferred().reject({
        //         errorCode: 'ERR_WS_INVALID_CARD',
        //         errorMessage: Utils.translate('Invalid Card')
        //     });
        // } 
    } 

		//@method getContext @return SuiteDynamics.StitchPayments.StitchPayments.View.Context
	,	getContext: function getContext()
		{
			//@class SuiteDynamics.StitchPayments.StitchPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
