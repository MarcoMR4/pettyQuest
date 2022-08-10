<?php
require 'conexion_VeteAsosiones.php';

$parametro = isset($_POST['buscar']) ? $_POST['buscar'] : '';


$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->buscarMascotaPerdidaNombre($parametro);
echo $respuestajson;

?>