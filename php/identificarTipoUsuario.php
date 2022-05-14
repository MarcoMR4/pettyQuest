<?php
    require 'conexion.php';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->tipoUsuario();
    echo($respuestajson);
?>