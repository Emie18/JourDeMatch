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



if($requestMethod =='GET'&& $requestRessource == 'profil'){
  $request = 'SELECT * FROM profil';
      $statement = $db->prepare($request);
      $statement->execute();
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
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
  $request = 'Select titre,nb_joueurmax,date,TIME_FORMAT(duree,"%Hh%i") as duree,date,TIME_FORMAT(heure,"%Hh%i") as heure,ville.nom,sport.icone,sport.image from jeux JOIN sport ON sport.type_sport = jeux.type_sport JOIN ville ON ville.insee=jeux.insee';
      $statement = $db->prepare($request);
      $statement->execute();
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
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
  dbAddTweet($db, $titre, $adresse,$villes,$description,$date,$heure,$duree,$sports,$nb,$prix);
}
if($requestMethod =='POST'&& $requestRessource == 'modif_profil'){
  $villes = strip_tags($_POST['villes']);
  $date_n = strip_tags($_POST['date_n']);
  $formes= strip_tags($_POST['formes']);
  $note = strip_tags($_POST['note']);
 
  $data =null;
  modif_profil($db, $_SESSION['profil'], $villes,$date_n,$formes,$note);
}
if($requestMethod =='POST'&& $requestRessource == 'inscription'){
  $nom = strip_tags($_POST['nom']);
  $prenom = strip_tags($_POST['prenom']);
  $photo= strip_tags($_POST['photo']);
  $email = strip_tags($_POST['email']);
  $mot_de_passe = strip_tags($_POST['mot_de_passe']);
  $ville = strip_tags($_POST['villes']);
 
  $data =null;
  inscription($db, $nom, $prenom,$photo,$email,$mot_de_passe,$ville);
}

if($requestMethod =='POST'&& $requestRessource == 'connexion'){

  $request = "SELECT email,mot_de_passe FROM profil";
  $statement = $db->prepare($request);
  $statement->execute();
  $tab = $statement->fetchAll(PDO::FETCH_ASSOC);
  //$data = $tab;
  $email = strip_tags($_POST['email']);
  $mot_de_passe = strip_tags($_POST['mot_de_passe']);
  //$data =null;
  $data=connexion($db, $email, $mot_de_passe,$tab);
}
if($requestMethod =='GET'&& $requestRessource == 'retour'){

  $profil = $_SESSION['profil'];
  $request = "SELECT ville.nom as ville,date_naissance,forme_sportive.texte,profil.nom,profil.prenom,notation_app_web FROM profil JOIN ville ON ville.insee=profil.insee JOIN forme_sportive ON profil.texte=forme_sportive.texte WHERE email = '".$profil."'";
  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
 // $data = ;
}

  // Send data to the client.
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');
  header('HTTP/1.1 200 OK');
  echo json_encode($data);
  exit;
?>