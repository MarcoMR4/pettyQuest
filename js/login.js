$(window).ready(function() {
    var usuarioexiste = 0;
    $("#formini").on('submit', function(e) {
        e.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();

        $.post('./php/login.php', { email, password }, function(data) {
            data = JSON.parse(data);

            //obtener tamaño del json
            usuarioexiste = (Object.keys(data).length);

            if (usuarioexiste == 1) {
                if (data[0].email == email && data[0].password == password) {
                    console.log("Entra");
                } else {
                    console.log("Correo o contraseña incorrectos");
                }
            } else {
                console.log("El usuario no existe");
            }
        });
    });
});