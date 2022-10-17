RESERVATION_URL = "http://168.138.224.199:8080/api/Reservation/"



function traerReservation() {
    //FUNCION GET
    $.ajax({
        url: RESERVATION_URL + "all",
        type: 'GET',
        dataType: 'json',
        contentType: "application/JSON",

        success: function (data) {
            console.log(data)
            if (data.length) {
                pintarRespuestaReservation(data);
            }


        },
        error: function (xhr, status) {
            alert(xhr);
            alert('Ha sucedido un problema');
        }
    });
}

function drawTableRowReservation(reservation) {
    return `<tr>
        <th scope="row">${reservation.idReservation}</th>
        <td>${reservation.box.name}</td>
        <td>${reservation.client.name}</td>
        <td>${reservation.startDate}</td>
        <td>${reservation.devolutionDate}</td>
        <td>  
        </div>
        </td>
    </tr>`

}

function pintarRespuestaReservation(listaReservations) {
    let tableContent = "";
    const resultadoReservation = $('#resultadoReservations');
    resultadoReservation.empty();
    for (let reservation of listaReservations) {
        tableContent += drawTableRowReservation(reservation)
    }
    resultadoReservation.html(tableContent);

}

function adicionarRegistroReservation() {
    const palco = $("#palcoReservation");
    const cliente = $("#clienteReservation");
    const fechaInicio = $("#fechaInicioReservation");
    const fechaEntrega = $("#fechaEntregaReservation");

    let data = {
        box: {id: palco.val()},
        client: {idClient: cliente.val()},
        startDate: fechaInicio.val(),
        devolutionDate: fechaEntrega.val()
    };
    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: RESERVATION_URL + "save",
        type: 'POST', //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',

        success: function () {
            palco.val("");
            cliente.val("");
            fechaInicio.val("");
            fechaEntrega.val("");
            alert('Registro Adicionado');
        },
        error: function (xhr, status) {
            console.log(xhr)
        },
        complete: function () {
            traerReservation();
        }
    });
}

function populateReservationFields(id, name, email, age) {
    $("#palco").val(id.client);
    $("#cliente").val(client.name);
    $("#fechaInicio").val(startDate);
    $("#fechaEntrega").val(devolutionDate);
}

function actualizarRegistroReservation() {
    const palco = $("#palcoReservation");
    const cliente = $("#clienteReservation");
    const fechaInicio = $("#fechaInicioReservation");
    const fechaEntrega = $("#fechaEntregaReservation");


    let data = {
        box: palco.val(),
        client: cliente.val(),
        startDate: fechaInicio.val(),
        devolutionDate: fechaEntrega.val()
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: RESERVATION_URL + "update",
        type: 'PUT', //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',


        success: function (data) {
            palco.val("");
            cliente.val("");
            fechaInicio("");
            fechaEntrega.val("");
            alert('Registro Editado');
        },
        error: function (xhr, status) {
            console.log(xhr)
            //  alert('ha sucedido un problema');
        },
        complete: function () {
            traerReservation();
        }
    });

}

function borrarRegistroReservation(idReservation) {

    $.ajax({
        url: RESERVATION_URL + idReservation,
        type: 'DELETE', //dataType : 'json',
        contentType: 'application/json',

        success: function (data) {
            palco.val("");
            cliente.val("");
            fechaInicio.val("");
            fechaEntrega.val("");
            alert('Registro Borrado');
        },
        error: function (xhr, status) {
            //  alert('ha sucedido un problema');
        },
        complete: function () {
            traerReservation();
        }

    });

}




