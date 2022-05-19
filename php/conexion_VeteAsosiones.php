<?php

session_start();

class conexion_VeteAsosiones{
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

    function loginVete($email,$password){
        $link = $this->conectar();

        /* Query para obtener datos */
        $sql="SELECT * FROM `asociacionveterinaria` WHERE (email='".$email."') AND (password='".$password."')";
        $result = $link->query($sql) or die (print("Error"));

        /* Creacion del JSON */
        $data=[];
        while($item = $result->fetch(PDO::FETCH_OBJ)){
            $_SESSION['idUsuarioVeterinaria']=$item->claveAsociacionVeterinaria;
            $_SESSION['tipoUsuario']="1";
            $data[]=[
                'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
                'nombre' => $item->nombre,
                'ciudad' => $item->ciudad,
                'calle' => $item->calle,
                'numero' => $item->	numero,
                'email' => $item->email,
                'nombreEncargado' => $item->nombreEncargado,
                'apellidoPEncargado' => $item->apellidoPEncargado,
                'apellidoMEncargado' => $item->apellidoMEncargado,
                'telefono' => $item->telefono,
                'password' => $item->password
            ];
        }
        $datajson=json_encode($data);
        return $datajson; 
    }

    function registroMascotas($idNombre,$edad,$genero,$idRaza,$tamano,$idUbicacion,$idRazaAnimal,$tmpimg,$type){
      $link = $this->conectar();
      $sql="SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'pettyquest' AND   TABLE_NAME   = 'mascota'";
      $autoincrement = $link->query($sql) or die (print("Error"));

      $idmascota;
      while($item = $autoincrement->fetch(PDO::FETCH_OBJ)){
        $idmascota=$item->AUTO_INCREMENT;
      }
      
      $name=$idNombre.$idmascota.$type;
      $rutarelativa="img/uploaded/mascotas/".$name;
      $rutaguardarphp="../".$rutarelativa;
      if(move_uploaded_file($tmpimg, $rutaguardarphp)){
        $estatusmascota="En adopcion";
        $result = $link->query("INSERT INTO mascota (nombre,raza,foto,edad,genero,tamaño,ubicacion,estatus,tipoAnimal) VALUES ('$idNombre','$idRaza','$rutarelativa','$edad','$genero','$tamano','$idUbicacion','$estatusmascota','$idRazaAnimal')") or die (print("Error")); 
        $data[]=[
          'estatus' => 'registrado'
        ];
        $id=$_SESSION['idUsuarioVeterinaria'];
        $result3 = $link->query("INSERT INTO `fk_mascota_asociacionveterinaria` (claveAsociacionVeterinaria,claveMascota) VALUES ('$id','$idmascota')") or die (print("Error")); 
      }

      $datajson=json_encode($data);
      return $datajson;
    }

    function registroProductos($nombreP,$TipoP,$Cantidad,$Precio,$type,$tmpimg){
      $link = $this->conectar();
      $sql="SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'pettyquest' AND   TABLE_NAME   = 'producto'";
      $autoincrement = $link->query($sql) or die (print("Error"));

      $idproducto;
      while($item = $autoincrement->fetch(PDO::FETCH_OBJ)){
        $idproducto=$item->AUTO_INCREMENT;
      }

      $name=$nombreP.$idproducto.$type;
      $rutarelativa="img/uploaded/productos/".$name;
      $rutaguardarphp="../".$rutarelativa;
      if(move_uploaded_file($tmpimg, $rutaguardarphp)){
        $result = $link->query("INSERT INTO producto (nombre,descripcion,cantidad,precio,foto) VALUES ('$nombreP','$TipoP','$Cantidad','$Precio','$rutarelativa')") or die (print("Error")); 
        $data[]=[
          'estatus' => 'registrado'
        ];
        $id=$_SESSION['idUsuarioVeterinaria'];
        $result3 = $link->query("INSERT INTO `fk_producto_asociacionveterinaria` (claveAsociacionVeterinaria,idProducto) VALUES ('$id','$idproducto')") or die (print("Error")); 

      }
           
      $mijson = json_encode($data);
      return $mijson;
    }

    function pruebaSesion(){
        $link = $this->conectar();
        if(!isset($_SESSION['idUsuarioVeterinaria'])){
            $data[]=[
                "estatus" => "NoVeterinaria"
            ];
        }
        else{
            $id=$_SESSION['idUsuarioVeterinaria'];
            $sql="SELECT * FROM `asociacionveterinaria` WHERE (claveAsociacionVeterinaria='".$id."')";
            $result = $link->query($sql) or die (print("Error")) or die (print("Error"));
            $data=[];
            while($item = $result->fetch(PDO::FETCH_OBJ)){
                $data[]=[
                'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
                'nombre' => $item->nombre,
                'ciudad' => $item->ciudad,
                'calle' => $item->calle,
                'numero' => $item->	numero,
                'email' => $item->email,
                'nombreEncargado' => $item->nombreEncargado,
                'apellidoPEncargado' => $item->apellidoPEncargado,
                'apellidoMEncargado' => $item->apellidoMEncargado,
                'telefono' => $item->telefono,
                'password' => $item->password,
                "estatus" => "SiVeterinaria"
            ];
            }
        }

        $datajson=json_encode($data);
        return $datajson;
    }

