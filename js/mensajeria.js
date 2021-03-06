var destinatario;

// Marcar mensajes como vistos
function mensajesVistos() {
    $.ajax({
        type: "POST",
        url: "./php/identificarTipoUsuario.php",
        data: "",
        dataType: "JSON",
        success: function (response) {
            if (response[0]['tipo'] != 0) {
                $.ajax({
                    type: "POST",
                    url: "./php/mensajesVistos_Vete.php",
                    data: { "contacto": destinatario },
                    dataType: "JSON",
                    success: function (response) {
                        // console.log(response)
                    }
                });
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "./php/mensajesVistos.php",
                    data: { "contacto": destinatario },
                    dataType: "JSON",
                    success: function (response) {
                        // console.log(response)
                    }
                });

            }
        }
    });
}

// Obtener mensajes del remitente con el destinatario
function cargarMensajes() {
    $.post("./php/identificarTipoUsuario.php", {}, function (tipo) {
        tipo = JSON.parse(tipo);
        tipo = tipo[0]['tipo'];
        var direccion = "";
        if (tipo == 0)
            direccion = "./php/cargarMensajes.php";
        else
            direccion = "./php/cargarContactos_veterinaria.php";
        $.post(direccion, { destinatario }, function (data) {
            var contenido = "";
            // console.log(data)
            data = JSON.parse(data);
            if (tipo == "0")
                data.map(item => {
                    if ((item.usuario) == "0") {
                        if ((item.cartilla) != null) {
                            contenido += `
                                <div class="mensaje">
                                <p id="remitente">
                                ${item.mensaje}                    
                                <img src="${item.cartilla}" alt="cartilla" width="290" height="290">
                                <img src="${item.mascota}" alt="mascota" width="290" height="290">
                                </p>
            
                                </div>
                            `;
                        }
                        else {
                            contenido += `
                                <div class="mensaje">
                                <p id="remitente">
                                ${item.mensaje}                    
                                </p>
            
                                </div>
                            `;
                        }
                    }
                    else {
                        contenido += `
                    <div class="mensaje">
                    <p id="destinatario">
                    ${item.mensaje}
                    </p>
                    </div>
                    `;
                    }
                })
            else
                data.map(item => {
                    if ((item.usuario) == "1") {
                        contenido += `
                    <div class="mensaje">
                    <p id="remitente">
                    ${item.mensaje}
                    </p>
                    </div>
                    `;
                    }
                    else {
                        if ((item.cartilla) != null) {
                            contenido += `
                                <div class="mensaje">
                                <p id="destinatario">
                                ${item.mensaje}
                                <img src="${item.cartilla}" alt="cartilla" width="290" height="290">
                                <img src="${item.mascota}" alt="mascota" width="290" height="290">
                                </p>
                                </div>
                            `;
                        }
                        else {
                            contenido += `
                                <div class="mensaje">
                                <p id="destinatario">
                                ${item.mensaje}                                
                                </p>
                                </div>
                            `;
                        }
                    }
                })
            $(".mensajesContacto").html(contenido);
        });
    });
}

// Seleccionar un contacto de la lista
function botonClick(clave) {

    destinatario = clave;
    mensajesVistos();
    cargarContactos();
    $("#mensajeContacto").show();
    $("#btnEnviarMensajeContacto").show();
    let nombre = document.getElementById(destinatario).getElementsByClassName("nombrePerfil").item("p").textContent.trim().toString();
    $("#nombreContactoUp").text(nombre);
    cargarMensajes();
    // Cargar informacion de contacto
    $.ajax({
        type: "POST",
        url: "./php/identificarTipoUsuario.php",
        data: "",
        dataType: "JSON",
        success: function (response) {
            console.log(response[0]['tipo'])            
            // Rellenar info de veterinarias
            if (response[0]["tipo"] == 0) {
                $.ajax({
                    type: "POST",
                    url: "./php/buscarAsociacionClave.php",
                    data: {"idAsociacion":destinatario},
                    dataType: "JSON",
                    success: function (response) {
                        $(".espacioEdadContacto").hide();
                        $("#hrEdadContacto").hide();
                        $(".nombreCompletoContacto").text(response[0]['nombre']);
                        $(".telefonoContacto").text(response[0]['telefono']);
                        $('.geolocalizacionContacto').prop('href', response[0]['geolocalizacion']);
                        $(".direccionContacto").text(response[0]['ciudad'] + ", " + response[0]['calle'] + " #" + response[0]['numero']);
                    },
                    error: function (response) {
                        console.log(response)
                    }
                });
            }
            // Rellenar info de usuarios
            else {
                $.ajax({
                    type: "POST",
                    url: "./php/buscarUsuario.php",
                    data: destinatario,
                    dataType: "JSON",
                    success: function (response) {
                        $(".nombreCompletoContacto").text(response[0]['nombre']+" "+response[0]['apellidoPaterno']+" "+response[0]['apellidoMaterno']);
                        $(".telefonoContacto").text(response[0]['telefono']);
                        $(".edadContacto").text(response[0]['edad']);
                        $(".direccionContacto").text(response[0]['ciudad'] + ", " + response[0]['calle'] + " #" + response[0]['numeroCasa']);
                        $('.geolocalizacionContacto').prop('href', response[0]['geolocalizacion']);
                    }
                });
            }
        }
    });
}

