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
        // options.container.getComponent("UserProfile").getUserProfile().done(function(result){
        //     console.log('profile result', result)
        //     self.userProfile = result
        // })
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
        console.log('stitchtokensuccess',this)
        var self = this
        let data = JSON.parse($('#in-modal-stitchtoken')[0].value);

        let token = data.token 
        let expiry = data.expiry 

        var order = this.options.paymentMethodView.model

        var userProfile = this.options.userProfile

        var newPaymentModel = new StitchPaymentsModel()

        //Card information
        newPaymentModel.set('new', token);
        newPaymentModel.set('default_card', "Add-on Parent Item ID");
        newPaymentModel.set('expiry', expiry)
        newPaymentModel.set('exp_month', expiry.slice(-1));
        newPaymentModel.set('exp_year', expiry.slice(0,4));
        newPaymentModel.set('last_four', token.slice(-4));
        newPaymentModel.set('token', token);
        //Profile information
        newPaymentModel.set('first_name', userProfile.firstname);
        newPaymentModel.set('last_name', userProfile.lastname);
        newPaymentModel.set('phone', userProfile.phoneinfo.phone);
        newPaymentModel.set('email', userProfile.email);
        newPaymentModel.set('stitch_id', _.findWhere(userProfile.customfields,{ id: "custentity_sd_stitch_profile_id" }).value);
        //Order information
        newPaymentModel.set('amount', order.get('summary').total);

        console.log('newPaymentModel', newPaymentModel)

        //disable continue button to prevent order submit until card is submitted in service
        $('.order-wizard-step-button-continue').prop("disabled",true);
        
        this.collection.add(newPaymentModel).save().then(function(result){
            console.log('auth result', result);
            if(result.status == 'Success'){
                console.log('success', self);
                //self.options.paymentMethodView.options.authResponse = result.authData

                //newPaymentModel.set('active', true);

                self.$containerModal &&
                self.$containerModal
                    .removeClass('fade')
                    .modal('hide')
                    .data('bs.modal', null);

                //display success checkmark 
                console.log('display check marks', "self");
                $('.stitch-success-checkmark-container').css('display','inline-block');
                $('#stitch-success-checkmark').css('animation','fill-success .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both');
                $('.checkmark_success_circle').css('animation','stroke .6s $curve forwards');
            
                $('.order-wizard-step-button-continue').prop("disabled",false);

                self.setTransactionFields(self.options.paymentMethodView.paymentMethod.get('internalid'), result.authData)
                self.options.paymentMethodView.render();

            }else{
                console.log('display fail marks', "self");
                //display fail checkmark
                $('.stitch-fail-checkmark-container').css('display','inline-block');
                $('#stitch-fail-checkmark').css('animation','fill-fail .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both');
                $('.checkmark_fail_circle').css('animation','stroke .6s $curve forwards');

                $('.order-wizard-step-button-continue').prop("disabled",false);
            }

        })

    } 
    ,	setTransactionFields: function(paymentSelected, authData)
    {
        console.log('set',paymentSelected)
        console.log('set',authData)

        //console.log('set2',JSON.stringify(this.options.authResponse.response))

        var transactionBodyFields = {
            'custbody_sd_select_st_card': paymentSelected,
            'custbody_sd_stitch_token_response': JSON.stringify(authData)
        }

        this.options.paymentMethodView.model.set('options', transactionBodyFields);
        console.log('after set',this)
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
