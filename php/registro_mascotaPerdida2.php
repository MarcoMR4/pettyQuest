<?php
require 'conexion_VeteAsosiones.php';

$idNombre = isset($_POST['idNombre']) ? $_POST['idNombre'] : '';
$idDireccion = isset($_POST['idDireccion']) ? $_POST['idDireccion'] : '';
$idTelefono = isset($_POST['idTelefono']) ? $_POST['idTelefono'] : '';
$idRaza = isset($_POST['idRaza']) ? $_POST['idRaza'] : '';
$genero = isset($_POST['genero']) ? $_POST['genero'] : '';
$tamano = isset($_POST['tamano']) ? $_POST['tamano'] : '';
$idInfo = isset($_POST['idInfo']) ? $_POST['idInfo'] : '';
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
  $respuestajson=$nuevacon->registroMascotasPerdidas($idNombre,$idDireccion,$idTelefono,$idRaza,$genero,$tamano,$idInfo,$idRazaAnimal,$tmpimg,$type);
  echo($respuestajson);
}

?>