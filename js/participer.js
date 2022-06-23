/*---------------------------------
Fichier: participer.js
contenant la fonction de gestion
du bouton participé
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/

//fonction qui envoi la demande de participation du match
function participer(id){
    $('#demande'+id).html('demande envoyée !');
    ajaxRequest('POST', 'php/request.php/demande/',null, 'id_jeux=' + id);
}

//fonction qui regarde si la demande à été accepté ou refusé
ajaxRequest('GET', 'php/request.php/recherche_demande/',affiche_demande_envoyee);

//fonction qui affiche si la demande à été accepté ou envoyé
function affiche_demande_envoyee(data){
    console.log(data);
    data.forEach((elem)=>{
        if(elem.accepter == 0){
            $('#demande'+elem['id_jeux']).html('demande envoyée !');
        }else{
            $('#demande'+elem['id_jeux']).html('demande acceptée !')
        }
        document.getElementById('btn_participer'+elem['id_jeux']).style.display='none';
    })
}