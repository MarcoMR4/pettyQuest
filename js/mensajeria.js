function removerMensajes() {
    const list = document.getElementsByClassName("mensajesContacto");
    if (list.hasChildNodes()) {
        list.removeChild(list.children[0]);
    }
}

function cargarContactos() {
    $.post("./php/cargarContactos.php", {}, function (data) {
        data = JSON.parse(data);
        const divContactos = document.querySelector(".contactos");
        for (let i = 0; i < Object.keys(data).length; i++) {
            // crear elementos
            const boton = document.createElement("button");
            boton.className = "btnContacto";
            boton.value = data[i]['claveAsociacionVeterinaria'];
            const divContacto = document.createElement("div");
            divContacto.className = "contacto";
            const divImagen = document.createElement("div");
            divImagen.className = "imagenPerfil";
            const divNombre = document.createElement("div");
            divNombre.className = "nombrePerfil";
            const imagen = document.createElement("i");
            imagen.className = "bx bxs-user-circle";
            const nombre = document.createElement("p");
            nombre.textContent = data[i]['nombre'];
            // Colocar elementos
            divImagen.insertAdjacentElement("afterbegin", imagen);
            divNombre.insertAdjacentElement("afterbegin", nombre);
            divContacto.insertAdjacentElement("afterbegin", divImagen);
            divContacto.insertAdjacentElement("beforeend", divNombre);
            divContactos.insertAdjacentElement("beforeend", divContacto);
        }
    });
}

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

function cargarMensajes(destinatario) {
    removerMensajes();
    $.post("./php/cargarMensajes.php", { destinatario }, function (data) {
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

    $(".btnContacto").click(function (e) {
        $(".enviarMensajeContacto").show();
        e.preventDefault();
        let destinatario = $(this).val();
        $.post("./php/buscarAsociacionClave.php", {destinatario}, function (data) {
            data = JSON.parse(data);   
            $("#nombre").val(data[0]['nombre']);                     
        });
        cargarMensajes(destinatario);
    });
});