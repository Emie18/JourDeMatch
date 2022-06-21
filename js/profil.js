
ajaxRequest('GET','php/request.php/retour/',connecte)

function connecte(data){
  console.log(data[0]['date_n']);
  document.getElementById('nom_prenom').innerHTML = data[0]['prenom']+' '+data[0]['nom'];
  let age="";
  if(data[0]['date_naissance']!=undefined){
     age = "<span>Age:"+data[0]['date_naissance'] +"</span>";
  }
  $('#ville_age').html("Ville :"+data[0]['ville'] +age);
  //document.getElementById('ville_age').innerHTML = "Ville :"+data[0]['ville'] +"<span>Age:"+ data[0]['date_naissance']+"</span>";
  if(data[0]['notation_app_web']!=null){
    let p = document.getElementById('note');
    
    let etoile='Note :';
    for (i=0; i<parseInt(data[0]['notation_app_web']);i++){
        etoile +='<img src="icone/star.png">';
    }
    $('#note').html(etoile);
    $('#note').val(parseInt(data[0]['notation_app_web']));
    //$('#forme').val(data[0]['texte']) ;
    $('#forme option[value='+data[0]['texte']+']').prop('selected', true);
    $('#date_n').val(data[0]['date_n']);
    //document.getElementById('note').innerHTML=etoile;
  }
  if(data[0]['texte']!=null){
    //document.getElementById('forme').innerHTML= "Forme sportive: "+data[0]['texte'];
    $('#forme').html("Forme sportive: "+data[0]['texte']);
  }
  if(data[0]['photo']!=null){
    console.log(data[0]['photo']);
    document.getElementById('photo').src = data[0]['photo'];
  }
  
  ajaxRequest('GET', 'php/request.php/nb_match_joue',nb_match_joue);
    function nb_match_joue(data){
        
        $('#nb_match_joue').html("Nombre de matchs joués: "+data[0]['nb_jouee']);
        console.log($('#photo').attr('src'));
        //document.getElementById('nb_match_joue').innerHTML="Nombre de matchs joués: "+data[0]['nb_jouee'];
    }
}

