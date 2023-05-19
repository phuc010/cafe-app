var dataLocationTable = {
    'data': [
        {
            "location": 0,
            "tableNumber": []
        },
        {
            "location": 1,
            "tableNumber": ['T11', 'T12', 'T13']
        },
        {
            "location": 2,
            "tableNumber": ['T21', 'T22', 'T23', 'T24']
        },
        {
            "location": 3,
            "tableNumber": ['T31']
        }
    ]
}

var dataMenu = {
    'data': [
        {
            "pic": "./img/JCarrot.PNG",
            "name": "Carrot Juice",
            "unit": "Cup",
            "unitPrice": 15000,
            "catelogy": "Juice"
        },
        {
            "pic": "./img/JOrange.PNG",
            "name": "Orange Juice",
            "unit": "Cup",
            "unitPrice": 16000,
            "catelogy": "Juice"
        },
        {
            "pic": "./img/Strawberry.PNG",
            "name": "Strawberry",
            "unit": "Cup",
            "unitPrice": 25000,
            "catelogy": "Smoothie"
        },
        {
            "pic": "./img/Banana.PNG",
            "name": "Banana",
            "unit": "Cup",
            "unitPrice": 26000,
            "catelogy": "Smoothie"
        },
        {
            "pic": "./img/BlackCf.PNG",
            "name": "Black Coffe",
            "unit": "Cup",
            "unitPrice": 10000,
            "catelogy": "Coffe"
        },
        {
            "pic": "./img/MilkCf.PNG",
            "name": "Milk Coffe",
            "unit": "Cup",
            "unitPrice": 12000,
            "catelogy": "Coffe"
        },
        {
            "pic": "./img/Espresso.PNG",
            "name": "Espresso",
            "unit": "Cup",
            "unitPrice": 20000,
            "catelogy": "Coffe"
        }
        ,
        {
            "pic": "./img/Americano.PNG",
            "name": "Americano",
            "unit": "Cup",
            "unitPrice": 25000,
            "catelogy": "Coffe"
        },
        {
            "pic": "./img/Cacao.PNG",
            "name": "Hot Cacao",
            "unit": "Cup",
            "unitPrice": 15000,
            "catelogy": "Coffe"
        },
        {
            "pic": "./img/Cappuchino.PNG",
            "name": "Cappuchino",
            "unit": "Cup",
            "unitPrice": 30000,
            "catelogy": "Coffe"
        },
        {
            "pic": "./img/Latte.PNG",
            "name": "Latte",
            "unit": "Cup",
            "unitPrice": 35000,
            "catelogy": "Coffe"
        },
        {
            "pic": "./img/Mango.PNG",
            "name": "Mango Juice",
            "unit": "Cup",
            "unitPrice": 25000,
            "catelogy": "Juice"
        },
        {
            "pic": "./img/BlueSoda.PNG",
            "name": "Blue Soda",
            "unit": "Cup",
            "unitPrice": 17000,
            "catelogy": "Soda"
        },
        {
            "pic": "./img/LemonSoda.PNG",
            "name": "Lemon Soda",
            "unit": "Cup",
            "unitPrice": 14000,
            "catelogy": "Soda"
        }

    ]
}

var dataBill = {
    'data': [

    ]
}
var category = "All";
var billTableNumberSelect = 0;
var allTableNumber = [];
var locationNumber = 0;
var categoryList = [];
var getArrValueDataBillObj = [];
var getArrValueDataLocationTableObj = [];

