<?php
require 'conexion.php';

$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$nuevacon= new conexion();
$respuestajson=$nuevacon->login($email,$password);

echo($respuestajson);

?>