<?php
/**
 * @Author: Thibault Napoléon <Imothep>
 * @Company: ISEN Yncréa Ouest
 * @Email: thibault.napoleon@isen-ouest.yncrea.fr
 * @Created Date: 22-Jan-2018 - 13:57:23
 * @Last Modified: 08-Dec-2019 - 19:42:40
 */

  require_once('constants.php');

  //----------------------------------------------------------------------------
  //--- dbConnect --------------------------------------------------------------
  //----------------------------------------------------------------------------
  // Create the connection to the database.
  // \return False on error and the database otherwise.
  function dbConnect()
  {
    try
    {
      $db = new PDO('mysql:host='.DB_SERVER.';dbname='.DB_NAME.';charset=utf8',
        DB_USER, DB_PASSWORD);
    }
    catch (PDOException $exception)
    {
      error_log('Connection error: '.$exception->getMessage());
      return false;
    }
    return $db;
  }

function dbAddTweet($db, $titre, $adresse, $villes, $description, $date, $heure, $duree, $sports, $nb, $prix)
{
  try {
    $request = "INSERT into jeux (titre,adresse,insee,description,date,heure,duree,type_sport,nb_joueurmax,prix)Values('" . $titre . "','" . $adresse . "','" . $villes . "','" . $description . "','" . $date . "','" . $heure . "','" . $duree . "','" . $sports . "'," . $nb . "," . $prix . ")";
    $statement = $db->prepare($request);
    $statement->execute();
    $request = "SELECT id_jeux FROM jeux order by id_jeux DESC LIMIT 1";
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    $id_jeux = $result[0]['id_jeux'];
    $re = "INSERT into a_comme_statut (id_jeux,email,organisateur,joueur)Values(" . $id_jeux . ",'" . $_SESSION['profil'] . "',1,0)";
    $st = $db->prepare($re);
    $st->execute();
    print_r($re);
  } catch (PDOException $exception) {
    error_log('Request error: ' . $exception->getMessage());
    return false;
  }
  return true;
}
function connexion($db, $email, $mot_de_passe, $tab)
{
  //foreach ($tab as $key => $elem) {
    //if ($email == $elem['email'] && $mot_de_passe == $elem['mot_de_passe']) {

      //print('oui');
      print_r($tab[0]['email']);
    if($tab['email']!=""){
      
      return $email;
    } else {
      
    }
  //}
  return null;
}
    //return null;

function modif_profil($db, $profil, $villes,$date_n,$formes,$note,$photo){
  $request = "UPDATE profil SET insee =".$villes." , date_naissance = '".$date_n."', notation_app_web = ".$note.", texte = '".$formes."', photo ='".$photo."' WHERE email = '".$profil."'";
  $statement = $db->prepare($request);
       $statement->execute();
       print_r($request);
}
function inscription($db, $nom, $prenom,$photo,$email,$mot_de_passe,$ville)
{
  try
  {
    $hashed_password = password_hash($mot_de_passe, PASSWORD_BCRYPT);
    echo $hashed_password;
    $request = "INSERT into profil (nom,prenom,photo,email,mot_de_passe,insee)Values('".$nom."','".$prenom."','".$photo."','".$email."', '".$hashed_password."',".$ville.")";
    $statement = $db->prepare($request);
     $statement->execute();
      print_r($request);
  }
  catch (PDOException $exception)
  {
    error_log('Request error: '.$exception->getMessage());
    return false;
  }
  return true;
}

?>
