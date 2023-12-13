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

        var self = this
        let data = JSON.parse($('#in-modal-stitchtoken')[0].value);

        let token = data.token 
        let expiry = data.expiry 

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
    
        //disable continue button to prevent order submit until card is submitted in service
        $('.order-wizard-step-button-continue').prop("disabled",true);
        
        this.collection.add(newPaymentModel).save().then(function(result){
        
            if(result.status = 'success'){

                self.options.paymentMethodView.render();

                self.$containerModal &&
                self.$containerModal
                    .removeClass('fade')
                    .modal('hide')
                    .data('bs.modal', null);

                //display success checkmark 
                $('.stitch-success-checkmark-container').css('display','inline-block');
                $('#stitch-success-checkmark').css('animation','fill-success .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both');
                $('.checkmark_success_circle').css('animation','stroke .6s $curve forwards');

                $('.order-wizard-step-button-continue').prop("disabled",false);

            }else{
                //display fail checkmark
                $('.stitch-fail-checkmark-container').css('display','inline-block');
                $('#stitch-fail-checkmark').css('animation','fill-fail .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both');
                $('.checkmark_fail_circle').css('animation','stroke .6s $curve forwards');

                $('.order-wizard-step-button-continue').prop("disabled",false);
            }

        })

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
