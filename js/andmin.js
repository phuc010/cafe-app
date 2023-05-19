var getArrValueDataLocationTableObj = []
$(document).ready(function () {
    //set value getArrValueDataLocationTableObj
    let getArrValueDataLocationTable = localStorage.getItem('dataLocationTableKey')
    getArrValueDataLocationTableObj = JSON.parse(getArrValueDataLocationTable)
});

function onClickManagerItem(params) {
    $('.manager-btn').removeClass('choose-btn');
    $('#' + params).addClass('choose-btn');
    switch (params) {
        case 'table-manager':
            let contentTableManager = `
        <div class="new-table">
        <button type="button" onclick="onClickNewTable()" id="btn-new-table" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#newTableModal">New Table</button>
        </div>
        <div class="list-table">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name table</th>
                        <th>Floor</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="tbody-list-table">
                </tbody>
            </table>
        </div>
        `
            let row = ``
            $('.information-object').html(contentTableManager);

            let numberOrder = 0;
            getArrValueDataLocationTableObj.forEach((element) => {
                if (element.location != 0) {
                    for (let index = 0; index < element.tableNumber.length; index++) {
                        numberOrder++
                        row = row + `
                    <tr>
                    <td>`+ (numberOrder) + `</td>
                    <td> Table `+ element.tableNumber[index] + `</td>
                    <td> Floor `+ element.location + `</td>
                    <td><span class="btn-edit-name-table">

                    <button type="button" onclick="onClickUpdateTable('`+ element.tableNumber[index] + `','` + element.location + `')" id="btn-new-table" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#updateTableModal"><i class="fa-solid fa-pen-to-square"></i></button>

                    </span> &nbsp &nbsp <span class="btn-delete-table"><i class="fa-solid fa-trash-can" onclick="onClickDeleteTable('`+ element.tableNumber[index] + `','` + element.location + `')"></i></span></td>
                    </tr>
                    `
                    }
                }
            });
            $('.tbody-list-table').html(row);

            break;
        case 'menu-manager':
            let contentMenuManager = `
            <div class="new-table">
            <button type="button" class="btn btn-outline-success">New Item</button>
            </div>
            <div class="list-menu">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pic</th>
                            <th>Name</th>
                            <th>Catelogy</th>
                            <th>Unit</th>
                            <th>Unit Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody class="tbody-list-menu">
                    </tbody>
                </table>
            </div>
            `
            let rowListMenu = ``
            let i = 0
            $('.information-object').html(contentMenuManager);

            dataMenu["data"].forEach((element) => {
                ++i;
                rowListMenu = rowListMenu + `
                <tr>
                <td>`+ i + `</td>
                <td class="pic"> <img src="`+ element.pic + `"></td>
                <td>`+ element.name + `</td>
                <td>`+ element.catelogy + `</td>
                <td>`+ element.unit + `</td>
                <td>`+ element.unitPrice + `</td>
                <td><span class="btn-edit-item"><i class="fa-solid fa-pen-to-square"></i></span> &nbsp &nbsp <span class="btn-delete-item"><i class="fa-solid fa-trash-can"></i></span></td>
                </tr>
                `
            });
            $('.tbody-list-menu').html(rowListMenu);
            break;
        default:
            break;
    }

}


function onClickNewTable() {
    //clear old infor input
    $('.number-new-table').val('');
    $('.err').html('');
    $('.btn-OK-new-table').removeAttr('data-bs-dismiss');
    let option = ``
    for (let index = 1; index < getArrValueDataLocationTableObj.length; index++) {
        if (index == 1) {
            option = option + `<option selected value ="` + getArrValueDataLocationTableObj[index].location + `">Floor ` + getArrValueDataLocationTableObj[index].location + `</option>`
        } else {
            option = option + `<option value ="` + getArrValueDataLocationTableObj[index].location + `">Floor ` + getArrValueDataLocationTableObj[index].location + `</option>`
        }
        $('#choose-floor').html(option);
    }
}

var flagCheckTableExist = false;
$('.number-new-table').keyup(function (e) {
    $('.err').html('');
    flagCheckTableExist = false;

    for (let index = 0; index < getArrValueDataLocationTableObj[0].tableNumber.length; index++) {
        if ($('.number-new-table').val() == getArrValueDataLocationTableObj[0].tableNumber[index]) {
            flagCheckTableExist = true;
        }
    }

    if ($('.number-new-table').val() != '' || flagCheckTableExist == false) {
        $('.btn-OK-new-table').attr('data-bs-dismiss', 'modal');
    }
    if ($('.number-new-table').val() == '' || flagCheckTableExist == true) {
        $('.btn-OK-new-table').removeAttr('data-bs-dismiss');
    }

});

