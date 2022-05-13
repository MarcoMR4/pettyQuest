// Eliminar mensajes del chat anterior
function removerMensajes() {
    // const list = document.getElementsByClassName("mensajesContacto");
    // if (list.hasChildNodes()) {
    //     list.removeChild(list.children[0]);
    // }
}

// Separar mensajes de remitente y destinatario
function dividirMensajes(remitente, mensaje) {
    const divMensaje = document.querySelector(".mensajesContacto");
    const parrafo = document.createElement("p");
    parrafo.textContent = mensaje;
    if (remitente == true)
        parrafo.id = "mensajeRemitente";
    else
        parrafo.id = "mensajeDestinatario";
    divMensaje.insertAdjacentElement("beforeend", parrafo);
}

// Obtener mensajes del remitente con el destinatario
function cargarMensajes(destinatario) {
    removerMensajes();
    $.post("./php/cargarMensajes.php", { destinatario }, function (data) {
        console.log(data);
        data = JSON.parse(data);
        for (let i = 0; i < Object.keys(data).length; i++) {
            if (data[i]['claveRemitente'] != destinatario) {
                dividirMensajes(true, data[i]['mensaje']);
            }
            else {
                dividirMensajes(false, data[i]['mensaje']);
            }
        }
    });
}

// Seleccionar un contacto de la lista
function botonClick(destinatario) {
    $(".enviarMensajeContacto").show();
    let nombre = document.getElementById(destinatario).getElementsByClassName("nombrePerfil").item("p").textContent.trim().toString();
    $("#nombre").text(nombre);
    cargarMensajes(destinatario);
}

// Cargar todos los contactos disponibles en la base de datos
function cargarContactos() {    
    $.post("./php/cargarContactos.php", {}, function (data) {
        data = JSON.parse(data);
        var relleno = "";
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
        $(".contactos").html(relleno);
    });
}

$(document).ready(function () {
    cargarContactos();
    $(".enviarMensajeContacto").hide();
    $(".enviarMensajeContacto").on('submit', function (e) {

        let mensaje = $("#mensajeContacto").val();
        let destinatario = $(".btnContacto").val();

        $.post("./php/mensajeria.php", { mensaje, destinatario }, function (data) {
            data = JSON.parse(data);
            console.log(data);
        });
        cargarMensajes();
    });
});