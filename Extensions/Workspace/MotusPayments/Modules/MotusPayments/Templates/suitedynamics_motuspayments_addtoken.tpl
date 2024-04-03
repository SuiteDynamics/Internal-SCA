
<style>				
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<div>
    <!-- Trigger the modal with a button -->
    <!-- Modal -->
    <div id="myModal" role="dialog">
    </div>
</div>
<script>
   jQuery(document).ready(function(){
        console.log('script view render')
        
        PTPayment.setup({    
            authorization: { clientKey: "NFSgOzU7Am2Fh34+SSuXew==./LIH5Wkc/CVI0TMUvmabXboubebH8Qs70sAEDrsZmQbtqbnqAdH/gehlBekoLKt3YA1IOHZgMRE3huXpUqv4ZAmJ0giZaqqb6DAOdtOfMx/994oOcwDLnEP5WkaegQi+/08EIzQklqGfqVIYm+sMRof2e567duQwB/QFzYUvIICBemiiAIIkQ8mSQ5Il+zoOhTBmRbdX9oj1uYqFWUoVlDRYonRh7yHMiJiixWzXX9s8kiROxu7//9rUa056qkmQA6XJECodMyxj+so+8Qcpfw1UeNAs5845Wxzv4A7rJPV+5YBdWCzHZMvPRUMZaNOwOSvJJXQWh0OYPt2QgeTupgP65hXPMWhJEeiyRyX2hyl2FI+rRzFnnqLCQgviezjG4GjExjeyMUQtm7KSXcKmrhH9D4H1F2DKZLUymqXJUf4JHKvfMgxRBaFzFhJDNXGRYufXq4dfuPJX6Y2UfYlippmApgNWqp14ppW8yC7XnpyMyZyWbohK/Bjn4NZfAio+" }
        }).then(function(instance){
            //use instance object to process and tokenize sensitive data payment fields.
        });

                
    })
 </script>

<div id='pt_hpf_form'><!--iframe sensitive data payment fields inserted here--></div>

<a id="motus-token-success" class="motus-token-success" data-action="motus-token-success"> Click here </a>
</div>

<div class="motus-payments-add-token-container">
    <a id="motus-add-token-button" data-action="motus-add-token" class="motus-add-token-button" data-toggle="show-in-modal">Add</a>
</div>
