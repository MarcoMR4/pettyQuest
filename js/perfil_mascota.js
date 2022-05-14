
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
    console.log("Hola mundo")
    $.ajax({
        type: "POST",
        url: "./php/id_mascota.php",
        data: "",
        dataType: "text",
        success: function (response) {
            claveMascota = response;
            console.log("La clave de la mascota es: " + claveMascota)

            console.log("Segundo Ajax")
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
                        console.log("Entro al while " + response2[i]['claveMascota']);
                    }
                    if (claveMascota == response2[i]['claveMascota']) {
                        nombre = response2[i]['nombre'];
                        estatus = response2[i]['estatus'];
                        edad = response2[i]['edad'];
                        raza = response2[i]['raza'];
                        genero = response2[i]['genero'];
                        tamaño = response2[i]['tamaño'];
                        estatus = response2[i]['estatus'];
                        ubicacion = response2[i]['ubicacion'];
                        tipo = response2[i]['tipo'];
                        console.log("Entro al if " + nombre);  
                         /* Llenamos los datos de la mascota*/   
                        $("#idNombre").val(nombre);
                        $("#idEstatus").val(estatus);
                        $("#idEdad").val(edad);
                        $("#idGenero").val(genero);
                        $("#idRaza").val(raza);
                        $("#idTamaño").val(tamaño);
                        $("#idUbicacion").val(ubicacion);
                        $("#idTipo").val(tipo);                    
                    }

                }
            });
        }
    });

    $("#espacio2").hide();
    $("#espacio3").hide();
    $("#btn2").hide();
    $("#btn3").hide();
    $("#btn4").hide();


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

    $("#btnFoto").click(function (e) {
        e.preventDefault();
        $("#nuevaFoto").click();
    });



});



