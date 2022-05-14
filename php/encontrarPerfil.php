<?php    
        $claveMascota = $_POST["claveMascota"];
       
        session_start();
        $_SESSION['claveMascota'] = $claveMascota;
        
        Header("location: http://localhost/pettyQuest/perfil_Mascota.html");

    ?>