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

    function registroMascotas($idNombre,$edad,$genero,$idRaza,$tamano,$idRazaAnimal,$tmpimg,$type,$informacion){
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
        $result = $link->query("INSERT INTO mascota (nombre,raza,foto,edad,genero,tamaño,estatus,tipoAnimal,informacion) VALUES ('$idNombre','$idRaza','$rutarelativa','$edad','$genero','$tamano','$estatusmascota','$idRazaAnimal','$informacion')") or die (print("Error")); 
        $data[]=[
          'estatus' => 'registrado'
        ];
        $id=$_SESSION['idUsuarioVeterinaria'];
        $result3 = $link->query("INSERT INTO `fk_mascota_asociacionveterinaria` (claveAsociacionVeterinaria,claveMascota) VALUES ('$id','$idmascota')") or die (print("Error")); 
      }

      $datajson=json_encode($data);
      return $datajson;
    }

    function registroProductos($nombreP,$TipoP,$Precio,$type,$tmpimg){
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
        $result = $link->query("INSERT INTO producto (nombre,descripcion,precio,foto) VALUES ('$nombreP','$TipoP','$Precio','$rutarelativa')") or die (print("Error")); 
        $data[]=[
          'estatus' => 'registrado'
        ];
        $id=$_SESSION['idUsuarioVeterinaria'];
        $result3 = $link->query("INSERT INTO `fk_producto_asociacionveterinaria` (claveAsociacionVeterinaria,idProducto) VALUES ('$id','$idproducto')") or die (print("Error")); 

      }
           
      $mijson = json_encode($data);
      return $mijson;
    }

    //registrar veterinarias o asosiaciones
    function registroAV($nombre,$ciudad,$calle,$numero,$email,$nombreE,$apE,$amE,$telefono,$password){
      $link = $this->conectar();
      $result = $link->query("INSERT INTO `asociacionveterinaria` (`claveAsociacionVeterinaria`, `nombre`, `ciudad`, `calle`, `numero`, `nombreEncargado`, `apellidoPEncargado`, `apellidoMEncargado`, `email`, `telefono`, `password`) VALUES (NULL, '$nombre','$ciudad','$calle','$numero','$nombreE','$apE','$amE','$email','$telefono','$password')") or die (print("Error")); 
    //     $data[]=[
    //       'estatus' => 'registrado'
    //     ];
    //     //$id=$_SESSION['idUsuarioVeterinaria'];
         
    //   $mijson = json_encode($data);
    //   return $mijson;
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
                'usuario' => $item->usuario,
                'cartilla' => $item->cartilla,                
                'mascota' => $item->mascota                 
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
              'tipo' => $item->tipoAnimal,
              'informacion' => $item->informacion
          ];
      }
      $datajson=json_encode($data);
      return $datajson; 
    }

    function obtenerproductos(){
      $link = $this->conectar();

      /* Query para obtener datos */
      $sql="SELECT producto.nombre, producto.idProducto, producto.descripcion, producto.precio, producto.foto, producto.precio, asociacionveterinaria.ciudad, asociacionveterinaria.calle, asociacionveterinaria.numero, asociacionveterinaria.telefono,asociacionveterinaria.nombre AS nombreAsociacion FROM producto INNER JOIN fk_producto_asociacionveterinaria ON producto.idProducto = fk_producto_asociacionveterinaria.idProducto INNER JOIN asociacionveterinaria ON fk_producto_asociacionveterinaria.claveAsociacionVeterinaria = asociacionveterinaria.claveAsociacionVeterinaria;";
      
      $result = $link->query($sql) or die (print("Error"));

      /* Creacion del JSON */
      $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
          $data[]=[
              'idProducto' => $item->idProducto,
              'nombre' => $item->nombre,
              'descripcion' => $item->descripcion,
              'precio' => $item->precio,
              'foto' => $item->foto,
              'asociacion' => $item->nombreAsociacion,              
              'ciudad' => $item->ciudad,              
              'calle' => $item->calle,              
              'numero' => $item->numero,              
              'telefono' => $item->telefono              
          ];
      }
      $datajson=json_encode($data);
      return $datajson; 
    }

    function editar_mascota($idMascota,$nombre,$raza,$edad,$genero,$tamaño,$estatus,$informacion){
      $link = $this->conectar();
       $result = $link->query("UPDATE mascota SET nombre='$nombre', raza='$raza', edad='$edad', genero='$genero', tamaño='$tamaño', estatus='$estatus', informacion='$informacion' WHERE claveMascota='$idMascota'") or die (print("Error")); 
    }

    function editar_mascota_adoptada($idMascota,$nuevoEstatus){
      $link = $this->conectar();
      $result = $link->query("UPDATE mascota SET estatus='$nuevoEstatus' WHERE claveMascota='$idMascota'") or die (print("Error")); 

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
              'tipo' => $item->tipoAnimal,
          ];
      }
      $datajson=json_encode($data);
        return $datajson;
    }

    function buscar_perros_por_atributo($atributo, $atributoEspec)
    {
      # code...
      $link = $this->conectar();
        $result = $link->query("SELECT * FROM mascota NATURAL JOIN fk_mascota_asociacionveterinaria WHERE $atributo = '$atributoEspec'") or die (print("Error")); 
        $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
          $data[]=[
              'claveMascota' => $item->claveMascota,
              'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
              'nombre' => $item->nombre,
              'raza' => $item->raza,
              'foto' => $item->foto,
              'edad' => $item->edad,
              'genero' => $item->genero,
              'tamaño' => $item->tamaño,
              'estatus' => $item->estatus,
              'tipo' => $item->tipoAnimal,
          ];
      }
      $datajson=json_encode($data);
        return $datajson;
    }

    function mis_Mascotas()
    {
      # code...
      $link = $this->conectar();
        $result = $link->query("SELECT * FROM `fk_mascota_asociacionveterinaria` NATURAL JOIN `mascota`") or die (print("Error")); 
        $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
          $data[]=[
              'claveMascota' => $item->claveMascota,
              'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
              'nombre' => $item->nombre,
              'raza' => $item->raza,
              'foto' => $item->foto,
              'edad' => $item->edad,
              'genero' => $item->genero,
              'tamaño' => $item->tamaño,
              'estatus' => $item->estatus,
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
          'precio' => $item->precio,
          'foto' => $item->foto
      ];
      }
      $datajson=json_encode($data);
        return $datajson;
    }

    function mis_productos()
    {
      # code...
      $link = $this->conectar();
        $result = $link->query("SELECT * FROM `fk_producto_asociacionveterinaria` NATURAL JOIN `producto`") or die (print("Error")); 
        $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
        $data[]=[
          'idProducto' => $item->idProducto,
          'claveAsociacionVeterinaria' => $item->claveAsociacionVeterinaria,
          'nombre' => $item->nombre,
          'descripcion' => $item->descripcion,
          'precio' => $item->precio,
          'foto' => $item->foto
      ];
      }
      $datajson=json_encode($data);
        return $datajson;
    }

    function editar_producto($idProducto ,$descripcion,$nombre,$precio){
      $link = $this->conectar();
      $result = $link->query("UPDATE producto SET descripcion='$descripcion', nombre='$nombre',precio='$precio' WHERE idProducto ='$idProducto'") or die (print("Error")); 
      
        return $result;
    }

    function eliminar_producto($idProducto){
      $link = $this->conectar();
      $result = $link->query("DELETE FROM producto WHERE idProducto='$idProducto'") or die (print("Error")); 
        return $idProducto;
    }

    function consultar_solicitudes()
    {
      $link = $this->conectar();
      $id=$_SESSION['idUsuarioVeterinaria'];
      $result = $link->query("SELECT * FROM `contratoadopcion` NATURAL JOIN `mascota` WHERE idAsociacion = '$id' AND contratoadopcion.idMascota = mascota.claveMascota AND contratoadopcion.estado = 0") or die (print("Error")); 
      $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
        $data[]=[
          'claveContrato' => $item->claveContrato,
          'comprobanteDomicilio' => $item->comprobanteDomicilio,
          'fecha' => $item->fecha,
          'idUsuario' => $item->idUsuario,
          'idAsociacion' => $item->idAsociacion,
          'idMascota' => $item->idMascota,
          'ine' => $item->ine,
          'razones' => $item->razones,
          'nombre' => $item->nombre,
          'raza' => $item->raza,
          'foto' => $item->foto,
          'edad' => $item->edad,
          'genero' => $item->genero,
          'tamaño' => $item->tamaño
      ];
      }
      $datajson=json_encode($data);
        return $datajson;
    }

    function buscar_usuario_por_id($idUsuario)
    {
      $link = $this->conectar();      
      $result = $link->query("SELECT * FROM usuario WHERE idUsuario = '$idUsuario'") or die (print("Error")); 
      $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
        $data[]=[
          'nombre' => $item->nombre,
          'apellidoPaterno' => $item->apellidoPaterno,
          'apellidoMaterno' => $item->apellidoMaterno,
          'ciudad' => $item->ciudad,
          'calle' => $item->calle,
          'numeroCasa' => $item->numeroCasa,
          'edad' => $item->edad
      ];
      }
      $datajson=json_encode($data);
        return $datajson;
    }

    function aceptar_solicitud($claveContrato, $claveUsuario, $claveMascota)
    {
      $link = $this->conectar();     
      $id=$_SESSION['idUsuarioVeterinaria']; 
      $link->query("UPDATE contratoadopcion SET estado = 1 WHERE claveContrato = '$claveContrato'") or die (print("Error")); 
      $link->query("UPDATE mascota SET estatus = 'En proceso' WHERE claveMascota = '$claveMascota'") or die (print("Error")); 
      $link->query("INSERT INTO mensajes (mensaje, claveRemitente, claveDestinatario, usuario) VALUES ('Tu solicitud para adoptar ha sido aprobada, en breve nos comunicaremos con usted.','$id','$claveUsuario', 1)") or die (print("Error")); 
      $data[]=[
        "estatus" => "aceptado"
      ];   
      $datajson=json_encode($data);
      return $datajson;
    }

    function rechazar_solicitud($claveContrato, $claveUsuario)
    {
      $link = $this->conectar();  
      $id=$_SESSION['idUsuarioVeterinaria'];    
      $link->query("UPDATE contratoadopcion SET estado = 2 WHERE claveContrato = '$claveContrato'") or die (print("Error"));      
      $link->query("INSERT INTO mensajes (mensaje, claveRemitente, claveDestinatario, usuario) VALUES ('Gracias por enviar tu solicitud, desafortunadamente no fue aceptada por ciertos motivos.','$id','$claveUsuario', 1)") or die (print("Error"));  
      $data[]=[
        "estatus" => "rechazado"
      ];   
      $datajson=json_encode($data);
      return $datajson;
    }

    function obtenerUbicacion($idmascota,$idveterinaria){
      $link = $this->conectar();
      $result = $link->query("SELECT * FROM `asociacionveterinaria` WHERE `claveAsociacionVeterinaria` IN (SELECT `claveAsociacionVeterinaria` FROM `fk_mascota_asociacionveterinaria` WHERE `claveMascota` IN (SELECT `claveMascota` FROM `mascota` WHERE `claveMascota` = '$idmascota' ))") or die (print("Error")); 
      $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
        $data[]=[
          'nombre' => $item->nombre,
          'ciudad' => $item->ciudad,
          'calle' => $item->calle,
          'numero' => $item->numero
        ];
      }
      $datajson=json_encode($data);
      return $datajson;
    }

    function notificacionSolicitudes(){
      $link = $this->conectar();
      $id=$_SESSION['idUsuarioVeterinaria']; 
      $result = $link->query("SELECT COUNT(claveContrato) AS existentes FROM contratoadopcion WHERE idAsociacion = '$id' AND estado = 0") or die (print("Error")); 
      $data=[];
      while($item = $result->fetch(PDO::FETCH_OBJ)){
        $data[]=[
          'cantidad' => $item->existentes
        ];
      }
      $datajson=json_encode($data);
      return $datajson;
    }

}
?>