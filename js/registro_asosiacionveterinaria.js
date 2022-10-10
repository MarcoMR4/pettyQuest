$(window).ready(function() {
    const formulario = document.querySelector('#formAV');
    $('#formAV').submit(function (e) { 
        e.preventDefault();
        const datos= new FormData(formulario);
        
        $.ajax({
          type: "POST",
          url: "./php/registro_asosiacionveterinaria.php",
          data: datos,
          contentType:false,
          cache: false,
          processData: false,
          success: function (response) {
            console.log(response);
            $("#btnsalirregistro10").trigger("click");            
          },
          error: function(response){
            $("#btnsalirregistro10").trigger("click");
            location.reload();
            console.log(response);
          }
        });
       
        
    })


});