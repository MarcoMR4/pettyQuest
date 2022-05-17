$(document).ready(function () {
    $("#espacio2").hide();
    $("#btn2").hide();

    var claveAsociacionVeterinaria;
    var nombre;
    var calle;
    var ciudad;
    var email;
    var nombreEncargado;
    var apellidoPEncargado;
    var apellidoMEncargado;
    var numero;
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

            apellidoPEncargado = response[0]['apellidoPEncargado'];
            apellidoMEncargado = response[0]['apellidoMEncargado'];
            calle = response[0]['calle'];
            ciudad = response[0]['ciudad'];
            nombreEncargado = response[0]['nombreEncargado'];
            email = response[0]['email'];
            claveAsociacionVeterinaria = response[0]['claveAsociacionVeterinaria'];
            nombre = response[0]['nombre'];
            numero = response[0]['numero'];
            password = response[0]['password'];
            telefono = response[0]['telefono'];
            $("#idClave").val(claveAsociacionVeterinaria);
            $("#idNombre").val(nombre);
            $("#ApellidoP").val(apellidoPEncargado);
            $("#ApellidoM").val(apellidoMEncargado);
            $("#nombreEncargado").val(nombreEncargado);
            $("#idCiudad").val(ciudad);
            $("#idCalle").val(calle);
            $("#idCasa").val(numero);
            $("#idCorreo").val(email);
            $("#idContraseña").val(password);
            $("#idTelefono").val(telefono);
        }
    });


    $("#btnEditar").click(function (e) {
        e.preventDefault();
        $("#espacio2").show();
        $("#btn2").show();
        $("#espacio1").hide();
        $("#btn1").hide();
        $("#idClave").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#idNombre").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#ApellidoP").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#ApellidoM").prop('readonly', false).prop('disabled', false).prop('required', true);
        $("#nombreEncargado").prop('readonly', false).prop('disabled', false).prop('required', true);
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
        $("#idClave").val("");
        $("#idNombre").val("");
        $("#ApellidoP").val("");
        $("#ApellidoM").val("");
        $("#nombreEncargado").val("");
        $("#idCiudad").val("");
        $("#idCalle").val("");
        $("#idCasa").val("");
        $("#idCorreo").val("");
        $("#idContraseña").val("");
        $("#idTelefono").val("");
        $("#idClave").val(claveAsociacionVeterinaria);
        $("#idNombre").val(nombre);
        $("#ApellidoP").val(apellidoPEncargado);
        $("#ApellidoM").val(apellidoMEncargado);
        $("#nombreEncargado").val(nombreEncargado);
        $("#idCiudad").val(ciudad);
        $("#idCalle").val(calle);
        $("#idCasa").val(numero);
        $("#idCorreo").val(email);
        $("#idContraseña").val(password);
        $("#idTelefono").val(telefono);
        $("#idClave").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idNombre").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#ApellidoP").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#ApellidoM").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#nombreEncargado").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idCiudad").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idCalle").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idCasa").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idCorreo").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idContraseña").prop('readonly', true).prop('disabled', true).prop('required', false);
        $("#idTelefono").prop('readonly', true).prop('disabled', true).prop('required', false);
    });

});



