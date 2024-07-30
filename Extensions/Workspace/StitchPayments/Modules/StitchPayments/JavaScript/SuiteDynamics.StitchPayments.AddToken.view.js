// @module SuiteDynamics.StitchPayments.StitchPayments
define('SuiteDynamics.StitchPayments.AddToken.View'
,	[
	'suitedynamics_stitchpayments_addtoken.tpl'
	
    ,   'SuiteDynamics.StitchPayments.StitchPayments.Model'

    ,	'GlobalViews.Message.View'
	
	,	'Backbone'
    ]
, function (
	suitedynamics_stitchpayments_addtoken_tpl
	
    ,   StitchPaymentsModel

    ,	GlobalViewsMessageView
	
	,	Backbone
)
{
    'use strict';

	// @class SuiteDynamics.StitchPayments.StitchPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_stitchpayments_addtoken_tpl

	,	initialize: function (options) {

	}

	,	events: {

        'click [data-action="stitch-add-token"]': 'addToken'

		}

	,	bindings: {
		}

	, 	childViews: {

		}

    ,	addToken: function()
    {
        console.log('stitchtokensuccess',$('#in-modal-stitchtoken'))

        //TODO: Add promise instead. Inserted timer for Demo purposes.
        if($('#in-modal-stitchtoken')[0].value !== ""){
            console.log('process')
            this.processToken(this)
        }else{
            console.log('process later')
            setTimeout(this.processToken, 100, this);
        }

    } 

    ,   processToken: function(view){
        console.log('process', view)
        console.log('after stitchtokensuccess',$('#in-modal-stitchtoken'))
        var self = view
        let data = JSON.parse($('#in-modal-stitchtoken')[0].value);

        let token = data.token 
        let expiry = data.expiry 

        var order = view.options.paymentMethodView.model

        var userProfile = view.options.userProfile

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
        newPaymentModel.set('stitch_id', _.findWhere(userProfile.customfields,{ id: "custentity_profile_id_stitch" }).value);
        
        //Order information
        newPaymentModel.set('amount', order.get('summary').total * 100);

        console.log('newPaymentModel', newPaymentModel)

        //disable continue button to prevent order submit until card is submitted in service
        $('.order-wizard-step-button-continue').prop("disabled",true);
        
        view.collection.add(newPaymentModel, { at: view.collection.length - 1 }).save().then(function(result){
            console.log('token result', result);
            if(result.status == 'Success'){


                //We need to grab the user profile and overwrite the old one because the customer stitch token has changed.
                self.options.container.getComponent("UserProfile").getUserProfile().done(function(result){
                    self.options.userProfile = result
                })

                self.removeActive();
                newPaymentModel.set('active', true);
                newPaymentModel.set('type', true);

                self.$containerModal &&
                self.$containerModal
                    .removeClass('fade')
                    .modal('hide')
                    .data('bs.modal', null);
            
                $('.order-wizard-step-button-continue').prop("disabled",false);

                //self.setTransactionFields(self.options.paymentMethodView.paymentMethod.get('internalid'), result.authData);
                self.options.paymentMethodView.wizard.stitchActive = true
                self.options.paymentMethodView.wizard.stitchSelected = result.id
                self.options.paymentMethodView.render();

            }else{

                console.log('display fail marks', self);
                self.$containerModal &&
                self.$containerModal
                    .removeClass('fade')
                    .modal('hide')
                    .data('bs.modal', null);

                var $alert_warn = $('#stitch-fail-message');
                console.log($alert_warn)
                $alert_warn.html(
                    new GlobalViewsMessageView({
                        message: 'Card failure. Please try a different card',
                        type: 'error',
                        closable: true
                    }).render().$el
                );

                $('.order-wizard-step-button-continue').prop("disabled",false);
            }

            newPaymentModel.set('card_type', result.type);

        })
    }
    ,	removeActive: function()
    {
        var activeCards = this.options.collection.where({'active': true})
        _.each(activeCards, function(card) {
            card.set('active', false)
        });        
    }
    ,	setTransactionFields: function(paymentSelected, authData)
    {
        var transactionBodyFields = {
            'custbody_sd_select_st_card': paymentSelected,
            'custbody_sd_stitch_token_response': JSON.stringify(authData)
        }

        this.options.paymentMethodView.model.set('options', transactionBodyFields);
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
