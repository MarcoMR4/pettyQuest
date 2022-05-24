<?php
require 'conexion_VeteAsosiones.php';

$idMascota = isset($_POST['idMascota']) ? $_POST['idMascota'] : '';
$nuevoEstatus = isset($_POST['nuevoEstatus']) ? $_POST['nuevoEstatus'] : '';

$nuevacon= new conexion_VeteAsosiones(); 
$respuestajson=$nuevacon->editar_mascota_adoptada($idMascota,$nuevoEstatus);
Header("location: http://localhost/pettyQuest/perfil_Mascota.html");

?>