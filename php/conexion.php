<?php

session_start();

class conexion{
    private $server = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'id19026854_pettyquest';
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
        $sql="SELECT * FROM usuario WHERE (email='".$email."') AND (password='".$password."')";
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

        if(!isset($_SESSION['idUsuario'])){
            $data[]=[
                "estatus" => "NoUsuario"
            ];
        }
        else{
            $id=$_SESSION['idUsuario'];
            $sql="SELECT * FROM usuario WHERE idUsuario='".$id."'";
            $result = $link->query($sql) or die (print("Error"));
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
        $sql = "SELECT * FROM mensajes WHERE (claveRemitente = " . $id . " AND claveDestinatario = " . $destinatario . ") UNION SELECT * FROM mensajes WHERE (claveRemitente = " . $destinatario . " AND claveDestinatario = " . $id . ") ORDER BY claveMensaje ASC";
        $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
        $data = [];
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {            
            $data[] = [
                'claveMensaje' => $item->claveMensaje,
                'mensaje' => $item->mensaje,
                'claveRemitente' => $item->claveRemitente,
                'claveDestinatario' => $item->claveDestinatario,
                'usuario' => $item->usuario,
                'cartilla' => $item->cartilla,                
                'mascota' => $item->mascota                 
            ];
        }
        $datajson = json_encode($data);
        return $datajson;
    }

    function cargarContactos($tipo)
    {
        $link = $this->conectar();
        if($tipo == "0"){
            $sql = "SELECT * FROM asociacionveterinaria ORDER BY claveAsociacionVeterinaria ASC";
            $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
            $data = [];
            while ($item = $result->fetch(PDO::FETCH_OBJ)) {
                $data[] = [
                    'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
                    'nombre' => $item->nombre                   
                ];
            }
            $datajson = json_encode($data);
            return $datajson;
        }
        else{
            $sql = "SELECT * FROM usuario ORDER BY idUsuario ASC";                        
            $result = $link->query($sql) or die(print("Error")) or die(print("Error"));
            $data = [];
            while ($item = $result->fetch(PDO::FETCH_OBJ)) {
                $data[] = [
                    'idUsuario' => $item->idUsuario,
                    'nombre' => $item->nombre                   
                ];
            }
            $datajson = json_encode($data);
            return $datajson;
        }
    }

    function nuevoSeguimiento($claveMascota,$comentarios,$tmpimg,$type,$tmpimg2,$type2){
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $sql="SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'id19026854_pettyquest' AND   TABLE_NAME = 'mensajes'";
        $autoincrement = $link->query($sql) or die (print("Error0"));
        $idMensaje = "";
        while($item = $autoincrement->fetch(PDO::FETCH_OBJ)){
            $idMensaje=$item->AUTO_INCREMENT;
        }
        $name="cartilla".$idMensaje.$claveMascota.$type;
        $rutarelativa="img/uploaded/seguimientos/".$name;
        $rutaguardarphp="../".$rutarelativa;
        if(move_uploaded_file($tmpimg, $rutaguardarphp)){
            $name="mascota".$idMensaje.$claveMascota.$type2;
            $rutarelativa2="img/uploaded/seguimientos/".$name;
            $rutaguardarphp="../".$rutarelativa2;
            if(move_uploaded_file($tmpimg2, $rutaguardarphp)){
                $result = $link->query("SELECT claveAsociacionVeterinaria FROM fk_mascota_asociacionveterinaria WHERE claveMascota ='$claveMascota'") or die (print("Error1"));
                $data = [];
                while ($item = $result->fetch(PDO::FETCH_OBJ)) {
                    $data[] = [
                        'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria                  
                    ];
                }
                $claveAsociacion = $data[0]['claveAsociacionVeterinaria'];
                $result = $link->query("SELECT nombre FROM mascota WHERE claveMascota ='$claveMascota'") or die (print("Error2"));
                $data = [];
                while ($item = $result->fetch(PDO::FETCH_OBJ)) {
                    $data[] = [
                        'nombre' => $item->nombre                  
                    ];
                }
                $nombreMascota = $data[0]['nombre'];
                $comentarios = "Seguimiento mensual para ".$nombreMascota.": ".$comentarios;
                $link->query("INSERT INTO mensajes (mensaje, claveRemitente, claveDestinatario, usuario) VALUES ('$comentarios<br>Evidencia:','$id','$claveAsociacion',0)") or die (print("Error3"));                                
                $link->query("INSERT INTO mensajes (mensaje, claveRemitente, claveDestinatario, usuario, cartilla, mascota) VALUES ('','$id','$claveAsociacion',0,'$rutarelativa','$rutarelativa2')") or die (print("Error3"));                                
            }
        }    
        $data[]=[
            "estatus" => "nueva Solicitud",                  
          ];
        /* Si regresa algo*/
        $datajson=json_encode($data);
        return $datajson; 
    }

