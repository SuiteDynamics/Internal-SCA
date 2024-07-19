define('SuiteDynamics.SDWebsiteCCTs.CTABlockCCT',
	[
		'SuiteDynamics.SDWebsiteCCTs.CTABlockCCT.View'
	],
	function CTABlockCCT(
		CTABlockCCTView
	)
{
	'use strict';

	return  {
		mountToApp: function(container) {
			container.getComponent('CMS').registerCustomContentType({
				id: 'sd_cct_ctablock',
				view: CTABlockCCTView,
				options: {
					container: container
				}
			});
		}
	};
});
