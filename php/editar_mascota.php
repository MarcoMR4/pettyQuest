<?php
require 'conexion_VeteAsosiones.php';

$idMascota = isset($_POST['idMascota']) ? $_POST['idMascota'] : '';
$nombre = isset($_POST['idNombre']) ? $_POST['idNombre'] : '';
$raza = isset($_POST['idRaza']) ? $_POST['idRaza'] : '';
$edad = isset($_POST['idEdad']) ? $_POST['idEdad'] : '';
$genero = isset($_POST['idGenero']) ? $_POST['idGenero'] : '';
$tamaño = isset($_POST['idTamaño']) ? $_POST['idTamaño'] : '';
$estatus = isset($_POST['idEstatus']) ? $_POST['idEstatus'] : '';
$tipo = isset($_POST['idTipo']) ? $_POST['idTipo'] : '';
$ubicacion = isset($_POST['idUbicacion']) ? $_POST['idUbicacion'] : '';
$informacion = isset($_POST['idInformacion']) ? $_POST['idInformacion'] : '';

if(isset($_FILES['photo'])){

  $tmpimg=$_FILES['photo']['tmp_name'];
  $type=$_FILES['photo']['type'];

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

  $nuevacon= new conexion_VeteAsosiones(); 
  $respuestajson=$nuevacon->editar_mascota($idMascota,$nombre,$raza,$edad,$genero,$tamaño,$estatus,$ubicacion,$tmpimg,$type, $informacion);
  Header("location: http://localhost/pettyQuest/perfil_Mascota.html");
}
?>