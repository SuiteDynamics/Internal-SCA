define('SuiteDynamics.SDWebsiteCCTs.Entrypoint',
    [
        'SuiteDynamics.SDWebsiteCCTs.MainTitleCCT',
        'SuiteDynamics.SDWebsiteCCTs.SplitContentCCT',
        'SuiteDynamics.SDWebsiteCCTs.TextBannerCCT',
        'SuiteDynamics.SDWebsiteCCTs.InfoCardsGridCCT'
    ],
    function Entrypoint(
        MainTitleCCT,
        SplitContentCCT,
        TextBannerCCT,
        InfoCardsGridCCT
    )
{
    'use strict';

    return {
        mountToApp: function(container) {
            MainTitleCCT.mountToApp(container);
            SplitContentCCT.mountToApp(container);
            TextBannerCCT.mountToApp(container);
            InfoCardsGridCCT.mountToApp(container);
        }
    }
});

