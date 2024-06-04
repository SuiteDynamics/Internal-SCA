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
            var subtitle = Utils.trim(this.settings.custrecord_cct_mt_subtitle);
            var imageSrc = Utils.trim(this.settings.custrecord_cct_mt_image_src);
            var defaultImageAltText = 'Title section image';
            var imageAlt = Utils.trim(this.settings.custrecord_cct_mt_image_alt) || defaultImageAltText;
            var defaultBackgroundColor = '#002535';
            var backgroundColor = Utils.trim(this.settings.custrecord_cct_mt_background_hex) || defaultBackgroundColor;

			return {
                title: title,
                subtitle: subtitle,
                imageSrc: imageSrc,
                imageAlt: imageAlt,
                backgroundColor: backgroundColor
			};
		}
	});
});
