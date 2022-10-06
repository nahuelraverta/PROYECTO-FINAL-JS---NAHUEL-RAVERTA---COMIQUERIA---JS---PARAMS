/* CARRITO DE COMPRAS */
let carrito = [];


const addToShoppingCartButtons = document.querySelectorAll('.addToCart'); //se selecciona donde se encuentra la clase addtocart
addToShoppingCartButtons.forEach(addToCartButtom => {
    addToCartButtom.addEventListener('click', addToCartClicked); //se selecciona todos los elementos que tenga dicha clase y se le des da un evento.
});


const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector( //creamos esta const para que aparezca el elemento en el carrito.
    '.shoppingCartItemsContainer'
);

function addToCartClicked(event) { // creamos la funcion para el boton
    const button = event.target; //seleccionamos con target
    const item = button.closest('.tarjeta2'); //closest sirva para encontrar la clase dentro del html

    const itemTitle = item.querySelector('.item-title').textContent; //despejamos el titulo
    const itemPrice = item.querySelector('.item-price').textContent; //despejamos precio
    const itemImage = item.querySelector('.item-image').src; //despejamos imagen

    addItemToShoppingCart(itemTitle, itemPrice, itemImage); //creamos una funcion que englobe los 3 despejados.

    let producto = { //utilizo cada asignacion para crear un array.
        nombre:itemTitle,
        img:itemImage,
        precio: itemPrice,
        cantidad:1
    };

    carrito.push(producto); //se pushean todos los productos dentro del array carrito.
    

    let arreglo_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito" , arreglo_JSON);

    console.log( carrito);

    /* TOASTIFY */

    Toastify({

        text: itemTitle + " ha sido agregado al carrito",
        duration: 1500,
        gravity: "bottom",
        position: "right",
        style: {
            fontSize: "15px",
            color: "white",
            background: "#292929"
        }

    }).showToast();

}


function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

    /* evitar reiteracion del articulo y sume bajo el mismo elemento */
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${itemImage} class="shopping-cart-image miniatura">
                  <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
              </div>
          </div>
          <div class="col-4">
              <div
                  class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                      value="1">
                  <button class="btn btn-danger buttonDelete" type="button">X</button>
              </div>
          </div>
      </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent; //darle permiso para aparecer en el html
    shoppingCartItemsContainer.append(shoppingCartRow); //apilar la info.




    /* boton borrar elemento */

    shoppingCartRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeShoppingCartItem);

    shoppingCartRow
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', quantityChanged);

    /* continuar minuto 17:05 --> https://www.youtube.com/watch?v=dSbWJAXQ7cA&t=313s */


    updateShoppingCartTotal();
}

/* monto declarado + sumatoria de los elementos */

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '') //replace reemplaza el valor por defecto y permite crear un string.
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `  $${total.toFixed(2)}`;
}


function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}


//funcion para mostrar / ocultar carrito








//CLIMA - FETCH

let contenedor = document.getElementById("clima");
let ciudad = "Buenos Aires";


fetch("https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&units=metric&appid=45b995d91044859550f4a4f5692e3855")
    .then(response => response.json())
    .then(data => {
        contenedor.innerHTML = ` <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"><img>
    <span> Ciudad: ${data.name}</span>
                                 <span> Temperatura: ${data.main.temp}°C </span>  `
    }); 