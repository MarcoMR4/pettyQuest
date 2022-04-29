<?php
require 'conexion.php';

$email = $_POST['email'];
$password = $_POST['password'];

$nuevacon= new conexion();
$nuevacon->login();


/*$sql = "SELECT * FROM USUARIO";
$stmt = $conn->prepare($sql);
if ($stmt->execute()) {
    echo ("Hola");
    //header("Location: index.php");
} else {
    echo ("Adios");
}*/

?>