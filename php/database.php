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

  function dbAddTweet($db, $titre, $adresse,$villes,$description,$date,$heure,$duree,$sports,$nb,$prix)
  {
    try
    {
      $request = "INSERT into jeux (titre,adresse,insee,description,date,heure,duree,type_sport,nb_joueurmax,prix)Values('".$titre."','".$adresse."','".$villes."','".$description."','".$date."','".$heure."','".$duree."','".$sports."',".$nb.",".$prix.")";
      $statement = $db->prepare($request);
       $statement->execute();
      //print_r($request);
    }
    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }
    return true;
  }
function connexion($db, $email, $mot_de_passe, $tab)
{
  foreach ($tab as $key => $elem) {
    if ($email == $elem['email'] && $mot_de_passe == $elem['mot_de_passe']) {
      //print('oui');
      if (empty(session_id())) session_start();
      $_SESSION['profil'] = $email;
      return $email;
    } else {
      $_SESSION['profil'] = '';
    }
  }
  return null;
}
    //return null;

function modif_profil($db, $profil, $villes,$date_n,$formes,$note){
  $request = "UPDATE profil SET insee =".$villes." , date_naissance = '".$date_n."', notation_app_web = ".$note.", texte = '".$formes."' WHERE email = '".$profil."'";
  $statement = $db->prepare($request);
       $statement->execute();
       print_r($request);
}
function inscription($db, $nom, $prenom,$photo,$email,$mot_de_passe,$ville)
{
  try
  {
    $request = "INSERT into profil (nom,prenom,photo,email,mot_de_passe,insee)Values('".$nom."','".$prenom."','".$photo."','".$email."','".$mot_de_passe."',".$ville.")";
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
