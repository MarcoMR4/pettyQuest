$(window).ready(function () {

  $.ajax({
    type: "post",
    url: "./php/veterinarias.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      var modales = "";
      response.map(item => {
        var nombrecom = item.nombreEncargado + " " + item.apellidoPEncargado + " " + item.apellidoMEncargado;
        var Ubicacion = item.calle + " " + item.numero + ", " + item.ciudad;
        relleno += `
                <div class="col-4 my-2">
                  <div class="card h-100 w-100 " style="width: 18rem;">
                    <div class="card-body">

                      <form action="php/eliminarVete.php" method="post" autocomplete="off">
                        <input type="text" name="claveVete" value="${item.claveAsociacionVeterinaria}" style="display: none;">
                         <input class="btn btn-outline-primary" type="submit" value="Aceptar" id="btnSubmit${item.claveAsociacionVeterinaria}" style="display: none;">
                      </form>

                      <h5 class="card-title">${item.nombre}</h5>
                      <p class="card-text">Encargado: ${nombrecom}</p>
                      <p class="card-text">Ubicacion: ${Ubicacion}</p>
                      <p class="card-text">Telefono: ${item.telefono}</p>
                      <p class="card-text">Correo: ${item.email}</p>
                      <button type="button" class="btn btn-danger" id="btnEliminar" data-bs-toggle="modal" data-bs-target="#eliminar${item.claveAsociacionVeterinaria}">Eliminar</button>
                    </div>
                  </div>
                </div>
                `;
        modales += `
          <div class="modal fade" id="eliminar${item.claveAsociacionVeterinaria}" tabindex="-1" aria-labelledby="${item.claveAsociacionVeterinaria}ModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title" id="${item.claveAsociacionVeterinaria}ModalLabel">ALTO</h3>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <h4>Seguro que quieres eliminar la veterinaria ${item.nombre}</h4>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-danger" onclick="clickearVete('${item.claveAsociacionVeterinaria}')">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      $("#contenido").html(relleno);
      $("#modales").html(modales);
    }
  });
});

function clickearVete(idVete) {
  $(`#btnSubmit${idVete} `).click();
}