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

        var self = this;
        console.log('add token',options)
        options.container.getComponent("UserProfile").getUserProfile().done(function(result){
            console.log('profile result', result)
            self.userProfile = result
        })

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
        var self = this
        console.log('complete event handler', $('#ccnumfield'))
        let data = JSON.parse($('#in-modal-stitchtoken')[0].value);
        console.log('data', data);
        console.log('success this', this)

        let token = data.token 
        let expiry = data.expiry 
        console.log('last 4', token.slice(-4))

        var newPaymentModel = new StitchPaymentsModel()

        //Card information
        newPaymentModel.set('default_card', "Add-on Parent Item ID");
        newPaymentModel.set('expiry', expiry)
        newPaymentModel.set('exp_month', expiry.slice(-1));
        newPaymentModel.set('exp_year', expiry.slice(0,4));
        newPaymentModel.set('last_four', token.slice(-4));
        newPaymentModel.set('token', token);
        //Profile information
        newPaymentModel.set('first_name', this.userProfile.firstname);
        newPaymentModel.set('last_name', this.userProfile.firstname);
        newPaymentModel.set('phone', this.userProfile.phoneinfo.phone);
        newPaymentModel.set('email', this.userProfile.email);
        newPaymentModel.set('stitch_id', _.findWhere(this.userProfile.customfields,{ id: "custentity_sd_stitch_profile_id" }).value);

        console.log('newPaymentModel', newPaymentModel)
    

        this.collection.add(newPaymentModel).save().then(function(result){
        
            console.log('result', result)
            if(result.status = 'success'){
                self.$containerModal &&
                self.$containerModal
                    .removeClass('fade')
                    .modal('hide')
                    .data('bs.modal', null);
            }

            
            console.log('result self', self)
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

            console.log('get context', this)
			//@class SuiteDynamics.StitchPayments.StitchPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
