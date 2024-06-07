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

        getColumnClasses: function(imageSize) {
            var columnClasses = {
                left: '',
                right: ''
            };

            switch (imageSize) {
                case '1':
                    columnClasses.left = 'col-xs-12 col-sm-12';
                    columnClasses.right = 'hidden';
                    break;
                case '2':
                    columnClasses.left = 'col-xs-12 col-sm-3';
                    columnClasses.right = 'col-xs-12 col-sm-9';
                    break;
                case '3':
                    columnClasses.left = 'col-xs-12 col-sm-4';
                    columnClasses.right = 'col-xs-12 col-sm-8';
                    break;
                case '4':
                    columnClasses.left = 'col-xs-12 col-sm-5';
                    columnClasses.right = 'col-xs-12 col-sm-7';
                    break;
                case '5':
                    columnClasses.left = 'col-xs-12 col-sm-6';
                    columnClasses.right = 'col-xs-12 col-sm-6';
                    break;
                default:
                    columnClasses.left = 'col-xs-12 col-sm-12';
                    columnClasses.right = 'hidden';
                    break;
            }

            return columnClasses;
        },

        getContext: function() {
            var imageSrc = Utils.trim(this.settings.custrecord_cct_sc_image_src);
            var imageAltText = Utils.trim(this.settings.custrecord_cct_sc_image_alt_text);
            var imageSize = this.settings.custrecord_cct_sc_image_size + '';
            var columnClasses = this.getColumnClasses(imageSize);
            var title = Utils.trim(this.settings.custrecord_cct_sc_title);
            var defaultTitleColor = '#002535';
            var titleColor = Utils.trim(this.settings.custrecord_cct_sc_title_color_hex) || defaultTitleColor;
            var sectionIntro = Utils.trim(this.settings.custrecord_cct_sc_section_intro);
            var innerSectionTitle = Utils.trim(this.settings.custrecord_cct_sc_inner_title);
            var innerSectionBody = Utils.trim(this.settings.custrecord_cct_sc_inner_body);
            var defaultInnerSectionBackgroundColor = '#ADC5CF';
            var innerSectionBackgroundColor = Utils.trim(this.settings.custrecord_cct_sc_inner_bg_color_hex) || defaultInnerSectionBackgroundColor;
            var showInnerSection = innerSectionTitle || innerSectionBody;
            var sectionOutro = Utils.trim(this.settings.custrecord_cct_sc_outro);
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
            var fullWidth = this.settings.custrecord_cct_sc_full_width === 'T';

            return {
                imageSrc: imageSrc,
                imageAltText: imageAltText,
                leftColumnClasses: columnClasses.left,
                rightColumnClasses: columnClasses.right,
                title: title,
                titleColor: titleColor,
                sectionIntro: sectionIntro,
                showInnerSection: showInnerSection,
                innerSectionBackgroundColor: innerSectionBackgroundColor,
                innerSectionTitle: innerSectionTitle,
                innerSectionBody: innerSectionBody,
                sectionOutro: sectionOutro,
                ctaText: ctaText,
                ctaLink: ctaLink,
                isExternalLink: isExternalLink,
                showCta: ctaText && ctaLink,
                ctaTextColor: ctaTextColor,
                ctaBackgroundColor: ctaBackgroundColor,
                sectionBackgroundColor: sectionBackgroundColor,
                centerContent: centerContent,
                fullWidth: fullWidth
            };
        }
    });
});
