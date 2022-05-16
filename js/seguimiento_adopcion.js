$(window).ready(function() {

    $('#formSeg').submit(function (e) { 
        e.preventDefault();
        var datos = $(this).serializeArray();
        /*console.log(datos)*/
        $.ajax({
            type: "POST",
            url: "./php/nuevoSeguimiento.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
            }
        });
        
    });

});