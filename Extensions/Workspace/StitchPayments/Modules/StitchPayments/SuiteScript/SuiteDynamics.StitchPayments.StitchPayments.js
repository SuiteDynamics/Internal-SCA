// SuiteDynamics.StitchPayments.StitchPayments.js
// Load all your starter dependencies in backend for your extension here
// ----------------

define('SuiteDynamics.StitchPayments.StitchPayments'
,	[
		// 'SuiteDynamics.StitchPayments.StitchPayments.ServiceController',
		'LiveOrder.Model',
		'underscore'
	]
,	function (
		// StitchPaymentsServiceController,
		LiveOrderModel,
		_
	)
{
	'use strict';
	nlapiLogExecution('DEBUG', 'start backend module', 'start backend module');

	// _.extend(LiveOrderModel, {
	// 	getPaymentMethods: function (fn) {
    //         const paymentmethods = [];
    //         const giftcertificates = ModelsInit.order.getAppliedGiftCertificates();
    //         const payment = order_fields && order_fields.payment;
    //         const paypal =
    //             payment &&
    //             _.findWhere(ModelsInit.session.getPaymentMethods(), {
    //                 ispaypal: 'T'
    //             });
    //         const credit_card = payment && payment.creditcard;

    //         if (
    //             credit_card &&
    //             credit_card.paymentmethod &&
    //             credit_card.paymentmethod.creditcard === 'T'
    //         ) {
    //             // Main
    //             paymentmethods.push({
    //                 type: 'creditcard',
    //                 primary: true,
    //                 creditcard: {
    //                     internalid: credit_card.internalid || '-temporal-',
    //                     ccnumber: credit_card.ccnumber,
    //                     ccname: credit_card.ccname,
    //                     ccexpiredate: `${credit_card.expmonth}/${credit_card.expyear}`,
    //                     ccsecuritycode: credit_card.ccsecuritycode,
    //                     expmonth: credit_card.expmonth,
    //                     expyear: credit_card.expyear,
    //                     paymentmethod: {
    //                         internalid: credit_card.paymentmethod.internalid,
    //                         name: credit_card.paymentmethod.name,
    //                         creditcard: credit_card.paymentmethod.creditcard === 'T',
    //                         ispaypal: credit_card.paymentmethod.ispaypal === 'T',
    //                         isexternal: credit_card.paymentmethod.isexternal === 'T',
    //                         key: credit_card.paymentmethod.key,
    //                         iscardholderauthenticationsupported:
    //                             credit_card.paymentmethod.iscardholderauthenticationsupported
    //                     }
    //                 }
    //             });
    //         } else if (paypal && payment.paymentmethod === paypal.internalid) {
    //             paymentmethods.push({
    //                 type: 'paypal',
    //                 primary: true,
    //                 complete: ModelsInit.context.getSessionObject('paypal_complete') === 'T',
    //                 internalid: paypal.internalid,
    //                 name: paypal.name,
    //                 creditcard: paypal.creditcard === 'T',
    //                 ispaypal: paypal.ispaypal === 'T',
    //                 isexternal: paypal.isexternal === 'T',
    //                 key: paypal.key
    //             });
    //         } else if (
    //             credit_card &&
    //             credit_card.paymentmethod &&
    //             credit_card.paymentmethod.isexternal === 'T'
    //         ) {
    //             paymentmethods.push({
    //                 type: `external_checkout_${credit_card.paymentmethod.key}`,
    //                 primary: true,
    //                 internalid: credit_card.paymentmethod.internalid,
    //                 name: credit_card.paymentmethod.name,
    //                 creditcard: credit_card.paymentmethod.creditcard === 'T',
    //                 ispaypal: credit_card.paymentmethod.ispaypal === 'T',
    //                 isexternal: credit_card.paymentmethod.isexternal === 'T',
    //                 key: credit_card.paymentmethod.key,
    //                 errorurl: payment.errorurl,
    //                 thankyouurl: payment.thankyouurl
    //             });
    //         } else if (order_fields.payment && order_fields.payment.paymentterms === 'Invoice') {
    //             const customer_invoice = ModelsInit.customer.getFieldValues([
    //                 'paymentterms',
    //                 'creditlimit',
    //                 'balance',
    //                 'creditholdoverride'
    //             ]);

    //             paymentmethods.push({
    //                 type: 'invoice',
    //                 primary: true,
    //                 paymentterms: customer_invoice.paymentterms,
    //                 creditlimit: parseFloat(customer_invoice.creditlimit || 0),
    //                 creditlimit_formatted: Utils.formatCurrency(customer_invoice.creditlimit),
    //                 balance: parseFloat(customer_invoice.balance || 0),
    //                 balance_formatted: Utils.formatCurrency(customer_invoice.balance),
    //                 creditholdoverride: customer_invoice.creditholdoverride
    //             });
    //         }

    //         if (giftcertificates && giftcertificates.length) {
    //             _.forEach(giftcertificates, function (giftcertificate) {
    //                 paymentmethods.push({
    //                     type: 'giftcertificate',
    //                     giftcertificate: {
    //                         code: giftcertificate.giftcertcode,

    //                         amountapplied: Utils.toCurrency(giftcertificate.amountapplied || 0),
    //                         amountapplied_formatted: Utils.formatCurrency(
    //                             giftcertificate.amountapplied || 0
    //                         ),

    //                         amountremaining: Utils.toCurrency(giftcertificate.amountremaining || 0),
    //                         amountremaining_formatted: Utils.formatCurrency(
    //                             giftcertificate.amountremaining || 0
    //                         ),

    //                         originalamount: Utils.toCurrency(giftcertificate.originalamount || 0),
    //                         originalamount_formatted: Utils.formatCurrency(
    //                             giftcertificate.originalamount || 0
    //                         )
    //                     }
    //                 });
    //             });
    //         }

    //         return paymentmethods;
	// 	}
	// });


	

});