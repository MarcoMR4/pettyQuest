$(window).ready(function() {

    $('#formMascotas').submit(function (e) { 
        e.preventDefault();
        var datos = $(this).serializeArray();
        /*console.log(datos)*/
        $.ajax({
            type: "POST",
            url: "./php/registro_mascotas.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
            }
        });
        
    });
});