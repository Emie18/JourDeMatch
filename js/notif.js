const button = document.getElementById('notif');
let block = document.getElementById('affiche_notif');
button.addEventListener('click', event => {
    //console.log(event);
    $('#affiche_notif').toggle(1000, "swing");
});
setInterval(ajaxRequest, 5000, 'GET', 'php/request.php/recherche_notif/', affiche);
//ajaxRequest('GET','php/request.php/recherche_notif/',affiche)
let text = "";
function affiche(data) {
    $('#affiche_notif').html('');
    if (data != "") {
        document.getElementById('icone_notif').src = "icone/notif_oui.png";
    }
    data.forEach(elem => {
        let p = document.createElement('p');
        p.innerHTML = elem.nom + ' ' + elem.prenom + ' demande a praticiper à votre match :' + elem.titre + '<br><img class="notif_img" src="icone/bon.png"> <img  class="notif_img"src="icone/pasbon.png">';

        $('#affiche_notif').append(p);
    });
}