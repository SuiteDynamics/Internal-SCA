define('SuiteDynamics.SDWebsiteCCTs.Entrypoint',
    [
        'SuiteDynamics.SDWebsiteCCTs.MainTitleCCT',
        'SuiteDynamics.SDWebsiteCCTs.SplitContentCCT'
    ],
    function Entrypoint(
        MainTitleCCT,
        SplitContentCCT
    )
{
    'use strict';

    return {
        mountToApp: function(container) {
            MainTitleCCT.mountToApp(container);
            SplitContentCCT.mountToApp(container);
        }
    }
});

