<?php

session_start();

class conexion_VeteAsosiones{
    private $server = 'localhost';
    private $username = 'root';
    private $password = '123';
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

    function registroMascotas($nombreMas,$edadMas,$idRaza,$idUbicacion){
      $link = $this->conectar();
      $result = $link->query("INSERT INTO mascota (nombre,raza,edad) VALUES ('$nombreMas','$idRaza','$edadMas')") or die (print("Error")); 

      /* Query para obtener datos */
      $sql="SELECT * FROM `mascota` WHERE (nombre='".$nombreMas."') AND (raza='".$idRaza."') AND (edad='".$edadMas."')";
      $result2 = $link->query($sql) or die (print("Error"));

      $idmascota;
      $data=[];
      while($item = $result2->fetch(PDO::FETCH_OBJ)){
        $idmascota=$item->claveMascota;
        $data[]=[
          'claveMascota' => $item->claveMascota
        ];
      }

      $id=$_SESSION['idUsuarioVeterinaria'];
      $result3 = $link->query("INSERT INTO `fk_mascota_asociacion/veterinaria` (claveAsociacionVeterinaria,claveMascota) VALUES ('$id','$idmascota')") or die (print("Error")); 

      $datajson=json_encode($data);
      return $datajson; 
    }

    function registroProductos($nombreP,$TipoP,$Cantidad,$Precio){
      $link = $this->conectar();
      $result = $link->query("INSERT INTO producto (nombre,descripcion,cantidad,precio) VALUES ('$nombreP','$TipoP','$Cantidad','$Precio')") or die (print("Error")); 

      $sql="SELECT * FROM `producto` WHERE (nombre='".$nombreP."') AND (descripcion='".$TipoP."') AND (cantidad='".$Cantidad."') AND (precio='".$Precio."')";
      $result2 = $link->query($sql) or die (print("Error"));

      $idproducto;
      $data=[];
      while($item = $result2->fetch(PDO::FETCH_OBJ)){
        $idproducto=$item->idProducto;
        $data[]=[
          'idProducto' => $item->idProducto
        ];
      }

      $id=$_SESSION['idUsuarioVeterinaria'];
      $result3 = $link->query("INSERT INTO `fk_producto_asociacionveterinaria` (claveAsociacionVeterinaria,idProducto) VALUES ('$id','$idproducto')") or die (print("Error")); 

      $mijson = json_encode($datos);
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
}
?>