<?php
require 'conexion_VeteAsosiones.php';

$idAsociacion = isset($_POST['idAsociacion']) ? $_POST['idAsociacion'] : '';
$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->buscar_asociacion_por_id($idAsociacion);
echo $respuestajson;

?>