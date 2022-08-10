<?php
require 'conexion_VeteAsosiones.php';

$idMascota = isset($_POST['idMascota']) ? $_POST['idMascota'] : '';
$idNombre = isset($_POST['idNombre']) ? $_POST['idNombre'] : '';
$idEstatus = isset($_POST['idEstatus']) ? $_POST['idEstatus'] : '';
$idUbicacion = isset($_POST['idUbicacion']) ? $_POST['idUbicacion'] : '';
$idTelefono = isset($_POST['idTelefono']) ? $_POST['idTelefono'] : '';
$idRaza = isset($_POST['idRaza']) ? $_POST['idRaza'] : '';
$idGenero = isset($_POST['idGenero']) ? $_POST['idGenero'] : '';
$idTamaño = isset($_POST['idTamaño']) ? $_POST['idTamaño'] : '';
$idInformacion = isset($_POST['idInformacion']) ? $_POST['idInformacion'] : '';
$idTipo = isset($_POST['idTipo']) ? $_POST['idTipo'] : '';
//$ubicacion = isset($_POST['idUbicacion']) ? $_POST['idUbicacion'] : '';

  $nuevacon= new conexion_VeteAsosiones(); 
  $respuestajson=$nuevacon->editar_mascota_perdida($idMascota,$idNombre,$idEstatus,$idUbicacion,$idTelefono,$idRaza,$idGenero,$idTamaño,$idInformacion,$idTipo);
  Header("location: ../perfil_MascotaPerdida.html");
?>