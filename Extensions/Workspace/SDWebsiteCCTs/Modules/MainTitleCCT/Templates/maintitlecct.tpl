<section class="cms-cct-maintitle-container">
    <div class="cms-cct-maintitle-wrapper">
        <div class="cms-cct-maintitle-content-left  {{#unless imageSrc}}cms-cct-maintitle-content-left-full-width{{/unless}}" style="{{#if backgroundColor}}background: {{backgroundColor}};{{/if}}">
            <div class="cms-cct-maintitle-content-left-interior" style="{{#if backgroundColor}}background: {{backgroundColor}};{{/if}}">
                {{#if subtitle}}
                    <h1 class="cms-cct-maintitle-content-left-interior-title" style="{{#if titleColor}}color: {{titleColor}};{{/if}}">{{{title}}}</h1>
                    <h2 class="cms-cct-maintitle-content-left-interior-subtitle" style="{{#if subtitleColor}}color: {{subtitleColor}};{{/if}}">{{{subtitle}}}</h2>
                {{else}}
                    <h1 class="cms-cct-maintitle-content-left-interior-subtitle" style="{{#if titleColor}}color: {{titleColor}};{{/if}}">{{{title}}}</h1>
                {{/if}}
                <div class="cms-cct-maintitle-content-left-interior-row">
                    {{#unless hideArrowImage}}
                        <div class="cms-cct-maintitle-content-left-interior-row-img-wrapper">
                            <img src="https://www.suitedynamics.co/SiteImages/Icons/SD_Icons_Final/Blue Icons/SD_Arrow_Icon.png" alt="Scroll down icon" class="cms-cct-maintitle-content-left-interior-row-img">
                        </div>
                    {{/unless}}
                    {{#if ctaLink}}
                        <div class="cms-cct-maintitle-content-left-interior-row-btn-wrapper {{ctaButtonAlignmentClass}}">
                            <a
                                    class="cms-cct-maintitle-content-left-interior-row-btn"
                                {{#if isExternalLink}}href="{{ctaLink}}" target="_blank" {{else}} data-touchpoint="home" data-hashtag="#{{ctaLink}}"{{/if}}
                                    style="{{#if ctaTextColor}}color: {{ctaTextColor}};{{/if}} {{#if ctaBackgroundColor}}background-color: {{ctaBackgroundColor}};{{/if}}"
                            >{{ctaText}}</a>
                        </div>
                    {{/if}}
                </div>
            </div>
        </div>
        <div class="cms-cct-maintitle-content-right {{#unless imageSrc}}cms-cct-maintitle-content-right-hidden{{/unless}}">
            {{#if imageSrc}}
                <img src="{{imageSrc}}" alt="{{imageAlt}}" class="cms-cct-maintitle-content-right-img img-responsive">
            {{/if}}
        </div>
    </div>
</section>
