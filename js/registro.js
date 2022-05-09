$(window).ready(function() {

    $('#formregistro').submit(function (e) { 
        e.preventDefault();
        var datos = $(this).serializeArray();
        let password = $("#passwordr").val();
        let password2 = $("#password2").val();

        if (password == password2) {
            console.log("Son iguales"); 
        } else {
            console.log("la contraseña no es la misma");
        }

        $.ajax({
            type: "POST",
            url: "./php/registro.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
            }
        });

        /* Llamar otro js desde este mismo */
        $.getScript('./js/cambio_menu_tipo.js', function(){});

        /* Dar click al boton de x en el registro desde aqui */
        $("#btnsalirregistro").trigger("click");
        
    });
});