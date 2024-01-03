{{#if customers}}
    <section class="customer-switch-modal">
        <div class="customer-switch-search-container">
            <input type="text" placeholder="Search..." name="customer-switch-search"/>
        </div>
        <div data-type="alert-placeholder"></div>
        <div class="customer-switch-customers-container">
        {{#each customers}}
            <div data-id="{{internalid}}" class="customer-switch-customers{{#if isActive}} active{{/if}}">
                {{entityid}}   -  {{companyname}} 
            </div>
        {{/each}}
        </div>
    </section>
{{/if}}