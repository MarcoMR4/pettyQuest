<?php
require 'conexion_VeteAsosiones.php';

$atributo = isset($_POST['atributo']) ? $_POST['atributo'] : '';
$atributoEspec = isset($_POST['atributoEspec']) ? $_POST['atributoEspec'] : '';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->buscar_MascotaPerdidaAtributo($atributo, $atributoEspec);
echo $respuestajson;

?>