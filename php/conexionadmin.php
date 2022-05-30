<?php

session_start();

class conexionadmin{
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
        $sql="SELECT * FROM superusuario WHERE (email='".$email."') AND (password='".$password."')";
        $result = $link->query($sql) or die (print("Error"));

        /* Creacion del JSON */
        $data=[];
        while($item = $result->fetch(PDO::FETCH_OBJ)){
            $_SESSION['idAdmin']=$item->claveSuperusuario;
            $data[]=[
                'nombre' => $item->nombre,
                'apellidoPaterno' => $item->apellidoPaterno,
                'apellidoMaterno' => $item->apellidoMaterno,
                'email' => $item->email,
                'telefono' => $item->telefono,
                'password' => $item->password
            ];
        }
        $datajson=json_encode($data);
        return $datajson; 
    }

    function pruebaSesion(){
        $link = $this->conectar();

        if(!isset($_SESSION['idAdmin'])){
            $data[]=[
                "estatus" => "NoAdmin"
            ];
        }
        else{
            $id=$_SESSION['idAdmin'];
            $sql="SELECT * FROM superusuario WHERE (claveSuperusuario='".$id."')";
            $result = $link->query($sql) or die (print("Error")) or die (print("Error"));
            $data=[];
            while($item = $result->fetch(PDO::FETCH_OBJ)){
                $data[]=[
                    'nombre' => $item->nombre,
                    'apellidoPaterno' => $item->apellidoPaterno,
                    'apellidoMaterno' => $item->apellidoMaterno,
                    "estatus" => "SiAdmin"
                ];
            }
        }

        $datajson=json_encode($data);
        return $datajson;
    }
}
?>