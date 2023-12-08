{{log this}}
<div class="Stitchpayments-list">
    <select id="stitch-payments-dropdown" data-action="change-stitch-payment">
        {{#each payments}}
        <option {{#if default_card}}selected{{/if}} name="stitch-payment-{{last_four}}" id="{{id}}"><strong>{{card_type}}</strong> ending in {{last_four}}</option>
        {{/each}}
    </select>
    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
    </svg>
    <div>
    <a id="stitch-add-token-button" data-action="stitch-add-token" class="stitch-add-token-button" data-toggle="show-in-modal">Add New Card</a>
    </div>
</div>


