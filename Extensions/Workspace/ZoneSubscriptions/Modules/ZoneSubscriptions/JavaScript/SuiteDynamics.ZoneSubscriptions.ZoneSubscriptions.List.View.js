// @module SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions
define('SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.List.View'
	, [
		'suitedynamics_zonesubscriptions_zonesubscriptions_list.tpl'

		, 'SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.SS2Model'

		, 'Backbone'
		, 'Utils'
		, 'UrlHelper'
		, 'SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.Model'
		, 'SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.Detailed.View'
	]
	, function (
		suitedynamics_zonesubscriptions_zonesubscriptions_list_tpl

		, ZoneSubscriptionsSS2Model

		, Backbone
		, Utils
		, UrlHelperModule
		, Model
		, SubscriptionDetailedView
	) {
		'use strict';

		// @class SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.View @extends Backbone.View
		return Backbone.View.extend({

			template: suitedynamics_zonesubscriptions_zonesubscriptions_list_tpl

			, initialize: function (options) {

				/*  Uncomment to test backend communication with an example service
					(you'll need to deploy and activate the extension first)
				*/
				this.application = options.application;
				console.log('mainView38', options)
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

				// this.on('afterViewRender', function () {

				// 	$("#zab-item").find("p").hide();
				// 	$("#zab-item").find("div").hide();

				// });

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
				//'click [data-group]': 'drillDownView',
				'click .return-summary-link': 'returnSummary',
				'click [data-action="showDetails"]': 'showDetails'
				// ,
				// 'click [data-action="expand-table"]': 'expandTable',
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

				try {



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

				} catch (error) {
					console.error('Error in drillDown', error)
				}
			}

			, getSelectedMenu: function () {
				return 'search_' + this.savedSearchId;
			}
			, sortData: function (e) {
				var UrlHelper = _.has(UrlHelperModule, 'UrlHelper') ? UrlHelperModule.UrlHelper : UrlHelperModule;

				var columnIndex = this.$(e.currentTarget).attr('data-index');

				var sortdir = this.$(e.currentTarget).attr('data-sortdir');
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
			, showDetails: function showDetails(e) {

				var $selectedItem = (e.currentTarget) ? jQuery(e.currentTarget) : jQuery(e);
				var subscriptionId = $selectedItem.attr('data-group');

				this.getChildViewInstance('SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.Detailed').initialize({
					subscriptionId: subscriptionId,
					model: this.model,
					application: this.application,
					showInModal: true,
					subscriptions: this.subscriptions
				});
			}

			, childViews: {
				'SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.Detailed': function SubscriptionDetail() {
					var model = new Model();
					return new SubscriptionDetailedView({
						model: model,
						application: this.application
					});
				}

			},
			expandTable: function (event) {
				let $target = $(event.target);

				// Comprobamos si el clic ocurrió en el botón de detalles, si es así, no hacemos nada.
				if ($target.is('#zab-detail-button')) {
					return;
				}

				// Detenemos la propagación del evento para evitar que se ejecuten otras acciones en elementos superiores.
				event.stopPropagation();

				// Obtenemos el elemento td más cercano al que se hizo clic.
				let $closestTd = $target.closest('td');

				// Verificamos si la celda tiene un colspan mayor o igual a 0.
				if ($closestTd.attr('colspan') >= 1) {
					// Si es así, no hacemos nada.
					return;
				}

				// Obtenemos la fila actual en la que se hizo clic.
				let $currentRow = $closestTd.closest('tr');

				// Obtenemos la siguiente fila con el ID "zab-item" después de la fila actual.
				let $nextRow = $currentRow.next('tr#zab-item');

				// Verificamos si la fila siguiente existe y no es una fila de detalles.
				if ($nextRow.length && !$nextRow.hasClass('details-row')) {
					// Expandimos o contraemos la siguiente fila.
					$nextRow.slideToggle();
				}
			}


			//@method getContext @return SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.View.Context
			, getContext: function getContext() {

				//@class SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.View.Context
				// this.message = this.message || 'Hello World!!'
				return {
					hasResults: (this.subscriptions.length > 0),
					subscriptions: this.subscriptions
				};
			}
		});
	});
