$(window).ready(function() {
    const formulario = document.querySelector('#formproducto');
    $('#formproducto').submit(function (e) { 
        e.preventDefault();
        const datos= new FormData(formulario);
        console.log(datos.get('foto'));
        $.ajax({
          type: "POST",
          url: "./php/registro_productos.php",
          data: datos,
          contentType:false,
          cache: false,
          processData: false,
          success: function (response) {
            console.log(response);
          }
        });
        
    });

    $("#btnFoto").click(function (e) { 
        e.preventDefault();
        $("#nuevaFoto").click();
    });
});