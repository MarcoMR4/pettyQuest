<?php
require 'conexion_VeteAsosiones.php';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->consultar_solicitudes_proceso();
echo($respuestajson);

?>