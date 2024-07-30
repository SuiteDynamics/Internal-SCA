{{log this}}
<table>
    <tbody>
        {{#each tokens}}
            <tr class="stitch-removetoken-row">
                <td><strong>{{card_type}}</strong> ending in {{last_four}}</td>
                <td><button class="stitch-removetoken-button" id="{{id}}" data-action="stitch-remove-token-line">Remove</button></td>
            </tr>
        {{/each}}
    </tbody>
</table>
<div></div>