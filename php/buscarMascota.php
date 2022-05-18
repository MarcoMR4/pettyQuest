<?php
require 'conexion_VeteAsosiones.php';

$parametro = isset($_POST['buscar']) ? $_POST['buscar'] : '';


$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->buscar_perros_por_nombre($parametro);
echo $respuestajson;

// Header("location: http://localhost/pettyQuest/catalogo_Mascotas.html");
?>