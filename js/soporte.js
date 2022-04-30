function mostrarConversacion(mostrar) {
    if (!mostrar) {
        $(".conversacion").show(500);
        $(".card-footer").show(500);
        return true;
    }
    else {
        $(".conversacion").hide(500);
        $(".card-footer").hide(500);
        return false;
    }
}

$(document).ready(function () {
    let mostrar = false;
    $(".conversacion").hide();
    $(".card-footer").hide();

    $("#btnSoporte").click(function () {
        if (!mostrar)
            mostrar = mostrarConversacion(mostrar);

        else
            mostrar = mostrarConversacion(mostrar);

    });
});