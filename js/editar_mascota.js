$(document).ready(function () {
    $("#espacio2").hide();
    $("#espacio3").hide();
    $("#btn2").hide();
    $("#btn3").hide();

    $("#btnEditar").click(function (e) { 
        e.preventDefault();
        $("#espacio3").show();
        $("#btn3").show();
        $("#espacio2").hide();
        $("#btn2").hide();
        $("#idNombre").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#idEdad").prop('readonly', false).prop('disabled', false).prop('required',true);   
        $("#idGenero").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#idRaza").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#idTamaño").prop('readonly', false).prop('disabled', false).prop('required',true);
        $("#idUbicacion").prop('readonly', false).prop('disabled', false).prop('required',true);
        
    });

    $("#btnCancelar").click(function (e) { 
        e.preventDefault();
        $("#espacio3").hide();
        $("#btn3").hide();
        $("#espacio2").show();
        $("#btn2").show();
        $("#idNombre").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#idEdad").prop('readonly', true).prop('disabled', true).prop('required',false);   
        $("#idGenero").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#idRaza").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#idTamaño").prop('readonly', true).prop('disabled', true).prop('required',false);
        $("#idUbicacion").prop('readonly', true).prop('disabled', true).prop('required',false);
    });

});



