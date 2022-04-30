<?php
require 'conexion.php';

$email = $_POST['email'];
$password = $_POST['password'];

$nuevacon= new conexion();
$respuestajson=$nuevacon->login();
echo($respuestajson);

?>