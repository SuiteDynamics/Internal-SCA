/**
@NApiVersion 2.1
@NScriptType UserEventScript
@NModuleScope SameAccount
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/log', 'N/https', 'N/url', 'N/record', './SD_LB_Stitch.js', 'N/search', 'N/error', 'N/ui/message'],


	function (ui, runtime, log, https, url, record, lb_stitch, search, error, message) {

		function beforeLoad(scriptContext) {
			log.emergency({title: 'beforesLoad',details: 'Acuadros'});

			try {
				var newRecord = scriptContext.newRecord;
				if (runtime.executionContext === runtime.ContextType.USER_INTERFACE && scriptContext.type === scriptContext.UserEventType.VIEW) {
					var form = scriptContext.form;
					form.clientScriptModulePath = './SD_CS_Stitch_Customer.js';

					var button = form.addButton({
						id: 'custpage_add_card_btn', label: 'Add New Card(Stitch)', functionName: 'add_new_card("' + scriptContext.type + '")'
					});
					var fieldInlineHtml = form.addField({
						id: 'custpage_frame_api',
						label: 'Frame API Inline HTML',
						type: ui.FieldType.INLINEHTML,
					});

					custId = scriptContext.newRecord.getValue('entity');
					recId = scriptContext.newRecord.id;
					recType = scriptContext.newRecord.type;
					cardToken = scriptContext.newRecord.getValue('custbody_sd_select_st_card')

					var htmlString = `<!DOCTYPE html>
					<html lang="en">
					   <head>
						  <title> Stitch Tokenizer </title>
						  <meta charset="utf-8">
						  <meta name="viewport" content="width=device-width, initial-scale=1">
						  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
						  <style>
							 h4.modal-title {
							 font-size: 20px;
							 margin: 0px;
							 color: #ffffff;
							 }
							 .modal-header {
							 background-color: #f18448;
							 border-top-left-radius: 15px;
							 border-top-right-radius: 15px;
							 }
							 .modal-content {
							 border-radius: 30px;
							 }
							 .modal-body {
							 background-color: antiquewhite;
							 border-bottom-left-radius: 15px;
							 border-bottom-right-radius: 15px;
							 }
							 .modal-header .close {
							 margin-top: -2px;
							 color: #fff;
							 opacity: 1;
							 }
							 .fail {
							 color: #e84d4d;
							 }
							 p {
							 color: #404F5E;
							 font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
							 font-size: 20px;
							 margin: 0;
							 }						 
							 body {
							 background: #EBF0F5;
							 }	
							 .btn-smy{
								display: none;
							 }					
						  </style>
						  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
						  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
						  <script>
							 $(document).ready(function () {
							 
								 $("#myBtn").click(
									 function (event) {
										 event.preventDefault()
										 console.log('modal')
									 }
								 );
							 
								 $("#myBtnn").click(
									 function (event) {
										 event.preventDefault()
										 console.log('modal')
									 }
								 );
							 
							 });
						  </script>
						  <script language="JavaScript">
							 window.addEventListener('message', function (event) {
								 var token = JSON.parse(event.data);
								 console.log('token', token);
								 var tokenField = document.getElementsByClassName("inputreadonly");
								 var tokenResponse = [];
								 if (token.message) {
									 tokenResponse.push(token.message)
									 tokenResponse.push(token.expiry)
									 console.log('token', token);
									 document.getElementById("mytoken").value = tokenResponse;
									 tokenField.value = tokenResponse;
									 document.getElementById("myBtnn").style.display='block';
								 } else {
									document.getElementById("myBtnn").style.display='none';
								 }
							 }, false);
							 
						  </script>
					   </head>
					   <body style="text-align: center; padding: 40px 0;">
						  <div class="container">
							 <!-- Trigger the modal with a button -->
							 <button type="button" id="modelbttn" class="btn btn-info btn-smy" data-toggle="modal" data-target="#myModal">ADD CARD</button>
							 <!-- Modal -->
							 <div class="modal fade" id="myModal" role="dialog">
								<div class="modal-dialog">
								   <!-- Modal content-->
								   <div class="modal-content">
									  <div class="modal-header">
										 <button type="button" id="closebttn" class="close" data-dismiss="modal">&times;</button>
										 <h4 class="modal-title">Generate Token</h4>
									  </div>
									  <div class="modal-body">
										 <div id="tokenid">
											<form name="tokenform" id="tokenform" style="width: 200px; height: 200px; ">
											   <div position:relative;">
												  <iframe style="width: 600px; height: 320px; id=" tokenFrame" name="tokenFrame"
													 src="https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html?css=form%23tokenform%20%7B%0A%20%20border-radius%3A%205px%3B%0A%20%20%20%20width%3A%20552px%3B%0A%7D%0A%0A%0Aselect%23ccexpiryyear%2C%20select%23ccexpirymonth%20%7B%0A%20%20padding%3A%200.25rem%201rem%3B%0A%20%20border-radius%3A%205px%3B%0A%20%20margin%3A%200.5rem%200px%201rem%200px%3B%0A%7D%0Ainput%23ccnumfield%20%7B%0A%20%20width%3A%20calc(100.0%25%20-%201rem)%3B%0A%7D%0A%0Ainput%23ccnumfield%2C%20input%23cccvvfield%20%7B%0A%20%20padding%3A%200.25rem%3B%0A%20%20border-radius%3A%205px%3B%0A%20%20margin%3A%200.5rem%200px%201rem%200px%3B%0A%7D%0A%0Alabel%23cccardlabel%20%2C%20label%23ccexpirylabel%20%2C%20label%23cccvvlabel%7B%0A%20%20%20%20font-size%3A%2020px%3B%0A%7D%0A%0A%0Aselect%23ccexpiryyear%7B%0Amargin-left%3A4px%3B%0A%7D%0A%0A.uir-field-wrapper.uir-onoff%20%7B%0A%20%20position%3A%20fixed%3B%0A%20%20top%3A%2032%25%3B%0A%20%20left%3A%2040%25%3B%0A%7D&useexpiry=true&usecvv=true&formatinput=true"
													 frameborder="0" scrolling="no">
												  </iframe>
												  <div
													 style="position:absolute;right: 69%;top: 69%;display:flex;align-items: end;width: max-content;">
													 <input type="checkbox" id="custpage_default_checkbox" name="custpage_default_checkbox"
														style="height:20px; width:20px;">
													 <label for="custpage_default_checkbox"
														style="display: inline-block;max-width: 100%;margin-left: 8px;font-weight: 600;font-size: 12px;margin-bottom:0px;">
													 Make This Card Default</label><br>
													 <input type="hidden" name="mytoken" id="mytoken" />
													 <input type="hidden" name="rcdid" id="rcdid" />
													 <!-- <input  type="button" value="Show Token" onclick="javascript:showMe();"> -->
												  </div>
												  <div style="position:absolute;left: 3.5%;top: 82%; ">
													 <button id="myBtnn" class="sub-btn"
														style="background:#F18448;color:white;width: 552px;font-size: 16px;border:none;border-radius: 4px;padding: 12px 16px;font-weight:700;">Add
													 Card</button>
												  </div>
											   </div>
											</form>
										 </div>
										 <div id="successdivhtml">
											<form name="tokenform" id="tokenform" style="width: 100%;height: 200px;margin: 0 auto; text-align: center">
												  <div class="contentdiv">
													 <h1>Success!</h1>
													 <p>Your Token is successfully created.</p>
												  </div>
											</form>
										 </div>
											<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
											<script>
											
											   document.getElementById("myBtnn").style.display='none'; 
											   document.getElementById("successdivhtml").style.display='none';
											   document.getElementById("myBtnn").addEventListener('click', function () {
												   //validation code to see State field is mandatory.  
												  document.getElementById("tokenid").style.display='none';
												   var arr = (document.getElementById("mytoken").value).split(',');
												   var token_number = arr[0];
												   var expiry_date = arr[1];
											   
												   var lastFour = token_number.slice(-4);
												   var req = token_number.slice(1);
												   var expiryYear = expiry_date.substring(0, 4);
												   var expiryMonth;
												   if (expiry_date.length == 5) {
													   expiryMonth = "0" + expiry_date.slice(-1)
												   } else if (expiry_date.length == 6) {
													   expiryMonth = expiry_date.slice(-2)
												   }
												   var cbs = document.getElementById("custpage_default_checkbox");
												   var cardType;
												   if (req.includes('34') || req.includes('37')) {
													   cardType = 'Amex'
												   } else if (req.includes('4')) {
													   cardType = 'Visa'
												   } else if (req.includes('51') || req.includes('52') || req.includes('53') || req.includes('54') || req.includes('55')) {
													   cardType = 'Master Card'
												   } else if (digits[1] == '6') {
													   cardType = 'Discover'
												   } else if (req.includes('36')) {
													   cardType = 'Diners'
												   } else if (req.includes('35')) {
													   cardType = 'JCB'
												   }else{
													cardType = ' ';
												   }
												   var defCard = cbs.checked ? 'T' : 'F'
												   console.log("test " + document.getElementById("mytoken").value);
												   console.log("test 2 " + token_number + ' || ' + expiry_date + ' || ' + cbs.checked + ' || ' + expiryMonth  + ' || ' + expiryYear + ' || ' + cardType + ' || ' + defCard);
													   var rec = nlapiCreateRecord('customrecord_stitch_cc_token',);
													   var tokenRecName = 'Stitch' + ' ' + cardType + ' ' + lastFour;
														  rec.setFieldValue('name', tokenRecName);
														rec.setFieldValue('custrecord_stitch_cc_token_customer', ${custId});
														rec.setFieldValue('custrecord_stitch_cc_token_exp_year', expiryYear);
														rec.setFieldValue('custrecord_stitch_cc_token_exp_month', expiryMonth);
														rec.setFieldValue('custrecord_sd_stitch_cc_last_4', lastFour);
														rec.setFieldValue('custrecord_stitch_cc_token_token', token_number);
														rec.setFieldValue('custrecord_stitch_cc_token_card_type', cardType);
														rec.setFieldValue('custrecord_sd_stitch_is_default_card', defCard);
														var id = nlapiSubmitRecord(rec, true);
														console.log('id', id);
													   console.log('id', id);
													   document.getElementById("mytoken").value = id
													   document.getElementById("successdivhtml").style.display='block';
													   closeWindow();
													   function closeWindow() {
														setTimeout(function () {
															location.reload();
															document.getElementById("closebttn").click();
														}, 3000);
													  }
											   });
											</script>
									  </div>
								   </div>
								</div>
							 </div>
						  </div>
						  <script>
						  document.getElementById("custpage_add_card_btn").onclick = function () { document.getElementById("modelbttn").click(); };
						  </script>
					   </body>
					</html>`;
					fieldInlineHtml.defaultValue = htmlString;
				}
				var statusCode = newRecord.getValue('orderstatus');
				log.emergency('void part,statusCode', statusCode);

				if (newRecord.type == "salesorder" || newRecord.type == "invoice") {
					log.emergency('void part triggered');

					if (statusCode == 'H') {
						var authResponseBody = newRecord.getValue({ fieldId: 'custbody_sd_stitch_token_response' });
						var voidResponseBody = newRecord.getValue({ fieldId: 'custbody_sd_stitch_void_response' });
						log.audit('authResponseBody in before load', authResponseBody)
						if (authResponseBody && !voidResponseBody) {
							authResponseBody = JSON.parse(authResponseBody);

							var voidPayment = lb_stitch.voidPayment(authResponseBody.merchid, authResponseBody.retref)
							log.audit("voidPayment Response37", voidPayment);
							//custbody_sd_stitch_void_response
							var id = record.submitFields({
								type: newRecord.type,
								id: newRecord.id,
								values: {
									custbody_sd_stitch_void_response: voidPayment.body
								}
							});

						}

					}

				}
				if (scriptContext.type == scriptContext.UserEventType.COPY) {
					var newRecord = scriptContext.newRecord;
					newRecord.setValue({
						fieldId: 'custbody_sd_select_st_card',
						value: '',
						ignoreFieldChange: true
					});

					newRecord.setValue({
						fieldId: 'custbody_sd_pay_response_stitch',
						value: '',
						ignoreFieldChange: true
					});

					newRecord.setValue({
						fieldId: 'custbody_sd_reference_pay_id',
						value: '',
						ignoreFieldChange: true
					});

					newRecord.setValue({
						fieldId: 'custbody_sd_stitch_token_response',
						value: '',
						ignoreFieldChange: true
					});

					newRecord.setValue({
						fieldId: 'custbody_sd_st_refund_response',
						value: '',
						ignoreFieldChange: true
					});
					newRecord.setValue({
						fieldId: 'custbody_sd_stitch_void_response',
						value: '',
						ignoreFieldChange: true
					});

				}
				if (scriptContext.type === 'view') {

					if (newRecord.type == "salesorder") {

						var authorizationResponse = newRecord.getValue('custbody_sd_stitch_token_response');
						if (authorizationResponse) {

							authorizationResponse = JSON.parse(authorizationResponse);
							if (authorizationResponse.respstat == 'C' && statusCode == 'F') {
								scriptContext.form.addPageInitMessage({ type: message.Type.ERROR, message: 'AUTHORIZATION UNSUCCESSFUL, ERROR:- ' + authorizationResponse.resptext, duration: 7000 });
							} else if (authorizationResponse.respstat == 'A' && statusCode == 'F') {
								scriptContext.form.addPageInitMessage({ type: message.Type.CONFIRMATION, message: 'AUTHORIZATION SUCCESSFUL :- ' + authorizationResponse.resptext, duration: 7000 });
							}


						}

					} else if (newRecord.type == "cashsale") {
						captureResponse = newRecord.getValue('custbody_sd_pay_response_stitch');
						if (captureResponse) {

							captureResponse = JSON.parse(captureResponse);
							if (captureResponse.respstat == 'C') {
								scriptContext.form.addPageInitMessage({ type: message.Type.ERROR, message: 'PAYMENT CAPTURE UNSUCCESSFUL, ERROR:- ' + captureResponse.resptext, duration: 7000 });
							} else if (captureResponse.respstat == 'A') {
								scriptContext.form.addPageInitMessage({ type: message.Type.CONFIRMATION, message: 'PAYTMENT CAPTURE SUCCESSFUL :- ' + captureResponse.resptext, duration: 7000 });
							}

						}

					}

					//var refundResponse = newRecord.getValue('custbody_sd_st_refund_response');

				}
			} catch (e) {
				log.error('error in before load', e)
			}
		}

		/**
		 * Function definition to be triggered before record is loaded.
		 *
		 * @param {Object} scriptContext
		 * @param {record} scriptContext.newrecord - New record
		 * @param {record} scriptContext.oldrecord - Old record
		 * @param {string} scriptContext.type - Trigger type
		 * @Since 2015.2
		 */

		function afterSubmit(scriptContext) {
			try {
				var newRecord = scriptContext.newRecord;
				log.audit("after submit new rec", newRecord);
				if ((scriptContext.type === scriptContext.UserEventType.CREATE || scriptContext.UserEventType.EDIT) && newRecord.type == "salesorder") {
					//log.emergency('After Submit triggerred')
					var reAuthFlag = true;
					var authResponseBody = newRecord.getValue({ fieldId: 'custbody_sd_stitch_token_response' });
					var amount = newRecord.getValue('total');
					if (authResponseBody) {
						var authResponseBody = JSON.parse(authResponseBody);
						var authAmount = authResponseBody.amount;
						var authResponse = authResponseBody.resptext
						if (Number(authAmount) == Number(amount) && authResponse == 'Approval') {
							reAuthFlag = false;
						}
					}
					// log.audit('Number(authAmount) | Number(amount) ',Number(authAmount)+ " | " + Number(amount) );
					log.audit('reAuthFlag', reAuthFlag);
					if (reAuthFlag && reAuthFlag === 'true') {
						var voidPayment = lb_stitch.voidPayment(authResponseBody.merchid, authResponseBody.retref)
						log.audit("voidPayment162", voidPayment);
					}
					var stitchToken = newRecord.getValue({ fieldId: 'custbody_sd_select_st_card' });
					if (stitchToken && reAuthFlag) {
						var fieldLookUp = search.lookupFields({
							type: 'customrecord_stitch_cc_token',
							id: stitchToken,
							columns: ['custrecord_stitch_cc_token_token', 'custrecord_stitch_cc_token_exp_month', 'custrecord_stitch_cc_token_exp_year', 'custrecord_stitch_cc_token_card_type']
						});
						var expiryMonth = fieldLookUp.custrecord_stitch_cc_token_exp_month;
						var expiryYear = fieldLookUp.custrecord_stitch_cc_token_exp_year.slice(-2);
						var expiryString = expiryMonth + expiryYear
						//log.audit('tokenNum', fieldLookUp);
						var tokenNum = fieldLookUp.custrecord_stitch_cc_token_token;

						if (tokenNum) {
							var credentials_object = lb_stitch.stitch_CredentialsSearch();
							if (credentials_object) {
								var stitchPaymentsApiUrl = credentials_object.base_url + '/auth'
								var orderid = newRecord.getValue('transactionnumber');
								var customerId = newRecord.getValue('entity');
								var customerDetails = lb_stitch.getCustomerDetails(customerId);
								//log.audit('customerDetails', customerDetails);

								var headerObj = {
									'Authorization': credentials_object.token_key,
									"Access-Control-Allow-Origin": "*",
									"Accept": "*/*",
									"Accept-Encoding": "gzip, deflate, br",
									"Content-Type": "application/json"
								};

								var requestBody = {

									"merchid": credentials_object.merchantid,
									"orderid": orderid,
									"account": tokenNum,
									"expiry": expiryString,
									"postal": customerDetails.zipcode,
									"ecomind": "E",
									"amount": amount * 100,
									"name": customerDetails.name,
									"address": customerDetails.address,
									"city": customerDetails.city,
									"email": customerDetails.email,
									"phone": customerDetails.phone,
									"country": customerDetails.countrycode
								}

								log.audit("requestBody", requestBody);

								var stringifyObj = JSON.stringify(requestBody);
								log.audit('stringifyObj98', stringifyObj)
								var response = https.post({
									url: stitchPaymentsApiUrl,
									body: stringifyObj,
									headers: headerObj
								});
								var myresponse_body = response.body;
								var myresponse_code = response.code;
								log.debug("myresponse_code", myresponse_code)
								log.debug("myresponse_body", response);
								if (myresponse_code == 201 || myresponse_code == '201' || myresponse_code == 200 || myresponse_code == '200') {
									
									// ** Token
									var id = record.submitFields({
										type: newRecord.type,
										id: newRecord.id,
										values: {
											custbody_sd_stitch_token_response: myresponse_body
										}
									});
								}

								// ** ACuadros : 24/10/2023 
								// ** Customer Profile API
								var requestBodyCustomerProfile = {
									"region"	: "",
									"phone"		: customerDetails.phone,
									"accttype"	: fieldLookUp.custrecord_stitch_cc_token_card_type,
									"postal"	: customerDetails.zipcode,
									"expiry"	: expiryString,
									"city"		: customerDetails.city,
									"country"	: customerDetails.countrycode,
									"address"	: customerDetails.address,
									"merchid"	: credentials_object.merchantid,
									"name"		: customerDetails.name,
									"account"	: tokenNum
								}
								
								customerProfile(credentials_object, headerObj, requestBodyCustomerProfile, newRecord );
							}
						} else {
							log.error('Token not available')
						}
					}
				} else {
					log.error("Please select a card for payment");
				}

			} catch (error) {
				log.error("error in after submit", error);
			}
		}

		function beforeSubmit(scriptContext) {

			try {
				var newRecord = scriptContext.newRecord;
				var oldRecord = scriptContext.oldRecord
				//log.audit("before submit new rec", newRecord);
				if ((scriptContext.type === scriptContext.UserEventType.CREATE || scriptContext.UserEventType.EDIT) && newRecord.type == "cashsale") {
					//log.emergency('before Submit triggerred')

					var createdFrom = newRecord.getText('createdfrom');
					if (createdFrom.includes('Sales Order')) {

						var soID = newRecord.getValue('createdfrom');
						var cashSaleAmt = newRecord.getValue('total');
						var isAlreadyCaptured = false;

						var soAuthResponse = newRecord.getValue('custbody_sd_stitch_token_response');
						//log.audit('soAuthResponse', soAuthResponse);
						if (soAuthResponse) {
							soAuthResponse = JSON.parse(soAuthResponse);

							var authAmount = soAuthResponse.amount;
							var authResponse = soAuthResponse.resptext
							var cashSalePymtResp = newRecord.getValue('custbody_sd_pay_response_stitch');


							if (cashSalePymtResp) {

								cashSalePymtResp = JSON.parse(cashSalePymtResp);
								var captureResponse = cashSalePymtResp.resptext;
								if (captureResponse == 'Approval') {
									isAlreadyCaptured = true;
								}

							}
							//log.audit('cashSalePymtResp', cashSalePymtResp);
							var stitchToken = newRecord.getValue({ fieldId: 'custbody_sd_select_st_card' });
							if (stitchToken) {
								var fieldLookUp = search.lookupFields({
									type: 'customrecord_stitch_cc_token',
									id: stitchToken,
									columns: ['custrecord_stitch_cc_token_token', 'custrecord_stitch_cc_token_exp_month', 'custrecord_stitch_cc_token_exp_year']
								});

								var expiryMonth = fieldLookUp.custrecord_stitch_cc_token_exp_month;
								var expiryYear = fieldLookUp.custrecord_stitch_cc_token_exp_year.slice(-2);
								var expiryString = expiryMonth + expiryYear
								var tokenNum = fieldLookUp.custrecord_stitch_cc_token_token;
							}

							if (Number(cashSaleAmt) <= Number(authAmount) && authResponse == 'Approval' && !isAlreadyCaptured && stitchToken) {

								var merchantId = soAuthResponse.merchid;
								var referenceNumber = soAuthResponse.retref
								var credentials_object = lb_stitch.stitch_CredentialsSearch();
								if (credentials_object) {
									var stitchCapturPaymentsApiUrl = credentials_object.base_url + '/capture'
									var stitchPaymentsApiUrl = credentials_object.base_url + '/auth'
									var headerObj = {
										'Authorization': credentials_object.token_key,
										"Access-Control-Allow-Origin": "*",
										"Accept": "*/*",
										"Accept-Encoding": "gzip, deflate, br",
										"Content-Type": "application/json"
									};

									var requestBody = {

										"retref": referenceNumber,
										"merchid": merchantId,
										"amount": cashSaleAmt * 100
									}

									//	log.audit("requestBody", requestBody);

									var stringifyObj = JSON.stringify(requestBody);
									//	log.audit('stringifyObj98', stringifyObj)
									var response = https.post({
										url: stitchCapturPaymentsApiUrl,
										body: stringifyObj,
										headers: headerObj
									});
									var myresponse_body = response.body;
									var myresponse_code = response.code;
									log.debug("myresponse_code", myresponse_code)
									log.debug("myresponse_body", response);

									if (myresponse_code == 201 || myresponse_code == '201' || myresponse_code == 200 || myresponse_code == '200') {
										myresponse_body = JSON.parse(myresponse_body);
										log.audit('myresponse_body.resptext + | myresponse_body.setlstat', myresponse_body.resptext + "|" + myresponse_body.setlstat);

										if (myresponse_body.respstat == 'A') {
											newRecord.setValue('custbody_sd_pay_response_stitch', JSON.stringify(myresponse_body));
										} else if (myresponse_body.respstat == 'C') {

											log.error('Previous authorization was invalid');
											var customerId = newRecord.getValue('entity');
											var customerDetails = lb_stitch.getCustomerDetails(customerId);
											//log.audit('customerDetails', customerDetails);

											var headerObj = {
												'Authorization': credentials_object.token_key,
												"Access-Control-Allow-Origin": "*",
												"Accept": "*/*",
												"Accept-Encoding": "gzip, deflate, br",
												"Content-Type": "application/json"
											};

											var requestBody = {

												"merchid": credentials_object.merchantid,
												"orderid": soID,
												"account": tokenNum,
												"expiry": expiryString,
												"postal": customerDetails.zipcode,
												"ecomind": "E",
												"amount": cashSaleAmt * 100,
												"name": customerDetails.name,
												"address": customerDetails.address,
												"city": customerDetails.city,
												"email": customerDetails.email,
												"phone": customerDetails.phone,
												"country": customerDetails.countrycode,
												"capture": "y"
											}
											log.audit('requestBody', requestBody);
											var stringifyObj = JSON.stringify(requestBody);
											log.audit('stringifyObj98', stringifyObj);
											var response = https.post({
												url: stitchPaymentsApiUrl,
												body: stringifyObj,
												headers: headerObj,
											});
											var myresponse_body = response.body;
											var myresponse_code = response.code;
											log.debug("myresponse_code", myresponse_code)
											log.debug("myresponse_body", response);
											if (myresponse_code == 201 || myresponse_code == '201' || myresponse_code == 200 || myresponse_code == '200') {
												myresponse_body = JSON.parse(myresponse_body);
												//log.audit('myresponse_body.resptext + | myresponse_body.setlstat',myresponse_body.resptext+"|"+myresponse_body.setlstat);
												newRecord.setValue('custbody_sd_pay_response_stitch', JSON.stringify(myresponse_body));

												if (myresponse_body.respstat == 'C') {
													var custom_error = error.create({
														name: 'PAYMENT_UNSUCCESSFUL',
														message: 'Payment was unsuccessful please try again',
														notifyOff: false
													});
												}

											}

										}

									}
								}
							} else {
								log.error('Cash Sale amount is greater than the authrized amount in Sales order or amount is already captured');
							}
						}
					}

				} else if (newRecord.type == "salesorder" || newRecord.type == "invoice") {
					//log.emergency('void part triggered');
					// var statusCode = oldRecord.getValue('orderstatus');
					//log.emergency('void part,statusCode', statusCode);
					log.debug('scriptContext.type424', scriptContext.type);
					if (scriptContext.type != 'edit' && scriptContext.type != 'copy') {
						if (scriptContext.type == scriptContext.UserEventType.DELETE || scriptContext.type == scriptContext.UserEventType.CANCEL || scriptContext.type == scriptContext.UserEventType.REJECT) {
							if (newRecord.type == "salesorder") {
								var authResponseBody = oldRecord.getValue({ fieldId: 'custbody_sd_stitch_token_response' });
							}
							else if (newRecord.type == "invoice") {
								var authResponseBody = oldRecord.getValue({ fieldId: 'custbody_sd_pay_response_stitch' });
							}
							//log.debug('authResponseBody before submit', authResponseBody);
							if (authResponseBody) {
								authResponseBody = JSON.parse(authResponseBody);
								var voidPayment = lb_stitch.voidPayment(authResponseBody.merchid, authResponseBody.retref);
								log.audit("voidPayment Response 435", voidPayment);
							}
						}
					}
				}
			} catch (error) {
				log.error('error in before submit', error)
			}
		}

		// ** ACuadros : 24/10/2023
		function customerProfile(credentials_object, headerObj, requestBodyCustomerProfile, newRecord) {
			try {
				log.emergency({title: 'CustomerProfile - requestBody',details: JSON.stringify(requestBodyCustomerProfile)});
				var stitchPaymentsApiUrl = credentials_object.base_url + '/profile'
				var stringifyObj = JSON.stringify(requestBodyCustomerProfile);

				var response = https.post({
					url: stitchPaymentsApiUrl,
					body: stringifyObj,
					headers: headerObj
				});

				var myresponse_body_Customer_Profile = response.body;
				var myresponse_code_Customer_Profile = response.code;
				log.debug("myresponse_code", myresponse_code_Customer_Profile)
				log.debug("myresponse_body", myresponse_body_Customer_Profile);

				if ( myresponse_code_Customer_Profile == 201 || 
					 myresponse_code_Customer_Profile == '201' || 
					 myresponse_code_Customer_Profile == 200 || 
					 myresponse_code_Customer_Profile == '200') {

					var id = record.submitFields({
						type: newRecord.type,
						id: newRecord.id,
						values: {
							custbodysd_stitch_customer_profile_res: myresponse_body_Customer_Profile
						}
					});
				}
			} catch (error) {
				log.error("error in Customer Profile API", error);
			}
		}

		return {
			beforeLoad: beforeLoad,
			beforeSubmit: beforeSubmit,
			afterSubmit: afterSubmit
		};
	});