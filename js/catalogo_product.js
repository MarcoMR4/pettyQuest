$(window).ready(function() {
    var usuarioexiste = 0;
    $.post('./php/catalogo_Producto.php', {}, function(data) {
        data = JSON.parse(data);

        //obtener tamaño del json
        console.log(data);
        usuarioexiste = (Object.keys(data).length);
        if (usuarioexiste == 1) {
            var nombre = data[0]['nombre']+ " " +data[0]['apellidoPaterno']+ " " +data[0]['apellidoMaterno'];
            $("#Cambio").html(nombre).addClass("nav-link color-link-black");
            $("#Cambio1").html("Editar Perfil").addClass("dropdown-item");
            $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item");
        }
    });
});