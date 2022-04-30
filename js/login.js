/*fetch('./php/conexion.php')
.then(response => response.json())
.then(data => {
    console.log(data[0]);
})
.catch(error => console.error(error));*/

$(document).ready(function () {
    $("#inisesion").click(function () {
        // alert("Entra");
        // var xhr = new XMLHttpRequest();
        // xhr.open('GET','./php/login.php',true);
        // xhr.onload = function(){
        //     if(xhr.status == 200){
        //         var json = xhr.responseText
        //         console.log(json);
        //     }else{
        //         console.log(error);
        //     }
        // }
        // xhr.send();

        var theobject = new XMLHttpRequest();
        theobject.open('GET','./php/login.php',true);
        theobject.setRequestHeader('Content-type','application/x-ww-form-urlencoded');
        theobject.onreadystatechange = function (){
            console.log(theobject.responseText);
        }
        theobject.send();

    });
});

