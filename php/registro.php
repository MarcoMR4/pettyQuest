<?php
require 'conexion.php';

$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$ap = isset($_POST['ap']) ? $_POST['ap'] : '';
$am = isset($_POST['am']) ? $_POST['am'] : '';
$ciudad = isset($_POST['ciudad']) ? $_POST['ciudad'] : '';
$calle = isset($_POST['calle']) ? $_POST['calle'] : '';
$numero = isset($_POST['numero']) ? $_POST['numero'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password2']) ? $_POST['password2'] : '';
$telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';
$edad = isset($_POST['edad']) ? $_POST['edad'] : '';

$nuevacon= new conexion();
$respuestajson=$nuevacon->registroUsuarios($nombre,$ap,$am,$ciudad,$calle,$numero,$email,$password,$telefono,$edad);
echo($respuestajson);
?>