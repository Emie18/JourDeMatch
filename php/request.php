<?php

  require_once('database.php');
  if (empty(session_id())) session_start();
  // Database connexion.
  $db = dbConnect();
  if (!$db)
  {
    header ('HTTP/1.1 503 Service Unavailable');
    exit;
  }

  // Check the request.
  $requestMethod = $_SERVER['REQUEST_METHOD'];
  //les get ?url
  $request = substr($_SERVER['PATH_INFO'], 1);
  $request = explode('/', $request);
  $requestRessource = array_shift($request);

if ($requestMethod == 'GET' && $requestRessource == 'header') {

  $request = 'Select id_jeux, date as profil from jeux 
  WHERE DATEDIFF(NOW(),date) <=0';
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  if (!isset($_SESSION['profil']) || $_SESSION['profil'] == " ") {
    foreach ($result as $row => $value) {
      $result[$row]['profil'] = "";
    }
  } else {
    foreach ($result as $row) {
      $row['profil'] = $_SESSION['profil'];
    }
  }
  $data = $result;
}
if($requestMethod =='POST'&& $requestRessource == 'enregistre_id_match'){
  $_SESSION['id']=strip_tags($_POST['id']);
  $data = $_SESSION['id'];
 }

if($requestMethod =='GET'&& $requestRessource == 'villes'){
  $request = 'SELECT * FROM ville order by nom limit 20';
      $statement = $db->prepare($request);
      $statement->execute();
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}
if($requestMethod =='GET'&& $requestRessource == 'forme'){
  $request = 'SELECT * FROM forme_sportive';
      $statement = $db->prepare($request);
      $statement->execute();
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}

if($requestMethod =='GET'&& $requestRessource == 'sports'){
  $request = 'SELECT * FROM sport order by type_sport';
      $statement = $db->prepare($request);
      $statement->execute();
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}

if($requestMethod =='GET'&& $requestRessource == 'cartes'){
  $request = 'Select id_jeux ,titre,nb_joueurmax,date,TIME_FORMAT(duree,"%Hh%i") as duree,date,
  TIME_FORMAT(heure,"%Hh%i") as heure,ville.nom,
  sport.icone,sport.image,sport.type_sport from jeux 
  JOIN sport ON sport.type_sport = jeux.type_sport 
  JOIN ville ON ville.insee=jeux.insee
  WHERE DATEDIFF(NOW(),date) <=0';
      $statement = $db->prepare($request);
      $statement->execute();
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}
if($requestMethod =='GET'&& $requestRessource == 'get_id_jeux'){
  $sql= "SELECT id_jeux FROM jeux";
  $sta= $db->prepare($sql);
  $sta->execute();
  $res = $sta->fetchAll(PDO::FETCH_ASSOC);
  
  $data = $res;
}
if($requestMethod =='POST'&& $requestRessource == 'nb_joueur2'){
  $id = strip_tags($_POST['id_jeux']);

    $request = "SELECT COUNT(profil.email) as nb, a_comme_statut.id_jeux as id from profil JOIN a_comme_statut ON a_comme_statut.email=profil.email WHERE a_comme_statut.id_jeux = ".$id." AND a_comme_statut.joueur=1";
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    //$data = $result;
    foreach ($result as $key => $val){
      //$data = $val['id'];
      if($val['id']==null){
        $result[$key]['id']= $id;
        $result[$key]['nb']= 0;
        
      }
     
    }
     $data=$result;
}

 
if($requestMethod =='POST'&& $requestRessource == 'ajouter_carte'){
  $titre = strip_tags($_POST['titre']);
  $adresse = strip_tags($_POST['adresse']);
  $villes= strip_tags($_POST['villes']);
  $description = strip_tags($_POST['description']);
  $date = strip_tags($_POST['date']);
  $duree = strip_tags($_POST['duree']);
  $heure = strip_tags($_POST['heure']);
  $sports = strip_tags($_POST['sports']);
  $nb = strip_tags($_POST['nb']);
  $prix = strip_tags($_POST['prix']);
  $data =null;
  ajouter_jeux($db, $titre, $adresse,$villes,$description,$date,$heure,$duree,$sports,$nb,$prix);
}
if($requestMethod =='POST'&& $requestRessource == 'modif_profil'){
  $villes = strip_tags($_POST['villes']);
  $date_n = strip_tags($_POST['date_n']);
  $formes= strip_tags($_POST['formes']);
  $note = strip_tags($_POST['note']);
  $photo = strip_tags($_POST['photo']);
  $data = $photo;
  modif_profil($db, $_SESSION['profil'], $villes,$date_n,$formes,$note,$photo);
}
if($requestMethod =='POST'&& $requestRessource == 'inscription'){
  $nom = strip_tags($_POST['nom']);
  $prenom = strip_tags($_POST['prenom']);
  $photo= strip_tags($_POST['photo']);
  $email = strip_tags($_POST['email']);
  $mot_de_passe = strip_tags($_POST['mot_de_passe']);
  $ville = strip_tags($_POST['villes']);
  print_r($photo);
  $data =null;
  inscription($db, $nom, $prenom,$photo,$email,$mot_de_passe,$ville,$photo);
}

