{{log this}}

<!-- change to reflect native view -->

{{#if isNewPaymentMethod}}
    <a class="stitch-payments-creditcard stitch-payments-creditcard-new-card" data-action="stitch-add-token" data-toggle="show-in-modal">
        <div class="stitch-payments-creditcard-new-card-title">
            <p><i class="stitch-payments-creditcard-new-card-plus-icon"></i></p>
            {{translate 'Add Card'}}
        </div>
    </a>
{{else}}

<div>
    <a class="stitch-payments-creditcard-selector {{#if isSelected}}stitch-payments-creditcard-selected{{/if}}" data-action="select" data-id="{{creditCartId}}">
        <input type="radio" name="cards-options" class="stitch-payments-creditcard-selector-option" data-id="{{creditCartId}}" value="{{creditCartId}}" {{#if isSelected}} checked {{/if}}>
        {{#if isSelected}}
            <b>{{translate 'Selected'}}</b>
        {{else}}
            {{translate 'Select'}}
        {{/if}}
    </a>

    <div class="stitch-payments-creditcard {{#if isSelected}}stitch-payments-creditcard-selected{{/if}}" data-id="{{creditCartId}}">
        <div class="stitch-payments-creditcard-container">
            <div>
                <div class="stitch-payments-creditcard-header">
                    <p class="stitch-payments-creditcard-number"><b>{{translate 'Ending in'}}</b> {{lastfourdigits}} </p>
                    {{#if logo}}
                        <img class="stitch-payments-creditcard-header-icon" src="{{logo}}" alt="{{paymentName}}">
                    {{else}}
                        {{type}}
                    {{/if}}
                </div>

                <p class="stitch-payments-creditcard-expdate"><b>{{translate 'Expires in'}}</b> {{expirationDate}}</p>
                <button class="stitch-removetoken-button" id="{{id}}" data-action="stitch-remove-token">Remove</button>
                {{#if showSecurityCodeForm}}
                    </div>
                    <div class="stitch-payments-creditcard-security-code-section">
                        <form>
                            <div data-view="CreditCard.Edit.Form.SecurityCode"></div>
                        </form>
                    </div>
                {{/if}}
            </div>

        </div>
    </div>

{{/if}}

<!-- end -->