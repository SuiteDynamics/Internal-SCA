{{log this}}
<div class="stitch-payments-list-container">
    <div>
        <select id="stitch-payments-dropdown" class="stitch-payments-dropdown" data-action="change-stitch-payment">
            {{#each payments}}
            <option {{#if default_card}}selected{{/if}} name="stitch-payment-{{last_four}}" id="{{id}}"><strong>{{card_type}}</strong> ending in {{last_four}}</option>
            {{/each}}
        </select>
    </div>
    <div class="stitch-success-checkmark-container">
        <svg id="stitch-success-checkmark" class="stitch-success-checkmark" begin="indefinite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle id="stitch-success-checkmark-circle" class="checkmark_success_circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
    </div>
    <div class="stitch-fail-checkmark-container">
        <svg id="stitch-fail-checkmark" class="stitch-fail-checkmark" begin="indefinite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle id="stitch-fail-checkmark-circle" class="checkmark_fail_circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M16 16 36 36 M36 16 16 36"/>
        </svg>
    </div>
</div>
<div class="stitch-payments-buttons-container">
    <div class="stitch-payments-add-container">
        <a id="stitch-add-token-button" data-action="stitch-add-token" class="stitch-add-token-button" data-toggle="show-in-modal">Add New Card</a>
    </div>
    <div class="stitch-payments-remove-container">
        <a id="stitch-remove-token-button" data-action="stitch-remove-token" class="stitch-remove-token-button" data-toggle="show-in-modal">Remove Cards</a>
    </div>
</div>


