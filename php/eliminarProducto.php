<?php
require 'conexion_VeteAsosiones.php';

$idProducto  = isset($_POST['idProducto']) ? $_POST['idProducto'] : '';
//echo $idProducto;
$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->eliminar_producto($idProducto);
echo $respuestajson;
?>