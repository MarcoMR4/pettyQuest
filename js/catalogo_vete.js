$(window).ready(function () {

  $.ajax({
    type: "post",
    url: "./php/veterinarias.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var relleno = "";
      response.map(item => {
        var nombrecom= item.nombreEncargado + " " + item.apellidoPEncargado + " " + item.apellidoMEncargado;
        var Ubicacion= item.calle + " " + item.numero + ", " + item.ciudad; 
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
                      <button type="button" class="btn btn-danger" id="btnEliminar" onclick="clickearVete('${item.claveAsociacionVeterinaria}')">Elimiar</button>
                    </div>
                  </div>
                </div>
                `;
      })
      $("#contenido").html(relleno);
    }
  });
});

function clickearVete(idVete) {
  $(`#btnSubmit${idVete} `).click();
}