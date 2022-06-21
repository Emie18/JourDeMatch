function detail(id){
    ajaxRequest('POST', 'php/request.php/detail/',affiche_detail, 'id_jeux=' + id);
    ajaxRequest('POST', 'php/request.php/liste_joueur_pour_match/',affiche_detail_liste_joueur, 'id_jeux=' + id);
}
function affiche_detail(data){

    $('#adresse'+data[0]['id_jeux']).html('Adresse: '+data[0]['adresse']);
    $('#description'+data[0]['id_jeux']).html('description: '+data[0]['description']);
    $('#prix'+data[0]['id_jeux']).html('prix: '+data[0]['prix']+'€');
    if(data[0]['equipe_a']!=null)
    $('#equipe'+data[0]['id_jeux']).html('score: ' +data[0]['equipe_a']+' - '+data[0]['equipe_b']);
    if(data[0]['nom']!=null)
    $('#meilleur_joueur'+data[0]['id_jeux']).html('Meilleur joueur: '+data[0]['nom']+' '+data[0]['prenom']);

}
function supp_detail(id){
    $('#adresse'+id).html('');
    $('#description'+id).html('');
    $('#prix'+id).html('');
    $('#equipe'+id).html('');
    $('#meilleur_joueur'+id).html('');
    $('#img'+id).html('');
}
function affiche_detail_liste_joueur(data){
    console.log(data);
     $('#img'+data[0]['id_jeux']).html('');
    data.forEach(elem=>{
        let img_joueur = document.createElement('p');
        img_joueur.innerHTML =` <span>${elem.nom} ${elem.prenom}</span><img src="${elem.photo}"> `
        $('#img'+elem['id_jeux']).append(img_joueur);
        console.log(img_joueur);
    })
}

$('quitter').onclick = function(){
    console.log('coucou');
}