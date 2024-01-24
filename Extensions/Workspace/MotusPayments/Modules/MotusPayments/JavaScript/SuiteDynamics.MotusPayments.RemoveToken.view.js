// @module SuiteDynamics.MotusPayments.MotusPayments
//Not currently in use
define('SuiteDynamics.MotusPayments.RemoveToken.View'
,	[
	'suitedynamics_motuspayments_removetoken.tpl'
	
	,	'SuiteDynamics.MotusPayments.MotusPayments.SS2Model'
    ,   'SuiteDynamics.MotusPayments.MotusPayments.Model'

    ,   'OrderWizard.Module.PaymentMethod'
	
	,	'Backbone'
    ,   'jQuery'
    ,   'Utils'
    ,   'underscore'
    ]
, function (
	suitedynamics_motuspayments_removetoken_tpl
	
	,	MotusPaymentsSS2Model
    ,   MotusPaymentsModel

    ,   OrderWizardModulePaymentMethod
	
	,	Backbone
    ,   jQuery
    ,   Utils
    ,   _
)
{
    'use strict';

	// @class SuiteDynamics.MotusPayments.MotusPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_motuspayments_removetoken_tpl

	,	initialize: function (options) {

            var self = this;

            this.collection.on('reset sync add remove change', function (model) {
                
            //The collection is not self-populating the url, so we need to populate it to call the backend service. 
            self.collection.sync('delete',model,{url: _.getAbsoluteUrl("services/MotusPayments.Service.ss?id="+model.get("id")), wait:true}).done(function(result){
                
                if(result.status == 'Success'){
                    self.render();
                }else{
                    return jQuery.Deferred().reject({
                        errorCode: 'ERR_WS_INVALID_CARD',
                        errorMessage: Utils.translate('Invalid Card')
                    });
                }
            })
                
            });

		}

	,	events: {

        'click [data-action="motus-remove-token-line"]': 'motusRemoveTokenLine'

		}

	,	bindings: {
		}

	, 	childViews: {

		}

    ,	motusRemoveTokenLine: function(e)
    {
        var tokenID = e.currentTarget.id.split('in-modal-').pop();

        if(tokenID){

            var removeModel = this.options.collection.where({ id: tokenID });
            removeModel[0].destroy({wait:true});

        }
    } 

		//@method getContext @return SuiteDynamics.MotusPayments.MotusPayments.View.Context
	,	getContext: function getContext()
		{
			//@class SuiteDynamics.MotusPayments.MotusPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				tokens: this.collection
			};
		}
	});
});
