$(window).ready(actualizarMenu);

function actualizarMenu(){
    var usuarioexiste = 0;

    $.ajax({
        type: "GET",
        url: "./php/catalogo_Producto.php",
        data: "",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            usuarioexiste = (Object.keys(response).length);
            if (usuarioexiste == 1) {
                var nombre = response[0]['nombre']+ " " +response[0]['apellidoPaterno']+ " " +response[0]['apellidoMaterno'];
                $("#Cambio").html(nombre).addClass("nav-link color-link-black");
                $("#Cambio1").html("Editar Perfil").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href','./index.html');
                $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href','./index.html');;
            }
        }
    });
}