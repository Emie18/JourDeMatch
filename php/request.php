<?php

  require_once('database.php');

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
  //$request = substr($_SERVER['PATH_INFO'], 1);
  //$request = explode('/', $request);
  //$requestRessource = array_shift($request);



if($requestMethod =='GET'){
  $request = 'SELECT * FROM profil';

      $statement = $db->prepare($request);

      $statement->execute();
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  $data = $result;
}

  // Send data to the client.
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');
  header('HTTP/1.1 200 OK');
  echo json_encode($data);
  exit;
?>