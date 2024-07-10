
function service(request, response)
{
	'use strict';
	try 
	{
		
		require('SuiteDynamics.MotusPayments.MotusPayments.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SuiteDynamics.MotusPayments.MotusPayments.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}