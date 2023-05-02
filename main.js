const productos = [
    {
        id: "prod1",
        nombre: "MANHATTAN BURGER",
        descripcion: "Carne, lechuga, tomate, mayonesa, jamón, muzzarella, crispy bacon, huevo frito.",
        precio: 435,
        img: "./assets/img/prod1.png"
    },
    {
        id: "prod2",
        nombre: "BROOKLYN BURGER",
        descripcion: "Carne, cebolla caramelizada, salsa bbq, crispy bacon, cheddar.",
        precio: 435,
        img: "./assets/img/prod2.png"
    },
    {
        id: "prod3",
        nombre: "NYC BURGER",
        descripcion: "Carne, cebolla caramelizada, queso emmenthal, crispy bacon, aros de cebolla, salsa bbq.",
        precio: 435,
        img: "./assets/img/prod3.png"
    },
    {
        id: "prod4",
        nombre: "LAS VEGAS BURGER",
        descripcion: "Carne, crispy bacon, aros de cebolla, salsa cheddar.",
        precio: 435,
        img: "./assets/img/prod4.png"
    },
    {
        id: "prod5",
        nombre: "PHILADELPHIA BURGER",
        descripcion: "2 carne, cebolla, mostaza, ketchup, doble cheddar.",
        precio: 505,
        img: "./assets/img/prod5.png"
    },
    {
        id: "prod6",
        nombre: "VEGGIE BURGER",
        descripcion: "Burger de espinaca, mayonesa, lechuga crisp, tomate, huevo duro, queso emmenthal, cebolla",
        precio: 450,
        img: "./assets/img/prod6.png"
    }
]
const contenedorProductos = document.querySelector("#contenedor-productos")
let botonesAgregar = document.querySelectorAll(".add-btn")
const number = document.querySelector("#number")
let carrito
const carritoGuardado = JSON.parse(localStorage.getItem("prods-carrito"))

const actualizarNumeroCarrito = () => {
    let nuevoNumero = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    number.innerText = nuevoNumero 
}

if(carritoGuardado){
    carrito = carritoGuardado
    actualizarNumeroCarrito()
}else{
    carrito = []
}


const agregarAlCarrito = (e) => {
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if(carrito.some(producto => producto.id === idBoton)){
        const index = carrito.findIndex(producto => producto.id === idBoton)
        carrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1
        carrito.push(productoAgregado)
    }
    actualizarNumeroCarrito()
    
    localStorage.setItem("prods-carrito", JSON.stringify(carrito))
}

const cargarBotonesAgregar = () => {
    botonesAgregar = document.querySelectorAll(".add-btn")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

const cargarProductos = () => {
    productos.forEach(producto => {
        const div = document.createElement("div")
        div.className = "col-sx-1 col-md-4"
        div.innerHTML = `
            <div class="product" >
                <button class="product-box">
                    <div class="prod-title-container d-flex flex-column">
                        <p class="product-title fs-6 text-center text-uppercase text-wrap">${producto.nombre}</p>
                    </div>
                    <div class="prod-img">
                        <img src="${producto.img}" class="d-block w-100 image">
                        <div class="overlay"></div>
                    </div>
                </button>
                <div class="product-description">
                    <div class="txt-container">
                        <p class="product-description-txt line-clamp">${producto.descripcion}</p>
                    </div>
                    <div class="float-start">
                        <p class="product-price fw-bold">$ ${producto.precio}</p>
                    </div>
                    <div class="float-end">
                        <button class="add-btn rounded-circle" id="${producto.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-plus add-icon">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `
        contenedorProductos.append(div)
    })

    cargarBotonesAgregar()

}

cargarProductos()