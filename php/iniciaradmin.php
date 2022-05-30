<?php
require 'conexionadmin.php';

$email = isset($_POST['correo']) ? $_POST['correo'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$nuevacon= new conexionadmin();
$respuestajson=$nuevacon->login($email,$password);
echo($respuestajson);

?>