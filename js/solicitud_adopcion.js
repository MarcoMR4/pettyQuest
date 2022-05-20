$(document).ready(function() {
    var claveMascota ="";
    const formulario = document.querySelector('#formSol');
    $.ajax({
        type: "POST",
        url: "./php/id_mascota.php",
        data: "",
        dataType: "text",
        success: function (response) {
                      
            $.ajax({
                type: "POST",
                url: "./php/catalogo_mascotas.php",
                data: "",
                dataType: "JSON",
                success: function (response2) {                    
                    /* Buscamos la mascota correcta*/
                    var i = 0;
                    while (response2[i]['claveMascota'] != response) {
                        i++;
                        // console.log("Entro al while " + response2[i]['claveMascota']);
                    }
                    if (response == response2[i]['claveMascota']) {
                        // console.log("Lo encontre") 
                        // console.log("ClaveMascota="+response)
                    }
                    
                }
            });
        }
    });
    
    $('#formSol').submit(function (e) { 
        
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "./php/id_mascota.php",
            data: "",
            dataType: "text",
            success: function (response) {
                const datos= new FormData(formulario);
                datos.append("claveMascota",response);                
                
                $.ajax({
                    type: "POST",
                    url: "./php/solicitud_adopcion.php",
                    data: datos,
                    contentType:false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        console.log(response);
                        location.href = "./catalogo_Mascotas.html";
                    },
                    error: function(response) {
                        console.log(response);
                    }
                });
            }
        });

    });
});