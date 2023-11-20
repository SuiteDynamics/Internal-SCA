
define(
	'SD.StitchPayments.Shopping'
,   [
		'underscore',
		'jQuery',
		'StitchPayments.View'
	]
,   function (
		_,
		jQuery,
		StitchPaymentsView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			var layout = container.getComponent('Layout');
			var environment = container.getComponent('Environment');
			
			layout.addChildView('Footer', function () {
				return new StitchPaymentsView({
					container: container,
					environment: environment
				});
			});
			
		}
	};
});