$(document).ready(function () {

    //check localStorage has dataBillKey, if null -> setItem
    let getArrValueDataBill = localStorage.getItem('dataBillKey')
    if (getArrValueDataBill == null) {
        let arrDataBill = dataBill["data"]
        let stringDataBill = JSON.stringify(arrDataBill)
        localStorage.setItem('dataBillKey', stringDataBill)
    }
    getArrValueDataBill = localStorage.getItem('dataBillKey')
    getArrValueDataBillObj = JSON.parse(getArrValueDataBill)
    // let arrDataTable = dataLocationTable["data"]
    // let stringDataTable = JSON.stringify(arrDataTable)
    // localStorage.setItem('dataLocationTableKey', stringDataTable)

    // let arrDataMenu = dataMenu["data"]
    // let stringDataMenu = JSON.stringify(arrDataMenu)
    // localStorage.setItem('dataMenuKey', stringDataMenu)

    // let arrDataBill = dataBill["data"]
    // let stringDataBill = JSON.stringify(arrDataBill)
    // localStorage.setItem('dataBillKey', stringDataBill)

    // location = 0: concat all tableNumber
    dataLocationTable["data"].forEach(element => {
        allTableNumber = allTableNumber.concat(element.tableNumber);
    });
    dataLocationTable["data"][0].tableNumber = allTableNumber;

    //check localStorage has dataLocationTableKey, if null -> setItem
    let getArrValueDataLocationTable = localStorage.getItem('dataLocationTableKey')
    if (getArrValueDataLocationTable == null) {
        let arrDataLocationTable = dataLocationTable["data"]
        let stringDataLocationTable = JSON.stringify(arrDataLocationTable)
        localStorage.setItem('dataLocationTableKey', stringDataLocationTable)
    }
    getArrValueDataLocationTable = localStorage.getItem('dataLocationTableKey')
    getArrValueDataLocationTableObj = JSON.parse(getArrValueDataLocationTable)

    // create btn location
    getArrValueDataLocationTableObj.forEach(element => {
        if (element.location == 0) {
            let bnt = $('<button type="button" id="btnFAll" class="btnFloor" onclick="onClickLocation(' + element.location + ')"></button>').text("All");
            $(".floor").append(bnt);
        } else {
            let bnt = $('<button type="button" id="btnF' + element.location + '" class="btnFloor" onclick="onClickLocation(' + element.location + ')"></button>').text("Floor " + element.location);
            $(".floor").append(bnt);
        }
    });


    //load all table
    onClickLocation(0);
    //load all menu
    loadAllMenu(dataMenu);

    //creat category list
    dataMenu['data'].forEach(element => {
        categoryList.push(element.catelogy);
        categoryList.sort()
        for (let i = 1; i < categoryList.length; i++) {
            if (categoryList[i] == categoryList[i - 1]) {
                categoryList.splice(i, 1)
            }
        }
    })

    let optionAll = $('<option value="All">All</option>')
    $('.form-select').append(optionAll)

    for (let j = 0; j < categoryList.length; j++) {
        let option = $('<option value="' + categoryList[j] + '">' + categoryList[j] + '</option>')
        $('.form-select').append(option)
    }

});


//fn click btn location
function onClickLocation(paramLocation) {
    $(".list-tables").html([]);

    if (paramLocation == 0) {
        $('.btnFloor').removeClass('chooseBtn')
        $('#btnFAll').addClass('chooseBtn')
    } else {
        $('.btnFloor').removeClass('chooseBtn')
        $('#btnF' + paramLocation).addClass('chooseBtn')
    }

    getArrValueDataLocationTableObj.forEach(element => {
        if (element.location == paramLocation) {
            locationNumber = element.location;
            for (let i = 0; i < element.tableNumber.length; i++) {
                let btn = $('<button id="btnTable' + element.tableNumber[i] + '" class="table1" onclick="onClickTableNumber(`' + element.tableNumber[i] + '`)"></button>').text("Table " + element.tableNumber[i]);
                $(".list-tables").append(btn);

                getArrValueDataBillObj.forEach(element1 => {
                    if (element1.table == element.tableNumber[i]) {
                        $(btn).addClass('onBill');
                    }
                });
            }
        }
    })
}

