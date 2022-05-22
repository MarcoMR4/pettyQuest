var mascotaSelect;

function selectTypeOption(){
    mascotaSelect = document.getElementById("mascota").value;
}

$(window).ready(function () {
    const formulario = document.querySelector('#formSeg');
    console.log(document.getElementById("mascota").value)
    $.ajax({
        type: "POST",
        url: "./php/buscarAdopciones.php",
        data: "",
        dataType: "text",
        success: function (response) {
            response = JSON.parse(response);
            console.log(response)
            var contenido = `<option value="null" disabled selected hidden>Selecciona la mascota:</option>`;
            response.map(item => {
                contenido+=`                      
                <option id="${item.idMascota}" value="${item.idMascota}">${item.nombre}</option>
                `;
            })
            $("#mascota").html(contenido);
        }
    });

    $('#formSeg').submit(function (e) {
        e.preventDefault();
        const datos = new FormData(formulario);
        datos.append("claveMascota",mascotaSelect)
        // console.log(mascotaSelect)                
        // console.log(datos.get("claveMascota"))
        $.ajax({
            type: "POST",
            url: "./php/nuevoSeguimiento.php",
            data: datos,            
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                console.log(response);
                
            },
            error: function(response) {
                console.log(response);
            }
        });
        location.reload();
    });

});