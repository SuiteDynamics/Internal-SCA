    /**
     * @NApiVersion 2.x
     * @NScriptType MapReduceScript
     */
    define(['N/record', 'N/search', 'N/runtime'], function (record, search, runtime) {

        function getInputData() {
            var currentMonthStart = new Date();
            currentMonthStart.setDate(1);
            currentMonthStart.setHours(0, 0, 0, 0);

            var currentMonthEnd = new Date(currentMonthStart);
            currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);

            return search.create({
                type: 'timebill',
                filters: [
                    ["datecreated", "within", "lastmonth"]
                ],
                columns: [
                    'casetaskevent',
                    'internalid',
                    'datecreated',
                    'customer'
                ]
            });
        }

        function map(context) {
            var searchResult = JSON.parse(context.value);
            var taskId = searchResult.values.casetaskevent.value;
            var durationDecimal = parseFloat(searchResult.values.durationdecimal);
            var createdDate = searchResult.values.datecreated;
            var timeEntryId = searchResult.id;
            var customerId = searchResult.values.customer.value;

            context.write({
                key: taskId + '-' + customerId,
                value: JSON.stringify({
                    timeEntryId: timeEntryId,
                    createdDate: createdDate
                })
            });
        }

        function reduce(context) {
            var keyParts = context.key.split('-');
            var taskId = keyParts[0];
            var customerId = keyParts[1];
            var totalHours = 0;
            var timeEntryUpdates = [];

            context.values.forEach(function (value) {
                var entry = JSON.parse(value);
                var timeEntryId = entry.timeEntryId;
                var createdDate = new Date(entry.createdDate);

                // Search for all time entries for the same task up to the created date
                var timeSearch = search.create({
                    type: 'timebill',
                    filters: [
                        ['casetaskevent', 'anyof', taskId],
                        'AND',
                        ['customer', 'anyof', customerId],
                        'AND',
                        ['datecreated', 'onorbefore', entry.createdDate]
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

                if (searchResult.length > 0) {
                    totalHours = parseFloat(searchResult[0].getValue({
                        name: 'durationdecimal',
                        summary: search.Summary.SUM
                    })) || 0;
                }

                timeEntryUpdates.push({
                    timeEntryId: timeEntryId,
                    totalHours: totalHours
                });
            });



            // Update each time entry with the calculated total hours
            timeEntryUpdates.forEach(function (update) {
                log.audit({
                    title: 'task: ' + taskId,
                    details: 'timebill: ' + update.timeEntryId + 'hour: ' + update.totalHours
                })
                record.submitFields({
                    type: 'timebill',
                    id: update.timeEntryId,
                    values: {
                        custcol_sd_total_hours_consumed: update.totalHours
                    }
                });
            });
        }
        function summarize(summary) {
            if (summary.inputSummary.error) {
                log.error({
                    title: 'Input Error',
                    details: summary.inputSummary.error
                });
            }

            summary.mapSummary.errors.iterator().each(function (key, error) {
                log.error({
                    title: 'Map Error for key: ' + key,
                    details: error
                });
                return true; // Continue iterating
            });

            summary.reduceSummary.errors.iterator().each(function (key, error) {
                log.error({
                    title: 'Reduce Error for key: ' + key,
                    details: error
                });
                return true; // Continue iterating
            });
        }

        return {
            getInputData: getInputData,
            map: map,
            reduce: reduce,
            summarize: summarize
        };
    });
