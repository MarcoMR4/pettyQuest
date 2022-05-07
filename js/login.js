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
                    var nombre = response[0]['nombre']+ " " +response[0]['apellidoPaterno']+ " " +response[0]['apellidoMaterno'];
                    $("#Cambio").html(nombre).addClass("nav-link color-link-black");
                    $("#Cambio1").html("Editar Perfil").addClass("dropdown-item");
                    $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item");
                }
            }
        });
        $("#btnsalirsesion").trigger("click");
    });
});