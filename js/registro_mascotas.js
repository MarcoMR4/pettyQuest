$(window).ready(function() {

    $('#formMascotas').submit(function (e) { 
        e.preventDefault();
        var datos = $(this).serializeArray();
        var inputFileImage = document.getElementById("nuevaFoto");
        var files = inputFileImage.files[0];
        datos.push({"name":"foto","value":files});
        console.log(datos);
        $.ajax({
            type: "POST",
            url: "./php/registro_mascotas.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            }
        });
        
    });

    $("#btnFoto").click(function (e) { 
        e.preventDefault();
        $("#nuevaFoto").click();
    });

});