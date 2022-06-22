
//fichier contenant les fonctions de gestion de notification
//et accepter ou non la demande de participation à un macth

const button = document.getElementById('notif');
let block = document.getElementById('affiche_notif');
button.addEventListener('click', event => {
    document.getElementById('affiche_notif').classList.toggle('active');
   
});
let button2 = document.getElementById('notif2');
button2.addEventListener('click', event => {
    console.log('oui!');
    $('#affiche_notif').toggle(1000, "swing");

});

//fonction pour afficher les notifications
setInterval(ajaxRequest, 1000, 'GET', 'php/request.php/recherche_notif/', affiche);
function affiche(data) {
    $('#affiche_notif').html('');
        document.getElementById('icone_notif').src = "icone/notif_non.png";
        document.getElementById('icone_notif2').src = "icone/notif_non.png";
    if (data != "") {
        document.getElementById('icone_notif').src = "icone/notif_oui.png";
        document.getElementById('icone_notif2').src = "icone/notif_oui.png";
    }
    data.forEach(elem => {
        let p = document.createElement('p');
        p.innerHTML = elem.nom + ' ' + elem.prenom + ' demande à participer à votre match :' + elem.titre + '<br><img class="notif_img" src="icone/bon.png" onClick=valider('+elem.id_jeux+',"'+elem.demandeur+'") > <img  class="notif_img"src="icone/pasbon.png" onClick=refuser('+elem.id_jeux+',"'+elem.demandeur+'")>';

        $('#affiche_notif').append(p);
    });
}

//fonction pour valider une demande de participation à un match
function valider(id, demandeur) {
    ajaxRequest('POST', 'php/request.php/validation_demande',null,'id=' + id+'&email='+demandeur);
}
//fonction pour refuser une demande de participation à un match
function refuser(id, demandeur) {
    ajaxRequest('POST', 'php/request.php/refuser_demande',null,'id=' + id+'&email='+demandeur);
}