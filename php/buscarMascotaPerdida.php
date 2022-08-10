<?php
require 'conexion_VeteAsosiones.php';

$parametro = isset($_POST['nombre']) ? $_POST['nombre'] : '';


$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->buscarMascotaPerdidaNombre($parametro);
echo $respuestajson;

?>