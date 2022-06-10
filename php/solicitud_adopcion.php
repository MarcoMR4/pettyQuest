<?php
require 'conexion.php';

$fecha = isset($_POST['fecha']) ? $_POST['fecha'] : '';
$claveMascota = isset($_POST['claveMascota']) ? $_POST['claveMascota'] : '';
$Razon1 = isset($_POST['Razon']) ? $_POST['Razon'] : '';
$Razon2 = isset($_POST['Personas']) ? $_POST['Personas'] : '';
$Razon3 = isset($_POST['Necesario']) ? $_POST['Necesario'] : '';
$razones = 'Razones para adoptar: ' .$Razon1 . '<br>No. de personas que viven en la casa: ' . $Razon2. '<br>Cuenta con: ' . $Razon3;

$tmpimg=$_FILES['comprobanteDomicilio']['tmp_name'];
$type=$_FILES['comprobanteDomicilio']['type'];
$tmpimg2=$_FILES['ine']['tmp_name'];
$type2=$_FILES['ine']['type'];

if(isset($_FILES['comprobanteDomicilio'])){

  $tmpimg=$_FILES['comprobanteDomicilio']['tmp_name'];
  $type=$_FILES['comprobanteDomicilio']['type'];

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

  if(isset($_FILES['ine'])){

        $tmpimg2=$_FILES['ine']['tmp_name'];
        $type2=$_FILES['ine']['type'];
    
        if($type2=='image/png'){
        $type2='2.png';
        }
        else if($type2=='image/jpg'){
        $type2='2.jpg';   
        }
        else if($type2=='image/jpeg'){
        $type2='2.jpeg';
        }
        else{
        $type2='2.png';
        }
    
        $nuevacon= new conexion();
        $respuestajson=$nuevacon->nuevaSolicitud($fecha,$razones, $claveMascota,$tmpimg,$type,$tmpimg2,$type2);
        echo($respuestajson);
    }
    }
?>