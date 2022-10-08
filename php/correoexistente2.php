<?php
require 'conexion_VeteAsosiones.php';

$email = isset($_POST['email']) ? $_POST['email'] : '';;

$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->validarcorreo($email);

echo($respuestajson);

?>