<?php
require 'conexion_VeteAsosiones.php';

$idMascota = isset($_POST['idMascota']) ? $_POST['idMascota'] : '';
$nombre = isset($_POST['idNombre']) ? $_POST['idNombre'] : '';
$raza = isset($_POST['idRaza']) ? $_POST['idRaza'] : '';
$edad = isset($_POST['idEdad']) ? $_POST['idEdad'] : '';
$genero = isset($_POST['idGenero']) ? $_POST['idGenero'] : '';
$tamaño = isset($_POST['idTamaño']) ? $_POST['idTamaño'] : '';
$estatus = isset($_POST['idEstatus']) ? $_POST['idEstatus'] : '';
//$ubicacion = isset($_POST['idUbicacion']) ? $_POST['idUbicacion'] : '';
$tipo = isset($_POST['idTipo']) ? $_POST['idTipo'] : '';
$informacion = isset($_POST['idInformacion']) ? $_POST['idInformacion'] : '';


  $nuevacon= new conexion_VeteAsosiones(); 
  $respuestajson=$nuevacon->editar_mascota($idMascota,$nombre,$raza,$edad,$genero,$tamaño,$estatus,$tipo,$informacion);
  Header("location: ../perfil_Mascota.html");
?>