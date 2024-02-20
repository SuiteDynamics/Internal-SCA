
define(
	'SD.MotusPDP.MotusPDP'
,   [
		'SD.MotusPDP.MotusPDP.View'
	]
,   function (
		MotusPDPView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			// using the 'Layout' component we add a new child view inside the 'Header' existing view 
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html
			
			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			console.log('motus PDP')
			if(layout)
			{
				layout.registerView('Motus.PDP', function() { 
					return new MotusPDPView({ container: container });
				});

				layout.addToViewContextDefinition('ProductDetails.Full.View', 'showMotusQuantity', 'string', function(context) {
					if(context.model.item.displayname.includes("Motus")){
						return true;
					}else{
						return false;
					}
				  });
			}


		}
	};
});
