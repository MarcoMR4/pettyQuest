<?php
require 'conexion_VeteAsosiones.php';

$claveContrato = isset($_POST['claveContrato']) ? $_POST['claveContrato'] : '';
$claveUsuario = isset($_POST['claveUsuario']) ? $_POST['claveUsuario'] : '';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->rechazar_solicitud($claveContrato, $claveUsuario);
echo $respuestajson;

?>