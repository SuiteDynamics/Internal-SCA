<script language="JavaScript">
  window.addEventListener('message', function(event) {
      console.log('event', event)
      var token = event.data;
      var mytoken = document.getElementById('in-modal-mytoken');
      
      mytoken.value = token;
      var submitButton = document.getElementById('in-modal-stitch-token-submit').click();
      // console.log('submitButton', submitButton)

  }, false);
</script>

<body data-type="modal-body">
    <form name="tokenform" id="tokenform">
        <iframe id="tokenFrame" name="tokenFrame" src="https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html?useexpiry=true&usecvv=true&enhancedresponse=true&tokenizewheninactive=false" frameborder="0" scrolling="no"></iframe>
        <input type="hidden" name="mytoken" id="mytoken"/>
</form>
<a id="stitch-token-submit" data-action="token-success"> Click here </a>
</body>

<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->