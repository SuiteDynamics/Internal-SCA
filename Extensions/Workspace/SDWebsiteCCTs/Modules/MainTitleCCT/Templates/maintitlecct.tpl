<section class="cms-cct-maintitle-container">
    <div class="cms-cct-maintitle-wrapper">
        <div class="cms-cct-maintitle-content-left  {{#unless imageSrc}}cms-cct-maintitle-content-left-full-width{{/unless}}" style="background: {{backgroundColor}};">
            <div class="cms-cct-maintitle-content-left-interior" style="background: {{backgroundColor}};">
                {{#if subtitle}}
                    <h1 class="cms-cct-maintitle-content-left-interior-title">{{{title}}}</h1>
                    <h2 class="cms-cct-maintitle-content-left-interior-subtitle">{{{subtitle}}}</h2>
                {{else}}
                    <h1 class="cms-cct-maintitle-content-left-interior-subtitle">{{{title}}}</h1>
                {{/if}}
                <div class="cms-cct-maintitle-content-left-interior-img-wrapper">
                    <img src="https://www.suitedynamics.co/SiteImages/Icons/SD_Icons_Final/Blue Icons/SD_Arrow_Icon.png" alt="Scroll down icon" class="cms-cct-maintitle-content-left-interior-img">
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
