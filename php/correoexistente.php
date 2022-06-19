<?php
require 'conexion.php';

$email = isset($_POST['email']) ? $_POST['email'] : '';;

$nuevacon= new conexion();
$respuestajson=$nuevacon->validarcorreo($email);

echo($respuestajson);

?>