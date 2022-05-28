<?php
require 'conexion_VeteAsosiones.php';

$idmascota = isset($_POST['claveMascota']) ? $_POST['claveMascota'] : '';
$idveterinaria = isset($_POST['claveAsociacionVeterinaria2']) ? $_POST['claveAsociacionVeterinaria2'] : '';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->obtenerUbicacion($idmascota,$idveterinaria);
echo $respuestajson;

?>