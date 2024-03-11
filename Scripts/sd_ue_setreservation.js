/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
 define(['N/record','N/search'],
 function(record, search) {
     const monthMapping={
        "0":"January",
        "1":"February",
        "2":"March",
        "3":"April",
        "4":"May",
        "5":"June",
        "6":"July",
        "7":"August",
        "8":"September",
        "9":"October",
        "10":"November",
        "11":"December"
     }
     const daysMapping=[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
     ]
     function beforeSubmit(context) {
          
        if(context.type !== context.UserEventType.CREATE){

            var oldSalesOrderRecord = context.oldRecord
      
            var oldSOlineCount = oldSalesOrderRecord.getLineCount({
                sublistId : 'item'
             });
    
             log.debug({
                title: 'old line count', 
                details: oldSOlineCount
            });
    
            //Cancel old Reservation Dates
            for (var lineIndex = 0; lineIndex < oldSOlineCount; lineIndex++) { 
                var oldItem =  oldSalesOrderRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: lineIndex
                });
                var oldStartDate =  oldSalesOrderRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_rental_start',
                    line: lineIndex
                });
                var oldEndDate =  oldSalesOrderRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_rental_end',
                    line: lineIndex
                });
    
    
                log.debug({
                    title: 'startDate', 
                    details: oldStartDate.getMonth()
                });
                log.debug({
                    title: 'endDate', 
                    details: oldEndDate.getMonth()
                });
    
                cancelReservation(oldItem,oldStartDate,oldEndDate)
    
            }

        }


         var newSalesOrderRecord = context.newRecord


        var newSOlineCount = newSalesOrderRecord.getLineCount({
            sublistId : 'item'
         });
         log.debug({
            title: 'new line count', 
            details: newSOlineCount
        });
        //Set New Reservation Dates
         for (var lineIndex = 0; lineIndex < newSOlineCount; lineIndex++) { 
            var item =  newSalesOrderRecord.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: lineIndex
            });
            var startDate =  newSalesOrderRecord.getSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_rental_start',
                line: lineIndex
            });
            var endDate =  newSalesOrderRecord.getSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_rental_end',
                line: lineIndex
            });

            if(startDate){
                log.debug({
                    title: 'startDate', 
                    details: startDate.getMonth()
                });
                log.debug({
                    title: 'endDate', 
                    details: endDate.getMonth()
                });

                setReservation(item,startDate,endDate)
            }
        }
         
         //salesOrderRecord.setValue('taxamountoverride', taxtotal_new);
     }

     function cancelReservation(item,oldStartDate,oldEndDate){
        log.debug({
            title: 'cancel startDate mapping', 
            details: monthMapping[oldStartDate.getMonth()]
        });
        log.debug({
            title: 'cancel endDate mapping', 
            details: monthMapping[oldEndDate.getMonth()]
        });
        log.debug({
            title: 'cancel start', 
            details: oldStartDate.getDate()
        });
        log.debug({
            title: 'cancel end', 
            details: oldEndDate.getDate()
        });
        var startMonth = monthMapping[oldStartDate.getMonth()]
        var endMonth = monthMapping[oldEndDate.getMonth()]
        var reservationSearchObj = search.create({
            type: "customrecord744",
            filters:
            [
               [["custrecord10","is",startMonth],"OR",["custrecord10","is",endMonth]], 
                "AND", 
               ["custrecord9","anyof",item]
            ],
            columns:
            [
               search.createColumn({
                  name: "name",
                  sort: search.Sort.ASC,
                  label: "ID"
               }),
               search.createColumn({name: "scriptid", label: "Script ID"}),
               search.createColumn({name: "custrecord10", label: "Month"})
            ]
         });
         var searchResultCount = reservationSearchObj.runPaged().count;
         log.debug("customrecord744SearchObj result count",searchResultCount);
         reservationSearchObj.run().each(function(result){

            log.debug("id result",result.getValue('name'));
            log.debug("month result",result.getValue('custrecord10'));

            var month = result.getValue('custrecord10');
           
            if(startMonth == endMonth){

                var submitValues = {}

                for (var i = oldStartDate.getDate(); i <= oldEndDate.getDate(); i++) {
                    log.debug("add cancel submit",oldStartDate.getDate());
                    submitValues['custrecord_day_'+i] = false;
                }
                log.debug("submitValues",submitValues);
                record.submitFields({
                    type: 'customrecord744',
                    id: result.getValue('name'),
                    values: submitValues
                });       
            }else if(startMonth == month){

                var submitValues = {}

                for (var i = oldStartDate.getDate(); i <= 31; i++) {
                    submitValues['custrecord_day_'+i] = false;
                }
                log.debug("submitValues",submitValues);
                record.submitFields({
                    type: 'customrecord744',
                    id: result.getValue('name'),
                    values: submitValues
                });

            }else if(endMonth == month){
                var submitValues = {}

                for (var i = oldEndDate.getDate(); i > 0; i--) {
                    submitValues['custrecord_day_'+i] = false;
                }
                log.debug("submitValues",submitValues);
                record.submitFields({
                    type: 'customrecord744',
                    id: result.getValue('name'),
                    values: submitValues
                });
            }


            // .run().each has a limit of 4,000 results
            return true;
         });
         
         /*
         customrecord744SearchObj.id="customsearch1706894025525";
         customrecord744SearchObj.title="Custom Reservation Matrix Search (copy)";
         var newSearchId = customrecord744SearchObj.save();
         */
     }

     function setReservation(item,startDate,endDate){
        log.debug({
            title: 'init startDate mapping', 
            details: monthMapping[startDate.getMonth()]
        });
        log.debug({
            title: 'init endDate mapping', 
            details: monthMapping[endDate.getMonth()]
        });
        var startMonth = monthMapping[startDate.getMonth()]
        var endMonth = monthMapping[endDate.getMonth()]
        var reservationSearchObj = search.create({
            type: "customrecord744",
            filters:
            [
               [["custrecord10","is",startMonth],"OR",["custrecord10","is",endMonth]], 
                "AND", 
               ["custrecord9","anyof",item]
            ],
            columns:
            [
               search.createColumn({
                  name: "name",
                  sort: search.Sort.ASC,
                  label: "ID"
               }),
               search.createColumn({name: "scriptid", label: "Script ID"}),
               search.createColumn({name: "custrecord10", label: "Month"})
            ]
         });
         var searchResultCount = reservationSearchObj.runPaged().count;
         log.debug("customrecord744SearchObj result count",searchResultCount);
         reservationSearchObj.run().each(function(result){

            log.debug("id result",result.getValue('name'));
            log.debug("month result",result.getValue('custrecord10'));

            var month = result.getValue('custrecord10');
           
            if(startMonth == endMonth){

                var submitValues = {}

                for (var i = startDate.getDate(); i <= endDate.getDate(); i++) {
                    submitValues['custrecord_day_'+i] = true;
                }
                log.debug("same submitValues",submitValues);
                record.submitFields({
                    type: 'customrecord744',
                    id: result.getValue('name'),
                    values: submitValues
                });       
            }else if(startMonth == month){

                var submitValues = {}

                for (var i = startDate.getDate(); i <= 31; i++) {
                    submitValues['custrecord_day_'+i] = true;
                }
                log.debug("startmonth submitValues",submitValues);
                record.submitFields({
                    type: 'customrecord744',
                    id: result.getValue('name'),
                    values: submitValues
                });

            }else if(endMonth == month){
                var submitValues = {}

                for (var i = endDate.getDate(); i > 0; i--) {
                    submitValues['custrecord_day_'+i] = true;
                }
                log.debug("endmonth submitValues",submitValues);
                record.submitFields({
                    type: 'customrecord744',
                    id: result.getValue('name'),
                    values: submitValues
                });
            }


            // .run().each has a limit of 4,000 results
            return true;
         });
         
         /*
         customrecord744SearchObj.id="customsearch1706894025525";
         customrecord744SearchObj.title="Custom Reservation Matrix Search (copy)";
         var newSearchId = customrecord744SearchObj.save();
         */
     }
 
     return {
         beforeSubmit: beforeSubmit
     };
 });