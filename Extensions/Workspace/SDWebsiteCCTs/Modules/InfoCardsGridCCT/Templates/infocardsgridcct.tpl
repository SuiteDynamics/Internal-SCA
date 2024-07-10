<div class="cms-cct-card-grid-row">
    {{#if sectionTitle}}
        <div class="cms-card-grid-section-title-wrapper">
            <h2 class="cms-card-grid-section-title">{{sectionTitle}}</h2>
        </div>
    {{/if}}
<<<<<<< HEAD
=======
    {{#if sectionSubtitle}}
        <div class="cms-card-grid-section-subtitle-wrapper">
            <div class="cms-card-grid-section-subtitle">{{{sectionSubtitle}}}</div>
        </div>
    {{/if}}
>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af
    <div class="cms-card-grid-container {{gridStyleClass}}" style="{{#if sectionBackgroundColor}}background-color: {{sectionBackgroundColor}};{{/if}}">
        <div class="cms-cct-card-grid {{gridStyleClass}}">
            {{#each infoCards}}
                <div class="cms-cct-card-container {{../gridStyleClass}}">
                    <div class="cms-cct-card-img-wrapper {{../gridStyleClass}}">
                        <div class="cms-cct-card-img-background {{../gridStyleClass}}">
                            <img class="cms-cct-card-img {{../gridStyleClass}}" src="{{cardImageSrc}}" alt="Card image icon">
                        </div>
                    </div>
                    <div class="cms-cct-card-title-wrapper {{../gridStyleClass}}">
                        {{#if sectionTitle}}
                            <h3 class="cms-cct-card-title {{../gridStyleClass}}">{{{cardTitle}}}</h3>
                        {{else}}
                            <h2 class="cms-cct-card-title {{../gridStyleClass}}">{{{cardTitle}}}</h2>
                        {{/if}}
                    </div>
                    {{#if cardSubtitle}}
                        <div class="cms-cct-card-subtitle-wrapper {{../gridStyleClass}}">
                            {{#if sectionTitle}}
                                <h4 class="cms-cct-card-subtitle {{../gridStyleClass}}">{{cardSubtitle}}</h4>
                            {{else}}
                                <h3 class="cms-cct-card-subtitle {{../gridStyleClass}}">{{cardSubtitle}}</h3>
                            {{/if}}
                        </div>
                    {{/if}}
                    <div class="cms-cct-card-content-wrapper {{../gridStyleClass}}">
                        <p class="cms-cct-card-content {{../gridStyleClass}}">{{{cardBody}}}</p>
                    </div>
<<<<<<< HEAD
=======
                    {{#if cardCtaLink}}
                        <div class="cms-cct-card-cta-btn-wrapper">
                            <a
                                    class="cms-cct-card-cta-btn"
                                {{#if isExternalLink}}href="{{cardCtaLink}}" target="_blank" {{else}} data-touchpoint="home" data-hashtag="#{{cardCtaLink}}"{{/if}}
                                    style="{{#if cardCtaTextColor}}color: {{cardCtaTextColor}};{{/if}}{{#if cardCtaBackgroundColor}}background-color: {{cardCtaBackgroundColor}};{{/if}}"
                            >{{cardCtaText}}</a>
                        </div>
                    {{/if}}
>>>>>>> 253f3e79cf9df74faabb7c955a21cfcaa04ee6af
                </div>
            {{/each}}
        </div>
    </div>
</div>
