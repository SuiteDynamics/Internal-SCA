/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define(['N/search','N/record','N/runtime'], function (search, record, runtime) {
    "use strict";
    return {
        service: function (ctx) {

            //Retrieve Subscriptions for customer
            var customrecordzab_subscriptionSearchObj = search.create({
                type: "customrecordzab_subscription",
                filters:
                [
                //    ["custrecordzab_s_customer","anyof", runtime.getCurrentUser()]
                ],
                columns:
                [
                   search.createColumn({
                      name: "name",
                      sort: search.Sort.ASC,
                      label: "Name"
                   }),
                   search.createColumn({name: "custrecordzab_s_bill_to_customer", label: "Bill To Customer"}),
                   search.createColumn({name: "custrecordzab_s_start_date", label: "Start Date"}),
                   search.createColumn({name: "custrecordzab_s_end_date", label: "End Date"}),
                   search.createColumn({name: "custrecordzab_s_currency", label: "Currency"}),
                   search.createColumn({name: "custrecordzab_s_identification_number", label: "ID Number"}),
                   search.createColumn({name: "custrecordzab_s_charge_schedule", label: "Charge Schedule"}),
                   search.createColumn({name: "id", label: "Internal ID"})
                ]
             });
             var searchResultCount = customrecordzab_subscriptionSearchObj.runPaged().count;
             log.debug("customrecordzab_subscriptionSearchObj result count",searchResultCount);

             var subscriptionsArray = [];

             customrecordzab_subscriptionSearchObj.run().each(function(result){
                // .run().each has a limit of 4,000 results
                var subscriptionsObj = {};

                subscriptionsObj.billTo = result.getValue("custrecordzab_s_bill_to_customer");
                subscriptionsObj.startDate = result.getValue("custrecordzab_s_start_date");
                subscriptionsObj.endDate = result.getValue("custrecordzab_s_end_date");
                subscriptionsObj.idNumber = result.getValue("custrecordzab_s_identification_number");
                subscriptionsObj.chargeSchedule = result.getValue("custrecordzab_s_charge_schedule");

                subscriptionsArray.push(subscriptionsObj);

                var items = retrieveZabItems(result.getValue("id"));

                subscriptionsObj.items = items;

                return true;
             });


            function retrieveZabItems(id){

                log.debug('ZAB Item 2', id)

                var customrecordzab_itemSearchObj = search.create({
                    type: "customrecordzab_subscription_item",
                    filters:
                    [
                       ["custrecordzab_si_subscription","is", id]
                    ],
                    columns:
                    [
                       search.createColumn({
                          name: "name",
                          sort: search.Sort.ASC,
                          label: "Name"
                       }),
                       search.createColumn({name: "custrecordzab_si_item", label: "Item"}),
                       search.createColumn({name: "custrecordzab_si_start_date", label: "Start Date"}),
                       search.createColumn({name: "custrecordzab_si_end_date", label: "End Date"}),
                       search.createColumn({name: "custrecordzab_si_rate_type", label: "Rate Type"}),
                       search.createColumn({name: "custrecordzab_si_quantity", label: "Quantity"}),
                       search.createColumn({name: "custrecordzab_si_total_value", label: "Total"})
                    ]
                 });
                 var searchResultCount = customrecordzab_itemSearchObj.runPaged().count;
                 log.debug("customrecordzab_itemSearchObj result count",searchResultCount);
    
                 var itemArray = [];
    
                 customrecordzab_itemSearchObj.run().each(function(result){
                    // .run().each has a limit of 4,000 results
                    var itemsObj = {};
    
                    itemsObj.itemID = result.getValue("custrecordzab_si_item");
                    itemsObj.itemStartDate = result.getValue("custrecordzab_si_start_date");
                    itemsObj.itemEndDate = result.getValue("custrecordzab_si_end_date");
                    itemsObj.itemRateType = result.getValue("custrecordzab_si_rate_type");
                    itemsObj.itemQuantity = result.getValue("custrecordzab_si_quantity");
                    itemsObj.itemTotal = result.getValue("custrecordzab_si_total_value");

    
                    itemArray.push(itemsObj);
    
                    return true;
                 });

                 return itemArray;
            }
            ctx.response.write(JSON.stringify(subscriptionsArray));
        }
    };
});
