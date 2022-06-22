
//Fichier contenant les fonctions pour afficher les détails
//personnelle d'un utilisateur dans la page profil.html
ajaxRequest('GET','php/request.php/profil_detail/',affiche_profil_detail)
function affiche_profil_detail(data){
  console.log(data[0]['date_n']);
  document.getElementById('nom_prenom').innerHTML = data[0]['prenom']+' '+data[0]['nom'];
  let age="";
  if(data[0]['date_naissance']!=undefined){
     age = "<span>Age:"+data[0]['date_naissance'] +"</span>";
  }
  $('#ville_age').html("Ville :"+data[0]['ville'] +age);
  if(data[0]['notation_app_web']!=null){
    let etoile='Note :';
    for (i=0; i<parseInt(data[0]['notation_app_web']);i++){
        etoile +='<img src="icone/star.png">';
    }
    $('#note').html(etoile);
    $('#note').val(parseInt(data[0]['notation_app_web']));
    $('#forme option[value='+data[0]['texte']+']').prop('selected', true);
    $('#date_n').val(data[0]['date_n']);
  }
  if(data[0]['texte']!=null){
    $('#forme').html("Forme sportive: "+data[0]['texte']);
  }
  if(data[0]['photo']!=null){
    document.getElementById('photo').src = data[0]['photo'];
  }
  ajaxRequest('GET', 'php/request.php/nb_match_joue',nb_match_joue);
    function nb_match_joue(data){
        $('#nb_match_joue').html("Nombre de matchs joués: "+data[0]['nb_jouee']);
    }
}
$('#mot_de_passe').submit((event) =>
  {
    event.preventDefault();
    console.log($('#mot_de_passe_nouveau').val())
    //if($('#mot_de_passe_nouveau').val().localeCompare($('#mot_de_passe_ancien').val())==0){
         ajaxRequest('POST', 'php/request.php/modif_mot_de_passe/',affiche_erreur, 'nouveau_mot_de_passe=' + $('#mot_de_passe_nouveau').val()+'&ancien_mot_de_passe=' + $('#mot_de_passe_ancien').val());
    //}
   
  }
);

function affiche_erreur(data){
  console.log(data);
  if(data=='non'){
    $("#erreur").html('le mot de passe est pas bon!');
  }else{
    window.location.href="profil.html";
  }
}
function deconnexion(){
  ajaxRequest('GET', 'php/request.php/deconnexion',null);
  window.location.href = "connexion.html";
}

