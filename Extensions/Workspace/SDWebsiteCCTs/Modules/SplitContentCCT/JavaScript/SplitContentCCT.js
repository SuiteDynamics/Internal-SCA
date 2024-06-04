define('SuiteDynamics.SDWebsiteCCTs.SplitContentCCT',
    [
        'SuiteDynamics.SDWebsiteCCTs.SplitContentCCT.View'
    ],
    function SplitContentCCT(
        SplitContentCCTView
    )
    {
        'use strict';

        return  {
            mountToApp: function(container) {
                container.getComponent('CMS').registerCustomContentType({
                    id: 'sd_cct_splitcontent',
                    view: SplitContentCCTView,
                    options: {
                        container: container
                    }
                });
            }
        };
    });
