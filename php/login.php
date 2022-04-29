<?php
require 'conexion.php';

echo("Hola entre");

$email = $_POST['email'];
$password = $_POST['password'];

/*$sql = "INSERT INTO usuario (usuario,nombre,apaterno,amaterno,correo,edad,contraseña) VALUES ('$usuario','$nombre','$apa','$ama','$email','$edad','$password')";
$stmt = $conn->prepare($sql);
if ($stmt->execute()) {
    echo ("Hola");
    //header("Location: index.php");
} else {
    echo ("Adios");
}
?>*/