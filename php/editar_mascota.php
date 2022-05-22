<?php
require 'conexion_VeteAsosiones.php';

$idMascota = isset($_POST['idMascota']) ? $_POST['idMascota'] : '';
$nombre = isset($_POST['idNombre']) ? $_POST['idNombre'] : '';
$raza = isset($_POST['idRaza']) ? $_POST['idRaza'] : '';
//$foto = isset($_FILES['fotoN']) ? $_FILES['fotoN'] : '';                 //obtener direccion de la foto 
//$foto = $_FILES['photo'];
$edad = isset($_POST['idEdad']) ? $_POST['idEdad'] : '';
$genero = isset($_POST['idGenero']) ? $_POST['idGenero'] : '';
$tamaño = isset($_POST['idTamaño']) ? $_POST['idTamaño'] : '';
$estatus = isset($_POST['idEstatus']) ? $_POST['idEstatus'] : '';
$tipo = isset($_POST['idTipo']) ? $_POST['idTipo'] : '';
$ubicacion = isset($_POST['idUbicacion']) ? $_POST['idUbicacion'] : '';


$nuevacon= new conexion_VeteAsosiones(); 
$respuestajson=$nuevacon->editar_mascota($idMascota,$nombre,$raza,$edad,$genero,$tamaño,$estatus,$ubicacion);
Header("location: http://localhost/pettyQuest/perfil_Mascota.html");

/*var_dump($_FILES["photo"]);

echo "funciona aqui <br><br>";
$hola = isset($_FILES['fotoNueva']['name']);
echo $hola;

$tmp_name = $foto['tmp_name'];
$directorio_destino = "img/Mascotas";

      $img_file = $foto['name'];
      $img_type = $foto['type'];
      echo 1;
      echo "<br><br>Temporal: ".$tmp_name;
      echo "<br><br>NUevo: ".$directorio_destino;

//Si es una imagen 
if((strpos($img_type, "jpg")) || (strpos($img_type, "jpeg")) || (strpos($img_type, "gif")) || (strpos($img_type, "png")) 
 || (strpos($img_type, "webp"))){
   echo "<br><br> Entro a formato"; 
   $destino = $directorio_destino . '/' . $img_file;
   echo "<br><br> DEstino: ".$destino; 
   echo"<br><br><br> ".$tmp_name.",".$destino;
   if($tmp_name!=""){
       if(move_uploaded_file($tmp_name,$destino)){          //Poder mover el fichero a la carpeta de pryecto
        //mandar id de mascota 
        $nuevacon= new conexion_VeteAsosiones(); 
        $respuestajson=$nuevacon->editar_mascota($idMascota,$nombre,$raza,$edad,$genero,$tamaño,$estatus);
        Header("location: http://localhost/pettyQuest/perfil_Mascota.html");
    }
   }else{
    echo "<br><br>No se movio el archivo";
   }
}*/




?>