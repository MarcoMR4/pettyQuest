<?php
    require 'conexion.php';

    $nuevacon= new conexion();
    $respuestajson=$nuevacon->buscarAdopciones();
    echo($respuestajson);
?>