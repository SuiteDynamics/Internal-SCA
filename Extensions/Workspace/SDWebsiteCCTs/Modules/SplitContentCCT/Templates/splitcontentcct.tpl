<section class="cms-cct-split-content-block-container" {{#if sectionBackgroundColor}}style="background: {{sectionBackgroundColor}};"{{/if}}>
    <div class="cms-cct-split-content-block-wrapper">
        <div class="cms-cct-split-content-block-left hidden-xs col-sm-5">
            <div class="cms-cct-split-content-block-left-interior">
                <div class="cms-cct-split-content-block-left-interior-img-wrapper">
                    {{#if imageSrc}}
                        <img src="{{imageSrc}}" class="cms-cct-split-content-block-left-interior-img" alt="{{imageAltText}}">
                    {{/if}}
                </div>
            </div>
        </div>
        <div class="cms-cct-split-content-block-right col-xs-12 col-sm-7">
            <div class="cms-cct-split-content-block-right-interior">
                <h2 class="cms-cct-split-content-block-right-interior-title">{{{title}}}</h2>
                <div class="cms-cct-split-content-block-right-interior-text">{{{sectionBody}}}</div>
                {{#if ctaText}}
                    <div class="cms-cct-split-content-block-right-interior-btn-wrapper">
                        <a data-touchpoint="home" data-hashtag="/#schedule-a-consultation" class="cms-cct-split-content-block-right-interior-btn"
                            style="{{#if ctaTextColor}}color: {{ctaTextColor}} !important;{{/if}}
                                {{#if ctaBackgroundColor}}background-color: {{ctaBackgroundColor}}!important;{{/if}}"
                        >{{ctaText}}</a>
                    </div>
                {{/if}}
            </div>
        </div>
    </div>
</section>
