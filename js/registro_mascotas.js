$(window).ready(function() {
    const formulario = document.querySelector('#formMascotas');
    $('#formMascotas').submit(function (e) { 
        e.preventDefault();
        const datos= new FormData(formulario);
        console.log(datos.get('foto'));
        $.ajax({
            type: "POST",
            url: "./php/registro_mascotas.php",
            data: datos,
            contentType:false,
            cache: false,
            processData: false,
            success: function (response) {
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            }
        });
        
    });

    $("#btnFoto").click(function (e) { 
        e.preventDefault();
        $("#nuevaFoto").click();
    });

});