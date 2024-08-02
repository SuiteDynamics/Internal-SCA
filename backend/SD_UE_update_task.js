/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/runtime', 'N/task'], function (record, runtime, task) {

    function beforeSubmit(context) {
        var newRecord = context.newRecord;
        var oldRecord = context.oldRecord;
        var recordId = newRecord.id

        // Fields to watch
        var fieldsToWatch = [
            'plannedwork',
            'constrainttype',
            'startdate',
            //'enddate',
            'cseg3',
            'status',
            //'actualwork',
           // 'remainingwork',
            'custevent_budget_status',
            'custevent_environment',
            'custeventstaff_capabilites_grade',
            'cseg4',
            'custevent_work_type',
            'title',
            'company',
            'custevent_mondayboardid',
            'custevent_mondayitemid'
        ];

        // Check if any of the fields have changed
        var changes = [];
        fieldsToWatch.forEach(function (fieldId) {
            var newValue = newRecord.getValue({ fieldId: fieldId });
            var oldValue = oldRecord ? oldRecord.getValue({ fieldId: fieldId }) : null;
           
            if (newValue !== oldValue) {
                changes.push({
                    recordId: recordId,
                    fieldId: fieldId,
                    value: newValue
                });
            }
        });

        log.debug({
            title: 'changes',
            details: changes
        })

        // If changes are detected, trigger MapReduce script
        if (changes.length > 0) {
            var mrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
                scriptId: 'customscript_sd_mr_update_task', // Replace with your MapReduce script ID
                deploymentId: 'customdeploy_sd_mr_update_task', // Replace with your MapReduce deployment ID
                params: {
                    custscript_field_changes: JSON.stringify(changes)
                }
            });

            var mrTaskId = mrTask.submit();
            log.debug('MapReduce Task Submitted', 'Task ID: ' + mrTaskId);
        }
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
