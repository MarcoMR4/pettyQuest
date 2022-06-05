$(window).ready(actualizarMenu);

function actualizarMenu() {
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
                                        if(response[0]['cantidad'] == 0 ){
                                            solicitudes+=`
                                            <li class="nav-item">
                                                <a class="nav-link color-link-black" href="consultar_solicitudes.html">Solicitudes de adopción</a>
                                            </li>
                                            `;
                                        }
                                        else{
                                            solicitudes+=`
                                            <li class="nav-item">
                                                <a class="nav-link color-link-black" href="consultar_solicitudes.html">Solicitudes de adopción<i class='bx bxs-bell-ring bx-tada' style='color:#ff0000'  ></i></a>
                                            </li>
                                            `;
                                        }
                                        console.log(response);
                                        $(".menuHeader").prepend(solicitudes);
                                        $("#Cambio").html(nombre).addClass("nav-link color-link-black");                                
                                        $("#Cambio1").html("Mi Perfil").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './perfil_asociacionveterinaria.html');
                                        $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href', './index.html');
                                        $("#oculto").show();
                                        opciones(1);                                        
                                    },
                                    error: function(response){
                                        console.log(response);
                                    }
                                });
                            }
                        }
                        else{
                            $.ajax({
                                type: "POST",
                                url: "./php/pruebaSesionadmin.php",
                                data: "",
                                dataType: "JSON",
                                success: function (response) {
                                    console.log(response);
                                    if(response[0]['estatus'] == 'SiAdmin'){
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
        `;
    else
        relleno += `
           <li><a class="dropdown-item" href="mensajeria.html"  role="button" aria-controls="InicioSesion">
                Mensajeria
            </a></li>
            <li><a class="dropdown-item" href="seguimiento_adopcion.html"  role="button" aria-controls="InicioSesion">
                Generar nuevo</br>seguimiento de adopcion
            </a></li>
        `;
    $("#agregar").append(relleno);
}