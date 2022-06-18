$(window).ready(function() {

    var fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() - 18);
    fecha.setMonth(11);
    fecha.setDate(31);
    $("#edad").attr("max", fecha.toISOString().split('T')[0]);

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
                $.getScript('./js/cambio_menu_tipo.js', function(){});
            }
        });        

        /* Dar click al boton de x en el registro desde aqui */
        $("#btnsalirregistro").trigger("click");
        
    });
});