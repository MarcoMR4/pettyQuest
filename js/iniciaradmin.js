$(window).ready(function() {
    $('#formadmin').submit(function (e) { 
        e.preventDefault();
        var datos = $(this).serializeArray();
        $.ajax({

            type: "POST",
            url: "./php/iniciaradmin.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
              console.log(response);
              window.location.href = "./registro_asosiacionveterinaria.html";
            },
            error: function(response){
              console.log(response);
            }
        });
    });
});