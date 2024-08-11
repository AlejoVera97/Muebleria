

let productos = document.getElementById("productos");

// BASE EN JSON 

fetch("/data.json")
.then((response) => response.json())
.then((data) => {
    data.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("grid-item");

    card.innerHTML = `
            <div class="imagen-contenedor">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen">
            <button class="agregar-carrito" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
            <h3 class="nombre-articulo">${producto.nombre}</h3>  
            <h4 class="precio-articulo">Precio: $${producto.precio}</h4>
        `;

    productos.appendChild(card);
    });
});


//---------------------------------------------------------------------------------------------

// Array para almacenar productos en el carrito
let carrito = [];


//Cargar el carrito desde el localStorage al inicializar la página
document.addEventListener("DOMContentLoaded", () => {
const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}
actualizarCarrito();
});

//---------------------------------------------------------------------------------------------

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
fetch("/data.json")
.then((response) => response.json())
.then((productos) => {
    const producto = productos.find((p) => p.id === id);
    if (producto) {
    const productoEnCarrito = carrito.find((p) => p.id === id);
    if (productoEnCarrito) {
    if (productoEnCarrito.cantidad < producto.cantidad) {
            productoEnCarrito.cantidad++;
        } else {
            Swal.fire("No hay mas stock,lo siento!");
        }
        } else {
        carrito.push({ ...producto, cantidad: 1 });
        }
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    })
.catch((error) => console.error("Error al buscar el producto:", error));
}

//---------------------------------------------------------------------------------------------

//funcion actulizar carrito
function actualizarCarrito() {
const contenedorCarrito = document.getElementById("carrito");
contenedorCarrito.innerHTML = "";
let total = 0;
carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto-carrito");
    div.innerHTML = `
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button onclick="incrementarCantidad(${producto.id})">+</button>
                    <button onclick="disminuirCantidad(${producto.id})">-</button>
                    <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                `;
    contenedorCarrito.appendChild(div);
total += producto.precio * producto.cantidad;
});

//---------------------------------------------------------------------------------------------

// Mostrar el total debajo de los productos en el carrito
const totalDiv = document.createElement("div");
totalDiv.classList.add("total-carrito");
totalDiv.innerHTML = `<section id="carrito" onclick="mostrarCarrito()">
                     <i class="fas fa-shopping-cart"></i> Carrito
                    </section>`;
contenedorCarrito.appendChild(totalDiv);
totalDiv.addEventListener("click", () => {
    window.open("carrito.html", "_blank"); 
});
}

//---------------------------------------------------------------------------------------------

//Mostrar productos 
document.addEventListener("DOMContentLoaded", () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
    }
    actualizarCarrito();
  });

