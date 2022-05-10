<?php
require 'conexion_VeteAsosiones.php';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->pruebaSesion();
echo($respuestajson);

?>