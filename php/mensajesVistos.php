<?php
    require 'conexion.php';

    $contacto = isset($_POST['contacto']) ? $_POST['contacto'] : '';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->marcarMensajesVistos($contacto);
    echo($respuestajson);
?>