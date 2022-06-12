<?php
require 'conexion_VeteAsosiones.php';

$contacto = isset($_POST['contacto']) ? $_POST['contacto'] : '';

$nuevacon= new conexion_VeteAsosiones(); 
$respuestajson=$nuevacon->marcarMensajesVistos($contacto);
echo $respuestajson;

?>