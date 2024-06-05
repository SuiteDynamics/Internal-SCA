<section class="cms-cct-split-content-block-container" {{#if sectionBackgroundColor}}style="background: {{sectionBackgroundColor}};"{{/if}}>
    <div class="cms-cct-split-content-block-wrapper">
        <div class="cms-cct-split-content-block-left {{#if centerContent}} col-sm-6 cms-cct-split-content-block-centered{{else}} col-sm-5{{/if}}">
            <div class="cms-cct-split-content-block-left-interior">
                <div class="cms-cct-split-content-block-left-interior-img-wrapper {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}">
                    {{#if imageSrc}}
                        <img src="{{imageSrc}}" class="cms-cct-split-content-block-left-interior-img" alt="{{imageAltText}}">
                    {{/if}}
                </div>
            </div>
        </div>
        <div class="cms-cct-split-content-block-right {{#if centerContent}}cms-cct-split-content-block-centered col-xs-12 col-sm-6{{else}} col-xs-12 col-sm-7{{/if}}">
            <div class="cms-cct-split-content-block-right-interior {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}">
                <h2 class="cms-cct-split-content-block-right-interior-title {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}">{{{title}}}</h2>
                <div class="cms-cct-split-content-block-right-interior-text {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}">{{{sectionBody}}}</div>
                {{#if showCta}}
                    <div class="cms-cct-split-content-block-right-interior-btn-wrapper">
                        <a
                                class="cms-cct-split-content-block-right-interior-btn {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}" {{#if isExternalLink}}
                                href="{{ctaLink}}" target="_blank" {{else}} data-touchpoint="home" data-hashtag="#{{ctaLink}}"{{/if}}
                                style="{{#if ctaTextColor}}color: {{ctaTextColor}} !important;{{/if}}{{#if ctaBackgroundColor}}background-color: {{ctaBackgroundColor}}!important;{{/if}}"
                        >{{ctaText}}</a>
                    </div>
                {{/if}}
            </div>
        </div>
    </div>
</section>
