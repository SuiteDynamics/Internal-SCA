// @module SuiteDynamics.MotusPayments.MotusPayments
define('SuiteDynamics.MotusPayments.AddToken.View'
,	[
	'suitedynamics_motuspayments_addtoken.tpl'
	
	,	'SuiteDynamics.MotusPayments.MotusPayments.SS2Model'
    ,   'SuiteDynamics.MotusPayments.MotusPayments.Model'

    ,   'OrderWizard.Module.PaymentMethod'
    ,	'GlobalViews.Message.View'
	
	,	'Backbone'
    ,   'jQuery'
    ,   'Utils'
    ]
, function (
	suitedynamics_motuspayments_addtoken_tpl
	
	,	MotusPaymentsSS2Model
    ,   MotusPaymentsModel

    ,   OrderWizardModulePaymentMethod
    ,	GlobalViewsMessageView
	
	,	Backbone
    ,   jQuery
    ,   Utils
)
{
    'use strict';

	// @class SuiteDynamics.MotusPayments.MotusPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_motuspayments_addtoken_tpl

	,	initialize: function (options) {
        console.log('add init',this)
        var self = this
        PTPayment.setup({    
            authorization: { clientKey: self.options.collection.models[0].get('clientkey') }
          }).then(function(instance){
               console.log('instance', instance)
          });
	}

	,	events: {

        'click [data-action="motus-token-success"]': 'motusTokenSuccess',
        'click [data-action="submit-card"]': 'submitCard'

		}

	,	bindings: {
		}

	, 	childViews: {

		}

    ,	submitCard: function(e)
    {
        console.log('submit card',this.options.collection.models[0].get('clientkey'))
        // $.get(Utils.getAbsoluteUrl(
        //     getExtensionAssetsPath(
        //         "Motus_Pub_Key/public_key.pem"
        //     )
        // ), function(data, status){
        //     alert("Data: " + data + "\nStatus: " + status);
        //   });

        // console.log('UTILS', Utils.getAbsoluteUrl(
        //     getExtensionAssetsPath(
        //         "Motus_Pub_Key/public_key.pem"
        //     )
        // ))

        // var encodedData = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFzaUQwdGpqSmZSOTA2MWFweXR5NQpicGJ1QXpvTENCM2p2S0JnYkJ3SlJxS3JvWEpNNDlkai9BOGlOTXIyQWg3QWdHK2NKdU9vcTlOT0YyUEN3aVFUClB2L21YYkdPMFBaU0x3YzV2QVBDOW1TSXpQVUFnTldGNDA3akxVRklMbFdFMHBzTDN3N3Rva3JHMDhiNWp3MXQKTmpRQktPR3cydWxCMTV6bG80d2lKdE9TaEF2RGJZaFF2MmdhaGRVU0swVUd3TXk5c2ZOc3RYOFFZRDRhbVNTNgo5RFE0RVZqZWZGbHBOeUthQUxuNEZWcHlqLzJVakFJRFZZLzZYWFM3NzdKSDBqclZIOGhwcXhWaHlqZnhHUythCkdPRGlHWjA0OWlieTczUFo1Y215WE9CaTlTeFBocCtpY2pjdGtzTTBNWUVHbTNHdDdidHZ2R2NiZnFtR21tN2wKS3dJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t";
        // var decodedData = atob(encodedData);
        // console.log(decodedData)
        // paytrace.setKey(decodedData);

        var self = this;
        console.log('submit card self', self)

        var token_number = $( "input[name*='cardid']" )[0].value;
        console.log('ccnum',token_number)                                   
        var lastFour = token_number.slice(-4);
        var expiryYear = $( "select[name*='year']" )[0].value;
        var expiryMonth = $( "select[name*='month']" )[0].value;
        var cardType = this.getCardType(token_number)
        var csc = $( "input[name*='cvvid']" )[0].value;

        var order = this.options.paymentMethodView.model

        var userProfile = this.options.userProfile

        var newPaymentModel = new MotusPaymentsModel()

        //Card information
        newPaymentModel.set('name', 'Motus' + ' ' + cardType + ' ' + lastFour);
        newPaymentModel.set('exp_month', expiryMonth);
        newPaymentModel.set('exp_year', expiryYear);
        newPaymentModel.set('last_four', lastFour);
        newPaymentModel.set('token', token_number);
        newPaymentModel.set('card_type', cardType);
        newPaymentModel.set('csc', csc);
        //Profile information
        newPaymentModel.set('first_name', userProfile.firstname);
        newPaymentModel.set('last_name', userProfile.lastname);
        newPaymentModel.set('phone', userProfile.phoneinfo.phone);
        newPaymentModel.set('email', userProfile.email);
        //newPaymentModel.set('motus_id', _.findWhere(userProfile.customfields,{ id: "custentity_profile_id_motus" }).value);
        //Order information
        newPaymentModel.set('amount', order.get('summary').total);


        //Billing Address
        var billAddress = this.model.get('addresses').where({'internalid': this.model.get('billaddress')})
        var billingAddrObj = {
            "name": billAddress[0].get('fullname'),
            "street_address": billAddress[0].get('addr1'),
            "city": billAddress[0].get('city'),
            "state": billAddress[0].get('state'),
            "zip": billAddress[0].get('zip')
        }
        console.log('billingAddrObj', billingAddrObj)
        newPaymentModel.set('billingAddr', billingAddrObj);

        console.log('newPaymentModel', newPaymentModel)

        //disable continue button to prevent order submit until card is submitted in service
        $('.order-wizard-step-button-continue').prop("disabled",true);
        $('.btn').prop("disabled",true);
        this.collection.add(newPaymentModel, { at: this.collection.length - 1 }).save().then(function(result){
            console.log('token result', result);
            if(result.status == 'Success'){


                //We need to grab the user profile and overwrite the old one because the customer motus token has changed.
                // self.options.container.getComponent("UserProfile").getUserProfile().done(function(result){
                //     self.options.userProfile = result
                // })

                self.removeActive();
                newPaymentModel.set('active', true);
                //newPaymentModel.set('type', true);
                console.log('hide')
                self.$containerModal &&
                self.$containerModal
                    .removeClass('fade')
                    .modal('hide')
                    .data('bs.modal', null);
            
                $('.order-wizard-step-button-continue').prop("disabled",false);
                $('.btn').prop("disabled",false);
                //self.setTransactionFields(self.options.paymentMethodView.paymentMethod.get('internalid'), result.authData);
                console.log('set wizard', self)
                self.options.paymentMethodView.wizard.motusActive = true
                self.options.paymentMethodView.wizard.motusSelected = result.id
                self.options.paymentMethodView.render();

            }else{

                console.log('display fail marks', self);
                self.$containerModal &&
                self.$containerModal
                    .removeClass('fade')
                    .modal('hide')
                    .data('bs.modal', null);

                var $alert_warn = $('#motus-fail-message');
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
    // ,	motusTokenSuccess: function()
    // {
    //     console.log('motustokensuccess',this)
    //     var self = this
    //     let data = JSON.parse($('#in-modal-motustoken')[0].value);

    //     let token = data.token 
    //     let expiry = data.expiry 

    //     var order = this.options.paymentMethodView.model

    //     var userProfile = this.options.userProfile

    //     var newPaymentModel = new MotusPaymentsModel()

    //     //Card information
    //     newPaymentModel.set('new', token);
    //     newPaymentModel.set('default_card', "Add-on Parent Item ID");
    //     newPaymentModel.set('expiry', expiry)
    //     newPaymentModel.set('exp_month', expiry.slice(-1));
    //     newPaymentModel.set('exp_year', expiry.slice(0,4));
    //     newPaymentModel.set('last_four', token.slice(-4));
    //     newPaymentModel.set('token', token);
    //     //Profile information
    //     newPaymentModel.set('first_name', userProfile.firstname);
    //     newPaymentModel.set('last_name', userProfile.lastname);
    //     newPaymentModel.set('phone', userProfile.phoneinfo.phone);
    //     newPaymentModel.set('email', userProfile.email);
    //     newPaymentModel.set('motus_id', _.findWhere(userProfile.customfields,{ id: "custentity_profile_id_motus" }).value);
    //     //Order information
    //     newPaymentModel.set('amount', order.get('summary').total);

    //     console.log('newPaymentModel', newPaymentModel)

    //     //disable continue button to prevent order submit until card is submitted in service
    //     $('.order-wizard-step-button-continue').prop("disabled",true);
        
    //     this.collection.add(newPaymentModel, { at: this.collection.length - 1 }).save().then(function(result){
    //         console.log('token result', result);
    //         if(result.status == 'Success'){


    //             //We need to grab the user profile and overwrite the old one because the customer motus token has changed.
    //             self.options.container.getComponent("UserProfile").getUserProfile().done(function(result){
    //                 self.options.userProfile = result
    //             })

    //             self.removeActive();
    //             newPaymentModel.set('active', true);
    //             newPaymentModel.set('type', true);

    //             self.$containerModal &&
    //             self.$containerModal
    //                 .removeClass('fade')
    //                 .modal('hide')
    //                 .data('bs.modal', null);
            
    //             $('.order-wizard-step-button-continue').prop("disabled",false);

    //             //self.setTransactionFields(self.options.paymentMethodView.paymentMethod.get('internalid'), result.authData);
    //             self.options.paymentMethodView.wizard.motusActive = true
    //             self.options.paymentMethodView.wizard.motusSelected = result.id
    //             self.options.paymentMethodView.render();

    //         }else{

    //             console.log('display fail marks', self);
    //             self.$containerModal &&
    //             self.$containerModal
    //                 .removeClass('fade')
    //                 .modal('hide')
    //                 .data('bs.modal', null);

    //             var $alert_warn = $('#motus-fail-message');
    //             console.log($alert_warn)
    //             $alert_warn.html(
    //                 new GlobalViewsMessageView({
    //                     message: 'Card failure. Please try a different card',
    //                     type: 'error',
    //                     closable: true
    //                 }).render().$el
    //             );

    //             $('.order-wizard-step-button-continue').prop("disabled",false);
    //         }

    //         newPaymentModel.set('card_type', result.type);

    //     })

    // } 
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
            'custbody_sd_select_mt_card': paymentSelected,
            'custbody_sd_motus_token_response': JSON.stringify(authData)
        }

        this.options.paymentMethodView.model.set('options', transactionBodyFields);
    }

    ,   getCardType: function(tokenNumber)
    {

        // Get card type
        var req1 = tokenNumber.substring(0, 1);
        console.log('req1',req1)   
        var req2 = tokenNumber.substring(0, 2);
        console.log('req2',req2)  
        var cardType;
        if (req2=='34' || req2=='37') {
            cardType = 'Amex'
        } else if (req1=='4') {
            cardType = 'Visa'
        } else if (req2=='51' || req2=='52' || req2=='53' || req2=='54' || req2=='55') {
            cardType = 'Master Card'
        } else if (req1 == '6') {
            cardType = 'Discover'
        } else if (req2=='36') {
            cardType = 'Diners'
        } else if (req2=='35') {
            cardType = 'JCB'
        }else{
         cardType = ' ';
        } 
        return cardType;

    }

		//@method getContext @return SuiteDynamics.MotusPayments.MotusPayments.View.Context
	,	getContext: function getContext()
		{

            console.log('Add Token', this)
			//@class SuiteDynamics.MotusPayments.MotusPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
