
function service(request, response)
{
	'use strict';
	try 
	{
		require('SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}