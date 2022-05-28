$(window).ready(actualizarMenu);

function actualizarMenu() {
    var usuarioexiste = 0;
    $("#oculto").hide();
    $.ajax({
        type: "POST",
        url: "./php/pruebaSesionUsuario.php",
        data: "",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            if (response[0]['estatus'] == 'NoUsuario') {
                /* checamos si es veterinaria */
                $.ajax({

                    type: "POST",
                    url: "./php/pruebaSesionVeterinaria.php",
                    data: "",
                    dataType: "JSON",
                    success: function (response) {
                        console.log(response);

                        if (response[0]['estatus'] == 'SiVeterinaria') {
                            usuarioexiste = (Object.keys(response).length);
                            if (usuarioexiste == 1) {
                                var nombre = response[0]['nombre'] + " / " + response[0]['nombreEncargado'];
                                $("#Cambio").html(nombre).addClass("nav-link color-link-black");
                                $("#Cambio1").html("Mi Perfil").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './perfil_asociacionveterinaria.html');
                                $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './index.html');
                                $("#oculto").show();
                                opciones(1);
                            }
                        }


                    }
                });
            }
            else if (response[0]['estatus'] == 'SiUsuario') {
                usuarioexiste = (Object.keys(response).length);
                if (usuarioexiste == 1) {
                    var nombre = response[0]['nombre'] + " " + response[0]['apellidoPaterno'] + " " + response[0]['apellidoMaterno'];
                    $("#Cambio").html(nombre).addClass("nav-link color-link-black");
                    $("#Cambio1").html("Mi Perfil").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './perfil_usuario.html');
                    $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './index.html');
                    $("#oculto").show();
                    opciones(0);
                }
            }
        }
    });

    $("#Cambio2").click(function (e) {
        console.log("hola");
        $.ajax({
            type: "POST",
            url: "./php/cerrarSesionUsuario.php",
            data: "",
            dataType: "JSON",
            success: function (response) {
                window.location.replace("index.html");
            }
        });
    });
}

function opciones($usuario) {
    var relleno = "";
    if ($usuario == 1)
        relleno += `
           <li><a class="dropdown-item" href="registro_mascotas.html"  role="button" aria-controls="InicioSesion">
                Registar mascota
            </a></li>
            <li><a class="dropdown-item" href="registro_productos.html"  role="button" aria-controls="InicioSesion">
                Registar producto
            </a></li>
            <li><a class="dropdown-item" href="mensajeria.html"  role="button" aria-controls="InicioSesion">
                Mensajeria
            </a></li>
            <li><a class="dropdown-item" href="consultar_solicitudes.html"  role="button" aria-controls="InicioSesion">
                Solicitudes de</br>adopcion
            </a></li>
            
        `;
    else
        relleno += `
           <li><a class="dropdown-item" href="mensajeria.html"  role="button" aria-controls="InicioSesion">
                Mensajeria
            </a></li>
            <li><a class="dropdown-item" href="seguimiento_adopcion.html"  role="button" aria-controls="InicioSesion">
                Generar nuevo </br>seguimiento de adopcion
            </a></li>
        `;
    $("#agregar").append(relleno);
}