<?php
require 'conexion_VeteAsosiones.php';

$idMascota = isset($_POST['idMascota']) ? $_POST['idMascota'] : '';
$nombre = isset($_POST['idNombre']) ? $_POST['idNombre'] : '';
$raza = isset($_POST['idRaza']) ? $_POST['idRaza'] : '';
$foto = isset($_POST['']) ? $_POST[''] : '';                      //obtener foto
$edad = isset($_POST['idEdad']) ? $_POST['idEdad'] : '';
$genero = isset($_POST['idGenero']) ? $_POST['idGenero'] : '';
$tamaño = isset($_POST['idTamaño']) ? $_POST['idTamaño'] : '';
$estatus = isset($_POST['idEstatus']) ? $_POST['idEstatus'] : '';
$tipo = isset($_POST['idTipo']) ? $_POST['idTipo'] : '';

/*echo "Id de la mascota: ".$idMascota; 
echo "<br>Nombre de la mascota: ".$nombre;        //mostrar estos datos 
echo "<br>Raza de la mascota: ".$raza;
echo "<br>Edad: ".$edad;
echo "<br>Genero: ".$genero;
echo "<br>Tamaño: ".$tamaño;
echo "<br>Estatus: ".$estatus;
echo "<br>tipo: ".$tipo;*/

//mandar id de mascota 
$nuevacon= new conexion_VeteAsosiones();
$respuestajson=$nuevacon->editar_mascota($idMascota,$nombre,$raza,$foto,$edad,$genero,$tamaño,$estatus);

//Header("location: http://localhost/pettyQuest/perfil_Mascota.html");




?>