
define(
	'SD.SavedSearchResults.SearchResultsModule'
,   [
		'SD.SavedSearchResults.SearchResultsModule.View',
		'SearchResultsModule.Modal.View',
		'underscore'
	]
,   function (
		SearchResultsModuleView,
		SearchResultsDetailView,
		_	
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{

			var pageType = container.getComponent('PageType');
			var environment = container.getComponent("Environment");
			var MyAccountMenu = container.getComponent("MyAccountMenu");
			var savedSearches = environment.getConfig('savedSearchesMyaccount',[]);
			
			_.each(savedSearches,function(configObj){
				
				MyAccountMenu.addGroup({
					"id": ("search_" + configObj.savedSearchId),
					"name": configObj.tabLabel,
					"url": ("search/" + configObj.savedSearchId),
					"index": configObj.tabIndex
				});
			});
			
			
			pageType.registerPageType({
				name: 'SearchResultsModuleView',
				routes: ['search/:id'],
				options: {
					container: container,
					environment: environment,
					savedSearches: savedSearches
				},
				view: SearchResultsModuleView
			});

			pageType.registerPageType({
				name: 'SubscriptionDetailView',
				routes: ['subscription-detail'],
				view: SearchResultsDetailView,
				options: {
					application: container,
					environment: environment
				}
			});

		}
	};
});
