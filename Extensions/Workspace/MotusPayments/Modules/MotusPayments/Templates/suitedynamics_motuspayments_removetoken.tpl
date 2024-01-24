{{log this}}
<table>
    <tbody>
        {{#each tokens}}
            <tr class="motus-removetoken-row">
                <td><strong>{{card_type}}</strong> ending in {{last_four}}</td>
                <td><button class="motus-removetoken-button" id="{{id}}" data-action="motus-remove-token-line">Remove</button></td>
            </tr>
        {{/each}}
    </tbody>
</table>
<div></div>