var destinatario;

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
                        contenido += `
                    <p id="remitente">
                    ${item.mensaje}
                    </p>
                    `;
                    }
                    else {
                        contenido += `
                    <p id="destinatario">
                    ${item.mensaje}
                    </p>
                    `;
                    }
                })
            else
                data.map(item => {
                    if ((item.usuario) == "1") {
                        contenido += `
                    <p id="remitente">
                    ${item.mensaje}
                    </p>
                    `;
                        }
                        else {
                            contenido += `
                    <p id="destinatario">
                    ${item.mensaje}
                    </p>
                    `;
                        }
                })
            $(".mensajesContacto").html(contenido);
        });
    });
}

// Seleccionar un contacto de la lista
function botonClick(clave) {

    destinatario = clave;
    $(".enviarMensajeContacto").show();
    let nombre = document.getElementById(destinatario).getElementsByClassName("nombrePerfil").item("p").textContent.trim().toString();
    $("#nombre").text(nombre);
    cargarMensajes();

}

// Cargar todos los contactos disponibles en la base de datos
function cargarContactos() {

    $.post("./php/identificarTipoUsuario.php", {}, function (tipo) {
        tipo = JSON.parse(tipo);
        tipo = tipo[0]['tipo'];
        $.post("./php/cargarContactos.php", { tipo }, function (data) {
            data = JSON.parse(data);
            var relleno = "";
            if (tipo == "0") {
                // console.log("prueba")              
                data.map(item => {
                    relleno += `
                        <button type="button" class="btnContacto" id="${item.claveAsociacionVeterinaria}" value="${item.claveAsociacionVeterinaria}" onclick="botonClick(this.value)">
                            <div class="contacto">
                            <div class="imagenPerfil">
                                <i class='bx bxs-user-circle'></i>
                            </div>
                            <div class="nombrePerfil">
                                <p>${item.nombre}</p>
                            </div>
                            </div>
                        </button>
                    `;
                })
            }
            else {
                data.map(item => {
                    relleno += `
                        <button type="button" class="btnContacto" id="${item.idUsuario}" value="${item.idUsuario}" onclick="botonClick(this.value)">
                            <div class="contacto">
                            <div class="imagenPerfil">
                                <i class='bx bxs-user-circle'></i>
                            </div>
                            <div class="nombrePerfil">
                                <p>${item.nombre}</p>
                            </div>
                            </div>
                        </button>
                    `;
                })
            }
            $(".contactos").html(relleno);
        });

    });

}

$(document).ready(function () {
    cargarContactos();
    $(".enviarMensajeContacto").hide();

    $(".enviarMensajeContacto").on('submit', function (e) {
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
            });
        });
    });
});