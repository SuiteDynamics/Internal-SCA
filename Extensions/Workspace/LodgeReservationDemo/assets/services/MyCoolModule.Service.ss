
function service(request, response)
{
	'use strict';
	try 
	{
		require('SD.LodgeReservationDemo.MyCoolModule.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SD.LodgeReservationDemo.MyCoolModule.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}