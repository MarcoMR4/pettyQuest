$(window).ready(function () {
  var usuarioexiste = 0;
  $("#formini").submit(function (e) {
    e.preventDefault();
    var opcion = $("input:radio[name=btnradio]:checked").val();
    console.log(opcion);
    var datos = $(this).serializeArray();

    $.ajax({
      type: "POST",
      url: "./php/login.php",
      data: datos,
      dataType: "JSON",
      success: function (response) {
        //obtener tamaño del json
        usuarioexiste = Object.keys(response).length;
        if (usuarioexiste == 1) {
          console.log(response);
          $.getScript("./js/cambio_menu_tipo.js", function () {});
          $("#btnsalirsesion").trigger("click");
        } else {
          $.ajax({
            type: "POST",
            url: "./php/loginVeterinaria.php",
            data: datos,
            dataType: "JSON",
            success: function (response) {
              //obtener tamaño del json
              usuarioexiste = Object.keys(response).length;
              if (usuarioexiste == 1) {
                console.log(response);
                $.getScript("./js/cambio_menu_tipo.js", function () {});
                $("#btnsalirsesion").trigger("click");
              } else {
                $.ajax({
                  type: "POST",
                  url: "./php/iniciaradmin.php",
                  data: datos,
                  dataType: "JSON",
                  success: function (response) {
                    //obtener tamaño del json
                    usuarioexiste = Object.keys(response).length;
                    if (usuarioexiste == 1) {
                      console.log(response);
                      window.location.href = "./catalogo_veterinarias.html";
                      $("#btnsalirsesion").trigger("click");
                    } else {
                      $("#feedback-1").text("Usuario o Contraseña incorrectos");
                    }
                  },
                });
              }
            },
          });
        }
      },
      error: function (response) {
        console.log(response);
      },
    });

    /* Llamar otro js desde este mismo */
    //$.getScript('./js/cambio_menu_tipo.js', function(){});

    /* Dar click al boton de x en el registro desde aqui */
  });
});
