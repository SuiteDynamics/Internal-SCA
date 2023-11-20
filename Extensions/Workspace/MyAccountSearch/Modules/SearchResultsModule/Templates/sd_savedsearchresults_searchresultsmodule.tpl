<section class="searchresultsmodule-info-card">
    <h1>{{tabLabel}}</h1>
	{{#if loading}}
		<h5>Loading Results...</h5>
	{{else}}
		{{#if hasResults}}
			{{#if showReturn}}
			<div class="return-summary-link-container">
				<a class="return-summary-link">Return to Summary</a>
			</div>
			{{/if}}
		<div class="searchresults-table-container">
		<table>
			<thead>
			<tr>
			{{#each columns}}
				<th data-sort data-index="{{@index}}" {{#if sortdir}}data-sortdir="{{sortdir}}"{{/if}}>
				{{label}} <i></i>
				</th>
			{{/each}}
			</tr>
			</thead>
			
			<tbody>
			
			{{#each results}}
				<tr>
					{{#each this}}
						<td>
							{{#if isGroup}}
								<a data-group="{{internalid}}" data-colindex="{{colindex}}">{{text}}</a>
							{{else}}
								{{#if isURL}}
									<a href="{{text}}" target="_blank">{{text}}</a>
								{{else}}
									{{text}}
								{{/if}}
							{{/if}}
						</td>
					{{/each}}
				</tr>
			{{/each}}
			</tbody>
			
		</table>
		</div>
		{{else}}
			<h5>No results found.</h5>
		{{/if}}
		<div data-view="Pagination.View" class="searchresults-pagination"></div>
	{{/if}}
	
</section>