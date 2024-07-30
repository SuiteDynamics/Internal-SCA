
function service(request, response)
{
	'use strict';
	try 
	{
		
		require('SuiteDynamics.StitchPayments.StitchPayments.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SuiteDynamics.StitchPayments.StitchPayments.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}