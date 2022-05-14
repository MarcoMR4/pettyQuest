$(window).ready(function() {

    $('#formSol').submit(function (e) { 
        e.preventDefault();
        var datos = $(this).serializeArray();
        /*console.log(datos)*/
        $.ajax({
            type: "POST",
            url: "./php/solicitud_adopcion.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
            }
        });
        
    });

});