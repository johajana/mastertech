MESSAGE_URL = "http://168.138.224.199:8080/api/Message/"

function traerMensajes() {
    //FUNCION GET
    $.ajax({
        url: MESSAGE_URL + "all",
        type: 'GET',
        dataType: 'json',
        contentType: "application/JSON",

        success: function (data) {
            console.log(data)
            if (data.length) {
                pintarRespuestaMensajes(data);
            }

        },
        error: function (xhr, status) {
            alert(xhr);
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function drawTableRow(item) {
    return `<tr>
        <th scope="row">${item.idMessage}</th>
        <td>${item.box.name}</td>
        <td>${item.client.name}</td>
        <td>${item.messageText}</td>
        <td>
        <div class="row g-3">
            <div class="col-auto">
        </div>
        </td>
    </tr>`
}

function pintarRespuestaMensajes(items) {
    let tableContent = "";
    $('#resultadoMensajes').empty();
    for (let item of items) {
        tableContent += drawTableRow(item)
    }
    $('#resultadoMensaje').html(tableContent);


}

function adicionarRegistroMensajes() {
    const palco = $("#palcomensaje");
    const cliente = $("#palcocliente");
    const texto = $("#textomensaje");


    let data = {
        box: {id: palco.val()},
        client: {idClient: cliente.val()},
        messageText: texto.val()
    };
    console.log(data)
    $.ajax({
        url: MESSAGE_URL + "save",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',

        success: function (data) {
            palco.val("");
            cliente.val("");
            texto.val("");
            alert('Registro Adicionado');
        },
        error: function (xhr, status) {
            console.log(xhr)
        },
        complete: function () {
            traerMensajes();
        }

    });

}

