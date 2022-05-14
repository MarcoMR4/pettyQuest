<?php
require 'conexion_VeteAsosiones.php';

$comprobanteDomicilio = isset($_POST['comprobanteDomicilio']) ? $_POST['comprobanteDomicilio'] : '';
$fecha = isset($_POST['fecha']) ? $_POST['fecha'] : '';
$ine = isset($_POST['ine']) ? $_POST['ine'] : '';
$Razon1 = isset($_POST['Razon']) ? $_POST['Razon'] : '';
$Razon2 = isset($_POST['Personas']) ? $_POST['Personas'] : '';
$Razon3 = isset($_POST['Necesario']) ? $_POST['Necesario'] : '';
$razones = ' se quiere adoptar por: ' .$Razon1 . ' viven en la casa: ' . $Razon2. ' se tiene: ' . $Razon3;

$nuevaSol= new conexion_VeteAsosiones();
$respuestajson=$nuevaSol->nuevaSolicitud($comprobanteDomicilio,$fecha,$ine,$razones);
echo($respuestajson);
?>