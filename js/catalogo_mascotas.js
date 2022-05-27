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
//Variables Globales
var misMas=0;
var claveAsociacionVeterinaria;

function catalogo(){
  $.ajax({
    type: "POST",
    url: "./php/catalogo_mascotas.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
     
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
  misMas=0;
  console.log("Concelar: "+misMas)
});

$('#idBuscar').keypress(function (event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    buscarMascotaPorNombre();
  }
});

function misMascotas() {
  
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
  misMas=1;
  console.log("Click Mis mascotas: "+misMas);
  $("#selectFiltro").val(0);
  var opciones = ``;
  $("#selectOpcionFiltro").html(opciones);
  $("#selectOpcionFiltro").prop('disabled', true);
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
  else if ($("#selectFiltro").val() == "estatus") {
    var opciones = `
    <option selected value="0">Cualquier estado</option>
    <option value="En adopcion">En adopcion</option>
    <option value="En proceso">En proceso</option>
    <option value="Adoptado">Adoptado</option>
    `;
    $("#selectOpcionFiltro").prop('disabled', false);
    $("#selectOpcionFiltro").html(opciones);
    $("#btnCancelar").show();
  }
  else if ($("#selectFiltro").val() == 0){
    var opciones = ``;
    $("#selectOpcionFiltro").html(opciones);
    $("#selectOpcionFiltro").prop('disabled', true);
    if(misMas==0){
      $("#btnCancelar").click();
    }
    else{
      misMascotas();
    }
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
      var relleno = "";
      //Si mis mascotas esta activado busca solamente con sus mascotas
      console.log("El valor de misMas es: "+misMas);
      if (misMas==1){
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
      }
    
      // Imprimimos en pantalla cada mascota encontrada con esos atributos
      else{
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
                  console.log(`${item.claveAsociacionVeterinaria}`);
      })
    }
      $(".catalogo").html(relleno);
      $("#btnCancelar").show();
    }
  });

  if($("#selectOpcionFiltro").val()==0){
    catalogo();
    
  }
});