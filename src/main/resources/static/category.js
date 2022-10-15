//CATEGORY_URL = "api/Category/"
CATEGORY_URL = "http://129.148.31.104:8080/api/Category/"

function traerCategory() {
    //FUNCION GET
    $.ajax({
        url: CATEGORY_URL + "all",
        type: 'GET',
        dataType: 'json',
        contentType: "application/JSON",

        success: function (data) {
            console.log(data)
            if (data.length) {
                pintarRespuestaCategory(data);
            }

        },
        error: function (xhr, status) {
            alert(xhr);
            alert('Ha sucedido un problema');
        }
    });
}

function drawTableRowCategory(category) {
    return `<tr>
        <th scope="row">${category.id}</th>
        <td>${category.name}</td>
        <td>${category.description}</td>
        <td>${category.boxes.map(box => " " +box.name)}</td>
        <td>    
        </div>
        </td>
    </tr>`

}

function pintarRespuestaCategory(listaCategorys) {
    let tableContent = "";
    const resultadoCategory = $('#resultadoCategorys');
    resultadoCategory.html(tableContent);
    for (let category of listaCategorys) {
        tableContent += drawTableRowCategory(category)
    }
    resultadoCategory.append(tableContent);

}

function adicionarRegistroCategory() {
    const nombre = $("#nombreCategory");
    const descripcion = $("#descripcionCategory");


    let data = {
        name: nombre.val(),
        description: descripcion.val()
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: CATEGORY_URL + "save",
        type: 'POST',
        data: dataToSend,
        contentType: 'application/json',

        success: function (data) {
            nombre.val("");
            descripcion.val("");
            alert('Registro Adicionado');
        },
        error: function (xhr, status) {
            console.log(xhr)
        },
        complete: function () {
            traerCategory();
        }

    });

}

