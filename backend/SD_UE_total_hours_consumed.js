/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'], function (record, search) {

    function afterSubmit(context) {

        log.debug({
            title: 'context',
            details: context
        })
        try {


            if (context.type !== context.UserEventType.CREATE) {
                return;
            }

            var newRecord = context.newRecord;
            var taskId = newRecord.getValue('casetaskevent');
            var totalHours = 0;

            // Search for all time entries for the same task
            var timeSearch = search.create({
                type: 'timebill',
                filters: [
                    ['casetaskevent', 'anyof', taskId]
                ],
                columns: [
                    search.createColumn({
                        name: 'durationdecimal',
                        summary: search.Summary.SUM
                    })
                ]
            });

            var searchResult = timeSearch.run().getRange({
                start: 0,
                end: 1
            });
            log.debug({
                title: 'searchResult',
                details: searchResult
            })
            if (searchResult.length > 0) {
                totalHours = searchResult[0].getValue({
                    name: 'durationdecimal',
                    summary: search.Summary.SUM
                });
            }

            // Update the Total Hours Consumed Snapshot field
            record.submitFields({
                type: newRecord.type,
                id: newRecord.id,
                values: {
                    custcol_sd_total_hours_consumed: totalHours
                }
            });

        } catch (error) {
            log.error({
                title: 'error',
                details: error
            })
        }
    }

    return {
        afterSubmit: afterSubmit
    };
});
