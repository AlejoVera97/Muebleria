let productos = []; // Variable para almacenar el array de productos

// BASE EN JSON 

fetch("/data.json")
.then((response) => response.json())
.then((data) => {
    productos = data; // Asignar los productos desde el JSON a la variable productos
    const productosContainer = document.getElementById("productos"); // Obtener el contenedor de productos
    
    data.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("grid-item");

        tarjeta.innerHTML = `
            <div class="imagen-contenedor">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen">
                <button class="productoAgregar" id="${producto.id}">Agregar al carrito</button>
            </div>
            <h3 class="nombre-articulo">${producto.nombre}</h3>  
            <h4 class="precio-articulo">Precio: $${producto.precio}</h4>
        `;

        productosContainer.appendChild(tarjeta);
    });

    agregarAlBoton(); // Llamar a la función para agregar el evento de clic
});

//---------------------------------------------------------------------------------------------

// Array vacío para almacenar productos
let tarjetaProductos = [];

//--------------------------------------------------------------------------------------------

function agregarAlBoton() {
    const addButton = document.querySelectorAll(".productoAgregar"); // Declarar la variable con const
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productoID = e.currentTarget.id;
            const seleccionarProducto = productos.find(producto => producto.id == productoID);
            if (seleccionarProducto) { // Verificar que el producto fue encontrado
                tarjetaProductos.push(seleccionarProducto);
                localStorage.setItem("tarjetaProductos", JSON.stringify(tarjetaProductos));
            }
        };
    });
}


