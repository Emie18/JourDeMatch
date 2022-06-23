/*---------------------------------
Fichier: modif_match.js
contenant les fonctions pour 
modifier un match
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/

//fonction qui execute la requête ajax pour recupérer
//l'id du match à modifier et rediriger vers la page
//modif_match.html
function modif_match(id) {
  console.log(id);
  ajaxRequest('POST', 'php/request.php/enregistre_id_match/', null, 'id=' + id);
  window.location.href = "modif_match.html";

}
//requête ajax pour récupérer les détails actuel du match
ajaxRequest('GET', 'php/request.php/ancienne_information', affiche_les_ancienne_valeur);

//fonction qui remplis le formulaire avec les détails actuel du match
function affiche_les_ancienne_valeur(data) {
  console.log(data);
  $('#titre').val(data[0]['titre']);
  $('#adresse').val(data[0]['adresse']);
  $('#villes').val(data[0]['insee']);
  $('#description').val(data[0]['description']);
  $('#date').val(data[0]['date']);
  console.log(data[0]['date']);
  $('#heure').val(data[0]['heure']);
  $('#duree').val(data[0]['duree']);
  $('#sports').val(data[0]['type_sport']);
  $('#prix').val(data[0]['prix']);
  $('#nb').val(data[0]['nb_joueurmax']);
  $('#duree').val(data[0]['duree']);
}

//fonction qui execute la requête ajax pour enregistrer les modifications du match
$('#formulaire_modifier').submit((event) => {
  event.preventDefault();
  ajaxRequest('POST', 'php/request.php/modifier_carte/', null, 'titre=' + $('#titre').val() + '&adresse=' + $('#adresse').val() + '&villes=' + $('#villes').val() + '&description=' + $('#description').val() + '&date=' + $('#date').val() + '&heure=' + $('#heure').val() + '&duree=' + $('#duree').val() + '&sports=' + $('#sports').val() + '&nb=' + $('#nb').val() + '&prix=' + $('#prix').val() + '&nb_equipe_a=' + $('#nb_equipe_a').val() + '&nb_equipe_b=' + $('#nb_equipe_b').val() + '&joueur_match=' + $('#joueur_match').val());
  document.getElementById('formulaire_modifier').innerHTML = "Match modifié !";
  let d = document.createElement('a');
  d.className = "btn_cc b";
  d.href = 'index.html';
  d.innerHTML = 'Allez voir';
  document.getElementById('formulaire_modifier').style.display = 'flex';
  document.getElementById('formulaire_modifier').style.flexDirection = 'column';
  document.getElementById('formulaire_modifier').appendChild(d);
}
);

//fonction qui affiche les champs,
//score et meilleur joueur du match s'il est fini
$(document).ready(function () {
  $('#checkbox_fini').change(function () {
    $('#autoUpdate').fadeToggle("swing");
    $('#firstpart').fadeToggle("swing");
  });
});