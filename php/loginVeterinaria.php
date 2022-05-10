<?php
require 'conexion_VeteAsosiones.php';

$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->loginVete($email,$password);
echo($respuestajson);

?>