$(window).ready(function() {
    const formulario = document.querySelector('#formMascotas');
    $('#formMascotas').submit(function (e) { 
        e.preventDefault();
        const datos= new FormData(formulario);
        console.log(datos.get('foto'));
        $.ajax({
            type: "POST",
            url: "./php/registro_mascotas.php",
            data: datos,
            contentType:false,
            cache: false,
            processData: false,
            success: function (response) {
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            }
        });
        alert("¡¡¡SE HA REGISTRADO EL PERRO CON EXITO!!!");
        location.reload();
    });

    function readURL(input) {
        if (input.files && input.files[0]) { //Revisamos que el input tenga contenido
            var reader = new FileReader(); //Leemos el contenido
            $('#contenedordefoto').attr({'class':'caja'});
            reader.onload = function(e) { //Al cargar el contenido lo pasamos como atributo de la imagen de arriba
                $('#idFotoMas').attr({'src':e.target.result});
            }
            
            reader.readAsDataURL(input.files[0]);
        }
        else{
            
        }
    }

    $("#nuevaFoto").change(function() { //Cuando el input cambie (se cargue un nuevo archivo) se va a ejecutar de nuevo el cambio de imagen y se verá reflejado.
        readURL(this);
    });

    $("#btnFoto").click(function (e) { 
        e.preventDefault();
        $("#nuevaFoto").click();
    });

});