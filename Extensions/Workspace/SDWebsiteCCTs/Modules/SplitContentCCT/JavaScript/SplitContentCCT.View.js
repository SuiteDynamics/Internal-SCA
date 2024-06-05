define('SuiteDynamics.SDWebsiteCCTs.SplitContentCCT.View',
    [
        'CustomContentType.Base.View',
        'splitcontentcct.tpl',
        'jQuery',
        'underscore',
        'Utils'
    ],
    function SplitContentCCTView (
        CustomContentTypeBaseView,
        splitcontentcct_tpl,
        jQuery,
        _,
        Utils
    )
{
    'use strict';

    return CustomContentTypeBaseView.extend({
        template: splitcontentcct_tpl,

        install: function(settings, context_data) {
            this._install(settings, context_data);

            return jQuery.Deferred().resolve();
        },

        getContext: function() {
            var imageSrc = Utils.trim(this.settings.custrecord_cct_sc_image_src);
            var imageAltText = Utils.trim(this.settings.custrecord_cct_sc_image_alt_text);
            var title = Utils.trim(this.settings.custrecord_cct_sc_title);
            var sectionBody = Utils.trim(this.settings.custrecord_cct_sc_section_body);
            var ctaText = Utils.trim(this.settings.custrecord_cct_sc_cta_text);
            var ctaLink = Utils.trim(this.settings.custrecord_cct_sc_cta_link);
            var isExternalLink = ctaLink && ctaLink.indexOf('http') > -1;
            var defaultCtaTextColor = '#EFF3F5';
            var ctaTextColor = Utils.trim(this.settings.custrecord_cct_sc_cta_text_color_hex) || defaultCtaTextColor;
            var defaultCtaBackgroundColor = '#336E87';
            var ctaBackgroundColor = Utils.trim(this.settings.custrecord_cct_sc_cta_bg_color_hex) || defaultCtaBackgroundColor;
            var defaultSectionBackgroundColor = '#FFF';
            var sectionBackgroundColor = Utils.trim(this.settings.custrecord_cct_sc_bg_color) || defaultSectionBackgroundColor;
            var centerContent = this.settings.custrecord_cct_sc_center_content === 'T';

            return {
                imageSrc: imageSrc,
                imageAltText: imageAltText,
                title: title,
                sectionBody: sectionBody,
                ctaText: ctaText,
                ctaLink: ctaLink,
                isExternalLink: isExternalLink,
                showCta: ctaText && ctaLink,
                ctaTextColor: ctaTextColor,
                ctaBackgroundColor: ctaBackgroundColor,
                sectionBackgroundColor: sectionBackgroundColor,
                centerContent: centerContent
            };
        }
    });
});
