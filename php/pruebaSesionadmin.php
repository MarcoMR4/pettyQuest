<?php
require 'conexionadmin.php';

$nuevacon= new conexionadmin();
$respuestajson=$nuevacon->pruebaSesion();
echo($respuestajson);

?>