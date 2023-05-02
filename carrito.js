const carrito = JSON.parse(localStorage.getItem("prods-carrito"))

const carritoVacio = document.querySelector("#carrito-vacio")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const productosCarrito = document.querySelector("#productos-carrito")
const acciones = document.querySelector("#acciones")
const compraRealizada = document.querySelector("#compra-realizada")
const total = document.querySelector("#total")
const comprar = document.querySelector("#comprar")

productosCarrito.innerHTML = ""

const precioTotal = () => {
    const calcularTotal = carrito.reduce((acc, producto)=> acc + (producto.precio * producto.cantidad),0)
    total.innerText = `$${calcularTotal}`
}

const cargarProductosCarrito = () => {
    if(carrito && carrito.length > 0){

        carritoVacio.classList.add("hide")
        vaciarCarrito.classList.remove("hide")
        productosCarrito.classList.remove("hide")
        acciones.classList.remove("hide")
        compraRealizada.classList.add("hide")
    
        carrito.forEach(producto => {
            const div = document.createElement("div")
            div.className = "cart-product"
    
            div.innerHTML = `
                <div class="cart-product-type">
                    <img class="cart-product-img" src="${producto.img}" alt="${producto.nombre}">
                    <div class="cart-product-description">
                        <small class="cart-product-name fs-6 text-uppercase text-wrap fw-bold">${producto.nombre}</small>
                        <p class="cart-product-price fw-bold">$ ${producto.precio}</p>
                    </div>
                </div>
                <div class="cart-product-info">
                    <div class="cart-product-quantity">
                        <small class="cart-txt fw-bold">Cantidad</small>
                        <p class="cart-txt">${producto.cantidad}</p>
                    </div>
                    <div class="cart-product-subtotal">
                        <small class="cart-txt fw-bold">Subtotal</small>
                        <p class="cart-txt">$ ${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="delete-product" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
                </div>    
            `
            productosCarrito.append(div)
        })
        
    }else{
        carritoVacio.classList.remove("hide")
        vaciarCarrito.classList.add("hide")
        productosCarrito.classList.add("hide")
        acciones.classList.add("hide")
        compraRealizada.classList.add("hide")
    }

    precioTotal()

}
cargarProductosCarrito()

const comprarCarrito = () => {
    carrito.length = 0
    localStorage.setItem("prods-carrito", JSON.stringify(carrito))

    carritoVacio.classList.add("hide")
    vaciarCarrito.classList.add("hide")
    productosCarrito.classList.add("hide")
    acciones.classList.add("hide")
    compraRealizada.classList.remove("hide")
}
comprar.addEventListener("click",comprarCarrito)

//falta funcionalidad de botones eliminar y vaciar carrito