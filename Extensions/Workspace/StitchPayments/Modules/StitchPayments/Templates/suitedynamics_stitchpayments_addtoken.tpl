<script language="JavaScript">
    window.addEventListener('message', function(event) {
        console.log('event', event)
        var token = event.data;
        var mytoken = document.getElementById('in-modal-stitchtoken');
        
        mytoken.value = token;

        if(JSON.parse(token).token){
            var submitButton = document.getElementById('in-modal-stitch-token-success').click();
        }
        // console.log('submitButton', submitButton)
  
    }, false);
</script>

<div class="stitchpayments-body">
    <form name="tokenform" id="tokenform">
        <iframe class="stitchpayments-iframe" id="tokenFrame" name="tokenFrame" src="https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html?useexpiry=true&usecvv=true&enhancedresponse=true&css=%2Eerror%7Bcolor%3A%20red%3B%7Dinput%7Bwidth%3A500px%3B%7D" width="600" frameborder="0" scrolling="no"></iframe>
        <input type="hidden" name="stitchtoken" id="stitchtoken"/>
</form>
<a id="stitch-token-success" data-action="stitch-token-success"> Click here </a>
</div>