<?php
require 'conexion_mascotas.php';

$nuevacon= new conexion();
$respuestajson=$nuevacon->obtener();
echo($respuestajson);

?>