<?php
require 'conexion_VeteAsosiones.php';

$fecha = isset($_POST['fecha']) ? $_POST['fecha'] : '';
$comentarios = isset($_POST['comentarios']) ? $_POST['comentarios'] : '';
$fotoCartilla = isset($_POST['fotoCartilla']) ? $_POST['fotoCartilla'] : '';
$foto = isset($_POST['foto']) ? $_POST['foto'] : '';

$nuevoSeg= new conexion_VeteAsosiones();
$respuestajson=$nuevoSeg->nuevoSeguimiento($fecha,$foto,$comentarios,$fotoCartilla);
echo($respuestajson);
?>