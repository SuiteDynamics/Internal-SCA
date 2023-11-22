<div class='zab-detail-modal-container'>
    <span>
        <a href="/invoices" class="zab-detail-modal-pay-button">Pay Current Invoice</a>
    </span>
    <span class='zab-detail-cancel-container'>
        <button href="/subsciption-cancel" class="zab-detail-modal-cancel-button" data-action="cancel">Cancel Subscription</button>
    </span>
    <div class='zab-detail-info-container'>
        <p class='zab-detail-modal-title'>
            Identification Number:&nbsp;
            <span class='zab-detail-modal-name'><strong>FDX1134</strong></span>
        </p>
        <p class='zab-detail-modal-details'>Contract #<span>1234</span></p>
        <p class='zab-detail-modal-details'>Billing Cycle: <span>Monthly</span></p>
        <br>
        <p class='zab-detail-modal-details'>Amount Due (Monthly): <span><strong>$200</strong></span></p>
    </div>
    <div class='zab-detail-modal-user-mgm'>
        <div><span><strong>User Management</strong></span><span class="zab-detail-modal-user-mgm-add-user">Add User</span></div>
        <table class="zab-services-manager-table">
                <tr>
                    <td style="width: 160px; vertical-align: top;">
                        <b>Eric Laylan</b>
                        <ul>
                            <li>eric@suitedynamics.io</li>
                            <li>(111) 111-1111</li>
                            <li>elaylan</li>
                        </ul>
                    </td>
                    <td style="width: 450px; vertical-align: top;">
                        <b>{{translate 'Services'}}</b>
                        <ul>
                            <li>Development Services</li>
                        </ul>
                    </td>  
                        <td class="actions">
                            <div style="margin-top:10px">
                                <a href="/update-subscriber/{{id}}" >{{translate 'Update Info'}}</a>
                            </div>
                            <div subscriber-id={{id}} subscriber-name="{{first}} {{last}}">
                                <button type="button" data-action="disable" class="button-small services-button">{{translate 'Remove User'}}</button>
                            </div>
                        </td>
                </tr>
                <tr>
                    <td style="width: 160px; vertical-align: top;">
                        <b>Jake Kleiner</b>
                        <ul>
                            <li>jake@suitedynamics.io</li>
                            <li>(222) 222-2222</li>
                            <li>jkleiner</li>
                        </ul>
                    </td>
                    <td style="width: 450px; vertical-align: top;">
                        <b>{{translate 'Services'}}</b>
                        <ul>
                            <li>Development Services</li>
                        </ul>
                    </td>  
                        <td class="actions">
                            <div style="margin-top:10px">
                                <a href="/update-subscriber/{{id}}" >{{translate 'Update Info'}}</a>
                            </div>
                            <div subscriber-id={{id}} subscriber-name="{{first}} {{last}}">
                                <button type="button" data-action="disable" class="button-small services-button">{{translate 'Remove User'}}</button>
                            </div>
                        </td>
                </tr>
            </table>

    </div>
</div>