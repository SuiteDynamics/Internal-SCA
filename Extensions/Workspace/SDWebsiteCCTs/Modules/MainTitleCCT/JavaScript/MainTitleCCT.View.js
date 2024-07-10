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

			return {
                title: title,
				titleColor: titleColor,
                subtitle: subtitle,
				subtitleColor: subtitleColor,
                imageSrc: imageSrc,
                imageAlt: imageAlt,
                backgroundColor: backgroundColor
			};
		}
	});
});
