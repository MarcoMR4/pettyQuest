<?php
    require 'conexion.php';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->notificarMensajes();
    echo($respuestajson);
?>