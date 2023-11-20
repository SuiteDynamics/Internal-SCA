
function service(request, response)
{
	'use strict';
	try 
	{
		require('SD.StitchPayments.StitchPaymentsModule.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SD.StitchPayments.StitchPaymentsModule.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}