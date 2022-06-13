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
                      <li class="list-group-item">Ubicacion: ${item.asociacion}<br>
                      ${item.calle} #${item.numero}, ${item.ciudad}
                      </li>
                      <li class="list-group-item">Teléfono: ${item.telefono}</li>
                      
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
    $("#btnExito1").click();
    return;
  }

  $.ajax({
    type: "post",
    url: "php/buscarProducto.php",
    data: {
      'buscar': nombre
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
                        <li class="list-group-item">Ubicacion: ${item.asociacion}<br>
                      ${item.calle} #${item.numero}, ${item.ciudad}
                      </li>
                      <li class="list-group-item">Teléfono: ${item.telefono}</li>
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
    data: "",
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
                <img src="${item.foto}" class="card-img-top imagenMascota" alt="...">
                <div class="card-body">
                  <form action="php/editarProducto.php" method="post" autocomplete="off">
                    <ul class="list-group list-group-flush">
                    <input type="text" name="idProducto" value="${item.idProducto}" style="display: none;">
                      <li class="list-group-item">
                        <h5 class="card-title"><input type="text" readonly class="form-control-plaintext" id="id1${item.idProducto}"
                            name="nombre" value="${item.nombre}" disabled></h5>
                      </li>
                      <li class="list-group-item"><input type="text" readonly class="form-control-plaintext"
                          id="id2${item.idProducto}" name="descripcion" value="${item.descripcion}" disabled></li>
                      <li class="list-group-item"><label for="id3${item.idProducto}" class="col-4">Precio $:</label><input
                          type="text" readonly class="form-control-plaintext class=" col-4" id="id3${item.idProducto}" name="precio"
                          value="${item.precio}" disabled></li>
                    </ul>
                    <input class="btn btn-outline-primary" type="submit" id="btnSubmit${item.idProducto}" style="display: none;">
                  </form>
                </div>
                <div class="btnEditar btn1${item.idProducto}">
                  <button class="btn btn-primary  col-12" id="btnMisProductos" type="button"
                    onclick="aceptar('${item.idProducto}')">Aceptar</button>
                  <button class="btn btn-warning col-12" id="btnMisProductos" type="button"
                    onclick="cancelar('${item.idProducto}')">Cancelar</button>
                </div>
                <div class="btnEditar2 btn2${item.idProducto}">
                  <button class="btn btn-success col-12" id="btnMisProductos" type="button"
                    onclick="editarProducto('${item.idProducto}')">Editar</button>
                  <button class="btn btn-danger col-12" id="btnMisProductos" type="button"
                    onclick="eliminarProductos('${item.idProducto}')">Eliminar</button>
                </div>
              </div>
            </div>
          `;
        }
      })
      $(".catalogo").html(relleno);
      $("#btnCancelar").show();
      $(".btnEditar").hide();
    }
  });
}



function editarProducto(idProducto) {
  var btn1= ".btn1"+idProducto;
  var btn2= ".btn2"+idProducto;
  $(btn1).show();
  $(btn2).hide();
  var inp1 = "#id1" + idProducto;
  var inp2 = "#id2" + idProducto;
  var inp3 = "#id3" + idProducto;
  $(inp1).attr('readonly', false).attr('disabled', false).attr('required', true);
  $(inp2).attr('readonly', false).attr('disabled', false).attr('required', true);
  $(inp3).attr('readonly', false).attr('disabled', false).attr('required', true);  
}

function cancelar(idProducto) {
  var btn1= ".btn1"+idProducto;
  var btn2= ".btn2"+idProducto;
  $(btn1).hide();
  $(btn2).show();
  var inp1 = "#id1" + idProducto;
  var inp2 = "#id2" + idProducto;
  var inp3 = "#id3" + idProducto;
  $(inp1).attr('readonly', true).attr('disabled', true).attr('required', false);
  $(inp2).attr('readonly', true).attr('disabled', true).attr('required', false);
  $(inp3).attr('readonly', true).attr('disabled', true).attr('required', false);

}

function aceptar(idProducto){
  var btnSub = "#btnSubmit"+idProducto;
  $(btnSub).click();
}

function eliminarProductos(idProducto){
  $.ajax({
    type: "POST",
    url: "php/eliminarProducto.php",
    data: {
      'idProducto': idProducto
    },
    dataType: "text",
    success: function (response) {
      console.log("Si llego al php "+ response);
      $("#btnModal").click();
    }
  });
}

$("#btnClose").click(function (e) { 
  location.reload();
});