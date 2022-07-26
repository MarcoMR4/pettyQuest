<?php    
        $claveMascota = $_POST["claveMascota"];
       
        session_start();
        $_SESSION['claveMascota'] = $claveMascota;
        
        Header("location: ../perfil_MascotaPerdida.html");

    ?>