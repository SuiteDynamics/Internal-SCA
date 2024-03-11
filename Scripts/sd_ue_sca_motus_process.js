/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
 define(['N/record','N/search','N/runtime'],
 function(record, search, runtime) {

     function afterSubmit(context) {
 
        log.debug({title: 'executionContext', details: runtime.executionContext});
        if(context.type == context.UserEventType.CREATE && runtime.executionContext == 'WEBSTORE') {
            var recordNew = context.newRecord;
            
            var cardSelected = recordNew.getValue({
                fieldId: 'custbody_sd_select_mt_card'
            });

            if(cardSelected){

                log.audit("Motus Card Present", "SO ID: " + context.newRecord.id);
    
                var recordNew = context.newRecord;
    
                var idCustomer = recordNew.getValue({
                    fieldId: 'entity'
                });
                var amount = recordNew.getValue({
                    fieldId: 'total'
                });
    
                var motusResponse = JSON.parse(recordNew.getValue({
                    fieldId: 'custbody_sd_motus_token_response'
                }));
    
                var idTransactionType = context.newRecord.id;
                var transactionID = context.newRecord.id;
                var creditCardId = cardSelected;
                var customerId = idCustomer;
                var amount = amount;
                var reference = motusResponse.transaction_id
                var response = JSON.stringify(motusResponse);
                var status = motusResponse.status_message;
                var authCode = motusResponse.approval_code;
                var dateTran = new Date();
    
                // **
                var recordMotusHistory = record.create({
                    type: 'customrecord_motus_history',
                    isDynamic: true,
                });
    
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_transaction_type',
                    value: idTransactionType
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_transaction_id',
                    value: transactionID
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_creditcard_id',
                    value: creditCardId
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_customer_id',
                    value: customerId
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_account',
                    value: amount
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_reference',
                    value: reference
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_response',
                    value: response
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_status',
                    value: status
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_type_of_call',
                    value: 'authorization'
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_auth_code',
                    value: authCode
                });
                recordMotusHistory.setValue({
                    fieldId: 'custrecord_motus_date',
                    value: dateTran
                });
    
                var motusHistoryId = recordMotusHistory.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });

                log.audit("Motus History Created", "ID: " + motusHistoryId);
            }
        }
     }
     return {
        afterSubmit: afterSubmit
     };
 });