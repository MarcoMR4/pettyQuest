<?php
require 'conexion_VeteAsosiones.php';

$idProducto  = isset($_POST['idProducto']) ? $_POST['idProducto'] : '';
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : '';
$precio = isset($_POST['precio']) ? $_POST['precio'] : '';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->editar_producto($idProducto ,$descripcion,$nombre,$precio);

Header("location: ../catalogo_Productos.html");
?>