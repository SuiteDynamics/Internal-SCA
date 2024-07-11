<section class="searchresultsmodule-info-card">
  <h1>{{tabLabel}}</h1>
{{#if loading}}
  <h5>Loading Results...</h5>
{{else}}
  {{#if hasResults}}
    {{#if showReturn}}
    <div class="return-summary-link-container">
      <a class="return-summary-link">Return to Summary</a>
    </div>
    {{/if}}
    <div>
    <label for="status-filter">Status:</label>
    <select id="status-filter">
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="expired">Expired</option>
      <option value="suspended">Suspended</option>
      <option value="canceled">Canceled</option>
    </select>
  </div>
  <div class="searchresults-table-container">
  <table data-action="expand-table" class="order-history-list-recordviews-actionable-table">
    <thead class="order-history-list-recordviews-actionable-header">
    <tr>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Subscription ID</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Start Date</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>End Date</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Charge Schedule</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Subscription Status</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Order Date</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Total cost</th>
    </tr>
    </thead>
    
    <tbody class="order-history-list">
    
    {{#each subscriptions}}
    {{log this}}
      <tr>
          
        <td> <a data-group="{{billTo}}" data-hashtag="#subscription-detail" data-colindex="0"  data-action="showDetails">{{idNumber}}</a>
          <td>{{startDate}}</td>
          <td>{{endDate}}</td>
          <td>{{chargeSchedule}}</td>
          <td>{{subscriptionStatus}}</td>
          <td>{{orderDate}}</td>
          <td>{{totalCost}}</td>
          
      </tr>
      {{#if items.length}}
        {{#each items}}
            <tr id="zab-item">
              <td>
              </td>
              <td>
              </td>
              <td>
                <div class="clearfix zab-item-name-image-container">
                  <img class="zab-item-image" src={{itemImage}} alt="">
                  <div class="zab-item-name">{{name}}</div>
                </div>					
              </td>
              <td>
                <p class="zab-item-description">{{itemDesc}}</p>
              </td>
              <td>
                <p>qty: {{itemQuantity}}</p>
              </td>
              <td>
                <p>Total: $ {{itemTotal}}</p>
              </td>
              <td>
              </td>
              <td>
              </td>
            </tr>
        {{/each}}
        {{else}}
      <tr id="zab-item">
      <td>
              </td>
              <td>
              </td>
              
              <td>
              </td>
        <td>
        <p class="zab-item-description">There are no items related</p>
        </td>
        <td>
        </td>
        <td>
        </td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
    {{/if}}
      {{/each}}
    
    </tbody>
    
  </table>
  </div>
  {{else}}
    <h5>No results found.</h5>
  {{/if}}
  <div data-view="Pagination.View" class="searchresults-pagination"></div>
{{/if}}

   <script>
        document.getElementById('status-filter').addEventListener('change', function () {
            var selectedStatus = this.value.toLowerCase();
            var rows = document.querySelectorAll('.custom-table tbody tr');

            rows.forEach(function (row) {
                var status = row.querySelector('td:nth-child(6)').textContent.toLowerCase();
                if (selectedStatus === 'all' || status === selectedStatus) {
                    row.style.display = '';
                } else {
                  console.log('row',row)
                    row.style.display = 'none';
                }
            });
        });
      $(document).ready(function() {
          $("tr#zab-item").hide();
      });
    </script>
<section class="shipping-status-details">
			<div data-view="SuiteDynamics.ZoneSubscriptions.ZoneSubscriptions.Detailed"></div>
		</section>
</section>