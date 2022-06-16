
//     let f = document.getElementById('ajouter');
//     f.addEventListener('submit', event => {
    // var titre = document.getElementById('titre').value;
    // var ville = document.getElementById('villes').value;
    // var date = document.getElementById('date').value;
    // var duree = document.getElementById('duree').value;
    // var adresse = document.getElementById('adresse').value;
    // var sport = document.getElementById('sports').value;
    // var heure = document.getElementById('heure').value;
    // var description = document.getElementById('description').value;
//     console.log(titre,ville,date,duree,adresse,sport,heure,description);
//     ajaxRequest('POST', 'php/request.php/ajouter_match',null,'titre='+titre);
// });


// function ajouter(){

// }
$('#formulaire').submit((event) =>
  {
    
    event.preventDefault();
    ajaxRequest('POST', 'php/request.php/ajouter_carte/',null, 'titre=' + $('#titre').val() + '&adresse=' + $('#adresse').val()+ '&villes=' + $('#villes').val()+ '&description=' + $('#description').val()+ '&date=' + $('#date').val()+ '&heure=' + $('#heure').val()+ '&duree=' + $('#duree').val()+ '&sports=' + $('#sports').val()+ '&nb=' + $('#nb').val());
    // console.log($('#titre').val());
    $('#adresse').val('');
    $('#villes').val('');
    $('#description').val('');
    $('#date').val('');
    $('#heure').val('');
    $('#duree').val('');
    $('#sports').val('');
  }
);
function displayTweets(data){
    console.log('coucou');
}
