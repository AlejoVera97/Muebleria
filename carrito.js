
let tarjetaStorage = localStorage.getItem("tarjetaProductos");
tarjetaStorage = JSON.parse(tarjetaStorage) || []; 
let tarjetaContenedor = document.getElementById("tarjetaCompras");

function renderCarrito(tarjetaProductos) {
    tarjetaContenedor.innerHTML = '';
    tarjetaProductos.forEach(producto => {
        const tarjetaCarrito = document.createElement("div");
        tarjetaCarrito.classList.add("carrito-item"); 
        tarjetaCarrito.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="incrementarCantidad(${producto.id})">+</button>
            <button onclick="disminuirCantidad(${producto.id})">-</button>
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>     
        `;
        tarjetaContenedor.appendChild(tarjetaCarrito);
    });
}

// Función para incrementar la cantidad de un producto
function incrementarCantidad(id) {
    const producto = tarjetaStorage.find((prod) => prod.id === id);
    if (producto) {
        producto.cantidad = (producto.cantidad || 1) + 1;
        actualizarCarrito();
    }
}

// Función para disminuir la cantidad de un producto
function disminuirCantidad(id) {
    const producto = tarjetaStorage.find((prod) => prod.id === id);
    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad--;
        } else {
            eliminarDelCarrito(id);
        }
        actualizarCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    tarjetaStorage = tarjetaStorage.filter((producto) => producto.id !== id);
    actualizarCarrito();
}

// Función para actualizar el carrito en localStorage y renderizarlo
function actualizarCarrito() {
    localStorage.setItem("tarjetaProductos", JSON.stringify(tarjetaStorage));
    renderCarrito(tarjetaStorage);
}

// Renderizar el carrito al cargar la página
renderCarrito(tarjetaStorage);


