$(document).ready(function () {
    $("#espacio2").hide();
    $("#btn2").hide();

    var apellidoMaterno;
    var apellidoPaterno;
    var calle;
    var ciudad;
    var edad;
    var email;
    var idUsuario;
    var nombre;
    var numeroCasa;
    var password;
    var telefono;

    $.ajax({
        type: "POST",
        url: "./php/pruebaSesionVeterinaria.php",
        data: "",
        dataType: "JSON",
        success: function (response) {
            console.log("Saca los datos de aqui de la veterinaria");
            console.log(response);

            // apellidoMaterno = response[0]['apellidoMaterno'];
            // apellidoPaterno = response[0]['apellidoPaterno'];
            // calle = response[0]['calle'];
            // ciudad = response[0]['ciudad'];
            // edad = response[0]['edad'];
            // email = response[0]['email'];
            // idUsuario = response[0]['idUsuario'];
            // nombre = response[0]['nombre'];
            // numeroCasa = response[0]['numeroCasa'];
            // password = response[0]['password'];
            // telefono = response[0]['telefono'];
            // $("#idUsuario").val(idUsuario);
            // $("#idNombre").val(nombre);
            // $("#ApellidoP").val(apellidoPaterno);
            // $("#ApellidoM").val(apellidoMaterno);
            // $("#idFecha").val(edad);
            // $("#idCiudad").val(ciudad);
            // $("#idCalle").val(calle);
            // $("#idCasa").val(numeroCasa);
            // $("#idCorreo").val(email);
            // $("#idContraseña").val(password);
            // $("#idTelefono").val(telefono);
        }
    });


    $("#btnEditar").click(function (e) {
        e.preventDefault();
        $("#espacio2").show();
        $("#btn2").show();
        $("#espacio1").hide();
        $("#btn1").hide();
        $("#idNombre").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#ApellidoP").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#ApellidoM").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idFecha").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idCiudad").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idCalle").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idCasa").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idCorreo").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idContraseña").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idTelefono").prop('readonly', false).prop('disabled', false).prop('required', true);

    });

    $("#btnCancelar").click(function (e) {
        e.preventDefault();
        $("#espacio2").hide();
        $("#btn2").hide();
        $("#espacio1").show();
        $("#btn1").show();
        $("#idNombre").val("");
        $("#ApellidoP").val("");
        $("#ApellidoM").val("");
        $("#idFecha").val("");
        $("#idCiudad").val("");
        $("#idCalle").val("");
        $("#idCasa").val("");
        $("#idCorreo").val("");
        $("#idContraseña").val("");
        $("#idTelefono").val("");
        $("#idNombre").val(nombre);
        $("#ApellidoP").val(apellidoPaterno);
        $("#ApellidoM").val(apellidoMaterno);
        $("#idFecha").val(edad);
        $("#idCiudad").val(ciudad);
        $("#idCalle").val(calle);
        $("#idCasa").val(numeroCasa);
        $("#idCorreo").val(email);
        $("#idContraseña").val(password);
        $("#idTelefono").val(telefono);
        $("#idNombre").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#ApellidoP").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#ApellidoM").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idFecha").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idCiudad").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idCalle").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idCasa").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idCorreo").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idContraseña").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idTelefono").prop('readonly', true).prop('disabled', true).prop('required', false);
    });

});



