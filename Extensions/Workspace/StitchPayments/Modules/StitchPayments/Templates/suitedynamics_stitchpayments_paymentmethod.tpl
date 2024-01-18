{{log this}}
<div class="stitch-payments-list-container">
    <div>

        <!-- added for native list -->
        <div id="creditcard-module-list-placeholder" class="order-wizard-paymentmethod-creditcard-module-list-placeholder">
            <div data-view="StitchPayments.List"></div>
        </div>
        <!-- end -->

        <!-- <select id="stitch-payments-dropdown" class="stitch-payments-dropdown" data-action="change-stitch-payment">
            {{#each payments}}
            <option {{#if default_card}}selected{{/if}} name="stitch-payment-{{last_four}}" id="{{id}}"><strong>{{card_type}}</strong> ending in {{last_four}}</option>
            {{/each}}
        </select> -->
    </div>
</div>
<!-- <div class="stitch-payments-buttons-container">
    <div class="stitch-payments-add-container">
        <a id="stitch-add-token-button" data-action="stitch-add-token" class="stitch-add-token-button" data-toggle="show-in-modal">Add New Card</a>
    </div>
</div> -->
<div class="stitch-payments-fail-container" id="stitch-fail-message" data-type="alert-placeholder"></div>
