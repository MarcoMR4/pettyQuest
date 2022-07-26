<?php
require 'conexion.php';

$nuevacon= new conexion();
$respuestajson=$nuevacon->obtenerMascotasPerdidas();
echo($respuestajson);

?>