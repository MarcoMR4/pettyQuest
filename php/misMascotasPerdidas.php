<?php
require 'conexion.php';

$nuevacon= new conexion();
$respuestajson=$nuevacon->mis_MascotasPerdidas();
echo $respuestajson;

?>