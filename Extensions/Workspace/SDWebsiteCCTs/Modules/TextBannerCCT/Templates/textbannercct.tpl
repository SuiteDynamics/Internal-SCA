<div class="row">
    <div class="cms-cct-text-banner-container" {{#if backgroundColor}}style="background-color: {{backgroundColor}}!important;"{{/if}}>
        <div class="cms-cct-text-banner-left-arrows-wrapper">
            <img src="{{getExtensionAssetsPath "img/text-banner-arrows.png"}}" class="cms-cct-text-banner-left-arrows" alt="left arrows">
        </div>
        <div class="cms-cct-text-banner-text-wrapper">
            <h2 class="cms-cct-text-banner-text" {{#if textColor}}style="color: {{textColor}} !important;"{{/if}}>{{bannerText}}</h2>
        </div>
        <div class="cms-cct-text-banner-right-arrows-wrapper">
            <div class="cms-cct-text-banner-right-arrows">
                <img src="{{getExtensionAssetsPath "img/text-banner-arrows.png"}}" class="cms-cct-text-banner-left-arrows" alt="right arrows">
            </div>
        </div>
    </div>
</div>
