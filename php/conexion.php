<?php


class conexion{
    private $server = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'bd-fp';
    private $link;

    function conectar(){
        try {
            $conn = new PDO('mysql:host='.$this->server.';dbname='.$this->database.';', $this->username, $this->password);
            echo("conexion realizada");
            return $conn;
        } catch (PDOException $e) {
            die('Connected failed: ' . $e->getMessage());
        }
    }

    function login(){
        $link = $this->conectar();
        $sql = "SELECT * FROM USUARIO";
        $stmt = $link->prepare($sql);
        if ($stmt->execute()) {
            echo ("Hola");
            /*header("Location: index.html");*/
        } else {
            echo ("Adios");
        }
    }
}
?>