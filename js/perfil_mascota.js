
$(document).ready(function () {
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
    $("#espacio2").hide();
    $("#btn2").hide();
    $("#espacio1").show();
    $("#btn1").show();
    $("#espacio3").hide();
    $("#btn3").hide();
    $("#btn4").hide();
    $("#btnAdoptado").hide();

    //llenar el perfil
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
                    console.log(response2);
                    /* Buscamos la mascota correcta*/
                    var i = 0;
                    while (response2[i]['claveMascota'] != claveMascota) {
                        i++;

                    }
                    if (claveMascota == response2[i]['claveMascota']) {
                        nombre = response2[i]['nombre'];
                        estatus = response2[i]['estatus'];
                        edad = response2[i]['edad'];
                        raza = response2[i]['raza'];
                        foto = response2[i]['foto'];
                        genero = response2[i]['genero'];
                        tamaño = response2[i]['tamaño'];
                        estatus = response2[i]['estatus'];
                        ubicacion = response2[i]['ubicacion'];
                        tipo = response2[i]['tipo'];
                        relleno = `<img src="${foto}" class="card-img-top" id="idImagen"></img>`;
                        // Llenamos los datos de la mascota
                        $("#idMascota").val(claveMascota);
                        //alert(claveMascota); 
                        $("#idNombre").val(nombre);
                        $("#idEstatus").val(estatus);
                        $("#idEdad").val(edad);
                        $("#idGenero").val(genero);
                        $("#idRaza").val(raza);
                        $("#idTamaño").val(tamaño);
                        $("#idUbicacion").val(ubicacion);
                        $("#idTipo").val(tipo);
                        $(".foto").html(relleno);
                    }

                }
            });
        }
    });

    //identificar el tip ode usuario y si es que puede editar la mascota
    $.ajax({
        type: "POST",
        url: "./php/identificarTipoUsuario.php",
        data: "data",
        dataType: "JSON",
        success: function (response) {
            console.log(response[0]['tipo']);
            if (response[0]['tipo'] == "0") {
                console.log("Es un usuario normal");
                $("#espacio2").hide();
                $("#btn2").hide();
                $("#espacio1").show();
                $("#btn1").show();
                $("#btnAdoptado").hide();
            }
            else {
                console.log("Es una veterinaria");
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
                        console.log(response);

                        /* Imprimimos en pantalla cada mascota encontrada*/
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
        $("#idUbicacion").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idTipo").prop('readonly', false).prop('disabled', false).prop('required', true);

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
        $("#idUbicacion").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idTipo").prop('readonly', true).prop('disabled', true).prop('required', false);
    });
    /*
    $("#btnFoto").click(function (e) {
        e.preventDefault();
        $("#nuevaFoto").click();
    });*/

    $("#btnAdoptado").click(function (e) {
        e.preventDefault();
        var nuevoEstatus = "Adoptado";
        $.ajax({
            type: "post",
            url: "php/editarMascotaEstatus.php",
            data: {
                idMascota: idMascota,
                nuevoEstatus: nuevoEstatus
            },
            dataType: "JSON",
            success: function (response) {
                console.log("ADOPTADO");
            }
        });
    });
});







