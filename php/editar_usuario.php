<?php
require 'conexion.php';

$idUsuario = isset($_POST['idUsuario']) ? $_POST['idUsuario'] : '';
echo $idUsuario ;
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$ap = isset($_POST['ap']) ? $_POST['ap'] : '';
$am = isset($_POST['am']) ? $_POST['am'] : ''; 
$edad = isset($_POST['edad']) ? $_POST['edad'] : '';
$ciudad = isset($_POST['ciudad']) ? $_POST['ciudad'] : '';
$calle = isset($_POST['calle']) ? $_POST['calle'] : '';
$numero = isset($_POST['numero']) ? $_POST['numero'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$passwordd = isset($_POST['password']) ? $_POST['password'] : '';
$telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';

$password = sha1($passwordd);

$nuevacon= new conexion();
$respuestajson=$nuevacon->editar_usuario($idUsuario,$nombre,$ap,$am,$edad,$ciudad,$calle,$numero,$email,$password,$telefono);

Header("location: http://localhost/pettyQuest/perfil_usuario.html");
?>