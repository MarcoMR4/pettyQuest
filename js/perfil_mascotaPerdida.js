var claveMascota;
var nombre = "";
var raza = "";
var telefono = "";
var genero = "";
var tamaño = "";
var ubicacion = "";
var estatus = "";
var tipo = "";
var foto = "";
var informacion = "";
var idUsuario;
var tipoUsuario;
$(document).ready(function () {
    $("#espacio2").hide();
    $("#btn2").hide();
    $("#espacio3").hide();
    $("#btn3").hide();
    $("#btn4").hide();

    //llenar el perfil
    llenar_datos();

});

$(window).ready(function () {

    $.ajax({
        type: "POST",
        url: "./php/identificarTipoUsuario.php",
        data: "data",
        dataType: "JSON",
        success: function (response) {
            tipoUsuario = response[0]['tipo'];
            console.log("Tipo de usuario: " + tipoUsuario);
            //identificar el tipo de usuario y si es que puede editar la mascota
            identificar_usuario();
        }
    });
});

function llenar_datos() {
    $.ajax({
        type: "POST",
        url: "./php/id_mascota.php",
        data: "",
        dataType: "text",
        success: function (response) {
            claveMascota = response;

            $.ajax({
                type: "POST",
                url: "./php/catalogo_mascotasPerdidas.php",
                data: "",
                dataType: "JSON",
                success: function (response2) {
                    /* Buscamos la mascota correcta*/
                    var i = 0;
                    while (response2[i]['claveMascota'] != claveMascota) {
                        i++;

                    }
                    if (claveMascota == response2[i]['claveMascota']) {

                        nombre = response2[i]['nombre'];
                        estatus = response2[i]['estatus'];
                        telefono = response2[i]['telefono'];
                        raza = response2[i]['raza'];
                        foto = response2[i]['foto'];
                        genero = response2[i]['genero'];
                        tamaño = response2[i]['tamaño'];
                        ubicacion = response2[i]['ultimaLocalizacion'];
                        tipo = response2[i]['tipoAnimal'];
                        informacion = response2[i]['informacion'];
                        relleno = `<img src="${foto}" class="card-img-top" id="idImagen"></img>`;

                        // Llenamos los datos de la mascota
                        $("#idMascota").val(claveMascota);
                        $("#idNombre").val(nombre);
                        $("#idEstatus").val(estatus);
                        $("#idTelefono").val(telefono);
                        $("#idGenero").val(genero);
                        $("#idRaza").val(raza);
                        $("#idTamaño").val(tamaño);
                        $("#idUbicacion").val(ubicacion);
                        $("#idTipo").val(tipo);
                        $(".foto").html(relleno);
                        $("#idInformacion").val(informacion);


                    }
                }
            });
        },
        error: function (response) {
            console.log(response);
        }
    });
}

function identificar_usuario() {

    if (tipoUsuario == "0") {
        console.log("Se buscara la mascota en usuarios");
        $.ajax({
            type: "POST",
            url: "./php/pruebaSesionUsuario.php",
            data: "",
            dataType: "JSON",
            success: function (response2) {
                idUsuario = response2[0]['idUsuario'];
                console.log(idUsuario);
                var siEs;
                $.ajax({
                    type: "post",
                    url: "php/misMascotasPerdidas.php",
                    data: "",
                    dataType: "JSON",
                    success: function (response) {
                        console.log(response);
                        /* Ver si la mascota es del Usuario correcto para editar*/
                        response.map(item => {
                            console.log("El idUsuario de esta mascota: " + `${item.idUsuario}`);
                            console.log("El claveMascota de esta mascota: " + `${item.claveMascota}`);
                            if (`${item.idUsuario}` == idUsuario && `${item.claveMascota}` == claveMascota) {
                                $("#espacio2").show();
                                $("#btn2").show();
                                if (estatus == "Encontrado") {
                                    $("#btnEncontrado").hide();
                                }
                                else {
                                    $("#btnEncontrado").show();
                                }
                            }
                        })
                    }
                });
            }
        });

    }
    else {
        var claveAsociacionVeterinaria;
        //Conseguimos el ID de la veterinaria para ver si esta mascota puede ser editada por ellos
        $.ajax({
            type: "POST",
            url: "./php/pruebaSesionVeterinaria.php",
            data: "",
            dataType: "JSON",
            success: function (response2) {
                claveAsociacionVeterinaria = response2[0]['claveAsociacionVeterinaria'];
            }
        });
        $.ajax({
            type: "post",
            url: "php/misMascotasPerdidas2.php",
            data: "",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                /* Ver si la mascota es de la veterinaria correcta para editar*/
                response.map(item => {
                    console.log("El claveAsociacionVeterinaria de esta mascota: " + `${item.claveAsociacionVeterinaria}`);
                    console.log("El claveMascota de esta mascota: " + `${item.claveMascota}`);
                    if (`${item.claveAsociacionVeterinaria}` == claveAsociacionVeterinaria && `${item.claveMascota}` == claveMascota) {
                        $("#espacio2").show();
                        $("#btn2").show();
                        if (estatus == "Encontrado") {
                            $("#btnEncontrado").hide();
                        }
                        else {
                            $("#btnEncontrado").show();
                        }
                    }
                    
                })

            }
        });

    }

}

/* Lo importante es ocultar y mostrar botones*/
$("#btnEditar").click(function (e) {
    e.preventDefault();
    $("#espacio3").show();
    $("#btn3").show();
    $("#btn4").show();
    $("#espacio2").hide();
    $("#btn2").hide();
    $("#idNombre").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idEstatus").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idTelefono").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idGenero").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idRaza").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idTamaño").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idUbicacion").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idTipo").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idInformacion").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#btnFoto").hide();
    $("#eliminar").remove();


});

/* Lo importante es ocultar y mostrar botones mas volver a poner la informacion correcta*/
$("#btnCancelar").click(function (e) {
    e.preventDefault();
    $("#espacio3").hide();
    $("#btn3").hide();
    $("#btn4").hide();
    $("#espacio2").show();
    $("#btn2").show();
    $("#idNombre").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idEstatus").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idTelefono").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idGenero").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idRaza").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idTamaño").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idUbicacion").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idTipo").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idInformacion").prop('readonly', true).prop('disabled', true).prop('required', false);
});

function encontrar() {
    var nuevoEstatus = "Encontrado";
    console.log(claveMascota);
    $.ajax({
        type: "post",
        url: "./php/editarMascotaPerdidaEstatus.php",
        data: {
            'idMascota': claveMascota,
            'nuevoEstatus': nuevoEstatus
        },
        dataType: "JSON",
        success: function (response) {
            location.reload();
            console.log(response)

        }
    });
    location.reload();
};

function readURL(input) {
    if (input.files && input.files[0]) { //Revisamos que el input tenga contenido
        var reader = new FileReader(); //Leemos el contenido
        $('#contenedordefoto').attr({ 'class': 'caja' });
        reader.onload = function (e) { //Al cargar el contenido lo pasamos como atributo de la imagen de arriba
            $('#idImagen').attr({ 'src': e.target.result });
        }

        reader.readAsDataURL(input.files[0]);
    }
    else {

    }
}

$("#fotoNueva").change(function () { //Cuando el input cambie (se cargue un nuevo archivo) se va a ejecutar de nuevo el cambio de imagen y se verá reflejado.
    readURL(this);
});

$("#btnFoto").click(function () {
    $("#fotoNueva").click();
});

$("#btnAceptar").click(function () {
    $("#formeditar").submit();
});










