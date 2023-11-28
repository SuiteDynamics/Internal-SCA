// @module SD.StitchPayments.StitchPaymentsModule
define('SD.StitchPayments.StitchPaymentsModule.View'
,	[
	'sd_stitchpayments_stitchpaymentsmodule.tpl'
	
	,	'SD.StitchPayments.StitchPaymentsModule.SS2Model'
	,   'LiveOrder.Model'
	,   'jQuery'
	,	'Backbone'
    ]
, function (
	sd_stitchpayments_stitchpaymentsmodule_tpl
	
	,	StitchPaymentsModuleSS2Model
	,   LiveOrderModel
	,   jQuery
	,	Backbone
)
{
    'use strict';

	// @class SD.StitchPayments.StitchPaymentsModule.View @extends Backbone.View
	return Backbone.View.extend({

		template: sd_stitchpayments_stitchpaymentsmodule_tpl

	,	initialize: function (options) {

			console.log('stitch module view',)
			this.render();

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new StitchPaymentsModuleModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		}

	,	events: {
		'click [data-action="token-success"]': 'onCompleteHandler'
		}

	,	bindings: {
		}

	, 	childViews: {

		}
	
	, onCompleteHandler: function onCompleteHandler(event) {

			console.log('complete event handler', $('#in-modal-mytoken'))
			let data = JSON.parse($('#in-modal-mytoken')[0].value);
			console.log('data', data)
			  //var data = event.data || Object.create(null);

			  //console.log('checkout data:',data);
			  
			  if(data.errorCode == "0" && data.token){

				console.log('liveorder', 'liveorder')
				  
				  var cart = LiveOrderModel.getInstance();
				  
				  data.shipaddress = cart.get('shipaddress') || '';
				  data.billaddress = cart.get('billaddress') || '';
				  data.purchase_order = cart.get('purchasenumber') || '';
				  data.options = cart.get('options') || {};
				  data.payment_method = stitch_payment_method;
				  
				  data.order_summary = cart.get('summary') || {};
				  
				  data.order_summary.lines = cart.get('lines').map(function(line){
					  return {
						  item: line.get('item').get('internalid'),
						  quantity: line.get('quantity'),
						  amount: line.get('total')
					  }
				  });
				  
				  //block UI
				  jQuery('body').append('<div id="stitch-checkout-blocker"></div>');
				  
				  sdkData.save({'stitch': data}).then(function(response){
					
					
					if( _.has(response,'orderCreated') ){
						
						cart.set('lines',[]);
						
						jQuery('.checkout-layout-content').html('<div class="order-wizard-confirmation-module alert fade in"><h2 class="order-wizard-confirmation-module-title">Thank you for shopping with us!</h2><p class="order-wizard-confirmation-module-body">We received your order and will process it right away.</p><p class="order-wizard-confirmation-module-body" data-type="additional-confirmation-message">You will receive an email with this confirmation in a few minutes.</p><a class="order-wizard-confirmation-module-continue" href="/" data-touchpoint="home" data-hashtag="#/">Continue shopping</a></div>');
					}
					  
					else if(_.has(response,'confirmation')){
						var confirmation = response.confirmation;
						
						cart.set('confirmation',confirmation);
						cart.set('lines',[]);
						Backbone.history.navigate('confirmation',{ trigger: true, replace: true });
					}
					else{
						var error = _.has(response,'error')? response.error : {};
						
						if(error.code == 'ERR_WS_REQUIRE_CUSTOMER_LOGIN'){
							
							window.location.reload();
						}
						else{
							if(error.code == 'ERR_WS_SET_SHIPPING_ADDRESS'){
								error.details = 'Please add a shipping address.';
							}
							self.$('#payment-method-selector-content').html('<div class="global-views-message global-views-message-error alert">'+ error.code +': '+ error.details +'</div></div>');
						}
						
					}
						
					jQuery('body').find('#stitch-checkout-blocker').remove();
				  });
			  }
			}	

		//@method getContext @return SD.StitchPayments.StitchPaymentsModule.View.Context
	,	getContext: function getContext()
		{
			console.log('stitch module view2')
			//@class SD.StitchPayments.StitchPaymentsModule.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
