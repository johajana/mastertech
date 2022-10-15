PALCO_URL = "http://168.138.224.199:8080/api/Box/"

function traerPalco() {
    //FUNCION GET
    $.ajax({
        url: PALCO_URL + "all",
        type: 'GET',
        dataType: 'json',
        contentType: "application/JSON",

        success: function (data) {
            console.log(data)
            if (data.length) {
                pintarRespuestaPalco(data);
            }


        },
        error: function (xhr, status) {
            alert(xhr);
            alert('Ha sucedido un problema');
        }
    });
}

function drawTableRowPalco(palco) {
    return `<tr>
        <th scope="row">${palco.id}</th>
        <td>${palco.name}</td>
        <td>${palco.capacity}</td>
        <td>${palco.description}</td>
        <td>${palco.category?.name}</td>
         <td>${palco.location}</td>
        <td>
        </div>
        </td>
    </tr>`

}

function pintarRespuestaPalco(listaPalcos) {
    let tableContent = "";
    const resultadoPalco = $('#resultadoPalcos');
    resultadoPalco.html(tableContent);
    for (let palco of listaPalcos) {
        tableContent += drawTableRowPalco(palco)
    }
    resultadoPalco.append(tableContent);

}

function adicionarRegistroPalco() {
    const nombre = $("#nombrePalco");
    const capacidad = $("#capacidadPalco");
    const descripcion = $("#descripcionPalco");
    const categoria = $("#categoriaPalco");
    const ubicacion = $("#ubicacionPalco");

    let data = {
        name: nombre.val(),
        capacity: capacidad.val(),
        description: descripcion.val(),
        category: {id: categoria.val()},
        location: ubicacion.val(),


    };
    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: PALCO_URL + "save",
        type: 'POST',
        dataType: 'json',
        data: dataToSend,
        contentType: 'application/json',

        success: function () {
            nombre.val("");
            capacidad.val("");
            descripcion.val("");
            categoria.val("");
            ubicacion.val("");
            alert('Registro Adicionado');
        },
        error: function (xhr, status) {
            console.log(xhr)
        },
        complete: function () {
            traerPalco();
        }

    });

}











