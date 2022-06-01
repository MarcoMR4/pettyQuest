<?php
require 'conexionadmin.php';

  $id= isset($_POST['claveVete']) ? $_POST['claveVete'] : '';
  echo($id);

  $nuevacon= new conexionadmin();
  $respuestajson=$nuevacon->elimiarVete($id);
  echo($respuestajson);
  Header("location: http://localhost/pettyQuest/catalogo_veterinarias.html");
?>