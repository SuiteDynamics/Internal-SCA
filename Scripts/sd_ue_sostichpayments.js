/**
 * @name AG_UE_sostitchpayments.js
 * 
 * @author SuiteDynamics : Eric Laylan <elaylan@suitedynamics.io>
 * @version 1.0.0
 * @since 2023-12-4
 * 
 * @file Processes Stitch Sales Orders
 * 
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */


define([],
    function () {

        /**
         * 
         * @function beforeSubmit
         * @param {*} context 
         * @returns 
         */
        function beforeSubmit(context) {
            log.debug('context', context);
            var status = context.newRecord.setValue({ fieldId: 'customform', value: 88 });
            var status = context.newRecord.setValue({ fieldId: 'paymentmethod', value: 8 });
            // var status = context.newRecord.setText({ fieldId: 'paymentoption', text: 'Stitch' });
            var status = context.newRecord.setValue({ fieldId: 'paymentoption', value: 9 });
            log.debug('status', status);

        }

        return {
            beforeSubmit: beforeSubmit,
        };
    });