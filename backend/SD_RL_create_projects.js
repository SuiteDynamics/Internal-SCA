/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/log', 'N/search'], function (record, log, search) {

    function doPost(requestBody) {

        log.debug({
            title: 'RequestBody',
            details: requestBody.event
        })
        var payload = requestBody.event
        try {
            var projectTaskId = getTaskIdbyItemId(payload.pulseId);
            var projectId = getProjectByBoardId(payload.boardId);
            var taskName = payload.pulseName;

            var taskAssignee = payload.taskAssignee;


            var calculatedWork = payload.calculatedWork;



            var projectTask;

            if (projectTaskId) {
                // Load existing project task
                projectTask = record.load({
                    type: record.Type.PROJECT_TASK,
                    id: projectTaskId
                });
            } else {
                // Create new project task
                projectTask = record.create({
                    type: record.Type.PROJECT_TASK
                });
                plannedWork = 1

                projectTask.setValue({ fieldId: 'plannedwork', value: plannedWork });
            }

            switch (payload.columnId) {
                case "timeline__1":

                    var taskStartDate = transformDate(payload.value.from);
                    var taskEndDate = transformDate(payload.value.to);

                    projectTask.setValue({ fieldId: 'constrainttype', value: 'FIXEDSTART' });
                    projectTask.setValue({ fieldId: 'startdate', value: new Date(taskStartDate) });
                    projectTask.setValue({ fieldId: 'enddate', value: new Date(taskEndDate) });
                    break;
                case "status__1":
                    var taskGroup = payload.value.label.text;
                    projectTask.setText({ fieldId: 'cseg3', value: taskGroup });
                    break;
                case "status4__1":
                    var status = payload.value.label.text;
                    if (status == 'On Hold' || status == 'Ready To Assign') {
                        status = 'NOTSTART'
                    } else if (status == 'Completed') {
                        status = 'COMPLETE'
                    } else {
                        status = 'PROGRESS'
                    }
                    projectTask.setValue({ fieldId: 'status', value: status });
                    break;
                case "numbers__1":
                    var plannedWork = payload.value.value;
                    projectTask.setValue({ fieldId: 'plannedwork', value: plannedWork });
                    break;
                case "numbers__2":
                    var actualWork = payload.value.value;
                    projectTask.setValue({ fieldId: 'actualwork', value: actualWork });
                    break;
                case "numbers__3":
                    var remainingWork = payload.value.value;
                    projectTask.setValue({ fieldId: 'remainingwork', value: remainingWork });
                    break;
                case "status0__1":
                    var budgetStatus = payload.value.label.text;
                    projectTask.setValue({ fieldId: 'custevent_budget_status', value: budgetStatus });
                    break;
                case "status8__1":
                    var environment = payload.value.label.text;
                    switch (environment) {
                        case "In Sandbox":
                            environment = 1;
                            break
                        case "Migration In Progress":
                            environment = 4;
                            break
                        case "In Production":
                            environment = 8;
                            break
                        case "Implemented":
                            environment = 9;
                            break
                        default:
                            environment = -1; // Unknown Status
                    }
                    projectTask.setValue({ fieldId: 'custevent_environment', value: environment });
                    break;
                case "dup__of_task_group__1":
                    var resourceType = payload.value.label.text;
                    switch (resourceType) {
                        case "Admin":
                            resourceType = 22;
                            break
                        case "Developer":
                            resourceType = 4;
                            break
                        case "Executive":
                            resourceType = 21;
                            break
                        case "Finance":
                            resourceType = 18;
                            break
                        case "Implementer":
                            resourceType = 1;
                            break
                        case "Lead":
                            resourceType = 17;
                            break
                        case "Marketing":
                            resourceType = 24;
                            break
                        case "Project Management":
                            resourceType = 16;
                            break
                        case "Sales":
                            resourceType = 23;
                            break
                        default:
                            log.debug({
                                title: 'resourceType',
                                details: resourceType
                            })
                    }
                    projectTask.setValue({ fieldId: 'custeventstaff_capabilites_grade', value: resourceType });
                    break;
                case "status0__1":
                    var pod = payload.value.label.text;
                    projectTask.setText({ fieldId: 'cseg4', value: pod });
                    break;
                case "status_1__1":
                    var workSource = payload.value.label.text;
                    switch (workSource) {
                        case "CO":
                            workSource = 3;
                            break
                        case "MSP":
                            workSource = 2;
                            break
                        case "SOW":
                            workSource = 1;
                            break
                        default:
                            log.debug({
                                title: 'workSource',
                                details: workSource
                            })
                    }
                    projectTask.setValue({ fieldId: 'custevent_work_type', value: workSource });
                    break;
                default:
                    log.debug(`Unhandled columnId: ${payload.columnId}`);
            }



            // Set fields
            projectTask.setValue({ fieldId: 'title', value: taskName });

            projectTask.setValue({ fieldId: 'company', value: projectId });
            // projectTask.setValue({ fieldId: 'owner', value: taskAssignee });
            projectTask.setValue({ fieldId: 'custevent_mondayboardid', value: payload.boardId.toString() });
            projectTask.setValue({ fieldId: 'custevent_mondayitemid', value: payload.pulseId.toString() });

            // projectTask.setValue({ fieldId: 'cseg3', value: taskGroup });

            // projectTask.setValue({ fieldId: 'calculatedwork', value: calculatedWork });
            // projectTask.setValue({ fieldId: 'actualwork', value: actualWork });
            // projectTask.setValue({ fieldId: 'remainingwork', value: remainingWork });
            // projectTask.setValue({ fieldId: 'custevent_budget_status', value: budgetStatus });
            // projectTask.setValue({ fieldId: 'custevent_environment', value: environment });
            // projectTask.setValue({ fieldId: 'custeventstaff_capabilites_grade', value: resourceType });
            // projectTask.setValue({ fieldId: 'cseg4', value: pod });
            // projectTask.setValue({ fieldId: 'custevent_work_type', value: workSource });
            // Save the record
            var taskId = projectTask.save();

            log.debug({
                title: 'success',
                details: { success: true, taskId: taskId }
            })

            return { success: true, taskId: taskId };

        } catch (e) {
            log.error({
                title: 'Error creating/updating project task',
                details: e
            });
            return { success: false, message: e.message };
        }
    }

    function getTaskIdbyItemId(itemId) {

        var projecttaskSearchObj = search.create({
            type: "projecttask",
            filters:
                [
                    ["custevent_mondayitemid", "is", itemId.toString()]
                ],
            columns:
                [
                    search.createColumn({ name: "internalid", label: "Internal ID" })
                ]
        });
        var taskId = null
        projecttaskSearchObj.run().each(function (result) {
            taskId = result.id
            return true;
        });

        return taskId

    }

    function getProjectByBoardId(boardId) {
        log.debug('boardId', boardId)
        var jobSearchObj = search.create({
            type: "job",
            filters:
                [
                    ["custentity_mondayboardid", "is", boardId.toString()]
                ],
            columns:
                [
                    search.createColumn({ name: "internalid", label: "Internal ID" })
                ]
        });
        var projectId;
        var searchResultCount = jobSearchObj.runPaged().count;
        log.debug("jobSearchObj result count", searchResultCount);
        jobSearchObj.run().each(function (result) {
            log.debug('rsult', result)
            projectId = result.id
            return true;
        });

        return projectId

    }

    function transformDate(dateString) {
        // Split the input date string by hyphens
        const [year, month, day] = dateString.split('-');

        // Remove leading zeros from the month and day
        const formattedMonth = parseInt(month, 10);
        const formattedDay = parseInt(day, 10);

        // Construct the new date format
        const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
        log.debug('date', formattedDate)
        return formattedDate;
    }

    return {
        post: doPost
    };
});
