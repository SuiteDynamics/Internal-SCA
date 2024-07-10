define('SuiteDynamics.SDWebsiteCCTs.InfoCardsGridCCT.View',
	[
		'CustomContentType.Base.View',
		'infocardsgridcct.tpl',
        'jQuery',
        'underscore',
		'Utils'
	],
    function InfoCardsGridCCTView(
		CustomContentTypeBaseView,
        infocardsgridcct_tpl,
        jQuery,
        _,
		Utils
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({
		template: infocardsgridcct_tpl,

        install: function(settings, context_data) {
			this._install(settings, context_data);

			return jQuery.Deferred().resolve();
		},

		validateContextDataRequest: function() {
			return true;
		},

		getGridStyleClass: function(styleId) {
			var gridStyleClass;

			switch (styleId) {
				case '2':
					gridStyleClass = 'cms-cct-card-grid-style-team';
					break;
				default:
					gridStyleClass = 'cms-cct-card-grid-style-detailed-service';
					break;
			}

			return gridStyleClass;
		},

		getInfoCards: function() {
			var cardsCount = 6;
			var infoCards = [];

			for (var i = 1; i <= cardsCount; i++) {
				var card = this._getCardData(i);
				if (card) {
					infoCards.push(card);
				}
			}

			return infoCards;
		},

		_getCardData: function(index) {
			var cardImageSrc = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_img_src'] || '');
			var cardTitle = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_title'] || '');
			var cardSubtitle = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_subtitle'])
			var cardBody = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_body'] || '');
<<<<<<< HEAD
=======
			var cardCtaLink = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_cta_link']);
			var isExternalLink = cardCtaLink && cardCtaLink.indexOf('http') > -1;
			var cardCtaText = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_cta_text']);
			var defaultCtaTextColor = '#EFF3F5';
			var cardCtaTextColor = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_cta_text_color']) || defaultCtaTextColor;
			var defaultCtaBackgroundColor = '#336E87';
			var cardCtaBackgroundColor = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_cta_bg_color']) || defaultCtaBackgroundColor;
>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af

			if (cardImageSrc && cardTitle && cardBody) {
				return {
					cardImageSrc: cardImageSrc,
					cardTitle: cardTitle,
					cardSubtitle: cardSubtitle,
<<<<<<< HEAD
					cardBody: cardBody
=======
					cardBody: cardBody,
					cardCtaLink: cardCtaLink,
					isExternalLink: isExternalLink,
					cardCtaText: cardCtaText,
					cardCtaTextColor: cardCtaTextColor,
					cardCtaBackgroundColor: cardCtaBackgroundColor
>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af
				};
			}

			return null;
		},

        getContext: function() {
			var infoCards = this.getInfoCards();
			var sectionTitle = Utils.trim(this.settings.custrecord_cct_icg_section_title);
<<<<<<< HEAD
=======
			var sectionSubtitle = Utils.trim(this.settings.custrecord_cct_icg_section_subtitle);
>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af
			var gridStyleClass = this.getGridStyleClass(this.settings.custrecord_cct_icg_grid_style);
			var defaultSectionBackgroundColor = '#f5f8f9';
			var sectionBackgroundColor = Utils.trim(this.settings.custrecord_cct_icg_background_color_hex) || defaultSectionBackgroundColor;

			return {
				sectionBackgroundColor: sectionBackgroundColor,
				sectionTitle: sectionTitle,
<<<<<<< HEAD
=======
				sectionSubtitle: sectionSubtitle,
>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af
				infoCards: infoCards,
				gridStyleClass: gridStyleClass
			};
		}
	});
});
