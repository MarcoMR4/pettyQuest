$(window).ready(actualizarMenu);

function actualizarMenu() {
    $(".disclaimer").hide();
    var usuarioexiste = 0;
    $("#oculto").hide();
    $("#oculto2").hide();
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
                        if (response[0]['estatus'] == 'SiVeterinaria') {
                            usuarioexiste = (Object.keys(response).length);
                            if (usuarioexiste == 1) {
                                var nombre = response[0]['nombre'] + " / " + response[0]['nombreEncargado'];
                                var solicitudes = "";
                                console.log(response);
                                $.ajax({
                                    type: "POST",
                                    url: "./php/notificacion_Solicitudes.php",
                                    data: "",
                                    dataType: "JSON",
                                    success: function (response) {
                                        if (response[0]['cantidad'] == 0) {
                                            solicitudes += `
                                            <li class="nav-item">
                                                <a class="nav-link color-link-black" href="consultar_solicitudes.html">Solicitudes de adopción</a>
                                            </li>
                                            `;
                                        }
                                        else {
                                            solicitudes += `
                                            <li class="nav-item">
                                                <a class="nav-link color-link-black" href="consultar_solicitudes.html">Solicitudes de adopción<i class='bx bxs-bell-ring bx-tada' style='color:#ff0000'  ></i></a>
                                            </li>
                                            `;
                                        }
                                        console.log(response);
                                        $(".menuHeader").prepend(solicitudes);
                                        $("#Cambio").html(nombre).addClass("nav-link color-link-black");
                                        $("#Cambio1").html("Mi Perfil").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './perfil_asociacionveterinaria.html');
                                        $("#Cambio2").hide();
                                        // $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './index.html');
                                        $("#oculto").show();
                                        opciones(1, nombre);
                                    },
                                    error: function (response) {
                                        console.log(response);
                                    }
                                });
                            }
                        }
                        else {
                            $.ajax({
                                type: "POST",
                                url: "./php/pruebaSesionadmin.php",
                                data: "",
                                dataType: "JSON",
                                success: function (response) {
                                    console.log(response);
                                    if (response[0]['estatus'] == 'SiAdmin') {
                                        var nombre = response[0]['nombre'] + " / " + response[0]['apellidoPaterno'];
                                        $("#Cambio").html(nombre).addClass("nav-link color-link-black");
                                        $("#Cambio1").html("Registrar Veterinarias").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './registro_asosiacionveterinaria.html');
                                        $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './index.html');
                                        $("#oculto2").show();
                                    }

                                }
                            });
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
                    $("#Cambio2").hide();
                    // $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './index.html');
                    $("#oculto").show();
                    opciones(0, nombre);
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

function cerrarSesion() {
    $.ajax({
        type: "POST",
        url: "./php/cerrarSesionUsuario.php",
        data: "",
        dataType: "JSON",
        success: function (response) {
            window.location.replace("index.html");
        }
    });
}

function opciones($usuario, $nombre) {
    var relleno = "";
    if ($usuario == 1) {
        $.ajax({
            type: "POST",
            url: "./php/notificacion_Mensajes_Vete.php",
            data: "",
            dataType: "JSON",
            success: function (response) {
                if (response[0]['sinLeer'] == 0)
                    relleno += `
                    <a class="dropdown-item" href="registro_mascotas.html"  role="button" aria-controls="InicioSesion">
                            Registar mascota
                        </a>
                        <a class="dropdown-item" href="registro_productos.html"  role="button" aria-controls="InicioSesion">
                            Registar producto
                        </a>
                        <a class="dropdown-item" href="mensajeria.html"  role="button" aria-controls="InicioSesion">
                            Mensajeria
                        </a>          
                        <a class="dropdown-item" href="index.html" role="button" aria-controls="InicioSesion" id="Cambio2" onclick="cerrarSesion()">
                        Cerrar Sesión  <i class='bx bx-log-out bx-flashing' style='color:#000000; font-size:20px;' ></i>
                        </a>             
                    `;
                else{
                    $("#Cambio").html($nombre+" <i class='bx bxs-message-rounded-error' style='color:#e80d0d'  ></i>").addClass("nav-link color-link-black");
                    relleno += `
                        <a class="dropdown-item" href="registro_mascotas.html"  role="button" aria-controls="InicioSesion">
                                Registar mascota
                            </a>
                            <a class="dropdown-item" href="registro_productos.html"  role="button" aria-controls="InicioSesion">
                                Registar producto
                            </a>
                            <a class="dropdown-item" href="mensajeria.html"  role="button" aria-controls="InicioSesion">
                                Mensajeria  <i class='bx bxs-message-alt-error bx-tada' style='color:#ff0000' ></i>
                            </a>          
                            <a class="dropdown-item" href="index.html" role="button" aria-controls="InicioSesion" id="Cambio2" onclick="cerrarSesion()">
                            Cerrar Sesión  <i class='bx bx-log-out bx-flashing' style='color:#000000; font-size:20px;' ></i>
                            </a>             
                        `;
                }
                $("#agregar").append(relleno);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: "./php/notificacion_Mensajes.php",
            data: "",
            dataType: "JSON",
            success: function (response) {
                if (response[0]['sinLeer'] == 0)
                    relleno += `
                    <a class="dropdown-item" href="mensajeria.html"  role="button" aria-controls="InicioSesion">
                            Mensajeria  
                        </a>
                        <a class="dropdown-item" href="seguimiento_adopcion.html"  role="button" aria-controls="InicioSesion">
                            Generar nuevo</br>seguimiento de<br>adopción
                        </a>
                        <a class="dropdown-item" href="consultar_solicitudes_propias.html"  role="button" aria-controls="InicioSesion">
                            Mis solicitudes
                        </a>
                        <a class="dropdown-item" href="index.html" role="button" aria-controls="InicioSesion" id="Cambio2" onclick="cerrarSesion()">
                        Cerrar Sesión  <i class='bx bx-log-out bx-flashing' style='color:#000000; font-size:20px;' ></i>
                        </a>    
                    `;
                else{
                    $("#Cambio").html($nombre+" <i class='bx bxs-message-rounded-error' style='color:#e80d0d'  ></i>").addClass("nav-link color-link-black");
                    relleno += `
                    <a class="dropdown-item" href="mensajeria.html"  role="button" aria-controls="InicioSesion">
                            Mensajeria  <i class='bx bxs-message-alt-error bx-tada' style='color:#ff0000' ></i>
                        </a>
                        <a class="dropdown-item" href="seguimiento_adopcion.html"  role="button" aria-controls="InicioSesion">
                            Generar nuevo</br>seguimiento de<br>adopción
                        </a>
                        <a class="dropdown-item" href="consultar_solicitudes_propias.html"  role="button" aria-controls="InicioSesion">
                            Mis solicitudes
                        </a>
                        <a class="dropdown-item" href="index.html" role="button" aria-controls="InicioSesion" id="Cambio2" onclick="cerrarSesion()">
                        Cerrar Sesión  <i class='bx bx-log-out bx-flashing' style='color:#000000; font-size:20px;' ></i>
                        </a>    
                    `;
                }
                $("#agregar").append(relleno);
            },
            error: function (response) {
                console.log(response)
            }
        });
    }    
}