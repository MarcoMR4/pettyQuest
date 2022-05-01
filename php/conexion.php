<?php


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
        $result = $link->query("SELECT * FROM USUARIO WHERE (email='".$email."') AND (password='".$password."')") or die (print("Error"));
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

    function registroUsuarios($nombre,$ap,$am,$ciudad,$calle,$numero,$email,$password,$telefono,$edad){
        $link = $this->conectar();
        $result = $link->query("INSERT INTO usuario (nombre,apellidoPaterno,apellidoMaterno,ciudad,calle,numeroCasa,email,edad,telefono,password) VALUES ('$nombre','$ap','$am','$ciudad','$calle','$numero','$email','$edad','$telefono','$password')") or die (print("Error")); 
    }
}
?>