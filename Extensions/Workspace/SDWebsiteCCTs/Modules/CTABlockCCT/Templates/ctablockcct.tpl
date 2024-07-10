<<<<<<< HEAD
<section class="cms-cct-cta-block-container" {{#if sectionBackgroundColor}}style="background-color: {{sectionBackgroundColor}};"{{/if}}>
=======
<section class="cms-cct-cta-block-container" style="{{#if sectionBackgroundColor}}--opacity-color: {{opacityColor}};{{/if}}">
    {{#if backgroundImageUrl}}
        <img src="{{backgroundImageUrl}}" class="cms-cct-cta-block-background-image" alt="Background Image">
    {{/if}}
>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af
    <div class="cms-cct-cta-block">
        {{#if subtitle}}
            <div class="cms-cct-cta-block-title-wrapper">
                <h2 class="cms-cct-cta-block-title" style="{{#if titleColor}}color: {{titleColor}};{{/if}} {{#if titleCentered}}text-align: center;{{/if}}">{{{title}}}</h2>
            </div>
            <div class="cms-cct-cta-block-subtitle-wrapper">
                <h3 class="cms-cct-cta-block-subtitle" style="{{#if subtitleColor}}color: {{subtitleColor}};{{/if}}{{#if subtitleCentered}}text-align: center;{{/if}}">{{{subtitle}}}</h3>
            </div>
        {{else}}
            <div class="cms-cct-cta-block-subtitle-wrapper">
                <h2 class="cms-cct-cta-block-subtitle" style="{{#if titleColor}}color: {{titleColor}};{{/if}} {{#if titleCentered}}text-align: center;{{/if}}">{{{title}}}</h2>
            </div>
        {{/if}}
        {{#if body}}
            <div class="cms-cct-cta-block-body-wrapper {{#if bodyCentered}} cms-cct-cta-block-centered{{/if}}">{{{body}}}</div>
        {{/if}}
        {{#if ctaText}}
            <div class="cms-cct-cta-block-cta-btn-wrapper {{#if ctaCentered}} cms-cct-cta-block-centered{{/if}}">
                <a
                        class="cms-cct-cta-block-cta-btn {{#if useCtaLargeButton}}cms-cct-cta-block-cta-btn-large{{/if}}"
<<<<<<< HEAD
=======
                        {{#if isExternalLink}}href="{{ctaLink}}" target="_blank" {{else}} data-touchpoint="home" data-hashtag="#{{ctaLink}}"{{/if}}
>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af
                        style="{{#if ctaTextColor}}color: {{ctaTextColor}};{{/if}} {{#if ctaBackgroundColor}}background-color: {{ctaBackgroundColor}};{{/if}}"
                >{{ctaText}}</a>
            </div>
        {{/if}}
    </div>
</section>