//load menu catelogy
function loadCatelogyMenu() {
    let dataMenuCatelogy = {
        "data": []
    }
    dataMenu["data"].forEach(element => {
        if (element.catelogy == category) {
            dataMenuCatelogy['data'] = dataMenuCatelogy['data'].concat(element)
            let row = $('<tr><<td class = "pic"> <img src="' + element.pic + '"></td><td>' + element.name + '</td><td>' + element.unit + '</td><td><p>' + element.unitPrice + '</p></td><td><button type="button" class="selectItem btn btn-outline-success" onclick="onClickSelectItem(\'' + element.name + '\')">Select</button></td></tr>');
            $(".menu").append(row);
        }
    });
    if (billTableNumberSelect == 0) {
        $('.selectItem').attr("disabled", "disabled");
        $('.selectItem').removeClass('btn-outline-success');
        $('.selectItem').addClass('btn-outline-secondary');
        $('.invoice').css('display', 'none');
        $('.table-ready').css('display', 'block');

    } else {
        $('.selectItem').removeAttr("disabled");
        // $('.invoice').css('display', 'block');
        $('.none-invoice').css('display', 'none');
    }

    return dataMenuCatelogy;
}

//fn click catelogy
function onClickCatelogy(paramsCatelogy) {
    category = paramsCatelogy;
    $('#inputSearch').val('');
    $(".menu").html([]);

    dataMenuCatelogy = {
        "data": []
    }
    if (paramsCatelogy == "All") {
        loadAllMenu(dataMenu);
    } else {
        loadCatelogyMenu();
    }
    $('.form-select option').removeAttr('selected');
    $('.form-select option[value="' + category + '"]').attr('selected', 'selected');
    if (billTableNumberSelect == 0) {
        $('.table-ready').css('display', 'none');

    }
}

//fn load all menu
function loadAllMenu(dataMenuP) {
    $(".menu").html([]);
    dataMenuCatelogy = {
        "data": []
    };
    dataMenuP['data'].forEach(element => {
        let row = $('<tr><<td class = "pic"> <img src="' + element.pic + '"></td><td>' + element.name + '</td><td>' + element.unit + '</td><td><p>' + element.unitPrice + '</p></td><td><button type="button" class="selectItem btn btn-outline-success" onclick="onClickSelectItem(\'' + element.name + '\')">Select</button></td></tr>');
        $(".menu").append(row);
    });
    if (billTableNumberSelect == 0) {
        $('.selectItem').attr("disabled", "disabled");
        $('.selectItem').removeClass('btn-outline-success');
        $('.selectItem').addClass('btn-outline-secondary');
        $('.invoice').css('display', 'none');

    } else {
        $('.selectItem').removeAttr("disabled");
        $('.none-invoice').css('display', 'none');
    }
    return dataMenuP['data'];
}
var dataSearch = {
    'data': [{
    }]
}
//fn show list on type search
$(".search").keyup(function (e) {
    onPressKey();
});

var textSearch = "";
function onPressKey() {
    textSearch = $(".search").val();
    dataSearch = {
        'data': [{
        }]
    }
    if (category == "All") {
        dataSearch['data'] = loadAllMenu(dataMenu).filter((e) => {
            return e.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase());
        })
    } else {
        dataSearch['data'] = loadCatelogyMenu()['data'].filter((e) => {
            return e.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase());
        })
    }
    loadAllMenu(dataSearch);
    if (billTableNumberSelect == 0) {
        $('.table-ready').css('display', 'none');

    }
    return dataSearch;
}

//fn click table
function onClickTableNumber(tableNumber) {
    $('#inputSearch').val('');
    $('.form-select option[value="All"]').attr('selected', 'selected');
    category = "All";

    $('.payment').html('');

    let btnPayment = '';

    btnPayment = $('<button onclick="loadBillInfor(`' + tableNumber + '`)" type="button" id="payment" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#paymentModal" disabled="disabled">Payment <i class="fa-solid fa-file-invoice-dollar"></i></button>');
    $('.payment').append(btnPayment)

    loadBill(tableNumber);
    loadAllMenu(dataMenu);
    activePayment();
}

