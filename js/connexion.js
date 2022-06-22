$('#connexion').submit((event) =>
  {
    event.preventDefault();
    ajaxRequest('POST', 'php/request.php/connexion/',is_c, 'email=' + $('#email').val() + '&mot_de_passe=' + $('#mot_de_passe').val());
  }
);
function is_c(data){
  console.log(data);
  if(data!=null){
    window.location.href = "index.html";
  }else{
    $('#erreur').html('mot de passe ou email erroné !')
  }
}