// Cargar todos los contactos disponibles en la base de datos
function cargarContactos() {

    $.post("./php/identificarTipoUsuario.php", {}, function (tipo) {
        tipo = JSON.parse(tipo);
        tipo = tipo[0]['tipo'];
        $.post("./php/cargarContactos.php", { tipo }, function (data) {
            data = JSON.parse(data);
            var relleno = "";
            // Cargar contactos para usuario
            if (tipo == "0") {

                data.map(item => {

                    $.ajax({
                        type: "POST",
                        url: "./php/notificacion_Mensajes_Contacto.php",
                        data: { 'contacto': item.claveAsociacionVeterinaria },
                        dataType: "JSON",
                        success: function (response) {
                            // console.log(response)
                            // Hay mensajes sin leer
                            if (response[0]['totalMensajes'] != 0)
                                relleno += `
                                    <button type="button" class="btnContacto" id="${item.claveAsociacionVeterinaria}" value="${item.claveAsociacionVeterinaria}" onclick="botonClick(this.value)">
                                        <div class="contacto">
                                        <div class="imagenPerfil">
                                            <p id="mensajeSinLeer">${response[0]['totalMensajes']}</p>
                                        </div>
                                        <div class="nombrePerfil">
                                            <p>${item.nombre}</p>                                
                                        </div>
                                        </div>
                                    </button>
                                `;
                            // No hay mensajes sin leer
                            else
                                relleno += `
                                <button type="button" class="btnContacto" id="${item.claveAsociacionVeterinaria}" value="${item.claveAsociacionVeterinaria}" onclick="botonClick(this.value)">
                                    <div class="contacto">
                                    <div class="imagenPerfil">
                                        <p id="sinMensajes"><i class='bx bx-check' style='color:#25f706' ></i></p>
                                    </div>
                                    <div class="nombrePerfil">
                                        <p>${item.nombre}</p>                                
                                    </div>
                                    </div>
                                </button>
                                `;
                            $(".contactos").html(relleno);
                        },
                        error: function (response) {
                            console.log(response)
                        }
                    });

                })
            }
            // Cargar contactos para veterinaria 
            else {
                data.map(item => {
                    // console.log(item)
                    $.ajax({
                        type: "POST",
                        url: "./php/notificacion_Mensajes_Contacto_Vete.php",
                        data: { 'contacto': item.idUsuario },
                        dataType: "JSON",
                        success: function (response) {
                            console.log(response)
                            // Hay mensajes sin leer
                            console.log(item)
                            if (response[0]['totalMensajes'] != 0)
                                relleno += `
                                    <button type="button" class="btnContacto" id="${item.idUsuario}" value="${item.idUsuario}" onclick="botonClick(this.value)">
                                        <div class="contacto">
                                        <div class="imagenPerfil">
                                            <p id="mensajeSinLeer">${response[0]['totalMensajes']}</p>
                                        </div>
                                        <div class="nombrePerfil">
                                            <p>${item.nombre}</p>
                                        </div>
                                        </div>
                                    </button>
                                `;
                            // No hay mensajes sin leer
                            else
                                relleno += `
                                    <button type="button" class="btnContacto" id="${item.idUsuario}" value="${item.idUsuario}" onclick="botonClick(this.value)">
                                        <div class="contacto">
                                        <div class="imagenPerfil">
                                            <p id="sinMensajes"><i class='bx bx-check' style='color:#25f706' ></i></p>
                                        </div>
                                        <div class="nombrePerfil">
                                            <p>${item.nombre}</p>
                                        </div>
                                        </div>
                                    </button>
                                `;
                            $(".contactos").html(relleno);
                        },
                        error: function (response) {
                            console.log(response)
                        }
                    });

                })
            }
            $(".contactos").html(relleno);
        });

    });

}

// Enviar un mensaje
function EnviarMensaje() {
    // e.preventDefault();

    if ($("#mensajeContacto").val() != "")
        $.post("./php/identificarTipoUsuario.php", {}, function (tipo) {
            tipo = JSON.parse(tipo);
            tipo = tipo[0]['tipo'];
            var direccion = "";
            if (tipo == "0")
                direccion = "./php/mensajeria.php";
            else
                direccion = "./php/mensajeria_veterinaria.php";
            let mensaje = $("#mensajeContacto").val();
            $.post(direccion, { mensaje, destinatario }, function (data) {
                data = JSON.parse(data);
                $("#mensajeContacto").val("");
                cargarMensajes();
            });
        });
}

$(document).ready(function () {
    cargarContactos();
    $("#mensajeContacto").hide();
    $("#btnEnviarMensajeContacto").hide();
    $(".cardInfoContacto").hide();

    $("#btnEnviarMensajeContacto").click(function (e) {
        EnviarMensaje()
    });

    $("#btnContactoInfo").click(function (e) {
        $(".cardInfoContacto").show(500);
    });

    $('#mensajeContacto').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            EnviarMensaje()();
        }
    });

    $(".btn-close").click(function (e) {
        $(".cardInfoContacto").hide(500);

    });

    // $(".enviarMensajeContacto").on('submit', function (e) {
    // });
});