function loadBillInfor(tableNumber) {
    $('.name-bill').text("Bill Table: " + tableNumber);
    $(".table-bill-confirm tbody").html([]);
    getArrValueDataBillObj.forEach(element => {
        if (tableNumber == element.table) {
            for (let i = 0; i < element.detailItem.length; i++) {
                let row = $('<tr><td>' + (i + 1) + '</td><td>' + element.detailItem[i].nameItem + '</td><td class="unitPModal">' + getUnitPrice(element.detailItem[i].nameItem) + '</td><td class="quantityChildModal">' + getQualityFromData(i) + '</td><td class="amount-itemModal">' + amount(element.detailItem[i].quantity, element.detailItem[i].nameItem) + '</td></tr>')
                $(".table-bill-confirm tbody").append(row)
            }
        }
    })
    $('.sum-total .total-pay-infor').html($('.sum-total #total-pay').val() + '₫');
    $('.btnConfirmNPrint').remove();

    let btnConfirmNPrint = $('<button onclick="onClickConfirmNPrint(`' + tableNumber + '`)" type="button" class="btnConfirmNPrint btn btn-primary" data-bs-dismiss="modal">Confirm and Print</button>')
    $('.modal-footer').append(btnConfirmNPrint);
}

function loadBill(tableNumber) {
    let flagCheckOnBill = false;
    billTableNumberSelect = tableNumber;
    $('.name-bill').text("Bill Table: " + tableNumber);
    $(".table-bill tbody").html([]);
    getArrValueDataBillObj.forEach(element => {
        if (tableNumber == element.table) {
            flagCheckOnBill = true;
            $('.invoice').css('display', 'block');
            $('.table-ready').css('display', 'none');
            for (let i = 0; i < element.detailItem.length; i++) {
                let row = $('<tr><td>' + (i + 1) + '</td><td id="name' + i + '">' + element.detailItem[i].nameItem + '</td><td class="unitP" id="unitP' + i + '">' + getUnitPrice(element.detailItem[i].nameItem) + '</td><td class="quantityChild"><i class="fa-solid fa-circle-minus" onclick="onClickMinus(' + element.detailItem[i].quantity + ',' + i + ')"></i><input id="number' + i + '" type="number" value="' + getQualityFromData(i) + '"><i class="fa-sharp fa-solid fa-circle-plus" onclick="onClickPlus(' + element.detailItem[i].quantity + ',' + i + ')"></i></td><td class="amount-item" id="amount' + i + '">' + amount(element.detailItem[i].quantity, element.detailItem[i].nameItem) + '</td><td> <button onclick="onClickDeleteItem(' + i + ')" class="icon-delete" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" ><svg class="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40"><path class="trash-lid" fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" /><path class="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" /></svg></button> </td></tr>')
                $(".table-bill tbody").append(row)
            }
        }
    })
    caculatorTotalPay();
    if (flagCheckOnBill == false) {
        $('.invoice').css('display', 'none');
        $('.table-ready').css('display', 'block');
        $('.notice').html('Table ' + tableNumber + ' in ready to order');
    }
}

function onClickPlus(numberQuality, i) {

    numberQuality++;
    getArrValueDataBillObj.forEach(element => {
        if (element.table == billTableNumberSelect) {
            element.detailItem[i]["quantity"] = numberQuality

            //update localStorage dataBillKey when click plus
            let stringDataBill = JSON.stringify(getArrValueDataBillObj)
            localStorage.setItem('dataBillKey', stringDataBill)
        }
    })
    loadBill(billTableNumberSelect)


}

function caculatorTotalPay() {
    let totalPay = 0;
    for (let index = 0; index < $('.amount-item').length; index++) {
        totalPay += parseInt($('.amount-item')[index].innerHTML);
    }
    $('.sum-total input').val(totalPay);
}

