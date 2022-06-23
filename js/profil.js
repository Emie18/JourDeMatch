/*---------------------------------
Fichier: profil.js
contenant les fonctions pour
afficher les détails d'un profil
et la fonction pour modifier le
mot de passe
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/
//requête ajax qui renvoit les détails du profil
ajaxRequest('GET', 'php/request.php/profil_detail/', affiche_profil_detail)

//fonction qui affiche les détails du profil
function affiche_profil_detail(data) {
  document.getElementById('nom_prenom').innerHTML = data[0]['prenom'] + ' ' + data[0]['nom'];
  let age = "";
  if (data[0]['date_naissance'] != undefined) {
    age = "<span>Age:" + data[0]['date_naissance'] + "</span>";
  }
  $('#ville_age').html("Ville :" + data[0]['ville'] + age);
  if (data[0]['notation_app_web'] != null) {
    let etoile = 'Note :';
    for (i = 0; i < parseInt(data[0]['notation_app_web']); i++) {
      etoile += '<img src="icone/star.png">';
    }
    $('#note').html(etoile);
    $('#note').val(parseInt(data[0]['notation_app_web']));
    $('#date_n').val(data[0]['date_n']);
    $('#villes').val(data[0]['insee']);
    $('#formes').val(data[0]['texte']);
  }
  if (data[0]['texte'] != null) {
    $('#forme').html("Forme sportive: " + data[0]['texte']);
  }
  if (data[0]['photo'] != null) {
    document.getElementById('photo').src = data[0]['photo'];
  }
  ajaxRequest('GET', 'php/request.php/nb_match_joue', nb_match_joue);
  function nb_match_joue(data) {
    $('#nb_match_joue').html("Nombre de matchs joués: " + data[0]['nb_jouee']);
  }
}

//fonction qui modifi le mot de passe du profil
$('#mot_de_passe').submit((event) => {
  event.preventDefault();
  console.log($('#mot_de_passe_nouveau').val())
  ajaxRequest('POST', 'php/request.php/modif_mot_de_passe/', affiche_erreur, 'nouveau_mot_de_passe=' + $('#mot_de_passe_nouveau').val() + '&ancien_mot_de_passe=' + $('#mot_de_passe_ancien').val());
}
);

//fonction qui affiche une erreur si le mot de passe
//entré n'est pas bon et s'il est bon,
//la fonction redirige l'utilisateur vers profil.html
function affiche_erreur(data) {
  console.log(data);
  if (data == 'non') {
    $("#erreur").html('le mot de passe est pas bon!');
  } else {
    window.location.href = "profil.html";
  }
}

//fonction qui permet de se deconnecter
function deconnexion() {
  ajaxRequest('GET', 'php/request.php/deconnexion', null);
  window.location.href = "connexion.html";
}

