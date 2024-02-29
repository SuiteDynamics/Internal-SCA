<div class="customer-switch-page-content">
      <h1 class="customer-switch-title">Hunters</h1>
      <div data-type="alert-placeholder"></div>
      <div class="customer-switch-table-container">
          <table>
              <thead>
                  <tr>
                      <th>{{translate 'First Name'}}</th>
                      <th>{{translate 'Last Name'}}</th>
                      <th>{{translate 'Address'}}</th>
                      <th>{{translate 'Phone'}}</th>
                      <th>{{translate 'Email'}}</th>
                      <th>{{translate 'Hunting Licenses'}}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr data-id="{{internalid}}" class="switch-customer-rows{{#if isActive}} active{{/if}}" title="{{translate 'Select this customer'}}">
                      <td><input class="hunter-input" value="Jake"></td>
                      <td><input class="hunter-input" value="Kleiner"></td>
                      <td><input class="hunter-input" value="2913 University Ave.
                        Madison, WI 53705"></td>
                      <td><input class="hunter-input" value="(608) 413-2841"></td>
                      <td><input class="hunter-input" value="suite@suitedynamics.io"></td>
                      <td><input class="hunter-input" type="file" id="files" name="files" multiple></td>
                  </tr>
                  <tr data-id="{{internalid}}" class="switch-customer-rows{{#if isActive}} active{{/if}}" title="{{translate 'Select this customer'}}">
                      <td><input class="hunter-input" value="Eric"></td>
                      <td><input class="hunter-input" value="Laylan"></td>
                      <td><input class="hunter-input" value="2913 University Ave.
                        Madison, WI 53705"></td>
                      <td><input class="hunter-input" value="(608) 413-2841"></td>
                      <td><input class="hunter-input" value="suite2@suitedynamics.io"></td>
                      <td><input class="hunter-input" type="file" id="files" name="files" multiple></td>

                  </tr>
                  <tr data-id="{{internalid}}" class="switch-customer-rows{{#if isActive}} active{{/if}}" title="{{translate 'Select this customer'}}">
                    <td >
                      <i class="add-icon"></i><span>  Add Hunter</span>
                    </td>

                  </tr>
              </tbody>
          </table>
      </div>
</div>
<div class="customer-switch-processing">{{translate 'Processing ...'}}</div>