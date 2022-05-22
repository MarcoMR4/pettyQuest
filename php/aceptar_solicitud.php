<?php
require 'conexion_VeteAsosiones.php';

$claveContrato = isset($_POST['claveContrato']) ? $_POST['claveContrato'] : '';
$claveUsuario = isset($_POST['claveUsuario']) ? $_POST['claveUsuario'] : '';
$claveMascota = isset($_POST['claveMascota']) ? $_POST['claveMascota'] : '';


$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->aceptar_solicitud($claveContrato, $claveUsuario, $claveMascota);
echo $respuestajson;

?>