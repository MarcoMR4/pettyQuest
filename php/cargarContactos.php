<?php
    require 'conexion.php';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->cargarContactos();
    echo($respuestajson);
?>