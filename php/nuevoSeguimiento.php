<?php
require 'conexion.php';

$comentarios = isset($_POST['comentarios']) ? $_POST['comentarios'] : '';
$claveMascota = isset($_POST['claveMascota']) ? $_POST['claveMascota'] : '';

$tmpimg=$_FILES['fotoCartilla']['tmp_name'];
$type=$_FILES['fotoCartilla']['type'];
$tmpimg2=$_FILES['foto']['tmp_name'];
$type2=$_FILES['foto']['type'];

if(isset($_FILES['fotoCartilla'])){

  $tmpimg=$_FILES['fotoCartilla']['tmp_name'];
  $type=$_FILES['fotoCartilla']['type'];

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

  if(isset($_FILES['foto'])){

        $tmpimg2=$_FILES['foto']['tmp_name'];
        $type2=$_FILES['foto']['type'];
    
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
        $respuestajson=$nuevacon->nuevoSeguimiento($claveMascota,$comentarios,$tmpimg,$type,$tmpimg2,$type2);
        echo($respuestajson);
        // Hola
    }
    }
?>