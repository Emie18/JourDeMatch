<?php
    session_start();

    include_once('database.php');

    if(isset($_POST['email'])) {
        $email = $db->quote($_POST['email']);
        $password = $db->quote($_POST['password']);

        $query = "SELECT * FROM profil WHERE email = '$email' && mot_de_passe = '$password'";

        $result = $db->query($query);
        $row = $result->fetchAll(PDO::FETCH_ASSOC);

        if($result->num_rows > 0) {
            $_SESSION['prenom'] = $row['prenom'];
	        $_SESSION['nom'] = $row['nom'];
            echo 1;
        } else {
            echo 0;
        }
    }
?>