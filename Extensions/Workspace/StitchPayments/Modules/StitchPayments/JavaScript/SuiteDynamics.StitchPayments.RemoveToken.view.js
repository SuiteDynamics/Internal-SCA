// @module SuiteDynamics.StitchPayments.StitchPayments
//Not currently in use
define('SuiteDynamics.StitchPayments.RemoveToken.View'
,	[
	'suitedynamics_stitchpayments_removetoken.tpl'
	
	,	'SuiteDynamics.StitchPayments.StitchPayments.SS2Model'
    ,   'SuiteDynamics.StitchPayments.StitchPayments.Model'

    ,   'OrderWizard.Module.PaymentMethod'
	
	,	'Backbone'
    ,   'jQuery'
    ,   'Utils'
    ,   'underscore'
    ]
, function (
	suitedynamics_stitchpayments_removetoken_tpl
	
	,	StitchPaymentsSS2Model
    ,   StitchPaymentsModel

    ,   OrderWizardModulePaymentMethod
	
	,	Backbone
    ,   jQuery
    ,   Utils
    ,   _
)
{
    'use strict';

	// @class SuiteDynamics.StitchPayments.StitchPayments.View @extends Backbone.View
	return Backbone.View.extend({

		template: suitedynamics_stitchpayments_removetoken_tpl

	,	initialize: function (options) {

            var self = this;

            this.collection.on('reset sync add remove change', function (model) {
                
            //The collection is not self-populating the url, so we need to populate it to call the backend service. 
            self.collection.sync('delete',model,{url: _.getAbsoluteUrl("services/StitchPayments.Service.ss?id="+model.get("id")), wait:true}).done(function(result){
                
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

        'click [data-action="stitch-remove-token-line"]': 'stitchRemoveTokenLine'

		}

	,	bindings: {
		}

	, 	childViews: {

		}

    ,	stitchRemoveTokenLine: function(e)
    {
        var tokenID = e.currentTarget.id.split('in-modal-').pop();

        if(tokenID){

            var removeModel = this.options.collection.where({ id: tokenID });
            removeModel[0].destroy({wait:true});

        }
    } 

		//@method getContext @return SuiteDynamics.StitchPayments.StitchPayments.View.Context
	,	getContext: function getContext()
		{
			//@class SuiteDynamics.StitchPayments.StitchPayments.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				tokens: this.collection
			};
		}
	});
});
