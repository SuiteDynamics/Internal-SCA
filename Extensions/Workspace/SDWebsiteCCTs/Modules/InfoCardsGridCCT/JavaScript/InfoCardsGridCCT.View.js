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

			if (cardImageSrc && cardTitle && cardBody) {
				return {
					cardImageSrc: cardImageSrc,
					cardTitle: cardTitle,
					cardSubtitle: cardSubtitle,
					cardBody: cardBody
				};
			}

			return null;
		},

        getContext: function() {
			var infoCards = this.getInfoCards();
			var sectionTitle = Utils.trim(this.settings.custrecord_cct_icg_section_title);
			var gridStyleClass = this.getGridStyleClass(this.settings.custrecord_cct_icg_grid_style);
			var defaultSectionBackgroundColor = '#f5f8f9';
			var sectionBackgroundColor = Utils.trim(this.settings.custrecord_cct_icg_background_color_hex) || defaultSectionBackgroundColor;

			return {
				sectionBackgroundColor: sectionBackgroundColor,
				sectionTitle: sectionTitle,
				infoCards: infoCards,
				gridStyleClass: gridStyleClass
			};
		}
	});
});