if($requestMethod =='POST'&& $requestRessource == 'connexion'){

  $email = strip_tags($_POST['email']);
  $mot_de_passe = strip_tags($_POST['mot_de_passe']);
  $request = "SELECT mot_de_passe FROM profil WHERE email ='".$email."'";
  $statement = $db->prepare($request);
  $statement->execute();
  $tab = $statement->fetchAll(PDO::FETCH_ASSOC);
  $hashed_password = $tab[0]['mot_de_passe'];
  if (empty(session_id())) session_start();
    if(password_verify($mot_de_passe, $hashed_password)) {
      $_SESSION['profil'] = $email;
      $data = $email;
    } elseif(empty($data)){
      $_SESSION['profil'] = ' ';
      $data = null;
    }
}
if($requestMethod =='GET'&& $requestRessource == 'deconnexion'){

    $_SESSION['profil']=" ";

}
if($requestMethod =='GET'&& $requestRessource == 'profil_detail'){

  $profil = $_SESSION['profil'];
  $request = "SELECT ville.nom as ville,ROUND(((DATEDIFF(NOW(), date_naissance))/365),0)as date_naissance,forme_sportive.texte,profil.nom,profil.prenom,notation_app_web,profil.photo, profil.date_naissance as date_n FROM profil JOIN ville ON ville.insee=profil.insee left JOIN forme_sportive ON profil.texte=forme_sportive.texte WHERE email = '".$profil."'";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);

  $data = $result;
 
}
if($requestMethod =='GET'&& $requestRessource == 'nb_match_joue'){
  $profil = $_SESSION['profil'];
  $request = "SELECT COUNT(a_comme_statut.id_jeux)as nb_jouee from jeux JOIN a_comme_statut ON a_comme_statut.id_jeux=jeux.id_jeux WHERE a_comme_statut.email = '".$profil."' AND (DATEDIFF(NOW(), date))>0";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}

