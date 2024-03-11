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
        // PTPayment.setup({    
        //     authorization: { clientKey: this.options.collection.models[0].get('clientkey') }
        //   }).then(function(instance){
        //        console.log('instance', instance)
        //       //use instance object to process and tokenize sensitive data payment fields.
        //   });.
        PTPayment.setup({    
            authorization: { clientKey: self.options.collection.models[0].get('clientkey') }
          }).then(function(instance){
               console.log('instance', instance)
              //use instance object to process and tokenize sensitive data payment fields.
          });
		this.on('afterViewRender',function(){

            console.log('add view after render')
			//  $('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
            //$('head').append('<script src="https://api.paytrace.com/assets/e2ee/paytrace-e2ee.js"></script>');
            //  $('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
            // PTPayment.setup({    
            //     authorization: { clientKey: "NFSgOzU7Am2Fh34+SSuXew==./LIH5Wkc/CVI0TMUvmabXboubebH8Qs70sAEDrsZmQbtqbnqAdH/gehlBekoLKt3YA1IOHZgMRE3huXpUqv4ZAmJ0giZaqqb6DAOdtOfMx/994oOcwDLnEP5WkaegQi+/08EIzQklqGfqVIYm+sMRof2e567duQwB/QFzYUvIICBemiiAIIkQ8mSQ5Il+zoOhTBmRbdX9oj1uYqFWUoVlDRYonRh7yHMiJiixWzXX9s8kiROxu7//9rUa056qkmQA6XJECodMyxj+so+8Qcpfw1UeNAs5845Wxzv4A7rJPV+5YBdWCzHZMvPRUMZaNOwOSvJJXQWh0OYPt2QgeTupgP65hXPMWhJEeiyRyX2hyl2FI+rRzFnnqLCQgviezjG4GjExjeyMUQtm7KSXcKmrhH9D4H1F2DKZLUymqXJUf4JHKvfMgxRBaFzFhJDNXGRYufXq4dfuPJX6Y2UfYlippmApgNWqp14ppW8yC7XnpyMyZyWbohK/Bjn4NZfAio+" }
            //   }).then(function(instance){
            //        console.log('instance', instance)
            //       //use instance object to process and tokenize sensitive data payment fields.
            //   });
            console.log('add init listener')
            // jQuery(document).ready(function(){
            //     console.log('view render',self)
            //     // $('head').append('<script src="https://api.paytrace.com/assets/e2ee/paytrace-e2ee.js"></script>');
            //     // jQuery('head').append('<script src="https://protect.sandbox.paytrace.com/js/protect.min.js" type="application/javascript"></script>');
            //     PTPayment.setup({    
            //         authorization: { clientKey: self.options.collection.models[0].get('clientkey') }
            //       }).then(function(instance){
            //            console.log('instance', instance)
            //           //use instance object to process and tokenize sensitive data payment fields.
            //       });
            //     // console.log('setpaytrace', paytrace)
            //     // paytrace.setKeyAjax("https://7050356-sb1.app.netsuite.com/core/media/media.nl?id=15579&c=7050356_SB1&h=GyGcwcnLfnS9NWCfcjBji8Ttk2kbyhmRI7WnbemgxZpU5kQE&_xt=.cer");
            // })
		})
	}

	,	events: {

        'click [data-action="submit-card"]': 'submitCard'

		}

	,	bindings: {
		}

	, 	childViews: {

		}

    ,	submitCard: function(e)
    {
        console.log('submit card',this.options.collection.models[0].get('clientkey'))

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

        console.log('newPaymentModel', newPaymentModel)

        //disable continue button to prevent order submit until card is submitted in service
        $('.order-wizard-step-button-continue').prop("disabled",true);
        $('.btn').prop("disabled",true);
        this.collection.add(newPaymentModel, { at: this.collection.length - 1 }).save().then(function(result){
            console.log('token result', result);
            if(result.status == 'Success'){

                self.removeActive();
                newPaymentModel.set('active', true);

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

			//@class SuiteDynamics.MotusPayments.MotusPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