    function nuevaSolicitud($razones, $claveMascota,$tmpimg,$type,$tmpimg2,$type2){
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $sql="SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'id19026854_pettyquest' AND   TABLE_NAME   = 'contratoadopcion'";
        $autoincrement = $link->query($sql) or die (print("Error10"));
        $idSolicitud = "";
        while($item = $autoincrement->fetch(PDO::FETCH_OBJ)){
            $idSolicitud=$item->AUTO_INCREMENT;
        }
        $name=$idSolicitud.$claveMascota.$type;
        $rutarelativa="img/uploaded/Solicitudes/".$name;
        $rutaguardarphp="../".$rutarelativa;
        if(move_uploaded_file($tmpimg, $rutaguardarphp)){
            $name=$idSolicitud.$claveMascota.$type2;
            $rutarelativa2="img/uploaded/Solicitudes/".$name;
            $rutaguardarphp="../".$rutarelativa2;
            if(move_uploaded_file($tmpimg2, $rutaguardarphp)){
                
                $result = $link->query("SELECT claveAsociacionVeterinaria FROM fk_mascota_asociacionveterinaria WHERE claveMascota =$claveMascota") or die (print("Error0"));
                $data = [];
                while ($item = $result->fetch(PDO::FETCH_OBJ)) {
                    $data[] = [
                        'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria                  
                    ];
                }
                $claveAsociacion = $data[0]['claveAsociacionVeterinaria'];
                // echo("Fecha:".$fecha
                //   ." Razones:".$razones
                //   ." ClaveMascota:".$claveMascota
                //   ." ClaveUsuario".$id
                //   ." ruta1:".$rutarelativa
                //   ." ruta2:".$rutarelativa2
                //   ." Asociacion:".$data[0]['claveAsociacionVeterinaria']
                //   );
                
                // echo("ClaveAsociacion = ".$claveAsociacion);
                $link->query("INSERT INTO contratoadopcion (comprobanteDomicilio, fecha, idUsuario, idMascota, idAsociacion, ine, razones, estado) VALUES ('$rutarelativa',CURDATE(),'$id','$claveMascota','$claveAsociacion','$rutarelativa2','$razones', 0)") or die (print("Error1"));
                $link->query("INSERT INTO fk_contrato_asociacionveterinaria (claveContrato,claveAsociacionVeterinaria) VALUES ('$idSolicitud', '$claveAsociacion')") or die (print("Error2"));                                
                $link->query("INSERT INTO fk_contrato_mascota (claveContrato,claveMascota) VALUES ('$idSolicitud', '$claveMascota')") or die (print("Error3"));                                
            }
        }
        
        $data[]=[
          "estatus" => "registrado",                  
        ];
      /* Si regresa algo*/
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

    function buscarAdopciones()
    {
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $result = $link->query("SELECT idMascota, idAsociacion, nombre FROM contratoadopcion NATURAL JOIN mascota WHERE idUsuario = '$id' AND estado = 1 AND contratoadopcion.idMascota = mascota.claveMascota") or die (print("Error")); 
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {            
            $data[] = [
                'idMascota' => $item->idMascota,
                'idAsociacion' => $item->idAsociacion,
                'nombre' => $item->nombre
            ];
        }
        /* Si regresa algo*/
        $datajson=json_encode($data);
        return $datajson; 
    }

    function notificarMensajes(){
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $result = $link->query("SELECT COUNT(claveMensaje) AS sinLeer FROM mensajes WHERE claveDestinatario = '$id' AND visto = 0 AND usuario = 1") or die (print("Error")); 
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {            
            $data[] = [
                'sinLeer' => $item->sinLeer
            ];
        }
        /* Si regresa algo*/
        $datajson=json_encode($data);
        return $datajson; 
    }

    function totalMensajesContacto($contacto){
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $result = $link->query("SELECT COUNT(claveDestinatario) AS totalMensajes FROM usuario NATURAL JOIN mensajes WHERE (idUsuario = '$id' AND claveDestinatario = '$id' AND claveRemitente = '$contacto' AND usuario = 1 AND visto = 0);") or die (print("Error")); 
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {            
            $data[] = [
                'totalMensajes' => $item->totalMensajes
            ];
        }
        /* Si regresa algo*/
        $datajson=json_encode($data);
        return $datajson; 
    }

    function marcarMensajesVistos($contacto){
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $link->query("UPDATE mensajes SET visto = 1 WHERE (claveDestinatario = '$id' AND claveRemitente = '$contacto' AND usuario = 1 AND visto = 0)") or die (print("Error")); 
        $data[]=[
            "estatus" => "visto"                  
          ];
        /* Si regresa algo*/
        $datajson=json_encode($data);
        return $datajson; 
    }

    function validarSolicitudAdopcion($mascota){
        $link = $this->conectar();
        $id = $_SESSION['idUsuario'];
        $result = $link->query("SELECT COUNT(claveContrato) AS contrato FROM contratoadopcion WHERE idUsuario = '$id' AND idMascota = '$mascota'") or die (print("Error")); 
        while ($item = $result->fetch(PDO::FETCH_OBJ)) {            
            $data[] = [
                'totalContratos' => $item->contrato
            ];
        }
        /* Si regresa algo*/
        $datajson=json_encode($data);
        return $datajson; 
    }
}
?>