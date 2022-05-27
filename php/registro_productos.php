<?php
require 'conexion_VeteAsosiones.php';

$nombreP = isset($_POST['nombreP']) ? $_POST['nombreP'] : '';
$TipoP = isset($_POST['TipoP']) ? $_POST['TipoP'] : '';
$Precio = isset($_POST['Precio']) ? $_POST['Precio'] : '';

$tmpimg=$_FILES['foto']['tmp_name'];
$type=$_FILES['foto']['type'];

if(isset($_FILES['foto'])){

  $tmpimg=$_FILES['foto']['tmp_name'];
  $type=$_FILES['foto']['type'];

  if($type=='image/png'){
    $type='.png';
  }
  else if($type=='image/jpg'){
    $type='.jpg';   
  }
  else if($type=='image/jpeg'){
    $type='.jpeg';
  }
  else{
    $type='png';
  }
}

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->registroProductos($nombreP,$TipoP,$Precio,$type,$tmpimg);
echo($respuestajson);
?>