    function cargarMensajes($destinatario){
        $link = $this->conectar();
        $id = $_SESSION['idUsuarioVeterinaria'];
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

    function enviarMensaje($mensaje, $destinatario){
        $link = $this->conectar();
        $id = $_SESSION['idUsuarioVeterinaria'];
        $link->query("INSERT INTO mensajes (mensaje, claveRemitente, claveDestinatario, usuario) VALUES ('$mensaje', '$id', '$destinatario', 1)") or die(print("Error"));
        $datos[]=[
            "remitente" => $id,
            "destinatario" => $destinatario
        ];
        $mijson = json_encode($datos);
        return $mijson;
    }

    function obtener(){
      $link = $this->conectar();

      /* Query para obtener datos */
      $sql="SELECT * FROM mascota";
      $result = $link->query($sql) or die (print("Error"));

      /* Creacion del JSON */
      $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
          $data[]=[
              'claveMascota' => $item->claveMascota,
              'nombre' => $item->nombre,
              'raza' => $item->raza,
              'foto' => $item->foto,
              'edad' => $item->edad,
              'genero' => $item->genero,
              'tamaño' => $item->tamaño,
              'estatus' => $item->estatus,
              'ubicacion' => $item->ubicacion,
              'tipo' => $item->tipoAnimal,
          ];
      }
      $datajson=json_encode($data);
      return $datajson; 
    }

    function obtenerproductos(){
      $link = $this->conectar();

      /* Query para obtener datos */
      $sql="SELECT * FROM producto";
      $result = $link->query($sql) or die (print("Error"));

      /* Creacion del JSON */
      $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
          $data[]=[
              'idProducto' => $item->idProducto,
              'nombre' => $item->nombre,
              'descripcion' => $item->descripcion,
              'cantidad' => $item->cantidad,
              'precio' => $item->precio,
              'foto' => $item->foto
          ];
      }
      $datajson=json_encode($data);
      return $datajson; 
    }

    function editar_mascota($nombre,$raza,$foto,$edad,$genero,$tamaño,$estatus){
      $link = $this->conectar();
      $result = $link->query("UPDATE mascota SET nombre='nombre', raza='raza', foto='foto', edad='edad', genero='genero', tamaño='tamaño', estatus='estatus' WHERE id='id'") or die (print("Error")); 

      /* Si regresa datos :v equis de*/
      $datos[]=[
          "estatus" => "hola",
          "numero" => "123"
      ];
      $mijson = json_encode($datos);
      return $mijson;
    }

    function editar_asociacionveterinaria($idClave,$nombre,$ciudad,$calle,$numero,$nombreEncargado,$apellidoPEncargado,$apellidoMEncargado,$email,$telefono,$password){
        $link = $this->conectar();
        $result = $link->query("UPDATE asociacionveterinaria SET nombre='$nombre', apellidoPEncargado='$apellidoPEncargado', apellidoMEncargado='$apellidoMEncargado', nombreEncargado='$nombreEncargado', ciudad='$ciudad', calle='$calle', numero='$numero', email='$email', password='$password', telefono='$telefono' WHERE claveAsociacionVeterinaria='$idClave'") or die (print("Error")); 
        return $result; 
    }

    function buscar_perros_por_nombre($nombre)
    {
      # code...
      $link = $this->conectar();
        $result = $link->query("SELECT * FROM mascota WHERE nombre LIKE '$nombre%'") or die (print("Error")); 
        $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
          $data[]=[
              'claveMascota' => $item->claveMascota,
              'nombre' => $item->nombre,
              'raza' => $item->raza,
              'foto' => $item->foto,
              'edad' => $item->edad,
              'genero' => $item->genero,
              'tamaño' => $item->tamaño,
              'estatus' => $item->estatus,
              'ubicacion' => $item->ubicacion,
              'tipo' => $item->tipoAnimal,
          ];
      }
      $datajson=json_encode($data);
        return $datajson;
    }

    function buscar_productos($nombre)
    {
      # code...
      $link = $this->conectar();
        $result = $link->query("SELECT * FROM producto WHERE nombre LIKE '$nombre%'") or die (print("Error")); 
        $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
        $data[]=[
          'idProducto' => $item->idProducto,
          'nombre' => $item->nombre,
          'descripcion' => $item->descripcion,
          'cantidad' => $item->cantidad,
          'precio' => $item->precio,
          'foto' => $item->foto
      ];
      }
      $datajson=json_encode($data);
        return $datajson;
    }

}
?>