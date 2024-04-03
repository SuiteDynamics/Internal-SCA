
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
			var layout = container.getComponent('Layout');


			var pageType = container.getComponent('PageType');
			var environment = container.getComponent("Environment");
			var MyAccountMenu = container.getComponent("MyAccountMenu");
			var savedSearches = environment.getConfig('savedSearchesMyaccount',[]);
			
			// _.each(savedSearches,function(configObj){
				
			// 	MyAccountMenu.addGroup({
			// 		"id": ("search_" + configObj.savedSearchId),
			// 		"name": configObj.tabLabel,
			// 		"url": ("search/" + configObj.savedSearchId),
			// 		"index": configObj.tabIndex
			// 	});
			// });

			// MyAccountMenu.addGroup({
			// 	"id": "zone_advanced_billing",
			// 	"name": "Subscriptions",
			// 	"url": ("subscriptions"),
			// 	"index": 6
			// });
			
			
			// pageType.registerPageType({
			// 	name: 'SearchResultsModuleView',
			// 	routes: ['subscriptions'],
			// 	options: {
			// 		container: container,
			// 		environment: environment,
			// 	},
			// 	view: SearchResultsModuleView
			// });

			// pageType.registerPageType({
			// 	name: 'SubscriptionDetailView',
			// 	routes: ['subscription-detail'],
			// 	view: SearchResultsDetailView,
			// 	options: {
			// 		application: container,
			// 		environment: environment,
			// 		savedSearches: savedSearches
			// 	}
			// });

		}
	};
});
