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
            alert("SE HA REGISTRADO CON ÉXITO");
            location.reload();
          }
        });
       
        
    })


});