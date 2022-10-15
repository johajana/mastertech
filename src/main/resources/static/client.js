CLIENT_URL = "http://168.138.224.199:8080/api/Client/"

function traerCliente() {
    //FUNCION GET
    $.ajax({
        url: CLIENT_URL + "all",
        type: 'GET',
        dataType: 'json',
        contentType: "application/JSON",

        success: function (data) {
            console.log(data)
            if (data.length) {
                pintarRespuestaCliente(data);
            }

        },
        error: function (xhr, status) {
            alert(xhr);
            alert('Ha sucedido un problema');
        }
    });
}

function drawTableRowCliente(cliente) {
    return `<tr>
        <th scope="row">${cliente.idClient}</th>
        <td>${cliente.name}</td>
        <td>${cliente.email}</td>
        <td>${cliente.age}</td>
        <td>${cliente.password}</td>
        <td>
        
        </div>
        </td>
    </tr>`

}

function pintarRespuestaCliente(listaClientes) {
    let tableContent = "";
    const resultadoCliente = $('#resultadoClientes');
    resultadoCliente.empty();
    for (let cliente of listaClientes) {
        tableContent += drawTableRowCliente(cliente)
    }
    resultadoCliente.append(tableContent);

}

function adicionarRegistroCliente() {
    const nombre = $("#nombreCliente");
    const correo = $("#correoCliente");
    const edad = $("#edadCliente");
    const contrasena = $("#contraseñaCliente");

    let data = {
        name: nombre.val(),
        email: correo.val(),
        age: edad.val(),
        password: contrasena.val()
    };
    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: CLIENT_URL + "save",
        type: 'POST', //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',

        success: function (data) {
            nombre.val("");
            correo.val("");
            edad.val("");
            contrasena.val("");
            alert('Registro Adicionado');
        },
        error: function (xhr, status) {
            console.log(xhr)
        },
        complete: function () {
            traerCliente();
        }

    });

}

