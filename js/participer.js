 //Fichier contenant les fonctions pour envoyer une demande 
 //de participation à un match et affiche à l'utilisateur
 //si sa demande à été envoyée ou acceptée.
function participer(id){
    $('#demande'+id).html('demande envoyer !');
    ajaxRequest('POST', 'php/request.php/demande/',null, 'id_jeux=' + id);
}
ajaxRequest('GET', 'php/request.php/recherche_demande/',affiche_demande_envoyee);
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