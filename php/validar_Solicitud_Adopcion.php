<?php
    require 'conexion.php';

    $mascota = isset($_POST['mascota']) ? $_POST['mascota'] : '';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->validarSolicitudAdopcion($mascota);
    echo($respuestajson);
?>