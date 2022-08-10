var tipoUsuario;
$(window).ready(function () {

  $("#selectOpcionFiltro").prop('disabled', true);
  $("#btnAgregar").show();
  $("#btnMisMascotas").show();
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
      tipoUsuario = response[0]['tipo'];
    }
  });

  /* conseguimos los datos para llenar el catalogo*/
  catalogo();


});
//Variables Globales
var misMas = 0;
var claveAsociacionVeterinaria;

function catalogo() {
  $.ajax({
    type: "POST",
    url: "./php/catalogo_mascotasPerdidas.php",
    data: "",
    dataType: "JSON",
    success: function (response) {

      var relleno = "";
      /* Imprimimos en pantalla cada mascota encontrada PERDIDO*/
      response.map(item => {
        if (`${item.estatus}` == "Perdido") {
          relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                    <div class="card-body">
                    <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                    <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                    <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                    </form>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                        </li>
                        <li class="list-group-item">${item.genero}</li>
                        <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                        <li class="list-group-item">${item.telefono}</li>
                      </ul>
                      <div class="card-footer" style="color: rgb(197, 10, 10);">
                      ${item.estatus}
                      </div>
                      
                    </div>
                  </div>
                </div>
                  `;
        }
      })
      $(".catalogo").html(relleno);
      relleno = "";
      /*ENCONTRADO  */
      response.map(item => {
        if (`${item.estatus}` == "Encontrado") {
          relleno += `
                <div class="col">
                <div class="card h-100">
                    <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                <div class="card-body">
                <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                </form>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <h5 class="card-title">${item.nombre}</h5>
                    </li>
                    <li class="list-group-item">${item.genero}</li>
                    <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                    <li class="list-group-item">${item.telefono}</li>
                    </ul>
                    <div class="card-footer" style="color: rgb(10, 197, 26);">
                    ${item.estatus}
                    </div>
                    
                </div>
                </div>
            </div>
                `;
        }
      })
      $(".catalogo").append(relleno);
      relleno = "";



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
    url: "php/buscarMascotaPerdida.php",
    data: {
      buscar: nombre
    },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      /* Imprimimos en pantalla cada mascota encontrada PERDIDO*/
      response.map(item => {
        if (`${item.estatus}` == "Perdido") {
          relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                    <div class="card-body">
                    <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                    <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                    <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                    </form>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                        </li>
                        <li class="list-group-item">${item.genero}</li>
                        <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                        <li class="list-group-item">${item.telefono}</li>
                      </ul>
                      <div class="card-footer" style="color: rgb(197, 10, 10);">
                      ${item.estatus}
                      </div>
                      
                    </div>
                  </div>
                </div>
                  `;
        }
      })
      $(".catalogo").html(relleno);
      relleno = "";

      /*ENCONTRADO*/
      response.map(item => {
        if (`${item.estatus}` == "Encontrado") {
          relleno += `
                <div class="col">
                <div class="card h-100">
                    <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                <div class="card-body">
                <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                </form>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <h5 class="card-title">${item.nombre}</h5>
                    </li>
                    <li class="list-group-item">${item.genero}</li>
                    <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                    <li class="list-group-item">${item.telefono}</li>
                    </ul>
                    <div class="card-footer" style="color: rgb(10, 197, 26);">
                    ${item.estatus}
                    </div>
                    
                </div>
                </div>
            </div>
                `;
        }
      })
      $(".catalogo").append(relleno);
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
  misMas = 0;
});

$('#idBuscar').keypress(function (event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    buscarMascotaPorNombre();
  }
});

function misMascotas() {

  if (tipoUsuario == 0) {
    //Conseguimos el ID de la veterinaria
    $.ajax({
      type: "POST",
      url: "./php/pruebaSesionUsuario.php",
      data: "",
      dataType: "JSON",
      success: function (response2) {
        idUsuario = response2[0]['idUsuario'];
      }
    });
    $.ajax({
      type: "post",
      url: "php/misMascotasPerdidas.php",
      data: "",
      dataType: "JSON",
      success: function (response) {
        var relleno = "";
        /* Imprimimos en pantalla cada mascota encontrada PERDIDO*/
        response.map(item => {
          if (`${item.idUsuario}` == idUsuario) {
            if (`${item.estatus}` == "Perdido") {
              relleno += `
                    <div class="col">
                    <div class="card h-100">
                        <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                      <div class="card-body">
                      <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                      <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                      <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                      </form>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            <h5 class="card-title">${item.nombre}</h5>
                          </li>
                          <li class="list-group-item">${item.genero}</li>
                          <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                          <li class="list-group-item">${item.telefono}</li>
                        </ul>
                        <div class="card-footer" style="color: rgb(197, 10, 10);">
                        ${item.estatus}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                    `;
            }
          }
        })
        $(".catalogo").html(relleno);
        relleno = "";
        /*Encontrado  */
        response.map(item => {
          if (`${item.idUsuario}` == idUsuario) {
            if (`${item.estatus}` == "Encontrado") {
              relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                  <div class="card-body">
                  <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                  <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                  <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                  </form>
                      <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                      </li>
                      <li class="list-group-item">${item.genero}</li>
                      <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                      <li class="list-group-item">${item.telefono}</li>
                      </ul>
                      <div class="card-footer" style="color: rgb(10, 197, 26);">
                      ${item.estatus}
                      </div>
                      
                  </div>
                  </div>
              </div>
                  `;
            }
          }
        })
        $(".catalogo").append(relleno);
        relleno = "";
        $("#btnCancelar").show();
      }
    });
  }
  else {
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
      url: "php/misMascotasPerdidas2.php",
      data: "",
      dataType: "JSON",
      success: function (response) {
        var relleno = "";
        /* Imprimimos en pantalla cada mascota encontrada PERDIDO*/
        response.map(item => {
          if (`${item.claveAsociacionVeterinaria}` == claveAsociacionVeterinaria) {
            if (`${item.estatus}` == "Perdido") {
              relleno += `
                    <div class="col">
                    <div class="card h-100">
                        <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                      <div class="card-body">
                      <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                      <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                      <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                      </form>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            <h5 class="card-title">${item.nombre}</h5>
                          </li>
                          <li class="list-group-item">${item.genero}</li>
                          <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                          <li class="list-group-item">${item.telefono}</li>
                        </ul>
                        <div class="card-footer" style="color: rgb(197, 10, 10);">
                        ${item.estatus}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                    `;
            }
          }
        })
        $(".catalogo").html(relleno);
        relleno = "";
        /*Encontrado  */
        response.map(item => {
          if (`${item.claveAsociacionVeterinaria}` == claveAsociacionVeterinaria) {
            if (`${item.estatus}` == "Encontrado") {
              relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                  <div class="card-body">
                  <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                  <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                  <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                  </form>
                      <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                      </li>
                      <li class="list-group-item">${item.genero}</li>
                      <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                      <li class="list-group-item">${item.telefono}</li>
                      </ul>
                      <div class="card-footer" style="color: rgb(10, 197, 26);">
                      ${item.estatus}
                      </div>
                      
                  </div>
                  </div>
              </div>
                  `;
            }
          }
        })
        $(".catalogo").append(relleno);
        relleno = "";
        $("#btnCancelar").show();
      }
    });
  }

}

$("#btnMisMascotas").click(function (e) {
  e.preventDefault();
  misMascotas();
  misMas = 1;

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
  else if ($("#selectFiltro").val() == "tipoAnimal") {
    var opciones = `
      <option selected value="0">Cualquier raza</option>
      <option value="Perro">Perro</option>
      <option value="Gato">Gato</option>
      <option value="Otro">Otro</option>
      `;
    $("#selectOpcionFiltro").prop('disabled', false);
    $("#selectOpcionFiltro").html(opciones);
    $("#btnCancelar").show();
  }
  else if ($("#selectFiltro").val() == "estatus") {
    var opciones = `
      <option selected value="0">Cualquier estado</option>
      <option value="Perdido">Perdido</option>
      <option value="Encontrado">Encontrado</option>
      `;
    $("#selectOpcionFiltro").prop('disabled', false);
    $("#selectOpcionFiltro").html(opciones);
    $("#btnCancelar").show();
  }
  else if ($("#selectFiltro").val() == 0) {
    var opciones = ``;
    $("#selectOpcionFiltro").html(opciones);
    $("#selectOpcionFiltro").prop('disabled', true);
    if (misMas == 0) {
      $("#btnCancelar").click();
    }
    else {
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
    url: "php/buscarMascotaPerdidaAtributo.php",
    data: {
      atributo: atributo,
      atributoEspec: atributoEspec
    },
    dataType: "JSON",
    success: function (response) {
      var relleno = "";
      //Si mis mascotas esta activado busca solamente con sus mascotas

      if (misMas == 1) {
        //PERDIDO
        response.map(item => {
          if (`${item.claveAsociacionVeterinaria}` == claveAsociacionVeterinaria) {
            if (`${item.estatus}` == "Perdido") {
              relleno += `
                      <div class="col">
                      <div class="card h-100">
                          <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                        <div class="card-body">
                        <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                        <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                        <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                        </form>
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                              <h5 class="card-title">${item.nombre}</h5>
                            </li>
                            <li class="list-group-item">${item.genero}</li>
                            <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                            <li class="list-group-item">${item.telefono}</li>
                          </ul>
                          <div class="card-footer" style="color: rgb(197, 10, 10);">
                          ${item.estatus}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                      `;
            }
          }
        })
        /*Encontrado*/
        response.map(item => {
          if (`${item.claveAsociacionVeterinaria}` == claveAsociacionVeterinaria) {
            if (`${item.estatus}` == "Encontrado") {
              relleno += `
                    <div class="col">
                    <div class="card h-100">
                        <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                    <div class="card-body">
                    <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                    <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                    <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                    </form>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h5 class="card-title">${item.nombre}</h5>
                        </li>
                        <li class="list-group-item">${item.genero}</li>
                        <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                        <li class="list-group-item">${item.telefono}</li>
                        </ul>
                        <div class="card-footer" style="color: rgb(10, 197, 26);">
                        ${item.estatus}
                        </div>
                        
                    </div>
                    </div>
                </div>
                    `;
            }
          }
        })
      }
      // Imprimimos en pantalla cada mascota encontrada con esos atributos
      else {
        /*PERDIDO*/
        response.map(item => {
          if (`${item.estatus}` == "Perdido") {
            relleno += `
                    <div class="col">
                    <div class="card h-100">
                        <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                      <div class="card-body">
                      <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                      <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                      <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                      </form>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            <h5 class="card-title">${item.nombre}</h5>
                          </li>
                          <li class="list-group-item">${item.genero}</li>
                          <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                          <li class="list-group-item">${item.telefono}</li>
                        </ul>
                        <div class="card-footer" style="color: rgb(197, 10, 10);">
                        ${item.estatus}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                    `;
          }
        })

        /*Encontrado*/
        response.map(item => {
          if (`${item.estatus}` == "Encontrado") {
            relleno += `
                  <div class="col">
                  <div class="card h-100">
                      <img src="${item.foto}" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
                  <div class="card-body">
                  <form action="php/encontrarPerfilPerdido.php" method="post" autocomplete="off">
                  <input type="text" name="claveMascota" value="${item.claveMascota}" style="display: none;">
                  <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveMascota}" style="display: none;">
                  </form>
                      <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                          <h5 class="card-title">${item.nombre}</h5>
                      </li>
                      <li class="list-group-item">${item.genero}</li>
                      <li class="list-group-item">Ultima vez visto por: "${item.ultimaLocalizacion}"</li>
                      <li class="list-group-item">${item.telefono}</li>
                      </ul>
                      <div class="card-footer" style="color: rgb(10, 197, 26);">
                      ${item.estatus}
                      </div>
                      
                  </div>
                  </div>
              </div>
                  `;
          }
        })
      }
      $(".catalogo").html(relleno);
      $("#btnCancelar").show();
    }
  });

  if ($("#selectOpcionFiltro").val() == 0) {
    catalogo();

  }
});