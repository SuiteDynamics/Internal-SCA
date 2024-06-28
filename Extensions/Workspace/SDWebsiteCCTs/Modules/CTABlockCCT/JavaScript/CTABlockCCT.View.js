define('SuiteDynamics.SDWebsiteCCTs.CTABlockCCT.View',
	[
		'CustomContentType.Base.View',
		'ctablockcct.tpl',
        'jQuery',
        'underscore',
        'Utils'
	],
    function CTABlockCCTView(
		CustomContentTypeBaseView,
        ctablockcct_tpl,
        jQuery,
        _,
        Utils
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({
		template: ctablockcct_tpl,

        install: function(settings, context_data) {
			this._install(settings, context_data);

			return jQuery.Deferred().resolve();
		},

        getContext: function() {
			var defaultSectionBackgroundColor = '#85A8B7';
			var sectionBackgroundColor = Utils.trim(this.settings.custrecord_cct_cb_bg_color_hex) || defaultSectionBackgroundColor;
			var title = Utils.trim(this.settings.custrecord_cct_cb_title);
			var defaultTitleColor = '#002535';
			var titleColor = Utils.trim(this.settings.custrecord_cct_cb_title_color_hex) || defaultTitleColor;
			var titleCentered = this.settings.custrecord_cct_cb_title_centered === 'T';
			var defaultSubtitleColor = '#EFF3F5';
			var subtitleColor = Utils.trim(this.settings.custrecord_cct_cb_subtitle_color_hex) || defaultSubtitleColor;
			var subtitle = Utils.trim(this.settings.custrecord_cct_cb_subtitle);
			var subtitleCentered = this.settings.custrecord_cct_cb_subtitle_centered === 'T';
			var body = Utils.trim(this.settings.custrecord_cct_cb_body);
			var bodyCentered = this.settings.custrecord_cct_cb_content_centered === 'T';
			var ctaText = Utils.trim(this.settings.custrecord_cct_cb_cta_button_text);
			var ctaLink = Utils.trim(this.settings.custrecord_cta_button_link);
			var isExternalLink = ctaLink && ctaLink.indexOf('http') > -1;
			var defulatCtaTextColor = '#002535';
			var ctaTextColor = Utils.trim(this.settings.custrecord_cct_cb_cta_text_color_hex) || defulatCtaTextColor;
			var defaultCtaBackgroundColor = '#EFF3F5';
			var ctaBackgroundColor = Utils.trim(this.settings.custrecord_cct_cb_cta_bg_color_hex) || defaultCtaBackgroundColor;
			var useCtaLargeButton = this.settings.custrecord_cct_cb_cta_large === 'T';
			var ctaCentered = this.settings.custrecord_cct_cb_cta_centered === 'T';

			return {
				sectionBackgroundColor: sectionBackgroundColor,
				title: title,
				titleColor: titleColor,
				titleCentered: titleCentered,
				subtitle: subtitle,
				subtitleColor: subtitleColor,
				subtitleCentered: subtitleCentered,
				body: body,
				bodyCentered: bodyCentered,
				ctaLink: ctaLink,
				isExternalLink: isExternalLink,
				ctaText: ctaText,
				ctaTextColor: ctaTextColor,
				ctaBackgroundColor: ctaBackgroundColor,
				useCtaLargeButton: useCtaLargeButton,
				ctaCentered: ctaCentered
			};
		}
	});
});
