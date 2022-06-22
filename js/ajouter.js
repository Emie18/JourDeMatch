
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

$('#modif_p').submit((event) =>
  {
    event.preventDefault();
    let photo = document.getElementById('photo').src;
    ajaxRequest('POST', 'php/request.php/modif_profil/',null, 'villes=' + $('#villes').val() + '&date_n=' + $('#date_n').val()+ '&formes=' + $('#formes').val()+ '&note=' + $('#note').val()+ '&photo=' + photo);
    document.getElementById('retour').innerHTML="Retour";
    document.getElementById('btn_m').style.display="none";
  }
);

$('#formulaire_inscription').submit((event) =>
  {
    event.preventDefault();
    let photo = document.getElementById('photo').src;
    ajaxRequest('POST', 'php/request.php/inscription/',null, 'nom=' + $('#nom').val() + '&prenom=' + $('#prenom').val()+ '&photo=' + $('#photo').val()+ '&email=' + $('#email').val()+ '&mot_de_passe=' + $('#mot_de_passe').val()+ '&villes=' + $('#villes').val()+ '&photo=' + photo);
    document.getElementById('formulaire_inscription').innerHTML = 'Incription réussi !!!';
    let d = document.createElement('a');
    d.className="btn_cc b";
    d.href='connexion.html';
    d.innerHTML='Connexion';
    document.getElementById('formulaire_inscription').style.display='flex';
    document.getElementById('formulaire_inscription').style.flexDirection='column';
    document.getElementById('formulaire_inscription').appendChild(d);
  }
);


