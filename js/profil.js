
ajaxRequest('GET','php/request.php/retour/',connecte)

function connecte(data){
  document.getElementById('nom_prenom').innerHTML = data[0]['prenom']+' '+data[0]['nom'];
  $('#ville_age').html("Ville :"+data[0]['ville'] +"<span>Age:"+ data[0]['date_naissance']+"</span>");
  //document.getElementById('ville_age').innerHTML = "Ville :"+data[0]['ville'] +"<span>Age:"+ data[0]['date_naissance']+"</span>";
  if(data[0]['notation_app_web']!=null){
    let p = document.getElementById('note');
    
    let etoile='Note :';
    for (i=0; i<parseInt(data[0]['notation_app_web']);i++){
        etoile +='<img src="icone/star.png">';
    }
    $('#note').html(etoile);
    //document.getElementById('note').innerHTML=etoile;
  }
  if(data[0]['texte']!=null){
    //document.getElementById('forme').innerHTML= "Forme sportive: "+data[0]['texte'];
    $('#forme').html("Forme sportive: "+data[0]['texte']);
  }
  
  ajaxRequest('GET', 'php/request.php/nb_match_joue',nb_match_joue);
    function nb_match_joue(data){
        console.log(data[0]['d']);
        $('#nb_match_joue').html("Nombre de matchs joués: "+data[0]['nb_jouee']);
        //document.getElementById('nb_match_joue').innerHTML="Nombre de matchs joués: "+data[0]['nb_jouee'];
    }
}