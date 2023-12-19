<script language="JavaScript">
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
</script>

<div class="stitchpayments-body">
    <form name="tokenform" id="tokenform">
        <iframe class="stitchpayments-iframe" id="tokenFrame" name="tokenFrame" src="https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html?useexpiry=true&usecvv=true&enhancedresponse=true&css=%2Eerror%7Bcolor%3A%20red%3B%7Dinput%7Bwidth%3A500px%3B%7D" width="600" frameborder="0" scrolling="no"></iframe>
        <input type="hidden" name="stitchtoken" id="stitchtoken"/>
</form>
<a id="stitch-token-success" class="stitch-token-success" data-action="stitch-token-success"> Click here </a>
</div>

<div class="stitch-payments-add-token-container">
    <a id="stitch-add-token-button" data-action="stitch-add-token" class="stitch-add-token-button" data-toggle="show-in-modal">Add</a>
</div>