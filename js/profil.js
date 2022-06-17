
ajaxRequest('GET','php/request.php/retour/',connecte)

function connecte(data){
  document.getElementById('nom_prenom').innerHTML = data[0]['prenom']+' '+data[0]['nom'];
  document.getElementById('ville_age').innerHTML = "Ville :"+data[0]['ville'] +"<span>Age:"+ data[0]['date_naissance']+"</span>";
  if(data[0]['notation_app_web']!=null){
    let p = document.getElementById('note');
    
    let etoile='Note :';
    for (i=0; i<parseInt(data[0]['notation_app_web']);i++){
        etoile +='<img src="icone/star.png">';
    }
    document.getElementById('note').innerHTML=etoile;
  }
  if(data[0]['texte']!=null){
    document.getElementById('forme').innerHTML= "Forme sportive: "+data[0]['texte'];
  }
  console.log(parseInt(data[0]['notation_app_web']));
}