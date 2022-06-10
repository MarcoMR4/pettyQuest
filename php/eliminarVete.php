<?php
require 'conexionadmin.php';

  $id= isset($_POST['claveVete']) ? $_POST['claveVete'] : '';
//   echo($id);

  $nuevacon= new conexionadmin();
  $respuestajson=$nuevacon->elimiarVete($id);
//   echo($respuestajson);
//   Header("location: ./catalogo_veterinarias.html");
    header("Location: ../catalogo_veterinarias.html");
    exit();
    
?>