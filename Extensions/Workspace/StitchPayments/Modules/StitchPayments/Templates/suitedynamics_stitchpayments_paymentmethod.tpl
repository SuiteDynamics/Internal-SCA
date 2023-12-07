{{log this}}
<div class="Stitchpayments-list">
    <select id="stitch-payments-dropdown" data-action="change-stitch-payment">
        {{#each payments}}
        <option name="stitch-payment-{{last_four}}" id="{{id}}"><strong>{{card_type}}</strong> ending in {{last_four}}</option>
        {{/each}}
    </select>
    <div>
    <a id="stitch-add-token-button" data-action="stitch-add-token" class="stitch-add-token-button" data-toggle="show-in-modal">Add New Card</a>
    </div>
</div>


