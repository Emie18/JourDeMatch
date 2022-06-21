const button = document.getElementById('notif');
let block = document.getElementById('affiche_notif');
button.addEventListener('click', event => {
    //console.log(event);
    //$('#affiche_notif').toggle(1000, "swing");
    //$('#affiche_notif').toggle('active');
    document.getElementById('affiche_notif').classList.toggle('active');
   
});
let button2 = document.getElementById('notif2');
button2.addEventListener('click', event => {
    console.log('oui!');
    $('#affiche_notif').toggle(1000, "swing");

});

setInterval(ajaxRequest, 5000, 'GET', 'php/request.php/recherche_notif/', affiche);
//ajaxRequest('GET','php/request.php/recherche_notif/',affiche)
let text = "";
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
        p.innerHTML = elem.nom + ' ' + elem.prenom + ' demande à participer à votre match :' + elem.titre + '<br><img class="notif_img" src="icone/bon.png" onClick=valider('+elem.id_jeux+',"'+elem.demandeur+'") > <img  class="notif_img"src="icone/pasbon.png">';

        $('#affiche_notif').append(p);
    });
}
function valider(id, demandeur) {

    console.log('valider'+id + demandeur);
    ajaxRequest('POST', 'php/request.php/validation_demande',null,'id=' + id+'&email='+demandeur);
}