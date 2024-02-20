
function service(request, response)
{
	'use strict';
	try 
	{
		require('SD.HuntingLicenseDemo.HuntingLicenseDemo.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SD.HuntingLicenseDemo.HuntingLicenseDemo.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}