<!-- <head>
    <script src='https://protect.sandbox.paytrace.com/js/protect.min.js'></script>
      <title> Motus Tokenizer </title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> -->
      <style>				
      </style>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
   <!-- </head> -->
   <!-- <body style="text-align: center; padding: 40px 0;"> -->
      <div>
         <!-- Trigger the modal with a button -->
         <!-- Modal -->
         <div id="myModal" role="dialog">
            <div>
               <!-- Modal content-->
               <div>
                  <div>              
                  </div>
                  <div>
                     <div id="tokenid">
                        <form name="tokenform" id="tokenform" style="width: 300px; height: 300px; ">
                           <div position:relative;>
                              <label style="color: #404F5E; font-size: 16px;" for="cnumber">Card Number:</label>
                              <input type="text" id="cardid" name="cardid"  maxlength="19">
                              <label style="color: #404F5E; font-size: 16px;" for="expdat">Expiration Date</label>
                                <div style="display:flex">
                                    <span>
                                        <select name="month" id="monthid">
                                            <option value="--">--</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                          </select>
                                    </span>
                                    <span>                                  
                                        <select name="year" id="yearid">
                                            <option value="--">--</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                            <option value="2030">2030</option>
                                            <option value="2031">2031</option>
                                            <option value="2032">2032</option>
                                            <option value="2033">2033</option>
                                            <option value="2033">2034</option>
                                      </select>
                                    </span>
                                </div>  


                              <label style="color: #404F5E; font-size: 16px;" for="CVV">CVV:</label>
                            <input type="text" id="cvvid" name="cvvid"  maxlength="3" />
                             <!-- <input type="button"style="background:#607799;color:white;width: 552px;font-size: 16px;border:none;border-radius: 4px;padding: 12px 16px;font-weight:700;" 
                             value="Add card" id="bttnid" name="bttnid"  onclick="addcardftc();"> -->
                              <div
                                 style="position:absolute;right: 50%;top: 69%;display:flex;align-items: end;width: max-content;">							 
                                <!-- <img src="https://7050356-sb1.app.netsuite.com/core/media/media.nl?id=12273&c=7050356_SB1&h=J4LSiyngEzazbthirOjRFi4C5NvKlY78YJG0tvVW_aBJ1jP4" style="width: 200px; position:absolute;left: 80px;bottom: 15px" />												 -->
                              </div>
                              <button type="button" id="modelbttn" class="btn btn-info btn-smy" data-toggle="modal" data-action="submit-card" data-target="#myModal">ADD CARD</button>
                           </div>
                        </form>
                     </div>
                     
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
                        <script>
                          function addcardftc() {
                            console.log('addcardftc')

 

                              
                            //    var cardType;
                            //    if (req2=='34' || req2=='37') {
                            //        cardType = 'Amex'
                            //    } else if (req1=='4') {
                            //        cardType = 'Visa'
                            //    } else if (req2=='51' || req2=='52' || req2=='53' || req2=='54' || req2=='55') {
                            //        cardType = 'Master Card'
                            //    } else if (req1 == '6') {
                            //        cardType = 'Discover'
                            //    } else if (req2=='36') {
                            //        cardType = 'Diners'
                            //    } else if (req2=='35') {
                            //        cardType = 'JCB'
                            //    }else{
                            //     cardType = ' ';
                            //    }
                               
                            //        var rec = nlapiCreateRecord('customrecord_motus_cc_token',);
                            //        var tokenRecName = 'Motus' + ' ' + cardType + ' ' + lastFour;
                            //           rec.setFieldValue('name', tokenRecName);
                            //         rec.setFieldValue('custrecord_motus_cc_token_customer', ${custId});
                            //         rec.setFieldValue('custrecord_motus_cc_token_exp_year', expiryYear);
                            //         rec.setFieldValue('custrecord_motus_cc_token_exp_month', expiryMonth);
                            //         rec.setFieldValue('custrecord_sd_motus_cc_last_4', lastFour);
                            //         rec.setFieldValue('custrecord_motus_cc_token_token', token_number);
                            //         rec.setFieldValue('custrecord_motus_cc_token_card_type', cardType);
                            //         var id = nlapiSubmitRecord(rec, true);
                            //        console.log('id', id);
                            //        alert('Your Card is successfully added.');
                            //        closeWindow();
                            //        function closeWindow() {
                            //         setTimeout(function () {
                            //             location.reload();
                            //             document.getElementById("closebttn").click();
                            //         }, 3000);
                            //       }
                           };
                        </script>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- <script>
      document.getElementById("custpage_add_card_btn").onclick = function () { document.getElementById("modelbttn").click(); };
      </script> -->
   <!-- </body> -->













<!-- <script language="JavaScript">
    window.addEventListener('message', function(event) {
        console.log('event', event)
        var token = event.data;
        var mytoken = document.getElementById('in-modal-stitchtoken');
        if(mytoken){
            mytoken.value = token;
            try{
                if(JSON.parse(token).token){
                    var submitButton = document.getElementById('in-modal-stitch-token-success').click();
                }
            }catch(e){
            }
        }

  
    }, false);
</script> -->

<script src='https://protect.sandbox.paytrace.com/js/protect.min.js'></script>
<div id='pt_hpf_form'><!--iframe sensitive data payment fields inserted here--></div>

<!-- <div class="stitchpayments-body">
    <form name="tokenform" id="tokenform">
        <iframe class="stitchpayments-iframe" id="tokenFrame" name="tokenFrame" src="https://protect.sandbox.paytrace.com/js/protect.min.js" width="600" frameborder="0" scrolling="no"></iframe>
        <input type="hidden" name="stitchtoken" id="stitchtoken"/>
</form>
<a id="stitch-token-success" class="stitch-token-success" data-action="stitch-token-success"> Click here </a>
</div>

<div class="stitch-payments-add-token-container">
    <a id="stitch-add-token-button" data-action="stitch-add-token" class="stitch-add-token-button" data-toggle="show-in-modal">Add</a>
</div> -->