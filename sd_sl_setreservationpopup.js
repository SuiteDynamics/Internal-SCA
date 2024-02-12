/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
 define([
    'N/record',
    'N/search',
    'N/render',
    'N/file',
    'N/ui/serverWidget',
    'N/runtime',
    'N/format',
    'N/redirect',
    'N/url',
    'N/ui/message'
], function (
    record,
    search,
    render,
    file,
    serverWidget,
    runtime,
    format,
    redirect,
    url,
    message
) {
    /**
     * @param {SuiteletContext.onRequest} context
     */
    function onRequest(context) {
        log.debug('Start', 'start');
        renderPage(context)
    }



    function renderPage(context) {
        var form = serverWidget.createForm({
            title: ' ',
            hideNavBar: true
        });

        var renderer = render.create();
        renderer.templateContent = file
            .load('SuiteScripts/calendardaterange.html')
            .getContents();

        var logoFileURL = runtime.getCurrentScript().getParameter({
            name: 'custscript_company_logo'
        });

        var inlineHtml = form.addField({
            id: 'suitelet_interface',
            type: 'inlinehtml',
            label: 'Suitelet Interface'
        });
        inlineHtml.updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.NORMAL
        });

        inlineHtml.padding = 0;

        inlineHtml.defaultValue = renderer.renderAsString();

        context.response.writePage(form);
        return form;
    }






    return {
        onRequest: onRequest
    };
});