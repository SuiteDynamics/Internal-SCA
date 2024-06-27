<div class="header-sidebar-wrapper" data-action="header-sidebar-hide-esc" tabindex="-1">
	<div class="header-sidebar-profile-menu" data-view="Header.Profile"></div>

	<div class="header-sidebar-menu-wrapper" data-type="header-sidebar-menu">

		<ul class="header-sidebar-menu" id="header-sidebar-menu-controls">
		    {{#unless isStandalone}}
			{{#each categories}}
				{{#if text}}
					<li>
						<a {{objectToAtrributes this}} {{#if categories}}data-action="push-menu"{{/if}} name="{{text}}">
							{{translate text}}
							{{#if categories}}<i class="header-sidebar-menu-push-icon"></i>{{/if}}
						</a>
						{{#if categories}}
							<ul>
								<li>
									<a href="#" class="header-sidebar-menu-back" data-action="pop-menu" name="back-sidebar" aria-disabled="true">
										<i class="header-sidebar-menu-pop-icon"></i>
										{{translate 'Back'}}
									</a>
								</li>

								<li>
									<a {{objectToAtrributes this}} aria-disabled="true">
										{{translate 'Browse $(0)' text}}
									</a>
								</li>

								{{#each categories}}
								<li>
									<a {{objectToAtrributes this}} {{#if categories}}data-action="push-menu"{{/if}} aria-disabled="true">
									{{text}}
									{{#if categories}}<i class="header-sidebar-menu-push-icon"></i>{{/if}}
									</a>

									{{#if categories}}
									<ul>
										<li>
											<a href="#" class="header-sidebar-menu-back" data-action="pop-menu" aria-disabled="true">
												<i class="header-sidebar-menu-pop-icon"></i>
												{{translate 'Back'}}
											</a>
										</li>

										<li>
											<a {{objectToAtrributes this}} aria-disabled="true">
												{{translate 'Browse $(0)' text}}
											</a>
										</li>

										{{#each categories}}
										<li>
											<a {{objectToAtrributes this}} name="{{text}}">{{text}} aria-disabled="true"</a>
										</li>
										{{/each}}
									</ul>
									{{/if}}
								</li>
								{{/each}}
							</ul>
						{{/if}}
					</li>
				{{/if}}
			{{/each}}
			{{/unless}}

			{{#if showExtendedMenu}}
				<li class="header-sidebar-menu-myaccount" data-view="Header.Menu.MyAccount"></li>
			{{/if}}
			{{#unless isStandalone}}
			<li data-view="QuickOrderHeaderLink"></li>
			<li data-view="RequestQuoteWizardHeaderLink"></li>
			{{/unless}}
		</ul>

	</div>

    <div class="header-sidebar-consultation-btn-wrapper">
        <a class="header-sidebar-consultation-btn" data-touchpoint="home" data-hashtag="#schedule-a-consultation">{{translate 'Schedule your consultation'}}</a>
    </div>

	{{#if showExtendedMenu}}
	<a class="header-sidebar-user-logout" href="#" data-touchpoint="logout" name="logout">
		<i class="header-sidebar-user-logout-icon"></i>
		{{translate 'Sign Out'}}
	</a>
	{{/if}}

	{{#if showLanguages}}
	<div data-view="Global.HostSelector"></div>
	{{/if}}
	{{#if showCurrencies}}
	<div data-view="Global.CurrencySelector"></div>
	{{/if}}

</div>



{{!----
Use the following context variables when customizing this template:

	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}

