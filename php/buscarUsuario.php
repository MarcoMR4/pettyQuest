<?php
require 'conexion_VeteAsosiones.php';

$idUsuario = isset($_POST['idUsuario']) ? $_POST['idUsuario'] : '';


$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->buscar_usuario_por_id($idUsuario);
echo $respuestajson;

?>