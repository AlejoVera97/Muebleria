let tarjetaStorage = JSON.parse(localStorage.getItem("tarjetaProductos")) || [];

// BASE EN JSON 
fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
        productos = data;
        const productosContainer = document.getElementById("productos");
        data.forEach((producto) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("grid-item");
            tarjeta.innerHTML = `
            <div class="imagen-contenedor">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen">
                <button class="productoAgregar" data-id="${producto.id}">Agregar al carrito</button>
            </div>
            <h3 class="nombre-articulo">${producto.nombre}</h3>  
            <h4 class="precio-articulo">Precio: $${producto.precio}</h4>
        `;
            productosContainer.appendChild(tarjeta);
        });
        if (!localStorage.getItem("productosConStock")) {
            localStorage.setItem("productosConStock", JSON.stringify(productos));
        } else {
            productos = JSON.parse(localStorage.getItem("productosConStock"));
        }
        agregarAlBoton();
    });



// FUNCION AGREGAR BOTON AL CARRITO

function agregarAlBoton() {
    const addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productoID = e.currentTarget.dataset.id;
            const seleccionarProducto = productos.find(producto => producto.id == productoID);
            if (seleccionarProducto) {
                const productoEnCarrito = tarjetaStorage.find(prod => prod.id == productoID);
                const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;
                if (seleccionarProducto.stock > cantidadEnCarrito) {
                    if (productoEnCarrito) {
                        productoEnCarrito.cantidad += 1;
                    } else {
                        seleccionarProducto.cantidad = 1;
                        tarjetaStorage.push(seleccionarProducto);
                    }
                    localStorage.setItem("tarjetaProductos", JSON.stringify(tarjetaStorage));

                    Swal.fire({
                        icon: 'success',
                        title: 'Producto añadido al carrito',
                        text: `El producto ${seleccionarProducto.nombre} ha sido agregado.`,
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Stock insuficiente',
                        text: `No hay suficiente stock para agregar más unidades de ${seleccionarProducto.nombre}.`,
                        confirmButtonText: 'Entendido'
                    });
                }
            }
        };
    });
}

