<?php
    require 'conexion.php';

    $tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->cargarContactos($tipo);
    echo($respuestajson);
?>