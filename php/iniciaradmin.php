<?php
require 'conexionadmin.php';

$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$nuevacon= new conexionadmin();
$respuestajson=$nuevacon->login($email,$password);
echo($respuestajson);

?>