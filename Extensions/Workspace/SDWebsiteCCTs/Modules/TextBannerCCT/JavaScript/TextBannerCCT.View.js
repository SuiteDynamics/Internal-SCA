define('SuiteDynamics.SDWebsiteCCTs.TextBannerCCT.View',
    [
        'CustomContentType.Base.View',
        'textbannercct.tpl',
        'jQuery',
        'underscore',
        'Utils'
    ],
    function TextBannerCCTView (
        CustomContentTypeBaseView,
        textbannercct_tpl,
        jQuery,
        _,
        Utils,
    )
{
    'use strict';

    return CustomContentTypeBaseView.extend({
        template: textbannercct_tpl,

        install: function(settings, context_data) {
            this._install(settings, context_data);

            return jQuery.Deferred().resolve();
        },

        getContext: function() {
            var bannerText = Utils.trim(this.settings.custrecord_cct_tb_text);
            var defaultTextColor = '#EFF3F5';
            var textColor = Utils.trim(this.settings.custrecord_cct_tb_text_color_hex) || defaultTextColor;
            var defaultBackgroundColor = '#002535';
            var backgroundColor = Utils.trim(this.settings.custrecord_cct_tb_bg_color) || defaultBackgroundColor;

            return {
                bannerText: bannerText,
                textColor: textColor,
                backgroundColor: backgroundColor
            };
        }
    });
});
