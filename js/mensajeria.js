var destinatario;

// Obtener mensajes del remitente con el destinatario
function cargarMensajes(destinatario) {    
    $.post("./php/cargarMensajes.php", { destinatario }, function (data) {        
        var contenido = "";
        data = JSON.parse(data);
        data.map(item => {
            if((item.usuario) == "0"){
                contenido += `
                    <p id="remitente">
                    ${item.mensaje}
                    </p>
                `;
            }
            else{
                contenido += `
                    <p id="destinatario">
                    ${item.mensaje}
                    </p>
                `;                
            }
        })
        $(".mensajesContacto").html(contenido);
    });
}

// Seleccionar un contacto de la lista
function botonClick(clave) {    
    
    destinatario = clave;
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
        $.post("./php/mensajeria.php", { mensaje, destinatario }, function (data) {
            data = JSON.parse(data);            
        });        
    });
});