if($requestMethod =='GET'&& $requestRessource == 'recherche_notif'){
  $profil = $_SESSION['profil'];
  $request = "SELECT profil.prenom,profil.nom,profil.email as demandeur, jeux.titre, a_comme_statut.email as organisateur, jeux.id_jeux FROM demande 
  JOIN jeux ON jeux.id_jeux=demande.id_jeux 
  JOIN profil ON profil.email = demande.email 
  JOIN a_comme_statut ON a_comme_statut.id_jeux = demande.id_jeux
  WHERE a_comme_statut.organisateur=1 AND demande.accepter = 0 AND a_comme_statut.email='".$profil."'";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}

if($requestMethod =='GET'&& $requestRessource == 'mes_matchs'){
  $profil = $_SESSION['profil'];
  $request ="SELECT titre,jeux.id_jeux as id_jeux, date, nb_joueurmax,
  TIME_FORMAT(duree,'%Hh%i') as duree ,TIME_FORMAT(heure,'%Hh%i') as heure,
  ville.nom,sport.type_sport,a_comme_statut.organisateur,a_comme_statut.joueur,
  sport.icone,sport.image,(DATEDIFF(NOW(), date)) as jours from jeux 
  JOIN a_comme_statut ON a_comme_statut.id_jeux=jeux.id_jeux 
  JOIN ville ON ville.insee=jeux.insee 
  JOIN sport ON sport.type_sport = jeux.type_sport 
  WHERE a_comme_statut.email='".$profil."'";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}
if($requestMethod =='POST'&& $requestRessource == 'detail'){
  $id = strip_tags($_POST['id_jeux']);
  $request ="SELECT id_jeux,description,jeux.equipe_a,jeux.equipe_b,
jeux.prenom,jeux.nom,jeux.adresse,
jeux.prix FROM jeux
WHERE jeux.id_jeux=".$id;
 $statement = $db->prepare($request);
 $statement->execute();
 $result = $statement->fetchAll(PDO::FETCH_ASSOC);
 $data = $result;
}
if($requestMethod =='POST'&& $requestRessource == 'liste_joueur_pour_match'){
  $id = strip_tags($_POST['id_jeux']);
  $request="SELECT profil.nom, profil.prenom , profil.photo, jeux.id_jeux from  jeux 
  JOIN a_comme_statut ON a_comme_statut.id_jeux=jeux.id_jeux
  JOIN profil ON a_comme_statut.email = profil.email
  WHERE a_comme_statut.joueur = 1
  AND jeux.id_jeux = ".$id;
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}

if($requestMethod =='GET'&& $requestRessource == 'elem_pour_filtre'){
 
  $request ="SELECT titre, id_jeux, ville.nom, sport.type_sport, DATEDIFF(jeux.date,NOW())as jours
  FROM jeux
  JOIN sport ON sport.type_sport=jeux.type_sport
  JOIN ville ON ville.insee=jeux.insee
  WHERE DATEDIFF(NOW(),date) <=0";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}
if($requestMethod =='POST'&& $requestRessource == 'demande'){
  $id = strip_tags($_POST['id_jeux']);
  $profil = $_SESSION['profil'];
  
  $request="INSERT INTO `demande` (`id_jeux`, `email`, `accepter`) VALUES ('".$id."', '".$profil."', '0')";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}
if($requestMethod =='GET'&& $requestRessource == 'recherche_demande'){
  $profil = $_SESSION['profil'];
  $request ="SELECT * from demande WHERE email ='".$profil."'";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}
if($requestMethod =='POST'&& $requestRessource == 'validation_demande'){
  $profil = $_SESSION['profil'];
  $demandeur = strip_tags($_POST['email']);
  $id = strip_tags($_POST['id']);
  if($demandeur == $profil){
    $request ="UPDATE `a_comme_statut` SET `joueur` = '1' WHERE `a_comme_statut`.`id_jeux` = '".$id."' AND `a_comme_statut`.`email` = '".$profil."';";
  }else{
    $request ="INSERT INTO `a_comme_statut` (`id_jeux`, `email`, `organisateur`, `joueur`) VALUES ('".$id."', '".$demandeur."', '0', '1')";
  }
  $statement = $db->prepare($request);
  $statement->execute();
  $request ="UPDATE `demande` SET `accepter` = '1' WHERE `demande`.`id_jeux` = '".$id."' AND email = '".$demandeur."';";
  $statement = $db->prepare($request);
  $statement->execute();
   $data = null;
}
if($requestMethod =='POST'&& $requestRessource == 'refuser_demande'){
  $profil = $_SESSION['profil'];
  $demandeur = strip_tags($_POST['email']);
  $id = strip_tags($_POST['id']);
  $request ="DELETE FROM `demande` WHERE `demande`.`id_jeux` = '".$id."' AND email = '".$demandeur."';";
  $statement = $db->prepare($request);
  $statement->execute();
  $data = $request;
}

if($requestMethod == 'POST' && $requestRessource == 'modifier_carte'){
  $titre = strip_tags($_POST['titre']);
  $adresse = strip_tags($_POST['adresse']);
  $villes= strip_tags($_POST['villes']);
  $description = strip_tags($_POST['description']);
  $date = strip_tags($_POST['date']);
  $duree = strip_tags($_POST['duree']);
  $heure = strip_tags($_POST['heure']);
  $sports = strip_tags($_POST['sports']);
  $nb = strip_tags($_POST['nb']);
  $prix = strip_tags($_POST['prix']);
  if($_POST['nb_equipe_a']==""){
    $equipe_a= NULL;
    $equipe_b= NULL;
    $nom = NULL;
    $prenom = NULL;
  }else{
    $equipe_a = strip_tags($_POST['nb_equipe_a']);
    $equipe_b = strip_tags($_POST['nb_equipe_b']);
    $joueur_match = strip_tags($_POST['joueur_match']);
    $sql= "SELECT profil.nom, profil.prenom FROM profil WHERE email = '".$joueur_match."'";
    $sta= $db->prepare($sql);
    $sta->execute();
    $res = $sta->fetchAll(PDO::FETCH_ASSOC);
    $nom = $res[0]['nom'];
    $prenom = $res[0]['prenom'];
  }

  $data = null;
  modifier_jeux($db, $titre, $adresse, $villes, $description, $date, $duree, $heure,
   $sports, $nb, $prix, $equipe_a, $equipe_b, $nom,$prenom,$_SESSION['id']);
}

if($requestMethod == 'GET' && $requestRessource == 'joueur_match'){
  $request ="SELECT profil.email, profil.nom, profil.prenom from profil JOIN a_comme_statut ON a_comme_statut.email=profil.email WHERE a_comme_statut.id_jeux = ".$_SESSION['id']." AND a_comme_statut.joueur=1";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}

if ($requestMethod == 'GET' && $requestRessource == 'ancienne_information') {
  $request = "SELECT jeux.titre,jeux.insee,jeux.date, jeux.description, jeux.prix, jeux.nb_joueurmax, ville.nom, sport.type_sport,jeux.adresse, heure, duree
   from jeux JOIN ville ON ville.insee= jeux.insee
   JOIN sport ON sport.type_sport = jeux.type_sport
   WHERE jeux.id_jeux ='" . $_SESSION['id'] . "'";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}

if ($requestMethod == 'POST' && $requestRessource == 'modif_mot_de_passe') {
  $request = "SELECT mot_de_passe FROM profil WHERE email ='".$_SESSION['profil']."'";
  $statement = $db->prepare($request);
  $statement->execute();
  $tab = $statement->fetchAll(PDO::FETCH_ASSOC);
  $hashed_password = $tab[0]['mot_de_passe'];
  $mot_de_passe = strip_tags($_POST['ancien_mot_de_passe']);
  //print_r($request);
  if(password_verify($mot_de_passe, $hashed_password)) {
    
    $nouveau_mot_de_passe = strip_tags($_POST['nouveau_mot_de_passe']);
    $hashed_password = password_hash($nouveau_mot_de_passe, PASSWORD_BCRYPT);
    $request = "UPDATE profil SET mot_de_passe ='".$hashed_password."' WHERE email ='".$_SESSION['profil']."'";
    $statement = $db->prepare($request);
    $statement->execute();
    $data = "oui";
    } else{
      $data = "non";
    }

  //$data = $request;
}


  // Send data to the client.
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');
  header('HTTP/1.1 200 OK');
  echo json_encode($data);
  exit;
?>
