<div class="customer-switch-page-content">
    {{#if customers}}
        <h1>{{title}}</h1>
        <div data-type="alert-placeholder"></div>
        <div class="customer-switch-search-container">
            <input type="text" placeholder="Search..." name="customer-switch-search"/>
        </div>
        <div class="customer-switch-table-container">
            <table>
                <thead>
                    <tr>
                        <th>{{translate 'Cust #'}}</th>
                        <th>{{translate 'Company'}}</th>
                        <th>{{translate 'Address'}}</th>
                        <th>{{translate 'Phone'}}</th>
                        <th>{{translate 'Email'}}</th>
                        <th>{{translate 'Sales Rep'}}</th>
                        <th>{{translate 'Status'}}</th>
                    </tr>
                </thead>
                <tbody>
                {{#each customers}}
                    <tr data-id="{{internalid}}" class="switch-customer-rows{{#if isActive}} active{{/if}}" title="{{translate 'Select this customer'}}">
                        <td>
                            <a>
                                {{entityid}}
                            </a>
                        </td>
                        <td>{{companyname}}</td>
                        <td>{{{shipaddress}}}</td>
                        <td>{{phone}}</td>
                        <td>{{email}}</td>
                        <td>{{salesrep}}</td>
                        <td>
                            {{#if isActive}}
                                <span style="color:green"> {{translate 'ACTIVE'}}</span>
                            {{else}}
                                {{translate 'INACTIVE'}}
                            {{/if}}
                        </td>
                    </tr>
                {{/each}}
                </tbody>
            </table>
        </div>
    {{else}}
        <h5>{{translate 'We could not find any customers.'}}</h5>
    {{/if}}
</div>
<div class="customer-switch-processing">{{translate 'Processing ...'}}</div>