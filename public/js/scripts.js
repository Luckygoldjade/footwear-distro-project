/* 
Citation for the following functions: deleteDistributionCenters, updateDistributionCenters
Date: 11/15/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Distribution Centers Scripts
function deleteDistributionCenters() {
    deleteDistributionCenterID = document.querySelector("#deleteDistributionCenterID").value;

    let data = {
        distributionCenterID: deleteDistributionCenterID
    };

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/deleteDistributionCenters", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateDistributionCenters(){
    updateDistributionCenterID = document.querySelector("#updateDistributionCenterID").value;
    updatePhoneNumber = document.querySelector("#updatePhoneNumber").value;
    updateEmail = document.querySelector("#updateEmail").value;
    updateAddress = document.querySelector("#updateAddress").value;

    if (!updateDistributionCenterID || !updatePhoneNumber || !updateEmail || !updateAddress) {
        return;
    }

    let data = {
        distributionCenterID : updateDistributionCenterID,
        phoneNumber : updatePhoneNumber,
        email : updateEmail,
        address : updateAddress
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/updateDistributionCenters", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

/* 
Citation for the following functions: deleteModels, updateModels
Date: 11/27/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Models Scripts
function deleteModels() {
    deleteModelID = document.querySelector("#deleteModelID").value;

    let data = {
        modelID: deleteModelID
    };

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/deleteModels", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateModels(){
    updateModelID = document.querySelector("#updateModelID").value;
    updateModelName = document.querySelector("#updateModelName").value;

    if (!updateModelID || !updateModelName) {
        return;
    }

    let data = {
        modelID : updateModelID,
        modelName : updateModelName,
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/updateModels", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

/* 
Citation for the following functions: deleteColors, updateColors
Date: 11/27/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Colors Scripts
function deleteColors() {
    deleteColorID = document.querySelector("#deleteColorID").value;

    let data = {
        colorID: deleteColorID
    };

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/deleteColors", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateColors(){
    updateColorID = document.querySelector("#updateColorID").value;
    updateColorName = document.querySelector("#updateColorName").value;

    if (!updateColorID || !updateColorName) {
        return;
    }

    let data = {
        colorID : updateColorID,
        colorName : updateColorName,
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/updateColors", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

/* 
Citation for the following functions: deleteStores, updateStores
Date: 11/27/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Stores Scripts
function deleteStores() {
    deleteStoreID = document.querySelector("#deleteStoreID").value;

    let data = {
        storeID: deleteStoreID
    };

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/deleteStores", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateStores(){
    updateStoreID = document.querySelector("#updateStoreID").value;
    updateStoreName = document.querySelector("#updateStoreName").value;
    updatePhoneNumber = document.querySelector("#updatePhoneNumber").value;
    updateEmail = document.querySelector("#updateEmail").value;
    updateAddress = document.querySelector("#updateAddress").value;

    if (!updateStoreID || !updatePhoneNumber || !updateEmail || !updateAddress || !updateStoreName) {
        return;
    }

    let data = {
        storeID : updateStoreID,
        storeName: updateStoreName,
        phoneNumber : updatePhoneNumber,
        email : updateEmail,
        address : updateAddress
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/updateStores", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

/* 
Citation for the following functions: deleteProducts, updateProducts, addProducts
Date: 11/27/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Products Scripts
function deleteProducts() {
    deleteProductID = document.querySelector("#deleteProductID").value;

    let data = {
        productID: deleteProductID
    };

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/deleteProducts", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateProducts(){
    updateProductID = document.querySelector("#updateProductID").value;
    updateModelName = document.querySelector("#updateModelName").value;
    updateColor = document.querySelector("#updateColor").value;
    updateBarcode = document.querySelector("#updateBarcode").value;
    updateSize = document.querySelector("#updateSize").value;
    if (checkBarcode(updateBarcode, updateProductID)) {
        return
    }
    if (!updateProductID || !updateModelName || !updateColor || !updateBarcode || !updateSize) {
        return;
    }

    let data = {
        productID : updateProductID,
        modelName: updateModelName,
        color : updateColor,
        barcode : updateBarcode,
        size : updateSize
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/updateProducts", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function addProducts(){
    addModelName = document.querySelector("#input-modelName").value;
    addColor = document.querySelector("#input-color").value;
    addBarcode = document.querySelector("#input-barcode").value;
    addSize = document.querySelector("#input-size").value;
    if (checkBarcode(addBarcode, NaN)) {
        return
    }
    if (!addModelName || !addColor || !addBarcode || !addSize) {
        return;
    }

    let data = {
        modelName: addModelName,
        color : addColor,
        barcode : addBarcode,
        size : addSize
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/addProducts", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

// The checkBarcode function was created by our team.
function checkBarcode(Barcode, ProductID) {
    barcodes = Array.from(document.querySelectorAll("td"))
    for (let index = 3; index < barcodes.length; index+=5) {
        duplicate = parseInt(barcodes[index].innerHTML) === parseInt(Barcode)
        if ((isNaN(ProductID) && duplicate) || (barcodes[index - 3].innerHTML !== ProductID && duplicate)) {
            alert("Barcode Already Exists!")
            return true
        }
    }
    return false
}

/* 
Citation for the following functions: deleteInventories, updateInventories
Date: 11/28/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Inventories Scripts
function deleteInventories() {
    deleteInventoryID = document.querySelector("#deleteInventoryID").value;

    let data = {
        inventoryID: deleteInventoryID
    };

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/deleteInventories", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateInventories(){
    updateInventoryID = document.querySelector("#updateInventoryID").value;
    updateAddress = document.querySelector("#updateAddress").value;
    updateBarcode = document.querySelector("#updateBarcode").value;
    updateQuantity = document.querySelector("#updateQuantity").value;

    if (!updateInventoryID || !updateAddress || !updateBarcode || !updateQuantity) {
        return;
    }

    let data = {
        inventoryID : updateInventoryID,
        address: updateAddress,
        barcode : updateBarcode,
        quantity : updateQuantity
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/updateInventories", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

/* 
Citation for the following functions: deleteTransferredProducts, updateTransferredProducts
Date: 11/30/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// TransferredProducts Scripts
function deleteTransferredProducts() {
    deleteTransferredProductID = document.querySelector("#deleteTransferredProductID").value;

    let data = {
        transferredProductID: deleteTransferredProductID
    };

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/deleteTransferredProducts", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateTransferredProducts(){
    updateTransferredProductID = document.querySelector("#updateTransferredProductID").value;
    updateBarcode = document.querySelector("#updateBarcode").value;
    updateTransferReportID = document.querySelector("#updateTransferReportID").value;
    updateQuantity = document.querySelector("#updateQuantity").value;

    if (!updateTransferredProductID || !updateTransferReportID || !updateBarcode || !updateQuantity) {
        return;
    }

    let data = {
        transferredProductID : updateTransferredProductID,
        barcode : updateBarcode,
        transferReportID: updateTransferReportID,
        quantity : updateQuantity
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/updateTransferredProducts", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

/* 
Citation for the following functions: deleteTransferReports, updateTransferReports
Date: 11/30/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// TransferReports Scripts
function deleteTransferReports() {
    deleteTransferReportID = document.querySelector("#deleteTransferReportID").value;

    let data = {
        transferReportID: deleteTransferReportID
    };

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/deleteTransferReports", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}

function updateTransferReports(){
    updateTransferReportID = document.querySelector("#updateTransferReportID").value;
    updateAddress = document.querySelector("#updateAddress").value;
    updateStoreName = document.querySelector("#updateStoreName").value;
    updateDateCreated = document.querySelector("#updateDateCreated").value;
    updateDeliveryDateTime = document.querySelector("#updateDeliveryDateTime").value;
    let updateExpedited
    if (document.querySelector("#updateExpedited:checked")) {
        updateExpedited = 1
    } else {
        updateExpedited = 0
    }

    if (!updateTransferReportID || !updateAddress || !updateStoreName || !updateDateCreated || !updateDeliveryDateTime) {
        return;
    }

    let data = {
        transferReportID : updateTransferReportID,
        address : updateAddress,
        storeName: updateStoreName,
        dateCreated : updateDateCreated,
        deliveryDateTime : updateDeliveryDateTime,
        expedited : updateExpedited
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "/updateTransferReports", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else {
            console.log("error");
        }
    }
    xhttp.send(JSON.stringify(data));
}