
$('#formulaire').submit((event) =>
  {
    event.preventDefault();
    ajaxRequest('POST', 'php/request.php/ajouter_carte/',null, 'titre=' + $('#titre').val() + '&adresse=' + $('#adresse').val()+ '&villes=' + $('#villes').val()+ '&description=' + $('#description').val()+ '&date=' + $('#date').val()+ '&heure=' + $('#heure').val()+ '&duree=' + $('#duree').val()+ '&sports=' + $('#sports').val()+ '&nb=' + $('#nb').val());
    // console.log($('#titre').val());
    // $('#adresse').val('');
    // $('#villes').val('');
    // $('#description').val('');
    // $('#date').val('');
    // $('#heure').val('');
    // $('#duree').val('');
    // $('#sports').val('');
  }
);

