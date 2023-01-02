var productList = new ProductServices();
var cart = {
  quantity: 0,
  total: 0,
  data: [],
};
var newProducts = [];

function getProductListPhone() {
  productList
    .getProductList()
    .then(function (result) {
      newProducts = result.data;
      showProductItem(newProducts);
    })
    .catch(function (error) {
      error = "Kết Nối Dữ Liệu Thất Bại";
      alert(error);
    });
}
getProductListPhone();

function showProductItem(arrayProduct) {
  var content = "";
  arrayProduct.map(function (product) {
    content += `    
                    <div class="col-12 col-sm-6 col-lg-4 col-xl-3 cart-item">    
                        <div class="card">
                            <div class="top-bar">
                                <span class="fa-brands fa-aws"></span>
                                <h2 class="title-product"><a href="">${product.type}</a></h2>
                            </div>
                            <img src="${product.img}"class="card-img-top" alt="...">
                             <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <div class="wrapper">
                                            <h5> <span>Màng Hình:</span> ${product.screen}</h5>
                                            <h5><span>Camera Trước:</span> ${product.camera2}</h5>
                                            <h5><span>Camera Sau:</span> ${product.camera1}</h5>
                                            <p class="card-text">${product.desc}</p>
                                </div>
                                <div class="price">
                                                <h3 class="price-product">Giá: $${product.price}</h3>
                                                <div class="price-end">
                                                   <button class="btn-add" onclick="getProductPhone('${product.id}')">
                                                     ADD <i class="fas fa-chevron-right"> </i>
                                                  </button>
                                             </div>
                                </div>
                            </div>
                         </div>  
                    </div> 
                    
                    
                    
        `;
  });
  document.getElementById("cart").innerHTML = content;
}

function showShop() {
  var content = "";
  content += `<div class="content">
        <div class ="shop-cart">
             <div class="orderNow" id="pay">
                <div class="invoice">
                     <div class="shipping-items">
                        <div class="item-names">  
                        </div>
                        <div class="items-price">    
                        </div>
                    </div>
                    <hr>
                    <div class=payment>
                     <em>payment</em>
                     <div>
                        <p>Tổng tiền phải thanh toán</p>
                        <span class="totalPay"></span>
                    </div>
                </div>
            <div class="order">
                <button class="btn-order btn" id="btnPay" onclick="payProduct()" style="color:#fff">Thanh Toán</button>
                <button class="btn-cancel btn" id="btnCancel" onclick="nonePayCart()" style="color:#fff">Cancel</button>
            </div>
        </div>
    </div>   
<div class="orderNow2" id="thanks">
    <div class="invoice2" >
        <div>
            <div class="order-details">
                <em>Đơn hàng của bạn đã được lên</em>
                <hr>
                <p>Mã số đơn hàng của bạn là : <span id="random">${Math.floor(
                  Math.random() * 1000
                )}</span></p>
                <hr>
                <p>Đơn hàng của bạn sẽ được giao trong khoảng 3 ngày tới</p>
                <hr>
                <p> Bạn có thể thanh toán số tiền 
                <span class="totalPay2"> $  </span> 
                bằng thẻ tín dụng hoặc dịch vụ COD </p>
                <p>Cám ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
                <button onclick="closePay()" class="btn-ok">okay</button>
            </div>
        </div>
    </div>     
            </div>  
            <div id="cart-list" >                   
                <select id="typeProduct" onchange="showTypePhone()">
                    <option selected>Chọn Hãng</option>
                    <option>Iphone</option>
                    <option>SamSung</option>
                </select>
                <div class="cart-content">
                    <button id="countProduct" onclick="myShow()"><i class="fas fa-shopping-cart"></i> </button>
                    <span class="cart-span" id="count">0</span>     
                </div>       
            </div>      
            <div class="side-nav" id="sideNav" > 
                <h2>Cart</h2>      
                <button onclick="myClose()" class="btn-close"><i class="fas fa-times"></i></button>
                <div id="cart-sp">
                    <table class="table">            
                        <tbody id="tbodyCart">
        
                        </tbody>
                    </table>
                </div>                 
                <div class="final" >
                    <strong id="total-cart" style="color:red ;">Total: $ <span class="total">0</span></strong>
                    <div class="action">
                        <button onclick="showPayCart()" id="paycart" class="btn buy">Purchase <i class="fas fa-credit-card"
                                style="color:#6665dd;"></i>
                        </button>
                        <button onclick="clearCart()" class="btn clear">Clear Cart <i class="fas fa-trash"
                                style="color:#bb342f;"></i>
                        </button>
                    </div>
                </div>
            </div>         

            <div class="container" >
                <div class='row' id='cart'>
                </div>
            </div>
            <div class="cover"></div>
           
        </div>        
    </div>`;
  document.getElementById("app").innerHTML = content;
}
showShop();

function myShow() {
  document.getElementById("sideNav").style.right = "0";
}

function myClose() {
  nonePayCart();
  document.getElementById("sideNav").style.right = "-100%";
}

function showTypePhone() {
  var showItem = [];
  var valueSelect = document.getElementById("typeProduct").value;
  productList
    .getProductList()
    .then(function (result) {
      if (valueSelect == "Iphone") {
        for (var i = 0; i < newProducts.length; i++) {
          if (newProducts[i].type == "iPhone") {
            showItem.push(newProducts[i]);
            showProductItem(showItem);
          }
        }
      } else if (valueSelect == "SamSung") {
        for (var i = 0; i < newProducts.length; i++) {
          if (newProducts[i].type == "SamSung") {
            showItem.push(newProducts[i]);
            showProductItem(showItem);
          }
        }
      } else {
        getProductListPhone();
      }
    })
    .catch(function (error) {
      error = "Show Sản Phẩm Thất Bại";
      alert(error);
    });
}

