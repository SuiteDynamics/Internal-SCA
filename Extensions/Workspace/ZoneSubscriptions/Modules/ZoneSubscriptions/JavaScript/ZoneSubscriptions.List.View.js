// @module SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions
define('SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.List.View'
	, [
		'suitedynamics_zonesubscriptions_zonesubscriptions_list.tpl'

		, 'SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.SS2Model'

		, 'Backbone'
		, 'Utils'
	]
	, function (
		suitedynamics_zonesubscriptions_zonesubscriptions_list_tpl

		, ZoneSubscriptionsSS2Model

		, Backbone
		, Utils
	) {
		'use strict';

		// @class SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.View @extends Backbone.View
		return Backbone.View.extend({

			template: suitedynamics_zonesubscriptions_zonesubscriptions_list_tpl

			, initialize: function (options) {

				/*  Uncomment to test backend communication with an example service
					(you'll need to deploy and activate the extension first)
				*/
				if (!this.subscriptions) {
					this.subscriptions = [];
				}

				this.model = new ZoneSubscriptionsSS2Model();
				var self = this;
				this.model.fetch().done(function (result) {
					console.log('ZAB Subscriptions', result)
					self.subscriptions = result;
					self.render();
				});


				console.log('list view')
				this.on('afterViewRender', function () {

					$("#zab-item").find("p").hide();
					$("#zab-item").find("div").hide();

				});

				this.savedSearchId = (options.routerArguments && options.routerArguments[0]);
				var urlOptions = Utils.parseUrlOptions(options.routerArguments && options.routerArguments[1]);
				var page = urlOptions['page'] || '1';
				var sortCol = urlOptions['sortCol'];
				var order = urlOptions['order'];
				var groupValue = urlOptions['groupValue'];
				var groupIndex = urlOptions['groupIndex'];

				var config = _.findWhere(options.savedSearches, { 'savedSearchId': this.savedSearchId });
				this.tabLabel = (config && config.tabLabel);
				this.drillDownField = (config && config.drillDownField);
				this.urlField = (config && config.urlField);
				this.recordsPerPage = (config && config.recordsPerPage);

				this.formattedResults = [];

				this.loading = true;

				var self = this;
				var reqObj = {
					'savedSearchId': this.savedSearchId,
					'pageSize': this.recordsPerPage,
					'page': page
				};
				if (sortCol) {
					reqObj.sortCol = sortCol;
					reqObj.order = order;
				}
				if (groupValue && groupIndex) {
					reqObj.groupValue = groupValue;
					reqObj.groupIndex = groupIndex;
					this.showReturn = true;
				}



			}

			, events: {
				'click [data-sort]': 'sortData',
				'click [data-group]': 'drillDownView',
				'click .return-summary-link': 'returnSummary',
				'click [data-action="expand-table"]': 'expandTable',
			}
			, returnSummary: function () {
				var UrlHelper = _.has(UrlHelperModule, 'UrlHelper') ? UrlHelperModule.UrlHelper : UrlHelperModule;

				var url = Backbone.history.fragment;

				url = UrlHelper.removeUrlParameter(url, 'groupValue');
				url = UrlHelper.removeUrlParameter(url, 'groupIndex');
				url = UrlHelper.removeUrlParameter(url, 'page');
				url = UrlHelper.removeUrlParameter(url, 'sortCol');
				url = UrlHelper.removeUrlParameter(url, 'order');

				Backbone.history.navigate(url, { trigger: true });
			}
			, drillDownView: function (e) {
				var value = this.$(e.currentTarget).attr('data-group');
				var colindex = this.$(e.currentTarget).attr('data-colindex');

				var UrlHelper = _.has(UrlHelperModule, 'UrlHelper') ? UrlHelperModule.UrlHelper : UrlHelperModule;


				var url = Backbone.history.fragment;

				url = UrlHelper.setUrlParameter(url, 'groupValue', value);
				url = UrlHelper.setUrlParameter(url, 'groupIndex', colindex);
				url = UrlHelper.removeUrlParameter(url, 'page');
				url = UrlHelper.removeUrlParameter(url, 'sortCol');
				url = UrlHelper.removeUrlParameter(url, 'order');

				Backbone.history.navigate(url, { trigger: true });
			}
			// , 	childViews: {
			// 		'Pagination.View': function() {

			// 			var defaultPaginationSettings = this.options.environment.getConfig('defaultPaginationSettings',{});

			// 			var PaginationView = _.has(GlobalViewsPaginationModule,'GlobalViewsPaginationView')? GlobalViewsPaginationModule.GlobalViewsPaginationView: GlobalViewsPaginationModule;

			// 			return new PaginationView(
			// 				_.extend(
			// 					{
			// 						totalPages: Math.ceil(
			// 							this.totalRecords / this.recordsPerPage
			// 						)
			// 					},
			// 					defaultPaginationSettings
			// 				)
			// 			);
			// 		}
			// 	}
			, getSelectedMenu: function () {
				return 'search_' + this.savedSearchId;
			}
			, sortData: function (e) {
				console.log('Entering here')
				var UrlHelper = _.has(UrlHelperModule, 'UrlHelper') ? UrlHelperModule.UrlHelper : UrlHelperModule;

				var columnIndex = this.$(e.currentTarget).attr('data-index');

				var sortdir = this.$(e.currentTarget).attr('data-sortdir');
				console.log(sortdir)
				var sortOrder = (sortdir == "DESC") ? '0' : '1';

				var url = Backbone.history.fragment;

				url = UrlHelper.setUrlParameter(url, 'sortCol', columnIndex);
				url = UrlHelper.setUrlParameter(url, 'order', sortOrder);
				url = UrlHelper.removeUrlParameter(url, 'page');

				Backbone.history.navigate(url, { trigger: true });

			}
			, formatResults: function () {

				var results = this.model.get('results', []);

				this.totalRecords = this.model.get('totalRecords') || 0;

				var self = this;
				var formattedResults = [];

				_.each(results, function (row) {

					var rowValue = []
					_.each(row, function (result, index) {

						var column = result.column;
						var fieldText = result.value;
						var fieldInternalid = result.value;

						if (result.text) {
							fieldText = result.text;
							fieldInternalid = result.value;
						}

						rowValue.push({
							text: fieldText,
							internalid: fieldInternalid,
							colindex: index,
							isGroup: ((column.name == self.drillDownField) && !self.showReturn),
							isURL: (column.name == self.urlField)
						});

					});
					formattedResults.push(rowValue);
				});


				this.formattedResults = formattedResults;
			}
			, expandTable: function (event) {

				console.log(event.target)

				let targetID = $(event.target)[0].id;

				console.log(targetID)
				if (targetID == "zab-detail-button") {
					return
				}
				event.stopPropagation();
				var $target = $(event.target);
				if ($target.closest("td").attr("colspan") >= 0) {
					$target.slideUp();
				} else {
					var $nextRow = $target.closest("tr").next("tr#zab-item");
					$nextRow.slideToggle();

				}
			}

			//@method getContext @return SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.View.Context
			, getContext: function getContext() {

				console.log('getcontext', this)
				//@class SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.View.Context
				// this.message = this.message || 'Hello World!!'
				return {
					hasResults: (this.subscriptions.length > 0),
					subscriptions: this.subscriptions
				};
			}
		});
	});
