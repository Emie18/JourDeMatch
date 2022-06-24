<?php
/*---------------------------------
Fichier: database.php
contenant les fonctions:
 ● connexion à la base de données
 ● Ajouter un match
 ● Ajouter un profil
 ● modifier un match
 ● modifier un profil
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/
require_once('constants.php');

//fonction de connexion à la base de donnée
function dbConnect()
{
  try {
    $db = new PDO(
      'mysql:host=' . DB_SERVER . ';dbname=' . DB_NAME . ';charset=utf8',
      DB_USER,
      DB_PASSWORD
    );
  } catch (PDOException $exception) {
    error_log('Connection error: ' . $exception->getMessage());
    return false;
  }
  return $db;
}

//fonction pour ajouter un match
function ajouter_jeux($db, $titre, $adresse, $villes, $description, $date, $heure, $duree, $sports, $nb, $prix)
{
  try {
    $request = "INSERT into jeux (titre,adresse,insee,description,date,heure,duree,type_sport,nb_joueurmax,prix)
    Values(:titre,:adresse,:ville,:description,'" . $date . "','" . $heure . "','" . $duree . "',:sport," . $nb . "," . $prix . ")";
    $statement = $db->prepare($request);
    $statement->execute(array(
      ':titre' => $titre,
      ':adresse' => $adresse,
      ':ville' => $villes,
      ':description' => $description,
      ':sport' => $sports
    ));
    print_r($request);
    $request = "SELECT id_jeux FROM jeux order by id_jeux DESC LIMIT 1";
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    $id_jeux = $result[0]['id_jeux'];
    $re = "INSERT into a_comme_statut (id_jeux,email,organisateur,joueur)Values('" . $id_jeux . "','" . $_SESSION['profil'] . "',1,0)";
    $st = $db->prepare($re);
    $st->execute();
    print_r($re);
  } catch (PDOException $exception) {
    error_log('Request error: ' . $exception->getMessage());
    return false;
  }
  return true;
}

//fonction pour ajouter un nouveau profil
function inscription($db, $nom, $prenom, $photo, $email, $mot_de_passe, $ville)
{
  try {
    //recherche de l'email donné
    $request = "SELECT email from profil WHERE email = :email";
    $statement = $db->prepare($request);
    $statement->execute(array(
      ':email' => $email
    ));
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    //on regarde si l'email existe déjà
    if (empty($result)) {
      $hashed_password = password_hash($mot_de_passe, PASSWORD_BCRYPT);
      $request = "INSERT into profil (nom,prenom,photo,email,mot_de_passe,insee)
    Values(:nom,:prenom,'" . $photo . "',:email, '" . $hashed_password . "',:ville)";
      $statement = $db->prepare($request);
      $statement->execute(array(
        ':nom' => $nom,
        ':prenom' => $prenom,
        ':ville' => $ville,
        ':email' => $email
      ));
      $statement->execute();
      //on retourne oui si l'email n'existe pas
      return "oui";
    } else {
      //on retourne non si l'email existe
      return "non";
    }
  } catch (PDOException $exception) {
    error_log('Request error: ' . $exception->getMessage());
    return false;
  }
}

//fonction pour modifier le profil
function modif_profil($db, $profil, $villes, $date_n, $formes, $note, $photo)
{
  $request = "UPDATE profil SET insee =" . $villes . " , date_naissance = '" . $date_n . "',
   notation_app_web = " . $note . ", texte = '" . $formes . "', photo ='" . $photo . "'
   WHERE email = '" . $profil . "'";
  $statement = $db->prepare($request);
  $statement->execute();
  print_r($request);
}

//fonction pour modifier le match
function modifier_jeux($db, $titre, $adresse, $villes, $description, $date, $duree, $heure, $sports, $nb,
                        $prix, $equipe_a, $equipe_b, $nom, $prenom, $id)
{
  if ($equipe_a != NULL) {
    $request = "UPDATE `jeux` SET `titre` = :titre, `adresse` = :adresse, `description` = :description,
   `nb_joueurmax` = '" . $nb . "', `prix` = '" . $prix . "', `date` = '" . $date . "', `duree` = '" . $duree . "',
    `heure` = '" . $heure . "', `type_sport` = '" . $sports . "', `insee` = '" . $villes . "',
     `equipe_a` = '" . $equipe_a . "', `equipe_b` = '" . $equipe_b . "', `nom` = :nom, `prenom` = :prenom
     WHERE `jeux`.`id_jeux` = " . $id . "; ";
    $statement = $db->prepare($request);
    $statement->execute(array(
      ':titre' => $titre,
      ':adresse' => $adresse,
      ':description' => $description,
      ':nom' => $nom,
      ':prenom' => $prenom
    ));
  } else {
    $request = "UPDATE `jeux` SET `titre` = :titre, `adresse` = :adresse, `description` = :description ,
    `nb_joueurmax` = '" . $nb . "', `prix` = '" . $prix . "', `date` = '" . $date . "', `duree` = '" . $duree . "',
     `heure` = '" . $heure . "', `type_sport` = '" . $sports . "', `insee` = '" . $villes . "',
      `equipe_a` = NULL, `equipe_b` = NULL, `nom` = NULL, `prenom` = NULL
      WHERE `jeux`.`id_jeux` = " . $id . "; ";

    $statement = $db->prepare($request);
    $statement->execute(array(
      ':titre' => $titre,
      ':adresse' => $adresse,
      ':description' => $description,

    ));
  }
}

?>
