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

        /* Si regresa datos :v*/
        $datos[]=[
            "estatus" => "hola",
            "numero" => "123"
        ];
        $mijson = json_encode($datos);
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

    function enviarMensaje($mensaje, $destinatario)
    {
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $link->query("INSERT INTO mensajes (mensaje, claveRemitente, claveDestinatario) VALUES ('$mensaje', '$id', '$destinatario')") or die(print("Error"));
        $datos[]=[
            "remitente" => $id,
            "destinatario" => $destinatario
        ];
        $mijson = json_encode($datos);
        return $mijson;
    }

    function cargarMensajes($destinatario)
    {
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $sql = "SELECT * FROM `mensajes` WHERE (`claveRemitente` = " . $id . " AND `claveDestinatario` = " . $destinatario . ") UNION SELECT * FROM `mensajes` WHERE (`claveRemitente` = " . $destinatario . " AND `claveDestinatario` = " . $id . ")";
        $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
        $data = [];
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {
            $_SESSION['idUsuario'] = $item->idUsuario;
            $data[] = [
                'claveMensaje' => $item->claveMensaje,
                'mensaje' => $item->mensaje,
                'claveRemitente' => $item->claveRemitente,
                'claveDestinatario' => $item->claveDestinatario                
            ];
        }
        $datajson = json_encode($data);
        return $datajson;
    }

    function cargarContactos()
    {
        $link = $this->conectar();
        //$id = $_SESSION['idUsuario'];
        $sql = "SELECT * FROM `asociacion/veterinaria`";
        $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
        $data = [];
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {
            //$_SESSION['idUsuario'] = $item->idUsuario;
            $data[] = [
                'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
                'nombre' => $item->nombre             
            ];
        }
        $datajson = json_encode($data);
        return $datajson;
    }

    function buscarAsociacionClave($claveAsociacion)
    {
        $link = $this->conectar();     
        $sql = "SELECT * FROM asociacion/veterinaria WHERE claveAsociacionVeterinaria = ".$claveAsociacion."";   
        $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
        $data = [];
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {
            $_SESSION['idUsuario'] = $item->idUsuario;
            $data[] = [
                'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
                'nombre' => $item->nombre             
            ];
        }
        $datajson = json_encode($data);
        return $datajson;
    }
}
?>