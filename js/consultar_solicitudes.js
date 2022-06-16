function aceptarSolicitud($claveContrato,$claveUsuario,$claveMascota) {  
  $.ajax({
    type: "POST",
    url: "./php/aceptar_solicitud.php",
    data: { "claveContrato": $claveContrato, "claveUsuario": $claveUsuario, "claveMascota": $claveMascota},
    dataType: "JSON",
    success: function (response) {
      console.log($claveContrato+", "+$claveUsuario+", "+$claveMascota);      
      console.log(response);      
      document.location.reload(true);
    },
    error: function (response){
      console.log(response);      

    }
  });
}

function procesandoSolicitud($claveContrato,$claveUsuario,$claveMascota) {
  $.ajax({
    type: "POST",
    url: "./php/procesando_solicitud.php",
    data: { "claveContrato": $claveContrato, "claveUsuario": $claveUsuario, "claveMascota": $claveMascota },
    dataType: "text",
    success: function (response) {
      console.log(response);
      document.location.reload(true);
    }
  });
}

function rechazarSolicitud($claveContrato,$claveUsuario) {
  $.ajax({
    type: "POST",
    url: "./php/rechazar_solicitud.php",
    data: { "claveContrato": $claveContrato, "claveUsuario": $claveUsuario},
    dataType: "text",
    success: function (response) {
      console.log(response);
      document.location.reload(true);
    }
  });
}

