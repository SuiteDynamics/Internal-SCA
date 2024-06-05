<div class="cms-card-grid-row">
    <div class="cms-card-grid-container">
        <div class="card-grid">
            {{#each infoCards}}
                <div class="cms-cct-card-container">
                    <div class="cms-cct-card-img-wrapper">
                        <div class="cms-cct-card-img-background">
                            <img class="cms-cct-card-img" src="{{cardImageSrc}}" alt="Card image icon">
                        </div>
                    </div>
                    <div class="cms-cct-card-title-wrapper">
                        <h2 class="cms-cct-card-title">{{{cardTitle}}}</h2>
                    </div>
                    <div class="cms-cct-card-content-wrapper">
                        <p class="cms-cct-card-content">{{{cardBody}}}</p>
                    </div>
                </div>
            {{/each}}
        </div>
    </div>
</div>
