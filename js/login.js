$(window).ready(function() {
    $("#formini").on('submit', function(e) {
        e.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();
        console.log(email + "" + password);

        $.post('./php/login.php', { email, password }, function(data) {
            console.log(data);
        });
    });
});