var localizacion = "";

$(window).ready(function () {

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
        let correo = $("#emailr").val();

        $.ajax({
            type: "POST",
            url: "./php/correoexistente.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                usuarioexiste = (Object.keys(response).length);
                if (usuarioexiste >= 1) {
                    $("#feedback-correo").text("El correo ya esta en uso")
                }
                else {

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
                            $.getScript('./js/cambio_menu_tipo.js', function () { });
                            $("#btnsalirregistro").trigger("click");
                            $("#abrirRegistroExitoso").trigger("click");
                        }
                    });
                }
            },
            error: function (response) {
                console.log(response);
            }
        });



        /* Dar click al boton de x en el registro desde aqui */


    });

    $('#formregistrovet').submit(function (e) {
        e.preventDefault();
        var datos = $(this).serializeArray();
        let passwordE = $("#passwordE").val();
        let passwordE2 = $("#passwordE2").val();
        let correo = $("#emailA").val();

        $.ajax({
            type: "POST",
            url: "./php/correoexistente2.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                usuarioexiste = (Object.keys(response).length);
                if (usuarioexiste >= 1) {
                    $("#feedback-correo2").text("El correo ya esta en uso")
                }
                else {

                    if (passwordE == passwordE2) {
                        console.log("Son iguales");
                        $.ajax({
                            type: "POST",
                            url: "./php/registro_asosiacionveterinaria.php",
                            data: datos,
                            dataType: "JSON",
                            success: function (response) {
                                console.log(response);
                                $.getScript('./js/cambio_menu_tipo.js', function () { });
                                $("#btnsalirregistro2").trigger("click");
                                $("#abrirRegistroExitoso").trigger("click");
                            }
                        });
                    } else {
                        $("#feedback-correo2").text("La contraseña no concuerda")
                        console.log(passwordE);
                        console.log(passwordE2);
                    }


                }
            },
            error: function (response) {
                console.log(response);
            }
        });



        /* Dar click al boton de x en el registro desde aqui */


    });
});