function getProductPhone(id) {
  let item = newProducts.find((v) => v.id === id);
  if (item) {
    let cartItemIndex = cart.data.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (cartItemIndex == -1) {
      cart.data.push(item);
    } else {
      cart.data[cartItemIndex].quantity++;
    }
    cart.quantity++;
    cart.total += Number(item.price);
  }
  setLocalStorage();
  getLocalStorage();
}

function showCart(cart) {
  var content = "";
  cart.data.map(function (item) {
    content += `
        <tr>
            <td class="img-cart"><img src="${item.img}"></td>
            <td class="name-cart">${item.name} </td>
            <td>
                <button class="btn-quantity" >
                    <i class="fa-solid fa-chevron-left" onclick="minusQuantity('${
                      item.id
                    }')"></i>
                </button> 
                    <span class="sl-phone"> ${item.quantity}</span>
                <button class="btn-quantity" >
                    <i class="fa-solid fa-chevron-right" onclick="plusQuantity('${
                      item.id
                    }')" ></i>
                </button>
            </td>
            <td style="color:red;">$ ${item.price * item.quantity} </td>
            <td>
                <button class="btn-delete" onclick="deleteProduct('${
                  item.id
                }')"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
        `;
  });
  document.getElementById("tbodyCart").innerHTML = content;
}

function minusQuantity(id) {
  let product = newProducts.find((v) => v.id === id);
  if (product) {
    let cartItemIndex = cart.data.findIndex(
      (cartItem) => cartItem.id === product.id
    );
    if (cartItemIndex != -1) {
      if (cart.data[cartItemIndex].quantity > 1) {
        cart.data[cartItemIndex].quantity--;
        cart.quantity--;
        cart.total -= Number(cart.data[cartItemIndex].price);
      } else {
        moneyMin = Number(cart.data[cartItemIndex].price);
        cart.total -= moneyMin;
        cart.data.splice(cartItemIndex, 1);
        cart.quantity--;
      }
    }
  }
  setLocalStorage();
  getLocalStorage();
}

function plusQuantity(id) {
  let product = newProducts.find((v) => v.id === id);
  if (product) {
    let cartItemIndex = cart.data.findIndex(
      (cartItem) => cartItem.id === product.id
    );
    if (cartItemIndex != -1) {
      cart.data[cartItemIndex].quantity++;
      cart.quantity++;
      cart.total += Number(cart.data[cartItemIndex].price);
    }
  }
  setLocalStorage();
  getLocalStorage();
}

function deleteProduct(id) {
  let product = newProducts.find((v) => v.id === id);
  if (product) {
    let cartItemIndex = cart.data.findIndex(
      (cartItem) => cartItem.id === product.id
    );
    if (cartItemIndex != -1) {
      moneyMin =
        Number(cart.data[cartItemIndex].price) *
        Number(cart.data[cartItemIndex].quantity);
      cart.total -= moneyMin;
      cart.quantity -= Number(cart.data[cartItemIndex].quantity);
      cart.data.splice(cartItemIndex, 1);
    }
  }
  setLocalStorage();
  getLocalStorage();
}

function showQuantityCart(quantity) {
  document.querySelector("#count").innerHTML = quantity;
}

function nonePayCart() {
  document.getElementById("pay").classList.add("none");
}

function showPayCart() {
  const el = document.getElementById("pay");
  if (cart.data.length == 0) {
    el.className = "none";
  } else {
    el.className = el.className === "show" ? "none" : "show";
    document.getElementById("sideNav").style.right = "-100%";
    var content = "";
    cart.data.map(function (item) {
      content += `
        <span>${item.quantity} x ${item.name}</span>
        `;
    });
    document.querySelector(".item-names").innerHTML = content;
    var content2 = "";
    cart.data.map(function (item2) {
      content2 += `
        <span>$ ${item2.price * item2.quantity}</span>
        `;
    });
    document.querySelector(".items-price").innerHTML = content2;
  }
}

function showQuantityCart(quantity) {
  document.querySelector("#count").innerHTML = quantity;
}

function showCover() {
  document.querySelector(".cover").style.display = "block";
}

function closeCover() {
  document.querySelector(".cover").style.display = "none";
}

function closePay() {
  document.getElementById("thanks").classList.add("none");
  closeCover();
  clearCart();
}

function payProduct() {
  const el2 = document.getElementById("thanks");
  el2.className = el2.className === "show" ? "none" : "show";
  document.getElementById("pay").classList.add("none");
  showCover();
}

function totalCart(total) {
  document.querySelector(".total").innerHTML = total.toLocaleString();
  document.querySelector(".totalPay").innerHTML = "$ " + total.toLocaleString();
  document.querySelector(".totalPay2").innerHTML = "$" + total.toLocaleString();
}

function clearCart() {
  cart = { quantity: 0, total: 0, data: [] };
  setLocalStorage();
  getLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem("DSSP", JSON.stringify(cart));
}

function getLocalStorage() {
  if (localStorage.getItem("DSSP") != undefined) {
    cart = JSON.parse(localStorage.getItem("DSSP"));
  }
  totalCart(cart.total);
  showQuantityCart(cart.quantity);
  showCart(cart);
}
getLocalStorage();
