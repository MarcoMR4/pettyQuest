const formulario = document.querySelector('#formMascotas');
var tipo;
$(window).ready(function () {

    $.ajax({
        type: "POST",
        url: "./php/identificarTipoUsuario.php",
        data: "data",
        dataType: "JSON",
        success: function (response) {
            tipo= response[0]['tipo'];
            console.log("Tipo de usuario: "+tipo);
        }
    });

    function readURL(input) {
        if (input.files && input.files[0]) { //Revisamos que el input tenga contenido
            var reader = new FileReader(); //Leemos el contenido
            $('#contenedordefoto').attr({ 'class': 'caja' });
            reader.onload = function (e) { //Al cargar el contenido lo pasamos como atributo de la imagen de arriba
                $('#idFotoMas').attr({ 'src': e.target.result });
            }

            reader.readAsDataURL(input.files[0]);
        }
        else {

        }
    }

    $("#nuevaFoto").change(function () { //Cuando el input cambie (se cargue un nuevo archivo) se va a ejecutar de nuevo el cambio de imagen y se verá reflejado.
        readURL(this);
    });

    $("#btnFoto").click(function (e) {
        e.preventDefault();
        $("#nuevaFoto").click();
    });

    $("#btnCerrarModal").click(function () {
        location.reload();

    });

});

$('#formMascotas').submit(function (e) {
    e.preventDefault();
    const datos = new FormData(formulario);
    console.log(datos.get('foto'));
            if ( tipo == "0") {
                $.ajax({
                    type: "POST",
                    url: "./php/registro_mascotaPerdida.php",
                    data: datos,
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        console.log(response);
                        console.log("Se registro");
                    },
                    error: function (response) {
                        console.log(response);
                        console.log("ALgo salio mal");
                    }
                });
            }
            else{
                $.ajax({
                    type: "POST",
                    url: "./php/registro_mascotaPerdida2.php",
                    data: datos,
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        console.log(response);
                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            }
        
    $("#btnExito").click();

});
