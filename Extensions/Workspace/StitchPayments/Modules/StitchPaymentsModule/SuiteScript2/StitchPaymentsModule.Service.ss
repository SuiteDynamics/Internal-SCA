/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define(['N/search','N/https'],function (search,https) {
    "use strict";
	
	function stitch_CredentialsSearch(){
		
		var credentialsSearchObj = search.create({
			type: "customrecord_stitch_credentials",
			filters: ["isinactive","is",'F'],
			columns: [
				  "custrecord_sd_stitch_api_url",
				  "custrecord_sd_stitch_secret_key",
				  "custrecord_sd_stitch_public_key"
			]
		});
		var credentials_object = {};
		credentialsSearchObj.run().each(function(result){
			credentials_object.api_url = result.getValue("custrecord_sd_stitch_api_url");
			credentials_object.secret_key = result.getValue("custrecord_sd_stitch_secret_key");
			credentials_object.public_key = result.getValue("custrecord_sd_stitch_public_key");
			return false;
		});
		return credentials_object;
	}
	function generateToken(credentials_object){
		
		var stitchTokensApiUrl = credentials_object.api_url + '/authentication'; 
		
		var headerObj = {
			'Content-Type': 'application/json'
		};
		var JSONObj = {
			"public_key": credentials_object.public_key,
			"private_key": credentials_object.secret_key
		};
		var apiResponse = https.post({
			url: stitchTokensApiUrl,
			body: JSON.stringify(JSONObj),
			headers: headerObj
		});
			
		var response = apiResponse.body? JSON.parse(apiResponse.body): {};
		
		return (response && response.token);
	}
	function createSession(ctx){
		
		var credentials_object = stitch_CredentialsSearch();
		
		var authToken = generateToken(credentials_object);
		
		var stitchApiUrl = credentials_object.api_url + '/session';
		var headerObj = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		};

		var apiResponse = https.post({
			url: stitchApiUrl,
			body: ctx.request.body,
			headers: headerObj
		});
		
		var response = apiResponse.body? JSON.parse(apiResponse.body): {};
			
		var order = (response && response.order);
		
		var order_uuid = (order && order.uuid);
		
		var checkout_url = (order && order.checkout_url);
		
		if(!(checkout_url && order_uuid)){
			log.error('ctx.request.body',ctx.request.body);
			log.error('apiResponse',apiResponse.body);
		}
		var returnObj = {
			'checkout_url': checkout_url || '',
			'order_uuid': order_uuid || ''
		};
		
		ctx.response.write(JSON.stringify(returnObj));
	}
    return {
        service: createSession
    };
});
