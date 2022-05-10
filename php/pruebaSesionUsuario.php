<?php
require 'conexion.php';

$nuevacon= new conexion();
$respuestajson=$nuevacon->pruebaSesion();
echo($respuestajson);

?>