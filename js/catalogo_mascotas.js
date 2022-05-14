$(window).ready(function () {  
    $("#btnAgregar").show();
    
   

        /* conseguimos los datos para llenar el catalogo*/
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
                    <img src="img/Mascotas/p1.jpg" class="card-img-top imagenMascota" alt="..." onclick="clickearPerro('${item.claveMascota}')">
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

    

});

function clickearPerro (idPerro) {
  console.log(idPerro);
  $(`#btnSubmit${idPerro} `).click();
  }
