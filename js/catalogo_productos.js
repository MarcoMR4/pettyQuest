$(window).ready(function () {
  $("#btnAgregar").hide();
  $("#btnCancelar").hide();
  $.ajax({
    type: "POST",
    url: "./php/identificarTipoUsuario.php",
    data: "data",
    dataType: "JSON",
    success: function (response) {
      console.log(response[0]['tipo']);
      if (response[0]['tipo'] == "0") {
        $("#btnAgregar").hide();
        $("#btnMisProductos").hide();
      }
      else {
        $("#btnAgregar").show();
        $("#btnMisProductos").show();
      }
    }
  });

  $.ajax({
    type: "POST",
    url: "./php/mascotasBuscadas.php",
    data: "",
    dataType: "JSON",
    success: function (response) {

      console.log("response");
      console.log(response);

    }
  });

  /* conseguimos los datos para llenar el catalogo*/
  $.ajax({
    type: "POST",
    url: "./php/catalogo_Producto.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada producto encontrada*/
      response.map(item => {
        relleno += `
                <div class="col">
                <div class="card h-100">
                    <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.idProducto}')">
                  <div class="card-body">
                  <form action="php/encontrarPerfil.php" method="post" autocomplete="off">
                  <input type="text" name="idProducto" value="${item.idProducto}" style="display: none;">
                  <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.idProducto}" style="display: none;">
                  </form>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        <h5 class="card-title">${item.nombre}</h5>
                      </li>
                      <li class="list-group-item">${item.descripcion}</li>
                      <li class="list-group-item">Precio: $${item.precio}</li>
                    </ul>
                    
                  </div>
                </div>
              </div>
                `;
      })
      $(".catalogo").html(relleno);
    }
  });

});

function buscarProductosPorNombre() {
  var nombre = $("#idBuscar").val();
  if (nombre == "" || nombre == null) {
    alert("Nombre de producto vacio");
    return;
  }

  $.ajax({
    type: "post",
    url: "php/buscarProducto.php",
    data: {
      buscar: nombre
    },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada producto encontrada*/
      response.map(item => {
        relleno += `
          <div class="col">
          <div class="card h-100">
              <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.idProducto}')">
            <div class="card-body">
            <form action="php/encontrarPerfil.php" method="post" autocomplete="off">
            <input type="text" name="idProducto" value="${item.idProducto}" style="display: none;">
            <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.idProducto}" style="display: none;">
            </form>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h5 class="card-title">${item.nombre}</h5>
                </li>
                <li class="list-group-item">${item.descripcion}</li>
                <li class="list-group-item">Precio: $${item.precio}</li>
              </ul>
              
            </div>
          </div>
        </div>
          `;
      })
      $(".catalogo").html(relleno);
      $("#btnCancelar").show();
    }
  });
}

$("#btnCancelar").click(function (e) {
  $.ajax({
    type: "POST",
    url: "./php/catalogo_Producto.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada producto encontrada*/
      response.map(item => {
        relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.idProducto}')">
                    <div class="card-body">
                    <form action="php/encontrarPerfil.php" method="post" autocomplete="off">
                    <input type="text" name="idProducto" value="${item.idProducto}" style="display: none;">
                    <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.idProducto}" style="display: none;">
                    </form>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                        </li>
                        <li class="list-group-item">${item.descripcion}</li>
                        <li class="list-group-item">Precio: $${item.precio}</li>
                      </ul>
                      
                    </div>
                  </div>
                </div>
                  `;
      })
      $(".catalogo").html(relleno);
    }
  });
  $("#btnCancelar").hide();
});

$('#idBuscar').keypress(function (event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    buscarProductosPorNombre();
  }
});

function misProductos() {
  var claveAsociacionVeterinaria;
  //Conseguimos el ID de la veterinaria
  $.ajax({
    type: "POST",
    url: "./php/pruebaSesionVeterinaria.php",
    data: "",
    dataType: "JSON",
    success: function (response2) {
      claveAsociacionVeterinaria = response2[0]['claveAsociacionVeterinaria'];
    }
  });
  $.ajax({
    type: "post",
    url: "php/misProductos.php",
    data:"",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada producto encontrada*/
      response.map(item => {
        if (`${item.claveAsociacionVeterinaria}` == claveAsociacionVeterinaria) {
        relleno += `
          <div class="col">
          <div class="card h-100">
              <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." >
            <div class="card-body">
            <input type="text" name="idProducto" value="${item.idProducto}" style="display: none;">
            <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.idProducto}" style="display: none;">
            <form action="php/editarProducto.php" method="post" autocomplete="off">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h5 class="card-title"><input type="text" readonly class="form-control-plaintext" id="idUbicacion" name="idUbicacion" value="${item.nombre}" disabled></h5>
                </li>
                <li class="list-group-item"><input type="text" readonly class="form-control-plaintext clase${item.idProducto}" id="idUbicacion" name="idUbicacion" value="${item.descripcion}" disabled></li>
                <li class="list-group-item">Precio: $<input type="text" readonly class="form-control-plaintext clase${item.idProducto}" id="idUbicacion" name="idUbicacion" value="${item.precio}" disabled></li>
              </ul>
              </form>
            </div>
            <button class="btn btn-success" id="btnMisProductos" type="button" onclick="editarProducto('${item.idProducto}', 'clase${item.idProducto}')">Editar</button>
            <button class="btn btn-danger" id="btnMisProductos" type="button">Eliminar</button>
          </div>
        </div>
          `;
        }
      })
      $(".catalogo").html(relleno);
      $("#btnCancelar").show();
    }
  });
}

function editarProducto(idProducto, claseInput) {
  console.log(idProducto);
  
}
