<?php

session_start();

class conexion{
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

}
?>