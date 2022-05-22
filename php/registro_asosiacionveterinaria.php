<?php
  $nombre = isset($_POST['nombreA']) ? $_POST['nombreA'] : '';
  $ciudad = isset($_POST['ciudad']) ? $_POST['ciudad'] : '';
  $calle = isset($_POST['calle']) ? $_POST['calle'] : '';
  $numero = isset($_POST['numeroA']) ? $_POST['numeroA'] : '';
  $email = isset($_POST['email']) ? $_POST['email'] : '';
  $nombreE = isset($_POST['nombreE']) ? $_POST['nombreE'] : '';
  $apE = isset($_POST['apE']) ? $_POST['apE'] : '';
  $amE = isset($_POST['amE']) ? $_POST['amE'] : '';
  $telefono = isset($_POST['telE']) ? $_POST['telE'] : '';
  $password = isset($_POST['passwordE']) ? $_POST['passwordE'] : '';




  $nuevacon= new conexion_VeteAsosiones();
  $respuestajson=$nuevacon->registroAV($nombre,$ciudad,$calle,$numero,$email,$nombreE,$apE,$amE,$telefono,$password);
  echo($respuestajson);




?>