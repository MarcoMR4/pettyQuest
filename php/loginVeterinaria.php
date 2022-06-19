<?php
require 'conexion_VeteAsosiones.php';

$email = isset($_POST['email']) ? $_POST['email'] : '';
$passwordd = isset($_POST['password']) ? $_POST['password'] : '';

$password = sha1($passwordd);


$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->loginVete($email,$password);
echo($respuestajson);

?>