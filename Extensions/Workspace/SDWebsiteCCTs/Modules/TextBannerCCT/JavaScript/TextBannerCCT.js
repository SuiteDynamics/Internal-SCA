define('SuiteDynamics.SDWebsiteCCTs.TextBannerCCT',
[
    'SuiteDynamics.SDWebsiteCCTs.TextBannerCCT.View'
],
function TextBannerCCT(
    TextBannerCCTView
)
{
    'use strict';

    return  {
        mountToApp: function(container) {
            container.getComponent('CMS').registerCustomContentType({
                id: 'sd_cct_textbanner',
                view: TextBannerCCTView,
                options: {
                    container: container
                }
            });
        }
    };
});
