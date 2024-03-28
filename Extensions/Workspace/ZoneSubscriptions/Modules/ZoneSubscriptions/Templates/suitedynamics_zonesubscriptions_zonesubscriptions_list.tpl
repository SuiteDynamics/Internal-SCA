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
    {{#each columns}}
      <th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>
      {{label}} <i></i>
      </th>
    {{/each}}
    <th></th>
    </tr>
    </thead>
    
    <tbody>
    
    {{#each results}}
      <tr>
          <td class="zab-detail-expand-icon">
            <img class="zab-detail-expand-icon-img" src="https://7050356.secure.netsuite.com/core/media/media.nl?id=20875&c=7050356&h=2nZeettnjgZ1BrO5MY_85cq4fIFMsa3QROs3X_vE-i9Js1Nf" alt="">
          </td>
        {{#each this}}
          <td>
            {{#if isGroup}}
              <a data-group="{{internalid}}" data-colindex="{{colindex}}" data-hashtag="#subscription-detail" href="/subscription-detail">{{text}}</a>
            {{else}}
              {{#if isURL}}
                <a href="{{text}}" target="_blank">{{text}}</a>
              {{else}}
                <p>{{text}}</p>
              {{/if}}
            {{/if}}
          </td>
        {{/each}}

        <td>
          <a id="zab-detail-button" href="/subscription-detail" class="zab-detail-modal-popup-button" data-toggle="show-in-modal">Details</a>
        </td>
      </tr>
      <tr id="zab-item">
        <td>
        </td>
        <td>
        </td>
        <td>
          <div class="clearfix zab-item-name-image-container">
            <img class="zab-item-image" src="https://7050356.app.netsuite.com/core/media/media.nl?id=20874&c=7050356&h=TB7MA5Bz_dcO-XFJFlPtoDL536DfsUPCTKeOJ3265gcP1-2b" alt="">
            <div class="zab-item-name">Development Services</div>
          </div>					

        </td>
        <td colspan="3">
          <p class="zab-item-description">Development Services for any Netsuite request. Take your Netsuite environment to the next level.</p>
        </td>
        <td>
          <p>rate: $200</p>
        </td>
        <td>
          <p>qty: 1</p>
        </td>
      </tr>
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