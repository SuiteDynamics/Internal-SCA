/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(['N/record', 'N/log', 'N/https', 'N/runtime'], function (record, log, https, runtime) {

    function getInputData(context) {
        var fieldChanges = JSON.parse(runtime.getCurrentScript().getParameter({ name: 'custscript_field_changes' }));
        return fieldChanges;
    }

    function map(context) {
        var fieldChange = JSON.parse(context.value);
        log.debug('Processing Field Change', fieldChange);

        var newValue = fieldChange.value;
        var fieldId = fieldChange.fieldId;
        var recordId = fieldChange.recordId

        var projectTask = record.load({
            type: record.Type.TASK,
            id: recordId
        });

        var boardId = projectTask.getValue({ fieldId: 'custevent_mondayboardid' });
        var pulseId = projectTask.getValue({ fieldId: 'custevent_mondayitemid' });
        var taskName = projectTask.getValue({ fieldId: 'title' });
        var status = projectTask.getValue({ fieldId: 'status' });

        var payload = {
            boardId: boardId,
            pulseId: pulseId,
            pulseName: taskName,
            columnId: getStatusColumnId(status),
            value: {
                label: {
                    text: getStatusText(status)
                }
            }
        };

        try {
            var response = https.post({
                url: 'https://api.monday.com/v2',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM5MDk1Nzc2NywiYWFpIjoxMSwidWlkIjo2NDAyOTgyMCwiaWFkIjoiMjAyNC0wNy0zMFQyMDozMDo1Ny45ODRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjEyNzM4ODEsInJnbiI6InVzZTEifQ.bCqhYhQKzuWKzJ3yxJ2nrGBpiJ3kO7yiOe5WpRLsx8o' // Replace with your Monday.com API key
                },
                body: JSON.stringify({
                    query: `mutation {
  change_column_value (board_id: ${boardId}, item_id: ${pulseId}, column_id: "email9", value: "{\"text\":\"test@gmail.com\",\"email\":\"test@gmail.com\"}") {
    id
  }
}`,
                    variables: {
                        boardId: payload.boardId,
                        itemId: payload.pulseId,
                        columnValues: JSON.stringify({
                            [fieldId]: newValue
                        })
                    }
                })
            });

            log.debug('Monday API Response', response.body);

        } catch (e) {
            log.error({
                title: 'Error updating Monday.com',
                details: e
            });
        }
    }

    function reduce(context) {
        // Optional: handle reduce phase if needed
    }

    function summarize(summary) {
        log.audit('Summary', 'Processed ' + summary.inputSummary.recordCount + ' field changes');
    }

    function getStatusColumnId(status) {
        switch (status) {
            case 'NOTSTART':
                return 'status__1';
            case 'PROGRESS':
                return 'status4__1';
            case 'COMPLETE':
                return 'status0__1';
            default:
                return 'unknown_column';
        }
    }

    function getStatusText(status) {
        switch (status) {
            case 'NOTSTART':
                return 'On Hold';
            case 'PROGRESS':
                return 'In Progress';
            case 'COMPLETE':
                return 'Completed';
            default:
                return 'Unknown Status';
        }
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});
