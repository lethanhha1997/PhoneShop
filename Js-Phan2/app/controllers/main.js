var productList = new ProductServices();
var validation = new Validation();

function getProductListPhone() {
    productList.getProductList().then(function (result) {
        showProductTable(result.data)
    }).catch(function (error) {
        error = "Kết nối Thất Bại";
        alert(error)
    })
}
getProductListPhone();

function showProductTable(arrayProduct) {
    var content = "";
    var stt = 1;
    arrayProduct.map(function (product) {
        content += `
            <tr>
                <td>${stt++}</td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.camera1}</td>
                <td>${product.camera2}</td>
                <td>${product.img}</td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                    <button class="btn btn-info" onclick="getDetailPhone('${product.id}')" data-toggle="modal" data-target="#myModal">Xem</button>
                    <button class="btn btn-danger" onclick="deleteProductPhones('${product.id}')" style="width:57.59px;" >Xóa</button>
                </td>
            </tr>
        `
    })
    document.getElementById("productLists").innerHTML = content;
}
function handleForm() {
    document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class = "btn btn-primary" onclick="addProducts()"> Thêm Sản Phẩm Mới</button>
    `;
    var formELE = document.querySelectorAll("#myModal .form-control");
    for (var i = 0; i < formELE.length; i++) {
        formELE[i].value = "";
    }
}
document.querySelector("#btnThemSP").onclick = handleForm;

function addProducts() {
    var name = document.getElementById("nameProduct").value;
    var price = document.getElementById("priceProduct").value;
    var screen = document.getElementById("screenProduct").value;
    var backCamera = document.getElementById("backCameraProduct").value;
    var frontCamera = document.getElementById("frontCameraProduct").value;
    var img = document.getElementById("imgProduct").value;
    var desc = document.getElementById("descProduct").value;
    var type = document.getElementById("typeProduct").value;

    var isValid = true;
    isValid &= validation.checkEmpty(name, "tbName", "Tên Sản Phẩm Được Để Trống");
    isValid &= validation.checkEmpty(price, "tbPrice", "Giá Sản Phẩm Được Để Trống")
        && validation.checkPriceProduct(price, "tbPrice", "Giá Sản Phẩm Không Hợp Lệ");
    isValid &= validation.checkEmpty(screen, "tbScreen", "Màng Hình Không Được Để Trống");
    isValid &= validation.checkEmpty(backCamera, "tbBackCam", "Camera Trước Sản Phẩm Không Được Để Trống");
    isValid &= validation.checkEmpty(frontCamera, "tbFrontCam", "Camera Sau Sản Phẩm Không Được Để Trống");
    isValid &= validation.checkEmpty(img, "tbImg", "Hình Ảnh Sản Phẩm Không Được Để Trống");
    isValid &= validation.checkEmpty(desc, "tbDesc", "Mô Tả Sản Phẩm Không Được Để Trống");
    isValid &= validation.checkType("typeProduct", "tbType", "Hãng Sản Phẩm Chưa Được Chọn");

    if (isValid) {
        var product = new Products(name, price, screen, backCamera, frontCamera, img, desc, type);
        console.log(product);
        productList.addProduct(product).then(function (result) {
            document.querySelector("#myModal .close ").click();
            getProductListPhone();
            resetForm()
        }).catch(function (error) {
            error = "Kết nối Thất Bại";
            alert(error)
        })
    }
}


function resetForm() {
    document.getElementById("formProduct").reset()
}

function getDetailPhone(id) {
    productList.getProductDetail(id).then(function (result) {
        console.log(result.data)
        document.getElementById("nameProduct").value = result.data.name;
        document.getElementById("priceProduct").value = result.data.price;
        document.getElementById("screenProduct").value = result.data.screen;
        document.getElementById("backCameraProduct").value = result.data.camera1;
        document.getElementById("frontCameraProduct").value = result.data.camera2;
        document.getElementById("imgProduct").value = result.data.img;
        document.getElementById("descProduct").value = result.data.desc;
        document.getElementById("typeProduct").value = result.data.type;
        document.querySelector("#myModal .modal-footer").innerHTML = `<button class = "btn btn-info" onclick="updateProductList('${result.data.id}')">Update</button>`;
    }).catch(function (error) {
        error = "Kết nối Thất Bại";
        alert(error);
    })
}

function updateProductList(id) {
    var name = document.getElementById("nameProduct").value;
    var price = document.getElementById("priceProduct").value;
    var screen = document.getElementById("screenProduct").value;
    var camera1 = document.getElementById("backCameraProduct").value;
    var camera2 = document.getElementById("frontCameraProduct").value;
    var img = document.getElementById("imgProduct").value;
    var desc = document.getElementById("descProduct").value;
    var type = document.getElementById("typeProduct").value;

    var isValid = true;
    isValid &= validation.checkEmpty(name, "tbName", "Tên Sản Phẩm Được Để Trống");
    isValid &= validation.checkEmpty(price, "tbPrice", "Giá Sản Phẩm Được Để Trống")
        && validation.checkPriceProduct(price, "tbPrice", "Giá Sản Phẩm Không Hợp Lệ");
    isValid &= validation.checkEmpty(screen, "tbScreen", "Màng Hình Không Được Để Trống");
    isValid &= validation.checkEmpty(camera1, "tbBackCam", "Camera Trước Sản Phẩm Không Được Để Trống");
    isValid &= validation.checkEmpty(camera2, "tbFrontCam", "Camera Sau Sản Phẩm Không Được Để Trống");
    isValid &= validation.checkEmpty(img, "tbImg", "Hình Ảnh Sản Phẩm Không Được Để Trống");
    isValid &= validation.checkEmpty(desc, "tbDesc", "Mô Tả Sản Phẩm Không Được Để Trống");
    isValid &= validation.checkType("typeProduct", "tbType", "Hãng Sản Phẩm Chưa Được Chọn");

    if (isValid) {
        var productUpdate = new Products(name, price, screen, camera1, camera2, img, desc, type);
        productList.updateProductPhone(id, productUpdate).then(function (result) {
            document.querySelector("#myModal .close ").click();
            getProductListPhone()
        }).catch(function (error) {
            error = "Kết nối Thất Bại";
            alert(error);
        })
    }
}
function deleteProductPhones(id){
    productList.deleteProductPhone(id).then(function(result){
        getProductListPhone()
    }).catch(function(error){
        error = "Kết nối Thất Bại";
        alert(error);
    })
}