function onClickMinus(numberQuality, i) {
    numberQuality--;
    if (numberQuality <= 0) {
        numberQuality = 1;
    }
    getArrValueDataBillObj.forEach(element => {
        if (element.table == billTableNumberSelect) {
            element.detailItem[i]["quantity"] = numberQuality
            //update localStorage dataBillKey when click minus
            let stringDataBill = JSON.stringify(getArrValueDataBillObj)
            localStorage.setItem('dataBillKey', stringDataBill)
        }
    })



    loadBill(billTableNumberSelect)
}


function amount(quantity, paramNameItem) {
    let price = getUnitPrice(paramNameItem)
    return quantity * price;
}

function getUnitPrice(paramNameItem) {
    let priceRow = 0;
    dataMenu['data'].forEach(element => {
        if (element.name == paramNameItem) {
            priceRow = element.unitPrice;
        }
    });
    return priceRow;
}

function getQualityFromData(i) {
    let result = "";
    getArrValueDataBillObj.forEach(element => {
        if (element.table == billTableNumberSelect) {
            result = element.detailItem[i]["quantity"]
        }
    })
    return result
}

function activePayment() {
    $('#payment').attr('disabled', 'disabled');
    getArrValueDataBillObj.forEach(element => {
        if (element.table == billTableNumberSelect) {
            $('#payment').removeAttr('disabled');
        }
    })
}

function onClickSelectItem(e) {
    let flag = true;
    let flagCheckTableExist = false;

    getArrValueDataBillObj.forEach(element => {
        if (element.table == billTableNumberSelect) {
            flagCheckTableExist = true;
            for (let i = 0; i < element.detailItem.length; i++) {
                if (element.detailItem[i].nameItem == e) {
                    flag = false;
                    element.detailItem[i]["quantity"]++;
                }
            }
            if (flag == true) {
                element.detailItem.push({
                    "nameItem": e,
                    "quantity": 1
                })
            }
        }
    })
    if (flagCheckTableExist == false) {
        getArrValueDataBillObj.push({
            "table": billTableNumberSelect,
            "detailItem": [{
                "nameItem": e,
                "quantity": 1
            }]
        })

    }

    //update value dataBillKey in localStorage
    let stringDataBill = JSON.stringify(getArrValueDataBillObj)
    localStorage.setItem('dataBillKey', stringDataBill)

    let getArrValueDataBill = localStorage.getItem('dataBillKey')
    getArrValueDataBillObj = JSON.parse(getArrValueDataBill)

    activePayment();
    //update color table busy
    onClickLocation(locationNumber);
    loadBill(billTableNumberSelect);


}

function onClickDeleteItem(index) {
    $('.btnConfirmNPrint').remove();
    $('.btnDeleteModal').remove();

    let btnDelete = $('<button onclick="onClickDeleteModal(' + index + ')" type="button" class="btnDeleteModal btn btn-danger" data-bs-dismiss="modal">Delete</button>')
    $('.modal-footer-delete').append(btnDelete);
}

function onClickDeleteModal(index) {
    getArrValueDataBillObj.forEach(element => {
        if (element.table == billTableNumberSelect) {
            element.detailItem.splice(index, 1)
        }
    })
    loadBill(billTableNumberSelect);

    //update value dataBillKey in localStorage
    let stringDataBill = JSON.stringify(getArrValueDataBillObj)
    localStorage.setItem('dataBillKey', stringDataBill)
}

function onClickConfirmNPrint(e) {
    let i = 0;
    getArrValueDataBillObj.forEach((element, index) => {
        if (element.table == e) {
            i = index;
        }
    })
    getArrValueDataBillObj.splice(i, 1);
    //update value dataBillKey in localStorage
    let stringDataBill = JSON.stringify(getArrValueDataBillObj)
    localStorage.setItem('dataBillKey', stringDataBill)

    loadBill(billTableNumberSelect);
    onClickLocation(locationNumber);
    activePayment();
}















