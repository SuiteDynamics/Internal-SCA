/**
 * @name SD_SL_CustSwitch.js
 * 
 *
 * @since 2023-12-22
 * 
 * @file Switches access for a given user.
 * 
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/record', 'N/log'],
    function (record, log) {
        "use strict";

        var responseObj = {
            errors: []
        };

        /**
         * Handle the https call.
         * @param {Object} ctx 
         */
        function controller(ctx) {
            log.debug('ctx', ctx);
            var params = ctx.request.parameters; // ? JSON.parse(ctx.request.body): {};
            log.debug('params', params);
            try {
                if (ctx.request.method == 'POST') {

                    removeAccess(params.userId, params.contactId);

                    giveAccess(params.selectedCustomer, params.contactId, params.userRole, params.password);

                    responseObj.status = 'OK';
                }
            }
            catch (error) {
                responseObj.errors.push(error);
                log.error('error', error);
            }

            ctx.response.write(JSON.stringify(responseObj));
        }

        /**
         * Remove a contact's access from the current customer.
         * @param {Integer} currentCustomer 
         * @param {Integer} contactId 
         */
        function removeAccess(currentCustomer, contactId) {
            log.debug(currentCustomer, contactId);
            try {
                var customerRecord = record.load({
                    type: record.Type.CUSTOMER,
                    id: currentCustomer,
                    isDynamic: true
                });
                var lineNumber = customerRecord.findSublistLineWithValue({
                    sublistId: 'contactroles',
                    fieldId: 'contact',
                    value: contactId
                });
                log.debug('line number', lineNumber);
                customerRecord.selectLine({
                    sublistId: 'contactroles',
                    line: lineNumber
                });

                customerRecord.setCurrentSublistValue({
                    sublistId: 'contactroles',
                    fieldId: 'giveaccess',
                    value: false
                });

                customerRecord.commitLine({
                    sublistId: 'contactroles'
                });

                customerRecord.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
            } catch (error) {
                responseObj.errors.push(error);
                log.error('error', error);
            }
        }

        /**
         * Give access to the contact on a new customer.
         * @param {Integer} selectedCustomer 
         * @param {Integer} contactId 
         * @param {Integer} contactRole 
         * @param {String} password 
         */
        function giveAccess(selectedCustomer, contactId, contactRole, password) {
            try {
                var customerRecord = record.load({
                    type: record.Type.CUSTOMER,
                    id: selectedCustomer,
                    isDynamic: true
                });
                var lineNumber = customerRecord.findSublistLineWithValue({
                    sublistId: 'contactroles',
                    fieldId: 'contact',
                    value: contactId
                });

                customerRecord.selectLine({
                    sublistId: 'contactroles',
                    line: lineNumber
                });

                customerRecord.setCurrentSublistValue({
                    sublistId: 'contactroles',
                    fieldId: 'giveaccess',
                    value: true
                });
                customerRecord.setCurrentSublistValue({
                    sublistId: 'contactroles',
                    fieldId: 'role',
                    value: contactRole
                });
                customerRecord.setCurrentSublistValue({
                    sublistId: 'contactroles',
                    fieldId: 'fillpassword',
                    value: true
                });
                customerRecord.setCurrentSublistValue({
                    sublistId: 'contactroles',
                    fieldId: 'password',
                    value: password
                });
                customerRecord.setCurrentSublistValue({
                    sublistId: 'contactroles',
                    fieldId: 'password2',
                    value: password
                });

                customerRecord.commitLine({
                    sublistId: 'contactroles'
                });

                customerRecord.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
            } catch (error) {
                responseObj.errors.push(error);
                log.error('error', error);
            }
        }

        return {
            onRequest: controller
        };
    });
