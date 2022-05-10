$(document).ready(function () {
    $("#espacio2").hide();
    $("#btn2").hide();

    $("#btnEditar").click(function (e) { 
        e.preventDefault();
        $("#espacio2").show();
        $("#btn2").show();
        $("#espacio1").hide();
        $("#btn1").hide();
        $("#idNombre").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#ApellidoP").prop('readonly', false).prop('disabled', false).prop('required',true);   
        $("#ApellidoM").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#idCorreo").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#idContraseña").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#idFecha").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#idDireccion").prop('readonly', false).prop('disabled', false).prop('required',true);
        
        
    });

    $("#btnCancelar").click(function (e) { 
        e.preventDefault();
        $("#espacio2").hide();
        $("#btn2").hide();
        $("#espacio1").show();
        $("#btn1").show();
        $("#idNombre").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#ApellidoP").prop('readonly', true).prop('disabled', true).prop('required',false);   
        $("#ApellidoM").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#idCorreo").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#idContraseña").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#idFecha").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#idDireccion").prop('readonly', true).prop('disabled', true).prop('required',false);
    });

});



