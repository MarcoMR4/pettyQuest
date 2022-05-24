$(window).ready(function () {
  $("#selectOpcionFiltro").prop('disabled', true);
  $("#btnAgregar").hide();
  $("#btnCancelar").hide();
  $("#selectFiltro").val(0);
  var opciones = ``;
  $("#selectOpcionFiltro").html(opciones);
  $("#selectOpcionFiltro").prop('disabled', true);
  // identificamos el tip ode usuario para saber que mostrar en pantalla
  $.ajax({
    type: "POST",
    url: "./php/identificarTipoUsuario.php",
    data: "data",
    dataType: "JSON",
    success: function (response) {
      console.log(response[0]['tipo']);
      if (response[0]['tipo'] == "0") {
        $("#btnAgregar").hide();
        $("#btnMisMascotas").hide();
      }
      else {
        $("#btnAgregar").show();
        $("#btnMisMascotas").show();
      }
    }
  });

  /* conseguimos los datos para llenar el catalogo*/
  catalogo();

});

function catalogo(){
  $.ajax({
    type: "POST",
    url: "./php/catalogo_mascotas.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada mascota encontrada*/
      response.map(item => {
        relleno += `
                <div class="col">
                <div class="card h-100">
                    <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                  <div class="card-body">
                  <form action="php/encontrarPerfil.php" method="post" autocomplete="off">
                  <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                  <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                  </form>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        <h5 class="card-title">${item.nombre}</h5>
                      </li>
                      <li class="list-group-item">${item.edad}</li>
                      <li class="list-group-item">${item.genero}</li>
                    </ul>
                    <div class="card-footer">
                    ${item.estatus}
                    </div>
                    
                  </div>
                </div>
              </div>
                `;
      })
      $(".catalogo").html(relleno);
    }
  });
}

function clickearPerro(idPerro) {
  console.log(idPerro);
  $(`#btnSubmit${idPerro} `).click();
}

function buscarMascotaPorNombre() {
  var nombre = $("#idBuscar").val();
  if (nombre == "" || nombre == null) {
    $("#btnExito").click();
    return;
  }

  $.ajax({
    type: "post",
    url: "php/buscarMascota.php",
    data: {
      buscar: nombre
    },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada mascota encontrada*/
      response.map(item => {
        relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                    <div class="card-body">
                    <form action="php/encontrarPerfil.php" method="post" autocomplete="off">
                    <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                    <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                    </form>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                        </li>
                        <li class="list-group-item">${item.edad}</li>
                        <li class="list-group-item">${item.genero}</li>
                      </ul>
                      <div class="card-footer">
                      ${item.estatus}
                      </div>
                      
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
  catalogo();
  $("#btnCancelar").hide();
  $("#selectFiltro").val(0);
  var opciones = ``;
  $("#selectOpcionFiltro").html(opciones);
  $("#selectOpcionFiltro").prop('disabled', true);

});

$('#idBuscar').keypress(function (event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    buscarMascotaPorNombre();
  }
});

function misMascotas() {
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
    url: "php/misMascotas.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada mascota encontrada*/
      response.map(item => {
        if (`${item.claveAsociacionVeterinaria}` == claveAsociacionVeterinaria) {
          relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                    <div class="card-body">
                    <form action="php/encontrarPerfil.php" method="post" autocomplete="off">
                    <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                    <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                    </form>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                        </li>
                        <li class="list-group-item">${item.edad}</li>
                        <li class="list-group-item">${item.genero}</li>
                      </ul>
                      <div class="card-footer">
                      ${item.estatus}
                      </div>
                      
                    </div>
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

$("#btnMisMascotas").click(function (e) {
  e.preventDefault();
  misMascotas();
  
});

$("#selectFiltro").change(function (e) {
  e.preventDefault();
  if ($("#selectFiltro").val() == "tamaño") {
    var opciones = `
    <option selected value="0">Cualquier tamaño</option>
    <option value="Pequeño">Pequeño</option>
    <option value="Mediano">Mediano</option>
    <option value="Grande">Grande</option>
    `;
    $("#selectOpcionFiltro").prop('disabled', false);
    $("#selectOpcionFiltro").html(opciones);
    $("#btnCancelar").show();
  }
  else if ($("#selectFiltro").val() == "edad") {
    var opciones = `
    <option selected value="0">Cualquier edad</option>
    <option value="Cachorro">Cachorro</option>
    <option value="Joven">Joven</option>
    <option value="Adulto">Adulto</option>
    <option value="Anciano">Anciano</option>
    `;
    $("#selectOpcionFiltro").prop('disabled', false);
    $("#selectOpcionFiltro").html(opciones);
    $("#btnCancelar").show();
  }
  else if ($("#selectFiltro").val() == "genero") {
    var opciones = `
    <option selected value="0">Cualquier genero</option>
    <option value="Macho">Macho</option>
    <option value="Hembra">Hembra</option>
    `;
    $("#selectOpcionFiltro").prop('disabled', false);
    $("#selectOpcionFiltro").html(opciones);
    $("#btnCancelar").show();
  }
  else{
    var opciones = ``;
    $("#selectOpcionFiltro").html(opciones);
    $("#selectOpcionFiltro").prop('disabled', true);
    $("#btnCancelar").hide();
  }
});

$("#selectOpcionFiltro").change(function (e) { 
  e.preventDefault();
  var atributo = $("#selectFiltro").val();
  var atributoEspec = $("#selectOpcionFiltro").val();
 
  $.ajax({
    type: "post",
    url: "php/buscarMascotaAtributo.php",
    data: {
      atributo: atributo,
      atributoEspec: atributoEspec
    },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada mascota encontrada*/
      response.map(item => {
        relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                    <div class="card-body">
                    <form action="php/encontrarPerfil.php" method="post" autocomplete="off">
                    <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                    <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                    </form>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                        </li>
                        <li class="list-group-item">${item.edad}</li>
                        <li class="list-group-item">${item.genero}</li>
                      </ul>
                      <div class="card-footer">
                      ${item.estatus}
                      </div>
                      
                    </div>
                  </div>
                </div>
                  `;
      })
      $(".catalogo").html(relleno);
      $("#btnCancelar").show();
    }
  });

  if($("#selectOpcionFiltro").val()==0){
    catalogo();
  }
});