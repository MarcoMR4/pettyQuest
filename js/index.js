$(window).ready(function() {
  $.ajax({
    type: "POST",
    url: "./php/veterinarias.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var x=0;
      var relleno = "";
      var tamano = (Object.keys(response).length);
      var src="";
      if(tamano >3){
        tamano=3;
      }
      for(x=0;x<tamano;x++){
        if((x%2)==0){
          src="img/Carrusel_asociaciones_veterinarias/rescue.jpg";
        }
        else{
          src="img/Carrusel_asociaciones_veterinarias/vet1.jpg";
        }
        if(x==0){
          relleno += `
           <div class="carousel-item active" data-bs-interval="2000">
                <div class="row">
                    <div class="col-6">
                        <img src="${src}" class="logoV">
                    </div>
                    <div class="col-3 centrar-vertical p-3">
                        <p class="contenidos_letra">
                            <span class="h3">${response[x]['nombre']}</span><br>
                            <span>${response[x]['calle']} #${response[x]['numero']}, ${response[x]['ciudad']}</span><br>
                            <span>Telefono: ${response[x]['telefono']}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        }
        else{
          relleno += `
           <div class="carousel-item" data-bs-interval="2000">
                <div class="row">
                    <div class="col-6">
                        <img src="${src}" class="logoV">
                    </div>
                    <div class="col-3 centrar-vertical p-3">
                        <p class="contenidos_letra">
                            <span class="h3">${response[x]['nombre']}</span><br>
                            <span>${response[x]['calle']} #${response[x]['numero']}, ${response[x]['ciudad']}</span><br>
                            <span>Telefono: ${response[x]['telefono']}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        }
        
      }
      $("#carouselvete").html(relleno);
    }
  });
});

