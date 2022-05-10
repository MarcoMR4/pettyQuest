function botonClick(destinatario) {
    $(".enviarMensajeContacto").show();        
    $.post("./php/buscarAsociacionClave.php", { destinatario }, function (data) {
        console.log(data);
        data = JSON.parse(data);
        $("#nombre").val(data[0]['nombre']);
    });
    cargarMensajes(destinatario);
}

function removerMensajes() {
    // const list = document.getElementsByClassName("mensajesContacto");
    // if (list.hasChildNodes()) {
    //     list.removeChild(list.children[0]);
    // }
}

function cargarContactos() {
    $.post("./php/cargarContactos.php", {}, function (data) {
        console.log(data);
        data = JSON.parse(data);
        var relleno = "";
        data.map(item => {
            relleno += `
                <button class="btnContacto" value="${item.claveAsociacionVeterinaria}" onclick="botonClick(this.value)>
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

    // $(".btnContacto").click(function (e) {
    //     $(".enviarMensajeContacto").show();
    //     e.preventDefault();
    //     let destinatario = $(this).val();
    //     $.post("./php/buscarAsociacionClave.php", {destinatario}, function (data) {
    //         data = JSON.parse(data);   
    //         $("#nombre").val(data[0]['nombre']);                     
    //     });
    //     cargarMensajes(destinatario);
    // });
});