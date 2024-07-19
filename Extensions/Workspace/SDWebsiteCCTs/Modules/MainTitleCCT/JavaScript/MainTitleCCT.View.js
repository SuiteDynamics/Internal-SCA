define('SuiteDynamics.SDWebsiteCCTs.MainTitleCCT.View',
	[
		'CustomContentType.Base.View',
		'maintitlecct.tpl',
        'jQuery',
        'underscore',
        'Utils'
	],
    function MainTitleCCTView(
		CustomContentTypeBaseView,
        maintitlecct_tpl,
        jQuery,
        _,
        Utils
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({
		template: maintitlecct_tpl,

        install: function(settings, context_data) {
			this._install(settings, context_data);

			return jQuery.Deferred().resolve();
		},

		getButtonAlignmentClass: function (ctaButtonAlignmentValue) {
			var buttonAlignmentClass;

			switch (ctaButtonAlignmentValue) {
				case '1':
					buttonAlignmentClass = 'cms-cct-maintitle-content-left-interior-row-btn-align-left';
					break;
				case '2':
					buttonAlignmentClass = 'cms-cct-maintitle-content-left-interior-row-btn-align-center';
					break;
				case '3':
					buttonAlignmentClass = 'cms-cct-maintitle-content-left-interior-row-btn-align-right';
					break;
				default:
					buttonAlignmentClass = 'cms-cct-maintitle-content-left-interior-row-btn-align-center';
					break;
			}

			return buttonAlignmentClass;
		},

        getContext: function() {
			var title = Utils.trim(this.settings.custrecord_cct_mt_title);
			var titleDefaultColor = '#ADC5CF';
			var titleColor = Utils.trim(this.settings.custrecord_cct_mt_title_color_hex) || titleDefaultColor;
            var subtitle = Utils.trim(this.settings.custrecord_cct_mt_subtitle);
			var subtitleDefaultColor = '#EFF3F5';
			var subtitleColor = Utils.trim(this.settings.custrecord_cct_mt_subtitle_color_hex) || subtitleDefaultColor;
            var imageSrc = Utils.trim(this.settings.custrecord_cct_mt_image_src);
            var defaultImageAltText = 'Title section image';
            var imageAlt = Utils.trim(this.settings.custrecord_cct_mt_image_alt) || defaultImageAltText;
            var defaultBackgroundColor = '#002535';
            var backgroundColor = Utils.trim(this.settings.custrecord_cct_mt_background_hex) || defaultBackgroundColor;
			var ctaLink = Utils.trim(this.settings.custrecord_cct_mt_cta_link);
			var ctaText = Utils.trim(this.settings.custrecord_cct_mt_cta_text);
			var defaultCtaTextColor = '#002535';
			var ctaTextColor = Utils.trim(this.settings.custrecord_cct_mt_cta_text_color) || defaultCtaTextColor;
			var defaultCtaBackgroundColor = '#EFF3F5';
			var ctaBackgroundColor = Utils.trim(this.settings.custrecord_cct_mt_bg_color) || defaultCtaBackgroundColor;
			var isExternalLink = ctaLink && ctaLink.indexOf('http') > -1;
			var hideArrowImage = this.settings.custrecord_cct_mt_hide_arrow_img === 'T';
			var ctaButtonAlignmentClass = this.getButtonAlignmentClass(this.settings.custrecord_cct_mt_cta_alignment);

			return {
                title: title,
				titleColor: titleColor,
                subtitle: subtitle,
				subtitleColor: subtitleColor,
                imageSrc: imageSrc,
                imageAlt: imageAlt,
                backgroundColor: backgroundColor,
				ctaLink: ctaLink,
				ctaText: ctaText,
				ctaTextColor: ctaTextColor,
				ctaBackgroundColor: ctaBackgroundColor,
				ctaButtonAlignmentClass: ctaButtonAlignmentClass,
				isExternalLink: isExternalLink,
				hideArrowImage: hideArrowImage
			};
		}
	});
});
