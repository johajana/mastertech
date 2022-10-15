SCORE_URL = "http://168.138.224.199:8080/api/Score/"

function traerScore() {
    //FUNCION GET
    $.ajax({
        url: SCORE_URL + "all",
        type: 'GET',
        dataType: 'json',
        contentType: "application/JSON",

        success: function (data) {
            console.log(data)
            if (data.length) {
                pintarRespuestaScore(data);
            }

        },
        error: function (xhr, status) {
            alert(xhr);
            alert('Ha sucedido un problema');
        }
    });
}

function drawTableRowScore(score) {
    return `<tr>
        <th scope="row">${score.idScore}</th>
        <td>${score.stars}</td>
        <td>${score.messageText}</td>
        <td>${score.reservation.idReservation}</td>   
        <td>     
        </div>
        </td>
    </tr>`

}

function pintarRespuestaScore(listaScores) {
    let tableContent = "";
    const resultadoScore = $('#resultadoScores');
    resultadoScore.html(tableContent);
    for (let score of listaScores) {
        tableContent += drawTableRowScore(score)
    }
    resultadoScore.append(tableContent);

}

function adicionarRegistroScore() {
    const calificacion = $("#calificacionScore");
    const mensaje = $("#mensajeScore");
    const reserva = $("#reservaScore");

    let data = {
        stars: calificacion.val(),
        messageText: mensaje.val(),
        reservation: {idReservation: reserva.val()}
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: SCORE_URL + "save",
        type: 'POST', //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',

        success: function (data) {
            calificacion.val("");
            mensaje.val("");
            reserva.val("");
            alert('Registro Adicionado');
        },
        error: function (xhr, status) {
            console.log(xhr)
        },
        complete: function () {
            traerScore();
        }

    });

}

