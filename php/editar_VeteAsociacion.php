<?php
require 'conexion_VeteAsosiones.php';

$idClave = isset($_POST['idClave']) ? $_POST['idClave'] : '';
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$ciudad = isset($_POST['ciudad']) ? $_POST['ciudad'] : '';
$calle = isset($_POST['calle']) ? $_POST['calle'] : '';
$numero = isset($_POST['numero']) ? $_POST['numero'] : '';
$nombreEncargado = isset($_POST['nombreEncargado']) ? $_POST['nombreEncargado'] : '';
$apellidoPEncargado = isset($_POST['ap']) ? $_POST['ap'] : '';
$apellidoMEncargado = isset($_POST['am']) ? $_POST['am'] : ''; 
$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->editar_asociacionveterinaria($idClave,$nombre,$ciudad,$calle,$numero,$nombreEncargado,$apellidoPEncargado,$apellidoMEncargado,$email,$telefono,$password);

Header("location: http://localhost/pettyQuest/perfil_asociacionveterinaria.html");
?>