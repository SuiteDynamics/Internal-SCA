{{#if customers}}
    <span class="customer-switch-link-container">
        <a 
            title="{{translate 'Switch to another account.'}}" 
            data-touchpoint="home" 
            data-hashtag="#customer-switch" 
            href="/customer-switch"
        >
            <b>
                <i>
                     <img class="customer-switch-img" src='{{ getExtensionAssetsPath "img/Switch_Icon.png"}}' alt="">
                </i>
            </b>
        </a>
    </span>
{{/if}}