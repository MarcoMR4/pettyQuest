<?php
require 'conexion_VeteAsosiones.php';

$nuevacon= new conexion_VeteAsosiones(); 
$respuestajson=$nuevacon->notificacionSolicitudes();
echo $respuestajson;

?>