<?php
    require 'conexion.php';

    $mensaje = isset($_POST['mensaje']) ? $_POST['mensaje'] : '';
    $destinatario = isset($_POST['destinatario']) ? $_POST['destinatario'] : '';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->enviarMensaje($mensaje,$destinatario);
    echo($respuestajson);
?>