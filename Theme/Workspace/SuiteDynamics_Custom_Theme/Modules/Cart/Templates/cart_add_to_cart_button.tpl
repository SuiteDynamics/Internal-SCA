{{#if isCurrentItemPurchasable}}
	<div class="cart-add-to-cart-button-container">
		<div class="cart-add-to-cart-button">
			<button type="submit" data-type="add-to-cart" data-action="sticky" class="cart-add-to-cart-button-button">
				{{#if isUpdate}}{{translate 'Update'}}{{else}}{{translate 'Add to Cart'}}{{/if}}
			</button/>
		</div>
	</div>
	<div class="cart-add-to-cart-button-container">
		<div class="cart-add-to-cart-button">
			<a href="https://www.suitedynamics.co/free-trial" class="cart-add-to-cart-button-button">
				{{#if isUpdate}}{{translate 'Free 30-day Trial'}}{{else}}{{translate 'Free 30-day Trial'}}{{/if}}
			</a>
		</div>
	</div>
{{/if}}



{{!----
Use the following context variables when customizing this template: 
	
	isCurrentItemPurchasable (Boolean)
	isUpdate (Boolean)

----}}

