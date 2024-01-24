{{log this}}

<!-- change to reflect native view -->

{{#if isNewPaymentMethod}}
    <a class="motus-payments-creditcard motus-payments-creditcard-new-card" data-action="motus-add-token" data-toggle="show-in-modal">
        <div class="motus-payments-creditcard-new-card-title">
            <p><i class="motus-payments-creditcard-new-card-plus-icon"></i></p>
            {{translate 'Add Card'}}
        </div>
    </a>
{{else}}

<div>
    <a class="motus-payments-creditcard-selector {{#if isSelected}}motus-payments-creditcard-selected{{/if}}" data-action="select" data-id="{{creditCartId}}">
        <input type="radio" name="cards-options" class="motus-payments-creditcard-selector-option" data-id="{{creditCartId}}" value="{{creditCartId}}" {{#if isSelected}} checked {{/if}}>
        {{#if isSelected}}
            <b>{{translate 'Selected'}}</b>
        {{else}}
            {{translate 'Select'}}
        {{/if}}
    </a>

    <div class="motus-payments-creditcard {{#if isSelected}}motus-payments-creditcard-selected{{/if}}" data-id="{{creditCartId}}">
        <div class="motus-payments-creditcard-container">
            <div>
                <div class="motus-payments-creditcard-header">
                    <p class="motus-payments-creditcard-number"><b>{{translate 'Ending in'}}</b> {{lastfourdigits}} </p>
                    {{#if logo}}
                        <img class="motus-payments-creditcard-header-icon" src="{{logo}}" alt="{{paymentName}}">
                    {{else}}
                        {{type}}
                    {{/if}}
                </div>

                <p class="motus-payments-creditcard-expdate"><b>{{translate 'Expires in'}}</b> {{expirationDate}}</p>

                {{#if showSecurityCodeForm}}
                    </div>
                    <div class="motus-payments-creditcard-security-code-section">
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