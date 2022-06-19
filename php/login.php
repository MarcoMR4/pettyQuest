<?php
require 'conexion.php';

$email = isset($_POST['email']) ? $_POST['email'] : '';
$passwordd = isset($_POST['password']) ? $_POST['password'] : '';

$password = sha1($passwordd);

$nuevacon= new conexion();
$respuestajson=$nuevacon->login($email,$password);

echo($respuestajson);

?>