function onClickSelectChooseFloor(paramsFloor) {
    flagCheckTableExist = false;

    $('.form-select option').removeAttr('selected');
    $('.form-select option[value="' + paramsFloor + '"]').attr('selected', 'selected');

    for (let index = 0; index < getArrValueDataLocationTableObj[0].tableNumber.length; index++) {
        if ($('.number-new-table').val() == getArrValueDataLocationTableObj[0].tableNumber[index]) {
            flagCheckTableExist = true;
        }
    }

    if ($('.number-new-table').val() != '' || flagCheckTableExist == false) {
        $('.btn-OK-new-table').attr('data-bs-dismiss', 'modal');
    }
    if ($('.number-new-table').val() == '' || flagCheckTableExist == true) {
        $('.btn-OK-new-table').removeAttr('data-bs-dismiss');
    }

}

function onClickOkNewTable() {

    if ($('.number-new-table').val() == "" || $('.number-new-table').val() == null) {
        $('.err').html('Number new table not blank');
    }
    else if (flagCheckTableExist == true) {
        $('.err').html('Number new table Exist');
    }
    else {
        //add table in location All
        getArrValueDataLocationTableObj[0].tableNumber.push($('.number-new-table').val())
        //add table in location Floor
        getArrValueDataLocationTableObj.forEach(element => {
            if (element.location == $('#choose-floor').val()) {
                element.tableNumber.push($('.number-new-table').val())
                let arrDataLocationTable = getArrValueDataLocationTableObj
                let stringDataTable = JSON.stringify(arrDataLocationTable)
                localStorage.setItem('dataLocationTableKey', stringDataTable)
                onClickManagerItem('table-manager')
                return;
            }
        })
    }
}

function onClickDeleteTable(nameTable, floor) {

    for (let index = 0; index < getArrValueDataLocationTableObj[0].tableNumber.length; index++) {
        if (nameTable == getArrValueDataLocationTableObj[0].tableNumber[index]) {
            getArrValueDataLocationTableObj[0].tableNumber.splice(index, 1)
            break;
        }
    }

    getArrValueDataLocationTableObj.forEach(element => {
        if (element.location == floor) {
            for (let index = 0; index < element.tableNumber.length; index++) {
                if (nameTable == element.tableNumber[index]) {
                    element.tableNumber.splice(index, 1)
                    break;
                }
            }
        }
    })

    let arrDataLocationTable = getArrValueDataLocationTableObj
    let stringDataTable = JSON.stringify(arrDataLocationTable)
    localStorage.setItem('dataLocationTableKey', stringDataTable)
    onClickManagerItem('table-manager')

}
var tableSelected;
function onClickUpdateTable(nameTable, floor) {
    $('.update-table-err').html('');
    $('.update-number-table').val(nameTable);
    tableSelected = $('.update-number-table').val();

    let option = ``
    for (let index = 1; index < getArrValueDataLocationTableObj.length; index++) {
        if (index == floor) {
            option = option + `<option selected value ="` + getArrValueDataLocationTableObj[index].location + `">Floor ` + getArrValueDataLocationTableObj[index].location + `</option>`
        } else {
            option = option + `<option value ="` + getArrValueDataLocationTableObj[index].location + `">Floor ` + getArrValueDataLocationTableObj[index].location + `</option>`
        }
        $('#update-table-choose-floor').html(option);
    }

}

$('.update-number-table').keyup(function (e) {
    $('.update-table-err').html('');

    flagCheckTableExist = false;

    for (let index = 0; index < getArrValueDataLocationTableObj[0].tableNumber.length; index++) {
        if ($('.update-number-table').val() == getArrValueDataLocationTableObj[0].tableNumber[index]) {
            flagCheckTableExist = true;
        }
    }
    if ($('.update-number-table').val() == tableSelected) {
        flagCheckTableExist = false;
    }


    if ($('.update-number-table').val() != '' || flagCheckTableExist == false) {
        $('.btn-OK-update-table').attr('data-bs-dismiss', 'modal');
    }
    if ($('.update-number-table').val() == '' || flagCheckTableExist == true) {
        $('.btn-OK-update-table').removeAttr('data-bs-dismiss');
    }


});


function onClickOkUpdateTable() {
    if ($('.update-number-table').val() == "" || $('.update-number-table').val() == null) {
        $('.update-table-err').html('Number new table not blank');
    } else if (flagCheckTableExist == true) {
        $('.update-table-err').html('Number new table Exist');
    } else {
        console.log('OK update sussces');

        for (let index = 0; index < getArrValueDataLocationTableObj[0].tableNumber.length; index++) {
            if (getArrValueDataLocationTableObj[0].tableNumber[index] == tableSelected) {
                getArrValueDataLocationTableObj[0].tableNumber[index] = $('.update-number-table').val()
                break
            }
        }
    }
    console.log(getArrValueDataLocationTableObj[0].tableNumber);


}




