<?php
    require 'conexion.php';

    $claveAsociacion = isset($_POST['claveAsociacion']) ? $_POST['claveAsociacion'] : '';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->buscarAsociacionClave($claveAsociacion);
    echo($respuestajson);
?>