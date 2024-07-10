<section class="cms-cct-split-content-block-container" {{#if sectionBackgroundColor}}style="background: {{sectionBackgroundColor}};"{{/if}}>
    <div class="cms-cct-split-content-block-wrapper {{#if fullWidth}}cms-cct-split-content-block-full-width{{/if}}">
        <div class="cms-cct-split-content-block-left {{leftColumnClasses}}">
            <div class="cms-cct-split-content-block-left-interior">
                <div class="cms-cct-split-content-block-left-interior-img-wrapper {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}">
                    {{#if imageSrc}}
                        <img src="{{imageSrc}}" class="cms-cct-split-content-block-left-interior-img {{#if fullWidth}}cms-cct-split-content-block-full-width{{/if}}" alt="{{imageAltText}}">
                    {{/if}}
                </div>
            </div>
        </div>
        <div class="cms-cct-split-content-block-right {{rightColumnClasses}}">
            <div class="cms-cct-split-content-block-right-interior {{#if fullWidth}}cms-cct-split-content-block-full-width{{/if}} {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}">
                <h2
                        class="cms-cct-split-content-block-right-interior-title {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}"
                        style="{{#if titleColor}}color: {{titleColor}};{{/if}}"
                >{{{title}}}</h2>

<<<<<<< HEAD
=======
                {{#if imageSrc}}
                    {{#unless hideMobileImage}}
                        <div class="cms-cct-split-content-block-right-interior-mobile-img-wrapper {{#if centerMobileImage}} cms-cct-split-content-block-right-interior-mobile-img-centered{{/if}}">
                            <img src="{{imageSrc}}" class="cms-cct-split-content-block-right-interior-mobile-img {{#if centerMobileImage}} cms-cct-split-content-block-right-interior-mobile-img-centered{{/if}}" alt="{{imageAltText}}">
                        </div>
                    {{/unless}}
                {{/if}}

>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af
                {{#if sectionIntro}}
                    <div class="cms-cct-split-content-block-right-interior-text {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}">{{{sectionIntro}}}</div>
                {{/if}}

                {{#if showInnerSection}}
                    <div class="cms-cct-split-content-block-right-interior-inner" style="{{#if innerSectionBackgroundColor}}background-color: {{innerSectionBackgroundColor}};{{/if}}">
                        {{#if innerSectionTitle}}
                            <div class="cms-cct-split-content-block-right-interior-inner-title-wrapper">
                                <h3 class="cms-cct-split-content-block-right-interior-inner-title">{{{innerSectionTitle}}}</h3>
                            </div>
                        {{/if}}
                        {{#if innerSectionBody}}
                            <div class="cms-cct-split-content-block-right-interior-inner-body">{{{innerSectionBody}}}</div>
                        {{/if}}
                    </div>
                {{/if}}

                {{#if sectionOutro}}
                    <div class="cms-cct-split-content-block-right-interior-outro {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}">{{{sectionOutro}}}</div>
                {{/if}}

                {{#if showCta}}
                    <div class="cms-cct-split-content-block-right-interior-btn-wrapper">
                        <a
                                class="cms-cct-split-content-block-right-interior-btn {{#if centerContent}}cms-cct-split-content-block-centered{{/if}}"
                                {{#if isExternalLink}}href="{{ctaLink}}" target="_blank" {{else}} data-touchpoint="home" data-hashtag="#{{ctaLink}}"{{/if}}
                                style="{{#if ctaTextColor}}color: {{ctaTextColor}} !important;{{/if}}{{#if ctaBackgroundColor}}background-color: {{ctaBackgroundColor}}!important;{{/if}}"
                        >{{ctaText}}</a>
                    </div>
                {{/if}}
            </div>
        </div>
    </div>
</section>
