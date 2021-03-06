$(document).ready(function () {
    var claveMascota = "";
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
                    }
                    console.log(response2[i])
                    $(".imagenMascota").attr("src", response2[i]["foto"]);
                    $(".nombreMascota").text(response2[i]['nombre']);
                    $(".edadMascota").text(response2[i]['edad']);
                    $(".generoMascota").text(response2[i]['genero']);
                    $(".tipoRaza").text(response2[i]['raza']);
                    $(".sizeMascota").text(response2[i]['tamaño']);
                    $(".tipoMascota").text(response2[i]['tipo']);
                }
            });
        },
        error: function (response) {
            console.log(response);
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
                const datos = new FormData(formulario);
                datos.append("claveMascota", response);

                $.ajax({
                    type: "POST",
                    url: "./php/validar_Solicitud_Adopcion.php",
                    data: { "mascota": response },
                    dataType: "JSON",
                    success: function (response2) {
                        if (response2[0]['totalContratos'] == 0) {
                            $.ajax({
                                type: "POST",
                                url: "./php/solicitud_adopcion.php",
                                data: datos,
                                contentType: false,
                                cache: false,
                                processData: false,
                                success: function (response) {
                                    console.log(response);

                                    // location.href = "./catalogo_Mascotas.html";
                                },
                                error: function (response) {
                                    console.log(response);

                                }
                            });
                            $("#btnEnviado").click();
                        }
                        else {
                            $("#btnError").click();
                        }
                    }
                });

            }
        });
    });
});