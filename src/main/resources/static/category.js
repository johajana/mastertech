CATEGORY_URL = "http://168.138.224.199:8080/api/Category/"


function traerCategory() {
    //FUNCION GET
    $.ajax({
        url: CATEGORY_URL + "all",
        type: 'GET',
        dataType: 'json',
        contentType: "application/JSON",

        success: function (data) {
            console.log(data)
            pintarRespuestaCategory(data);

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
        <td>${category.boxes.map(box => " " + box.name)}</td>
        <td>    
        <div class="row g-3">
            <div class="col-auto">
                <button class="btn btn-warning" onclick="actualizarRegistroCategory()"> Actualizar</button>
            </div>
            <div class="col-auto">
                <button class="btn btn-danger" onclick="borrarRegistroCategory(${category.id})"> Borrar</button>
            </div>
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

function populateCategoryFields(id, name, description) {
    $("#idCategory").val(id);
    $("#nombreCategory").val(name);
    $("#descripcionCategory").val(description);

}

function actualizarRegistroCategory() {
    const id = $("#idcategory");
    const nombre = $("#nameCategory");
    const descripcion = $("#descriptionCategory");


    let data = {
        id: id.val(), name: nombre.val(), description: descripcion.val(),
    };
    let dataToSend = JSON.stringify(data);


    $.ajax({
        url: CATEGORY_URL + "update",
        type: 'PUT', //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',

        success: function (data) {
            id.val("");
            nombre.val("");
            descripcion.val("");
            alert('Registro Editado');
        },
        error: function (xhr, status) {
            console.log(xhr)
            //  alert('ha sucedido un problema');
        },
        complete: function () {
            traerCategory();
        }
    });

}

function borrarRegistroCategory(idCategory) {
    $.ajax({
        url: PALCO_URL + idCategory,
        type: 'DELETE', //dataType : 'json',
        contentType: 'application/json',

        success: function () {
            alert('Registro Borrado');
        },
        error: function (xhr, status) {
            console.log(xhr)
        },
        complete: function () {
            traerCategory();
        }

    });

}





