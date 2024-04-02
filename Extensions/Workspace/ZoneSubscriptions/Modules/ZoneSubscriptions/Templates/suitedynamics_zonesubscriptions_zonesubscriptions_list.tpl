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
  <table data-action="expand-table">
    <thead>
    <tr>
    <th></th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Subscription ID</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Start Date</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>End Date</th>
    <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Charge Schedule</th>
    <th></th>
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
          <td>
              <a id="zab-detail-button" href="/subscription-detail" class="zab-detail-modal-popup-button" data-toggle="show-in-modal">Details</a>
          </td>
      </tr>
      {{#each items}}
          <tr id="zab-item">
            <td>
            </td>
            <td>
            </td>
            <td>
              <div class="clearfix zab-item-name-image-container">
                <img class="zab-item-image" src="https://7050356.app.netsuite.com/core/media/media.nl?id=20874&c=7050356&h=TB7MA5Bz_dcO-XFJFlPtoDL536DfsUPCTKeOJ3265gcP1-2b" alt="">
                <div class="zab-item-name">{{itemID}}</div>
              </div>					

            </td>
            <td colspan="3">
              <p class="zab-item-description">{{itemDesc}}</p>
            </td>
            <td>
              <p>qty: {{itemQuantity}}</p>
            </td>
            <td>
              <p>Total: $ {{itemTotal}}</p>
            </td>
          </tr>
      {{/each}}
    {{/each}}
    </tbody>
    
  </table>
  </div>
  {{else}}
    <h5>No results found.</h5>
  {{/if}}
  <div data-view="Pagination.View" class="searchresults-pagination"></div>
{{/if}}

</section>