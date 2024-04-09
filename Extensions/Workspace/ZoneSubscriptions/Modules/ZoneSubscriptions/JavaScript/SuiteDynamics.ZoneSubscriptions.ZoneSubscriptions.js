
define(
	'SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions'
	, [
		'SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.List.View'
	]
	, function (
		ZoneSubscriptionsListView
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				// using the 'Layout' component we add a new child view inside the 'Header' existing view 
				// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
				// more documentation of the Extensibility API in
				// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

				/** @type {LayoutComponent} */

				console.log('zone')
				var pageType = container.getComponent('PageType');
				var environment = container.getComponent("Environment");
				var MyAccountMenu = container.getComponent("MyAccountMenu");

				MyAccountMenu.addGroup({
					"id": "zone_advanced_billing",
					"name": "Subscriptions",
					"url": ("subscriptions"),
					"index": 6
				});


				pageType.registerPageType({
					name: 'SearchResultsModuleView',
					routes: ['subscriptions'],
					options: {
						container: container,
						environment: environment,
					},
					view: ZoneSubscriptionsListView
				});

				pageType.registerPageType({
					name: 'SubscriptionDetailView',
					routes: ['subscription-detail'],
					view: ZoneSubscriptionsListView,
					options: {
						application: container,
						environment: environment,
					}
				});

				var layout = container.getComponent('Layout');

				// if(layout)
				// {
				// 	layout.addChildView('Header.Logo', function() { 
				// 		return new ZoneSubscriptionsView({ container: container });
				// 	});
				// }

			}
		};
	});
