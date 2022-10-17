ADMIN_URL = "http://168.138.224.199:8080/api/Admin/"


function traerAdmin() {
    //FUNCION GET
    $.ajax({
        url: ADMIN_URL + "all",
        type: 'GET',
        dataType: 'json',
        contentType: "application/JSON",

        success: function (data) {
            console.log(data)
            if (data.length) {
                pintarRespuestaAdmin(data);
            }

        },
        error: function (xhr, status) {
            alert(xhr);
            alert('Ha sucedido un problema');
        }
    });
}

function drawTableRowAdmin(admin) {
    return `<tr>
        <th scope="row">${admin.idAdmin}</th>
        <td>${admin.name}</td>
        <td>${admin.email}</td>
        <td>${admin.password}</td>
        <td>     
        </div>
        </td>
    </tr>`

}

function pintarRespuestaAdmin(listaAdmins) {
    let tableContent = "";
    const resultadoAdmin = $('#resultadoAdmins');
    resultadoAdmin.html(tableContent);
    for (let admin of listaAdmins) {
        tableContent += drawTableRowAdmin(admin)
    }
    resultadoAdmin.append(tableContent);

}

function adicionarRegistroAdmin() {
    const nombre = $("#nombreAdmin");
    const correo = $("#correoAdmin");
    const contrasena = $("#contraseñaAdmin");

    let data = {
        name: nombre.val(),
        email: correo.val(),
        password: contrasena.val()
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: ADMIN_URL + "save",
        type: 'POST', //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',

        success: function () {
            nombre.val("");
            correo.val("");
            contrasena.val("");
            alert('Registro Adicionado');
        },
        error: function (xhr, status) {
            console.log(xhr)
        },
        complete: function () {
            traerAdmin();
        }

    });

}

function actualizarRegistroAdmin() {
    const nombre = $("#nombreAdmin");
    const correo = $("#correoAdmin");
    const contrasena = $("#contrasenaAdmin");


    let data = {
        name: nombre.val(),
        email: correo.val(),
        password: contrasena.val()
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: ADMIN_URL + "save",
        type: 'PUT', //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',


        success: function (data) {
            nombre.val("");
            correo.val("");
            contrasena.val("");
            alert('Registro Editado');
        },
        error: function (xhr, status) {
            console.log(xhr)
            //  alert('ha sucedido un problema');
        },
        complete: function () {
            traerAdmin();
        }
    });

}

function borrarRegistroAdmin(idAdmin) {

    let data = {
        id: idAdmin,
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: ADMIN_URL + "save",
        type: 'DELETE', //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',

        success: function (data) {
            nombre.val("");
            correo.val("");
            contrasena.val("");
            alert('Registro Borrado');
        },
        error: function (xhr, status) {
            //  alert('ha sucedido un problema');
        },
        complete: function () {
            traerAdmin();
        }

    });

}



