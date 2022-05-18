function mostrar(valor, activo) {
    console.log("valor:"+valor+", activo:"+activo)
    if (activo == "") {
        $("#"+valor+"").show();
    }    
    else {
        $("#"+$("#"+activo+"").attr('value')+"").hide();
        $("#"+valor+"").show();
    }
    console.log($("[value=" + valor + "]").attr("id"))
    return $("[value=" + valor + "]").attr("id");
}

$(document).ready(function () {
    let activo = "";
    $("#guiaAdopcion").hide();
    $("#manualCuidadosPerro").hide();
    $("#manualCuidadosGatos").hide();
    $("#guiaCuidadosAlimentacion").hide();
    $("#1").click(function (e) {        
        e.preventDefault();
        activo = mostrar(this.value, activo);
    });
    $("#2").click(function (e) {        
        e.preventDefault();
        activo = mostrar(this.value, activo);
    });
    $("#3").click(function (e) {        
        e.preventDefault();
        activo = mostrar(this.value, activo);
    });
    $("#4").click(function (e) {        
        e.preventDefault();
        activo = mostrar(this.value, activo);
    });
});