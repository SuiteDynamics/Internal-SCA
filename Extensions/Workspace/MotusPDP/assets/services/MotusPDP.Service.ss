
function service(request, response)
{
	'use strict';
	try 
	{
		require('SD.MotusPDP.MotusPDP.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SD.MotusPDP.MotusPDP.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}