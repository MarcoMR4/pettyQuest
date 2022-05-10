<?php
require 'conexion_VeteAsosiones.php';

$nombreMas = isset($_POST['nombreMas']) ? $_POST['nombreMas'] : '';
$edadMas = isset($_POST['edadMas']) ? $_POST['edadMas'] : '';
$idRaza = isset($_POST['idRaza']) ? $_POST['idRaza'] : '';
$idUbicacion = isset($_POST['idUbicacion']) ? $_POST['idUbicacion'] : '';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->registroMascotas($nombreMas,$edadMas,$idRaza,$idUbicacion);
echo($respuestajson);
?>