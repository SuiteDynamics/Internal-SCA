define('SuiteDynamics.SDWebsiteCCTs.Entrypoint',
    [
        'SuiteDynamics.SDWebsiteCCTs.MainTitleCCT',
        'SuiteDynamics.SDWebsiteCCTs.SplitContentCCT',
        'SuiteDynamics.SDWebsiteCCTs.TextBannerCCT'
    ],
    function Entrypoint(
        MainTitleCCT,
        SplitContentCCT,
        TextBannerCCT
    )
{
    'use strict';

    return {
        mountToApp: function(container) {
            MainTitleCCT.mountToApp(container);
            SplitContentCCT.mountToApp(container);
            TextBannerCCT.mountToApp(container);
        }
    }
});

