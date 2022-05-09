$(window).ready(function() {
    var usuarioexiste = 0;
    $('#formini').submit(function (e) { 
        e.preventDefault();
        var datos = $(this).serializeArray();
        $.ajax({

            type: "POST",
            url: "./php/login.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {

                //obtener tamaño del json
                usuarioexiste = (Object.keys(response).length);
                if (usuarioexiste == 1) {
                    console.log(response)
                }
            }
        });

        /* Llamar otro js desde este mismo */
        $.getScript('./js/cambio_menu_tipo.js', function(){});

        /* Dar click al boton de x en el registro desde aqui */
        $("#btnsalirsesion").trigger("click");
    });
});