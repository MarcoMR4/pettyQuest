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
            $_SESSION['tipoUsuario']="0";
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
        /*$id=$_SESSION['idUsuario'];
        $sql="SELECT * FROM USUARIO WHERE (idUsuario='".$id."')";
        $result = $link->query($sql) or die (print("Error")) or die (print("Error"));*/

        if(!isset($_SESSION['idUsuario'])){
            $data[]=[
                "estatus" => "NoUsuario"
            ];
        }
        else{
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
                    'password' => $item->password,
                    "estatus" => "SiUsuario"
                ];
            }
        }

        $datajson=json_encode($data);
        return $datajson;
    }

    function enviarMensaje($mensaje, $destinatario)
    {
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $link->query("INSERT INTO mensajes (mensaje, claveRemitente, claveDestinatario, usuario) VALUES ('$mensaje', '$id', '$destinatario', 0)") or die(print("Error"));
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
        $sql = "SELECT * FROM `mensajes` WHERE (`claveRemitente` = " . $id . " AND `claveDestinatario` = " . $destinatario . ") UNION SELECT * FROM `mensajes` WHERE (`claveRemitente` = " . $destinatario . " AND `claveDestinatario` = " . $id . ") ORDER BY claveMensaje ASC";
        $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
        $data = [];
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {            
            $data[] = [
                'claveMensaje' => $item->claveMensaje,
                'mensaje' => $item->mensaje,
                'claveRemitente' => $item->claveRemitente,
                'claveDestinatario' => $item->claveDestinatario,
                'usuario' => $item->usuario                
            ];
        }
        $datajson = json_encode($data);
        return $datajson;
    }

    function cargarContactos($tipo)
    {
        $link = $this->conectar();
        if($tipo == "0"){
            $sql = "SELECT * FROM asociacionveterinaria";
            $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
            $data = [];
            while ($item = $result->fetch(PDO::FETCH_OBJ)) {
                $data[] = [
                    'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
                    'nombre' => $item->nombre,                   
                ];
            }
            $datajson = json_encode($data);
            return $datajson;
        }
        else{
            $sql = "SELECT * FROM usuario";                        
            $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
            $data = [];
            while ($item = $result->fetch(PDO::FETCH_OBJ)) {
                $data[] = [
                    'idUsuario' => $item->idUsuario,
                    'nombre' => $item->nombre,                   
                ];
            }
            $datajson = json_encode($data);
            return $datajson;
        }
    }

    function nuevoSeguimiento($fecha,$foto,$comentarios,$fotoCartilla){
        $link = $this->conectar();
        $result = $link->query("INSERT INTO seguimiento (fecha,foto,comentarios,fotoCartilla) VALUES ('$fecha','$foto','$comentarios','$fotoCartilla')") or die (print("Error")); 

      /* Si regresa algo*/
      $data[]=[
        "estatus" => "hecho",
        "numero" => "123"
      ];
      $datajson=json_encode($data);
      return $datajson; 
    }

    function nuevaSolicitud($comprobanteDomicilio,$fecha,$ine,$razones){
        $link = $this->conectar();
        $result = $link->query("INSERT INTO contratoadopcion (comprobanteDomicilio,fecha,ine,razones) VALUES ('$comprobanteDomicilio','$fecha','$ine','$razones')") or die (print("Error")); 

      /* Si regresa algo*/
      $data[]=[
        "estatus" => "hecho",
        "numero" => "123"
      ];
      $datajson=json_encode($data);
      return $datajson; 
    }

    function tipoUsuario(){         
        $tipo = $_SESSION['tipoUsuario'];  
        if($tipo == null)
            $tipo ="1";
        /* Si regresa algo*/
        $data[]=[
            "tipo" => $tipo        
        ];
        $datajson=json_encode($data);
        return $datajson; 
    }

    function editar_usuario($idUsuario,$nombre,$ap,$am,$edad,$ciudad,$calle,$numero,$email,$password,$telefono){
        $link = $this->conectar();
        $result = $link->query("UPDATE usuario SET nombre='$nombre', apellidoPaterno='$ap', apellidoMaterno='$am', edad='$edad', ciudad='$ciudad', calle='$calle', numeroCasa='$numero', email='$email', password='$password', telefono='$telefono' WHERE idUsuario='$idUsuario'") or die (print("Error")); 
        return $result; 
    }
}
?>