<?php
require 'conexion_VeteAsosiones.php';

$idNombre = isset($_POST['idNombre']) ? $_POST['idNombre'] : '';
$edad = isset($_POST['edad']) ? $_POST['edad'] : '';
$genero = isset($_POST['genero']) ? $_POST['genero'] : '';
$idRaza = isset($_POST['idRaza']) ? $_POST['idRaza'] : '';
$tamano = isset($_POST['tamano']) ? $_POST['tamano'] : '';
$idUbicacion = isset($_POST['idUbicacion']) ? $_POST['idUbicacion'] : '';
$idRazaAnimal = isset($_POST['idRazaAnimal']) ? $_POST['idRazaAnimal'] : '';

  $tmpimg=$_FILES['foto']['tmp_name'];
  $type=$_FILES['foto']['type'];

if(isset($_FILES['foto'])){

  $tmpimg=$_FILES['foto']['tmp_name'];
  $type=$_FILES['foto']['type'];

  if($type=='image/png'){
    $type='.png';
  }
  else if($type=='image/jpg'){
    $type='.jpg';   
  }
  else if($type=='image/jpeg'){
    $type='.jpeg';
  }
  else{
    $type='png';
  }

  $nuevacon= new conexion_VeteAsosiones();
  $respuestajson=$nuevacon->registroMascotas($idNombre,$edad,$genero,$idRaza,$tamano,$idUbicacion,$idRazaAnimal,$tmpimg,$type);
  echo($respuestajson);
}

?>