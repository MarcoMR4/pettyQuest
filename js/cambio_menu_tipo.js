$(window).ready(actualizarMenu);

function actualizarMenu(){
    var usuarioexiste = 0;

    $.ajax({
        type: "POST",
        url: "./php/pruebaSesionUsuario.php",
        data: "",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            if(response[0]['estatus']=='NoUsuario'){
                /* checamos si es veterinaria */
                $.ajax({
                   
                    type: "POST",
                    url: "./php/pruebaSesionVeterinaria.php",
                    data: "",
                    dataType: "JSON",
                    success: function (response) {
                        console.log(response);
                       
                        if(response[0]['estatus']=='SiVeterinaria'){
                            usuarioexiste = (Object.keys(response).length);
                            if (usuarioexiste == 1) {
                                var nombre = response[0]['nombre']+ " / " +response[0]['nombreEncargado'];
                                $("#Cambio").html(nombre).addClass("nav-link color-link-black");
                                $("#Cambio1").html("Mi Perfil").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href','./perfil_asociacionveterianaria.html');
                                $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href','./index.html');
                                opciones();
                            }
                        }

                        
                    }
                });
            }
            else if(response[0]['estatus']=='SiUsuario'){
                usuarioexiste = (Object.keys(response).length);
                if (usuarioexiste == 1) {
                    var nombre = response[0]['nombre']+ " " +response[0]['apellidoPaterno']+ " " +response[0]['apellidoMaterno'];
                    $("#Cambio").html(nombre).addClass("nav-link color-link-black");
                    $("#Cambio1").html("Mi Perfil").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href','./perfil_usuario.html');
                    $("#Cambio2").html("Cerrar Sesion").addClass("dropdown-item").removeAttr("data-bs-toggle").attr('href','./index.html');
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

function opciones(){
    var relleno = "";
        relleno += `
           <li><a class="dropdown-item" href="registro_mascotas.html"  role="button" aria-controls="InicioSesion">
                Registar mascota
            </a></li>
            <li><a class="dropdown-item" href="registro_productos.html"  role="button" aria-controls="InicioSesion">
                Registar producto
            </a></li>
        `;
    $("#agregar").append(relleno);
}