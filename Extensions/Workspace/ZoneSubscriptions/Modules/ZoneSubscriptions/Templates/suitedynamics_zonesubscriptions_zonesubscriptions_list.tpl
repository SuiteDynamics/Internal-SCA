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
  <div class="searchresults-table-container">
  <table data-action="expand-table" class="custom-table">
    <thead>
    <tr>
    <th></th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Subscription ID</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Start Date</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>End Date</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Charge Schedule</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Subscription Status</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Order Date</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Total cost</th>
    </tr>
    </thead>
    
    <tbody>
    
    {{#each subscriptions}}
    {{log this}}
      <tr>
          <td class="zab-detail-expand-icon">
              <img class="zab-detail-expand-icon-img" src="https://7050356.secure.netsuite.com/core/media/media.nl?id=20875&c=7050356&h=2nZeettnjgZ1BrO5MY_85cq4fIFMsa3QROs3X_vE-i9Js1Nf" alt="">
          </td>
          <td>{{idNumber}}</td>
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
   <script>
        document.getElementById('status-filter').addEventListener('change', function () {
            var selectedStatus = this.value.toLowerCase();
            var rows = document.querySelectorAll('.custom-table tbody tr');

            rows.forEach(function (row) {
                var status = row.querySelector('td:nth-child(6)').textContent.toLowerCase();
                if (selectedStatus === 'all' || status === selectedStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
      $(document).ready(function() {
          $("tr#zab-item").hide();
      });
    </script>

</section>