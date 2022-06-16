<?php

    include_once('database.php');

    if(isset($_POST['email'])) {
        $name = $db->quote($_POST['nom']);
        $forename = $db->quote($_POST['prenom']);
        $email = $db->quote($_POST['email']);
        $password = $db->quote($_POST['mot_de_passe']);

        $query = "INSERT INTO profil(nom, prenom, email, mot_de_passe) VALUES('$name', '$forename', '$email', '$password')";
        $result = $db->query($query);

        if($result) {
            echo json_encode(array('error'=>'0', 'message'=>'Registration successfully Login'));
        } else {
            echo json_encode(array('error'=>'1', 'message'=>'Registration Failed try again'));
        }
    }

?>