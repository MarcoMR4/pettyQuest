<?php    

        session_start();
        $mascotas = $_SESSION['mascotasBuscadas'];
        echo $mascotas;
        
    ?>