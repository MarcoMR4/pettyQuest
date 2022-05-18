$(window).ready(function () {  
  $("#btnAgregar").hide();
   $.ajax({
     type: "POST",
     url: "./php/identificarTipoUsuario.php",
     data: "data",
     dataType: "JSON",
     success: function (response) {
      console.log(response[0]['tipo']);
       if(response[0]['tipo']=="0"){
        $("#btnAgregar").hide();
       }
       else{
        $("#btnAgregar").show();
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
             /* Imprimimos en pantalla cada mascota encontrada*/
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
                      <li class="list-group-item">${item.precio}</li>
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

function clickearPerro (idPerro) {
  console.log(idPerro);
  $(`#btnSubmit${idPerro} `).click();
  }
