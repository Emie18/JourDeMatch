/*---------------------------------
Fichier: connexion.js
contenant la requête ajax
pour la connexion
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/
$('#connexion').submit((event) =>
  {
    event.preventDefault();
    ajaxRequest('POST', 'php/request.php/connexion/',is_c, 'email=' + $('#email').val() + '&mot_de_passe=' + $('#mot_de_passe').val());
  }
);

//fonction qui affiche un message
//d'erreur si le mot de passe de correspond pas
//à l'email, sinon on redirige vers index.html
function is_c(data){
  console.log(data);
  if(data!=null){
    window.location.href = "index.html";
  }else{
    $('#erreur').html('mot de passe ou email erroné !')
  }
}