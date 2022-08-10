<?php
require 'conexion_VeteAsosiones.php';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->mis_MascotasPerdidas();
echo $respuestajson;

?>