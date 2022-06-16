'use strict';

$(document).ready(function(){
    $("#signupform").on("submit", function(event){
      event.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        url: "../php/register.php",
        type: "POST",
        cache: false,
        data: formData,
        success: function(response){
          data = JSON.parse(response);
          if(data.error == "0") {
            $("#signupform").trigger("reset");
            console.log(data.message);
          } else if(data.error == "1") {
            console.log(data.message);
          }
        }
      });
    });
});

/* let bouton = document.getElementById('btn');
let tt = document.getElementById('nom');
bouton.addEventListener('click', event => {
  ajaxRequest('GET', '../php/request.php/profil', affiche);
});

function affiche(data){
  console.log(data);
  tt.innerHTML = data[0].email;
} */