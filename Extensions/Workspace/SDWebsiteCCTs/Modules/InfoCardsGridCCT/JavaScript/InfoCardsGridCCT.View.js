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
			var cardBody = Utils.trim(this.settings['custrecord_cct_icg_card' + index + '_body'] || '');

			if (cardImageSrc && cardTitle && cardBody) {
				return {
					cardImageSrc: cardImageSrc,
					cardTitle: cardTitle,
					cardBody: cardBody
				};
			}

			return null;
		},

        getContext: function() {
			var infoCards = this.getInfoCards();

			return {
				infoCards: infoCards
			};
		}
	});
});
