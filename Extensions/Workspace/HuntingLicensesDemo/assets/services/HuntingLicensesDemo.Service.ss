
function service(request, response)
{
	'use strict';
	try 
	{
		require('SD.HuntingLicensesDemo.HuntingLicensesDemo.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SD.HuntingLicensesDemo.HuntingLicensesDemo.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}