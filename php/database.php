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

  function dbAddTweet($db, $titre, $adresse,$villes,$description,$date,$heure,$duree,$sports,$nb)
  {
    try
    {
      $request = "INSERT into jeux (titre,adresse,insee,description,date,heure,duree,type_sport,nb_joueurmax)Values('".$titre."','".$adresse."','".$villes."','".$description."','".$date."','".$heure."','".$duree."','".$sports."',".$nb.")";
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
