function mostrarConversacion(mostrar) {
    if (!mostrar) {
        $(".conversacion").show(500);
        $(".pieConversacion").show(500);
        return true;
    }
    else {
        $(".conversacion").hide(500);
        $(".pieConversacion").hide(500);
        return false;
    }
}

$(document).ready(function () {
    let mostrar = false;
    $(".conversacion").hide();
    $(".pieConversacion").hide();

    $(".btnSoporte").click(function () {
        if (!mostrar)
            mostrar = mostrarConversacion(mostrar);

        else
            mostrar = mostrarConversacion(mostrar);
    });
});