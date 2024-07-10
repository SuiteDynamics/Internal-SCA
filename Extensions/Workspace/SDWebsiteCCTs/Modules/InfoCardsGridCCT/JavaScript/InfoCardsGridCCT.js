define('SuiteDynamics.SDWebsiteCCTs.InfoCardsGridCCT',
	[
		'SuiteDynamics.SDWebsiteCCTs.InfoCardsGridCCT.View'
	],
	function InfoCardsGridCCT(
		InfoCardsGridCCTView
	)
{
	'use strict';

	return  {
		mountToApp: function(container) {
			container.getComponent('CMS').registerCustomContentType({
				id: 'sd_cct_infocardsgrid',
				view: InfoCardsGridCCTView,
				options: {
					container: container
				}
			});
		}
	};
});
