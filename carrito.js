



// FUNCION INCREMENTAR 

function incrementarCantidad(id) {
    fetch("/data.json")
    .then((response) => response.json())
    .then((productos) => {
    const producto = carrito.find((prod) => prod.id === id);
    const productoOriginal = productos.find((p) => p.id === id);
    if (producto && productoOriginal && producto.cantidad < productoOriginal.cantidad) {
        producto.cantidad++;
        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
            Swal.fire("No hay mas stock, lo siento! ");
    
            }
        })
        .catch((error) => console.error("Error al buscar el producto:", error));
    }
    

//-----------------------------------------------------------------------------------------------------

//FUNCION DISMINUIR 

function disminuirCantidad(id) {
    const producto = carrito.find((prod) => prod.id === id);
    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        } else if (producto && producto.cantidad === 1) {
        eliminarDelCarrito(id);
        }
        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

//------------------------------------------------------------------------------------------------------
    
// FUNCION ELIMINAR

function eliminarDelCarrito(id) {
    carrito = carrito.filter((prod) => prod.id !== id);
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//-------------------------------------------------------------------------------------------------------
