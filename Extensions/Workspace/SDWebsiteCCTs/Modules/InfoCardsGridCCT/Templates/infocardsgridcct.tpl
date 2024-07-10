<div class="cms-cct-card-grid-row">
    {{#if sectionTitle}}
        <div class="cms-card-grid-section-title-wrapper">
            <h2 class="cms-card-grid-section-title">{{sectionTitle}}</h2>
        </div>
    {{/if}}
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
                </div>
            {{/each}}
        </div>
    </div>
</div>
