<?php
    require 'conexion.php';
    
    $destinatario = isset($_POST['destinatario']) ? $_POST['destinatario'] : '';
    
    $nuevacon= new conexion();
    $respuestajson=$nuevacon->cargarMensajes($destinatario);
    echo($respuestajson);
?>