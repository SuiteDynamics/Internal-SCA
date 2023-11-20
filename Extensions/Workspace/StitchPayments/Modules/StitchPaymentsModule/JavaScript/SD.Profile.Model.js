define('SD.Profile.Model', 
    [
        'Profile.Model',
        'underscore'
    ],
    function (
        ProfileModule,
        _
    ) {
        'use strict';

        return _.has(ProfileModule,'ProfileModel')? ProfileModule.ProfileModel: ProfileModule;
    }
);