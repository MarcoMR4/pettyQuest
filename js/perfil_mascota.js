var claveMascota;
var nombre = "";
var raza = "";
var edad = "";
var genero = "";
var tamaño = "";
var ubicacion = "";
var estatus = "";
var tipo = "";
var foto = "";
var informacion = "";
var nombreVeteAso = "";
var tipousuario="1";
$(document).ready(function () {
    $("#espacio1").hide();
    $("#btn1").hide();
    $("#espacio2").hide();
    $("#btn2").hide();
    $("#espacio3").hide();
    $("#btn3").hide();
    $("#btn4").hide();

    //llenar el perfil
    llenar_datos();

    //identificar el tipo de usuario y si es que puede editar la mascota
});

function llenar_datos(){
    $.ajax({
        type: "POST",
        url: "./php/id_mascota.php",
        data: "",
        dataType: "text",
        success: function (response) {
            claveMascota = response;

            $.ajax({
                type: "POST",
                url: "./php/catalogo_mascotas.php",
                data: "",
                dataType: "JSON",
                success: function (response2) {
                    /* Buscamos la mascota correcta*/
                    var i = 0;
                    while (response2[i]['claveMascota'] != claveMascota) {
                        i++;

                    }
                    if (claveMascota == response2[i]['claveMascota']) {
                        var claveAsociacionVeterinaria2;
                        //Conseguimos el ID de la veterinaria para ver si esta mascota puede ser editada por ellos
                        nombre = response2[i]['nombre'];
                        estatus = response2[i]['estatus'];
                        edad = response2[i]['edad'];
                        raza = response2[i]['raza'];
                        foto = response2[i]['foto'];
                        genero = response2[i]['genero'];
                        tamaño = response2[i]['tamaño'];
                        estatus = response2[i]['estatus'];
                        tipo = response2[i]['tipo'];
                        informacion = response2[i]['informacion'];
                        relleno = `<img src="${foto}" class="card-img-top" id="idImagen"></img>`;
                        // Hacemos un natural Join para obtener la ubicacion de la veterinaria y el nombre
                        $.ajax({
                            type: "POST",
                            url: "./php/pruebaSesionVeterinaria.php",
                            data: "",
                            dataType: "JSON",
                            success: function (response2) {
                                claveAsociacionVeterinaria2 = response2[0]['claveAsociacionVeterinaria'];
                                datos = { claveMascota, claveAsociacionVeterinaria2 };

                                $.ajax({
                                    type: "POST",
                                    url: "./php/buscarUbicacionVeteFkMas.php",
                                    data: datos,
                                    success: function (response) {
                                        console.log(response);
                                        response = JSON.parse(response);
                                        ubicacion = response[0]["calle"] + " #" + response[0]["numero"] + ", " + response[0]["ciudad"];
                                        nombreVeteAso = response[0]["nombre"];
                                        // Llenamos los datos de la mascota
                                        $("#idMascota").val(claveMascota);
                                        $("#idNombre").val(nombre);
                                        $("#idEstatus").val(estatus);
                                        $("#idEdad").val(edad);
                                        $("#idGenero").val(genero);
                                        $("#idRaza").val(raza);
                                        $("#idTamaño").val(tamaño);
                                        $("#idUbicacion").val(ubicacion);
                                        $("#nombreVeteAso").val(nombreVeteAso);
                                        $("#idTipo").val(tipo);
                                        $(".foto").html(relleno);
                                        $("#idInformacion").val(informacion);
                                        console.log("Estatus: " + estatus);
                                        identificar_usuario();
                                    },
                                    error: function (response){
                                        console.log(response);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        },
        error: function (response){
            console.log(response);
        }
    });
}

function identificar_usuario(){
    $.ajax({
        type: "POST",
        url: "./php/identificarTipoUsuario.php",
        data: "data",
        dataType: "JSON",
        success: function (response) {
            if (response[0]['tipo'] == "0") {
                tipousuario="0";
                console.log("Es un usuario normal");
                $("#espacio2").hide();
                $("#btn2").hide();
                if (estatus == "En adopción") {
                    $("#btn1").show();
                    $("#espacio1").show();
                }
                else {
                    $("#btn1").hide();
                    $("#espacio1").hide();
                }
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
                    url: "php/misMascotas.php",
                    data: "",
                    dataType: "JSON",
                    success: function (response) {
                        /* Ver si la mascota es de la veterinaria correcta para editar*/
                        response.map(item => {
                            if (`${item.claveAsociacionVeterinaria}` == claveAsociacionVeterinaria && `${item.claveMascota}` == claveMascota) {
                                $("#espacio1").hide();
                                $("#btn1").hide();
                                $("#espacio2").show();
                                $("#btn2").show();
                                if (estatus == "Adoptado") {
                                    $("#btnAdoptado").hide();
                                }
                                else {
                                    $("#btnAdoptado").show();
                                }
                            }
                            else {
                                $("#espacio1").hide();
                                $("#btn1").hide();
                            }
                        })

                    }
                });

            }
        }
    });
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
    $("#idEdad").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idGenero").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idRaza").prop('readonly', false).prop('disabled', false).prop('required', true);
    $("#idTamaño").prop('readonly', false).prop('disabled', false).prop('required', true);
    //$("#idUbicacion").prop('readonly', false).prop('disabled', false).prop('required', true);
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
    $("#idEdad").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idGenero").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idRaza").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idTamaño").prop('readonly', true).prop('disabled', true).prop('required', false);
    //$("#idUbicacion").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idTipo").prop('readonly', true).prop('disabled', true).prop('required', false);
    $("#idInformacion").prop('readonly', true).prop('disabled', true).prop('required', false);
});

function adoptar() {
    var nuevoEstatus = "Adoptado";
    console.log(claveMascota);
    $.ajax({
        type: "post",
        url: "./php/editarMascotaEstatus.php",
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