$(document).ready(function () {

  // Solicitudes nuevas
  $.ajax({
    type: "POST",
    url: "./php/consultar_solicitudes.php",
    data: "",
    dataType: "text",
    success: function (response) {
      solicitudExiste = (Object.keys(response).length);
      // console.log(solicitudExiste)
      // console.log(response)
      var contenido = "";
      contenido+=`
        <h1 class="mx-auto">Solicitudes nuevas</h1>
      `;
      if (solicitudExiste > 2) {
        response = JSON.parse(response);
        // var contenido = "";
        response.map(item => {
          // console.log(item.claveContrato)                  
          $.ajax({
            type: "POST",
            url: "./php/buscarUsuario.php",
            data: { "idUsuario": item.idUsuario },
            dataType: "text",
            success: function (response2) {
              response2 = JSON.parse(response2);
              // console.log(response2)        
              
              contenido += `
                          <div class="solicitud mx-auto shadow-lg p-1 mb-3" id="${item.claveContrato}">
                          <div class="nombreSolicitante text-center">
                            <h2>${response2[0]['nombre']}</h2>
                          </div>
                          <div class="contenidoSolicitud row justify-content-center w-100 mx-0 bg-light">
                            <div class="datosSolicitante col-lg-8">
                              <div class="nombre row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Nombre completo:</p>
                                </div>
                                <div class="nombreCompleto col-sm-7">
                                  <p>${response2[0]['nombre']} ${response2[0]['apellidoPaterno']} ${response2[0]['apellidoMaterno']}</p>
                                </div>
                              </div>
                              <hr>
                              <div class="edad row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Fecha de nacimiento:</p>
                                </div>
                                <div class="edad-Solicitante col-sm-7">
                                  <p>${response2[0]['edad']}</p>
                                </div>
                              </div>
                              <hr>
                              <div class="domicilio row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Domicilio:</p>
                                </div>
                                <div class="domicilioCompleto col-sm-7">
                                  <p>${response2[0]['calle']} #${response2[0]['numeroCasa']}, ${response2[0]['ciudad']}</p>
                                </div>
                              </div>
                              <hr>
                              <div class="razones row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Razones:</p>
                                </div>
                                <div class="razonesCompletas col-sm-7">
                                  <p>${item.razones}</p>
                                </div>
                              </div>
                              <hr>
                              <div class="documentos row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Documentos:</p>
                                </div>
                                <div class="fotosDocumentos col-sm-7">
                                  <img src="${item.ine}" alt="ine" height="250" width="230">
                                  <img src="${item.comprobanteDomicilio}" alt="domicilio" height="250" width="230">
                                </div>
                              </div>
                            </div>
                            <div class="datosMascota card col-lg-4 p-3">
                              <img src="${item.foto}" class="card-img-top" alt="...">
                              <div class="card-body bg-light">
                                <div class="infoMascota">
                                  <div class="espacioNombreMascota row">
                                    <div class="campo col-sm-6">
                                      <p>Nombre:</p>
                                    </div>
                                    <div class="nombreMascota col-sm-6">
                                      <p>${item.nombre}</p>
                                    </div>
                                  </div>
                                  <hr>
                                  <div class="espacioEdadMascota row">
                                    <div class="campo col-sm-6">
                                      <p>Edad:</p>
                                    </div>
                                    <div class="edadMascota col-sm-6">
                                      <p>${item.edad}</p>
                                    </div>
                                  </div>
                                  <hr>
                                  <div class="espacioGeneroMascota row">
                                    <div class="campo col-sm-6">
                                      <p>Genero:</p>
                                    </div>
                                    <div class="generoMascota col-sm-6">
                                      <p>${item.genero}</p>
                                    </div>
                                  </div>
                                  <hr>
                                  <div class="espacioRazaMascota row">
                                    <div class="campo col-sm-6">
                                      <p>Raza:</p>
                                    </div>
                                    <div class="razaMascota col-sm-6">
                                      <p>${item.raza}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="card-footer bg-secondary botones">
                              <div class="btn-group" role="group" aria-label="Basic example">
                                
                                <button type="button" class="btn btn-primary aceptar" value="${item.claveContrato}" onclick="procesandoSolicitud(this.value,${item.idUsuario},${item.idMascota})">En proceso</button>
                                <button type="button" class="btn btn-danger rechazar" value="${item.claveContrato}" onclick="rechazarSolicitud(this.value,${item.idUsuario})">Rechazar</button>                             
                              </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                `;
              $(".nuevasSolicitudes").html(contenido);
            }
          });
        });
        $(".nuevasSolicitudes").html(contenido);
      }
      else {
        contenido += `
                <div class="mx-auto shadow-lg text-center">
                  <h2>No hay solicitudes nuevas de momento, regresa después.</h2>
                </div>                
                `;
        $(".nuevasSolicitudes").html(contenido);
      }
    }
  });
  // Solicitudes en proceso
  $.ajax({
    type: "POST",
    url: "./php/consultar_solicitudes_proceso.php",
    data: "",
    dataType: "text",
    success: function (response) {
      solicitudExiste = (Object.keys(response).length);
      // console.log(solicitudExiste)
      // console.log(response)
      var contenido = "";
      contenido+=`
        <h1 class="mx-auto">Solicitudes en proceso</h1>
      `;
      if (solicitudExiste > 2) {
        response = JSON.parse(response);
        // var contenido = "";
        response.map(item => {
          // console.log(item.claveContrato)                  
          $.ajax({
            type: "POST",
            url: "./php/buscarUsuario.php",
            data: { "idUsuario": item.idUsuario },
            dataType: "text",
            success: function (response2) {
              response2 = JSON.parse(response2);
              // console.log(response2)        
              
              contenido += `
                          <div class="solicitud mx-auto shadow-lg p-1 mb-3" id="${item.claveContrato}">
                          <div class="nombreSolicitanteProceso text-center">
                            <h2>${response2[0]['nombre']}</h2>
                          </div>
                          <div class="contenidoSolicitud row justify-content-center w-100 mx-0 bg-light">
                            <div class="datosSolicitante col-lg-8">
                              <div class="nombre row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Nombre completo:</p>
                                </div>
                                <div class="nombreCompleto col-sm-7">
                                  <p>${response2[0]['nombre']} ${response2[0]['apellidoPaterno']} ${response2[0]['apellidoMaterno']}</p>
                                </div>
                              </div>
                              <hr>
                              <div class="edad row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Fecha de nacimiento:</p>
                                </div>
                                <div class="edad-Solicitante col-sm-7">
                                  <p>${response2[0]['edad']}</p>
                                </div>
                              </div>
                              <hr>
                              <div class="domicilio row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Domicilio:</p>
                                </div>
                                <div class="domicilioCompleto col-sm-7">
                                  <p>${response2[0]['calle']} #${response2[0]['numeroCasa']}, ${response2[0]['ciudad']}</p>
                                </div>
                              </div>
                              <hr>
                              <div class="razones row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Razones:</p>
                                </div>
                                <div class="razonesCompletas col-sm-7">
                                  <p>${item.razones}</p>
                                </div>
                              </div>
                              <hr>
                              <div class="documentos row mt-3">
                                <div class="campo col-sm-5">
                                  <p>Documentos:</p>
                                </div>
                                <div class="fotosDocumentos col-sm-7">
                                  <img src="${item.ine}" alt="ine" height="250" width="230">
                                  <img src="${item.comprobanteDomicilio}" alt="domicilio" height="250" width="230">
                                </div>
                              </div>
                            </div>
                            <div class="datosMascotaProceso card col-lg-4 p-3">
                              <img src="${item.foto}" class="card-img-top" alt="...">
                              <div class="card-body bg-light">
                                <div class="infoMascota">
                                  <div class="espacioNombreMascota row">
                                    <div class="campo col-sm-6">
                                      <p>Nombre:</p>
                                    </div>
                                    <div class="nombreMascota col-sm-6">
                                      <p>${item.nombre}</p>
                                    </div>
                                  </div>
                                  <hr>
                                  <div class="espacioEdadMascota row">
                                    <div class="campo col-sm-6">
                                      <p>Edad:</p>
                                    </div>
                                    <div class="edadMascota col-sm-6">
                                      <p>${item.edad}</p>
                                    </div>
                                  </div>
                                  <hr>
                                  <div class="espacioGeneroMascota row">
                                    <div class="campo col-sm-6">
                                      <p>Genero:</p>
                                    </div>
                                    <div class="generoMascota col-sm-6">
                                      <p>${item.genero}</p>
                                    </div>
                                  </div>
                                  <hr>
                                  <div class="espacioRazaMascota row">
                                    <div class="campo col-sm-6">
                                      <p>Raza:</p>
                                    </div>
                                    <div class="razaMascota col-sm-6">
                                      <p>${item.raza}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="card-footer bg-secondary botones">
                              <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-success aceptar" value="${item.claveContrato}" onclick="aceptarSolicitud(this.value,${item.idUsuario},${item.idMascota})">Aceptar</button>                                
                                <button type="button" class="btn btn-danger rechazar" value="${item.claveContrato}" onclick="rechazarSolicitud(this.value,${item.idUsuario})">Rechazar</button>                             
                              </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                `;
              $(".procesoSolicitudes").html(contenido);
            }
          });
        });
        $(".procesoSolicitudes").html(contenido);
      }
      else {
        contenido += `
                <div class="mx-auto shadow-lg text-center">
                  <h2>No hay solicitudes en proceso de momento, acepta ('En proceso') alguna de la lista anterior.</h2>
                </div>                
                `;
        $(".procesoSolicitudes").html(contenido);
      }
    }
  });
});