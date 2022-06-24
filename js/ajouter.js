/*---------------------------------
Fichier: ajouter.js
contenant les requêtes ajax
en lien avec l'ajout dans la
base de donnée
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/

//Creation d'un match
$('#formulaire').submit((event) =>
  {
    event.preventDefault();
    ajaxRequest('POST', 'php/request.php/ajouter_carte/',null, 'titre=' + $('#titre').val() + '&adresse=' + $('#adresse').val()+ '&villes=' + $('#villes').val()+ '&description=' + $('#description').val()+ '&date=' + $('#date').val()+ '&heure=' + $('#heure').val()+ '&duree=' + $('#duree').val()+ '&sports=' + $('#sports').val()+ '&nb=' + $('#nb').val()+ '&prix=' + $('#prix').val());
    document.getElementById('formulaire').innerHTML = "Match ajouté !";
    let d = document.createElement('a');
    d.className="btn_cc b";
    d.href='index.html';
    d.innerHTML='Allez voir';
    document.getElementById('formulaire').style.display='flex';
    document.getElementById('formulaire').style.flexDirection='column';
    document.getElementById('formulaire').appendChild(d);
  }
);

//ajouter un nouveau profil
$('#formulaire_inscription').submit((event) =>
  {
    event.preventDefault();
    let photo = document.getElementById('photo').src;
    if($('#mot_de_passe').val().localeCompare($('#mot_de_passe_confirmation').val())==0){
            ajaxRequest('POST', 'php/request.php/inscription/',verif_email, 'nom=' + $('#nom').val() + '&prenom=' + $('#prenom').val()+ '&photo=' + $('#photo').val()+ '&email=' + $('#email').val()+ '&mot_de_passe=' + $('#mot_de_passe').val()+ '&villes=' + $('#villes').val()+ '&photo=' + photo);
      
    }else{
      $('#erreur').html('Ce n\'est pas le même mot de passe !');
    }

  }
);

//fonction qui affiche une erreur si l'email existe déjà
function verif_email(data){
  console.log(data);
  if(data =="non"){
    $('#erreur').html('Cet email est déjà utilisé !');
  }
  if(data=="oui"){
      $('#formulaire_inscription').html('Incription réussi !!!');
      let d = document.createElement('a');
      d.className="btn_cc b";
      d.href='connexion.html';
      d.innerHTML='Connexion';
      document.getElementById('formulaire_inscription').style.display='flex';
      document.getElementById('formulaire_inscription').style.flexDirection='column';
      document.getElementById('formulaire_inscription').appendChild(d);
  }
}

//Modification d'un profil
$('#modif_p').submit((event) =>
  {
    event.preventDefault();
    let photo = document.getElementById('photo').src;
    ajaxRequest('POST', 'php/request.php/modif_profil/',null, 'villes=' + $('#villes').val() + '&date_n=' + $('#date_n').val()+ '&formes=' + $('#formes').val()+ '&note=' + $('#note').val()+ '&photo=' + photo);
    document.getElementById('retour').innerHTML="Retour";
    document.getElementById('btn_m').style.display="none";
  }
);



