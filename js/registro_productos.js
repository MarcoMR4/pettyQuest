$(window).ready(function() {

    $('#formproducto').submit(function (e) { 
        e.preventDefault();
        var datos = $(this).serializeArray();
        $.ajax({
          type: "POST",
          url: "./php/registro_productos.php",
          data: datos,
          dataType: "JSON",
          success: function (response) {
              console.log(response);
          }
        });
        
    });
});