{{log this}}
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
  <table data-action="expand-table" class="order-history-list-recordviews-actionable-table">
    <thead class="order-history-list-recordviews-actionable-header">
    <tr>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Subscription ID</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Start Date</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>End Date</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Subscription Status</th>
    </tr>
    </thead>
    
    <tbody class="order-history-list">
    
    {{#each subscriptions}}
    {{log this}}
      <tr>
          
          <td>{{idNumber}}</td>
          <td>{{startDate}}</td>
          <td>{{endDate}}</td>
          <td>{{subscriptionStatus}}</td>
          
      </tr>

      {{/each}}
         </tbody>
    
  </table>
  </div>
     {{/if}}
     
  <div data-view="Pagination.View" class="searchresults-pagination"></div>
{{/if}}
{{#each subscriptions}}
{{#if items.length}}
<table data-action="expand-table" class="order-history-list-recordviews-actionable-table">
<thead class="order-history-list-recordviews-actionable-header">
    <tr>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Item Image</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Item Name</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Quantity</th>
    <th class="order-history-list-recordviews-actionable-title-header" data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>Total</th>
    </tr>
    </thead>
    <tbody class="order-history-list">
        {{#each items}}

            <tr id="zab-item">
             
              <td>
                <div class="clearfix zab-item-name-image-container">
                  <img class="zab-item-image" src={{itemImage}} alt="">
                  
                </div>					
              </td>
              <td>
                <div class="zab-item-name">{{name}}</div>
              </td>
              <td>
                <p>qty: {{itemQuantity}}</p>
              </td>
              <td>
                <p>Total: $ {{itemTotal}}</p>
              </td>
              
            </tr>
        {{/each}}
         </tbody>
         </table>
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



</section>