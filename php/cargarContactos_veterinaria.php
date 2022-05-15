<?php
    require 'conexion_VeteAsosiones.php';
    
    $destinatario = isset($_POST['destinatario']) ? $_POST['destinatario'] : '';
    
    $nuevacon= new conexion_VeteAsosiones();
    $respuestajson=$nuevacon->cargarMensajes($destinatario);
    echo($respuestajson);
?>