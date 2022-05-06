$(window).ready(function() {
    $("#formregistro").on('submit', function(e) {
        e.preventDefault();

        let nombre = $("#nombre").val();
        let ap = $("#ap").val();
        let am = $("#am").val();
        let ciudad = $("#ciudad").val();
        let calle = $("#calle").val();
        let numero = $("#numero").val();
        let email = $("#correo").val();
        let password = $("#password1").val();
        let password2 = $("#password2").val();
        let telefono = $("#telefono").val();
        let edad = $("#edad").val();

        if (password == password2) {
            $.post('./php/registro.php', { nombre, ap, am, ciudad, calle, numero, email, password2, telefono, edad }, function(datas) {
                datas = JSON.parse(datas);
                console.log(datas);
            });
            
        } else {
            alert("la contraseña no es la misma");
        }
        $("#btnsalirregistro").trigger("click");
    });
});