define('SuiteDynamics.SDWebsiteCCTs.Entrypoint',
    [
        'SuiteDynamics.SDWebsiteCCTs.MainTitleCCT'
    ],
    function Entrypoint(
        MainTitleCCT
    )
{
    'use strict';

    return {
        mountToApp: function(container) {
            MainTitleCCT.mountToApp(container);
        }
    }
});

