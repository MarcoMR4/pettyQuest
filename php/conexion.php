<?php

session_start();

class conexion{
    private $server = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'pettyquest';
    private $link;
    private $conn;

    function conectar(){
        try {
            $conn = new PDO('mysql:host='.$this->server.';dbname='.$this->database.';', $this->username, $this->password);
            return $conn;
        } catch (PDOException $e) {
            die('Connected failed: ' . $e->getMessage());
        }
    }

    function login($email,$password){
        $link = $this->conectar();

        /* Query para obtener datos */
        $sql="SELECT * FROM USUARIO WHERE (email='".$email."') AND (password='".$password."')";
        $result = $link->query($sql) or die (print("Error"));

        /* Creacion del JSON */
        $data=[];
        while($item = $result->fetch(PDO::FETCH_OBJ)){
            $_SESSION['idUsuario']=$item->idUsuario;
            $data[]=[
                'idUsuario' => $item->idUsuario,
                'nombre' => $item->nombre,
                'apellidoPaterno' => $item->apellidoPaterno,
                'apellidoMaterno' => $item->apellidoMaterno,
                'ciudad' => $item->ciudad,
                'calle' => $item->calle,
                'numeroCasa' => $item->numeroCasa,
                'email' => $item->email,
                'edad' => $item->edad,
                'telefono' => $item->telefono,
                'password' => $item->password
            ];
        }
        $datajson=json_encode($data);
        return $datajson; 
    }

    function registroUsuarios($nombre,$ap,$am,$ciudad,$calle,$numero,$email,$password,$telefono,$edad){
        $link = $this->conectar();
        $result = $link->query("INSERT INTO usuario (nombre,apellidoPaterno,apellidoMaterno,ciudad,calle,numeroCasa,email,edad,telefono,password) VALUES ('$nombre','$ap','$am','$ciudad','$calle','$numero','$email','$edad','$telefono','$password')") or die (print("Error")); 

        /* Si regresa datos :v */
        $salida=array("Hola","Adios");
        $mijson = json_encode($salida);
        return $mijson;
    }

    function pruebaSesion(){
        $link = $this->conectar();
        $id=$_SESSION['idUsuario'];
        $sql="SELECT * FROM USUARIO WHERE (idUsuario='".$id."')";
        $result = $link->query($sql) or die (print("Error")) or die (print("Error")); 

        $data=[];
        while($item = $result->fetch(PDO::FETCH_OBJ)){
            $data[]=[
                'idUsuario' => $item->idUsuario,
                'nombre' => $item->nombre,
                'apellidoPaterno' => $item->apellidoPaterno,
                'apellidoMaterno' => $item->apellidoMaterno,
                'ciudad' => $item->ciudad,
                'calle' => $item->calle,
                'numeroCasa' => $item->numeroCasa,
                'email' => $item->email,
                'edad' => $item->edad,
                'telefono' => $item->telefono,
                'password' => $item->password
            ];
        }

        $datajson=json_encode($data);
        return $datajson;
    }
}
?>