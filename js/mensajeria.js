$(document).ready(function () {

    $(".enviarMensajeContacto").on('submit', function (e) {

        let mensaje = $("#mensajeContacto").val();
        let destinatario = $(".btnContacto").val();

        $.post("./php/mensajeria.php", { mensaje, destinatario }, function (data) {
            data = JSON.parse(data);
            console.log(data);
        });

    });

});