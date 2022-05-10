<?php
require 'conexion_VeteAsosiones.php';

$nombreP = isset($_POST['nombreP']) ? $_POST['nombreP'] : '';
$TipoP = isset($_POST['TipoP']) ? $_POST['TipoP'] : '';
$Cantidad = isset($_POST['Cantidad']) ? $_POST['Cantidad'] : '';
$Precio = isset($_POST['Precio']) ? $_POST['Precio'] : '';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->registroProductos($nombreP,$TipoP,$Cantidad,$Precio);
echo($respuestajson);
?>