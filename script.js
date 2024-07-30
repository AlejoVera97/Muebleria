

        // Array con los objetos 
        const productos =[
            {
                id: 1,
                nombre: 'Mesa de luz',
                imagen: 'imagenes/mesaluz.jpg',
                precio: 5000,
                cantidad: 15
            },
            {
                id: 2,
                nombre: 'Biblioteca',
                imagen: 'imagenes/biblioteca.jpg',
                precio: 7000,
                cantidad: 10
            },
            {
                id: 3,
                nombre: 'Sillon de tela',
                imagen: 'imagenes/sillon.jpg',
                precio: 4000,
                cantidad: 8
            }
        ];



    
        // Array para almacenar productos en el carrito
        let  carrito = [];


//Cargar el carrito desde el localStorage al inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    mostrarProductos();
    actualizarCarrito();
});


        // Función para mostrar productos en el DOM
        function mostrarProductos() {
            const contenedor = document.getElementById('productos');
            contenedor.innerHTML = '';

            productos.forEach(producto => {
                const div = document.createElement('div');
                div.classList.add('producto');
                div.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen">
                    <h4 class="nombre-articulo">${producto.nombre}</h4>
                    <p class="precio-articulo">$${producto.precio}</p>
                    <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                `;
                contenedor.appendChild(div);
            });
        }

        // Función para agregar productos al carrito
        function agregarAlCarrito(id) {
            const producto = productos.find(p => p.id === id);
            if (producto) {
                const productoEnCarrito = carrito.find(p => p.id === id);
                     if (productoEnCarrito) {
                      if (productoEnCarrito.cantidad < producto.cantidad) { 
                        productoEnCarrito.cantidad++;
                    } else {
                        alert('No hay más stock disponible de este producto.');
                    }
                } else {
                    carrito.push({ ...producto, cantidad: 1 });
                }
        
                    actualizarCarrito();
                localStorage.setItem("carrito", JSON.stringify(carrito));
                
                  }
        }

        // Función para eliminar productos del carrito
        function eliminarDelCarrito(id) {
            carrito = carrito.filter(prod => prod.id !== id); // Filtrar para eliminar el producto con el ID dado
            actualizarCarrito();
            // Actualizar localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }

        // Función para actualizar la visualización del carrito
        function actualizarCarrito() {
            const contenedorCarrito = document.getElementById('carrito');
            contenedorCarrito.innerHTML = '<h3>Artículos de su carrito</h3>';
        
            if (carrito.length === 0) {
                contenedorCarrito.innerHTML += '<p>El carrito está vacío.</p>';
                return;
            }
        
            let total = 0; // Variable para almacenar el total
        
            carrito.forEach(producto => {
                const div = document.createElement('div');
                div.classList.add('producto-carrito');
                div.innerHTML = `
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button onclick="incrementarCantidad(${producto.id})">+</button>
                    <button onclick="disminuirCantidad(${producto.id})">-</button>
                    <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                `;
                contenedorCarrito.appendChild(div);
        
                // Calcular el total sumando precio por cantidad
                total += producto.precio * producto.cantidad;
            });
        
            // Mostrar el total debajo de los productos en el carrito
            const totalDiv = document.createElement('div');
            totalDiv.classList.add('total-carrito');
            totalDiv.innerHTML = `<h4>Total de la compra : $${total}</h4>`;
            contenedorCarrito.appendChild(totalDiv);
        }

        function incrementarCantidad(id) {
            const producto = carrito.find(prod => prod.id === id);
        
            if (producto && producto.cantidad < productos.find(p => p.id === id).cantidad) {
                producto.cantidad++;
                actualizarCarrito();
                localStorage.setItem("carrito", JSON.stringify(carrito));
            } else {
                alert('No hay más stock disponible para aumentar la cantidad.');
            }
        }
        
        function disminuirCantidad(id) {
            const producto = carrito.find(prod => prod.id === id);
        
            if (producto && producto.cantidad > 1) {
                producto.cantidad--;
            } else if (producto && producto.cantidad === 1) {
                eliminarDelCarrito(id);
            }
        
            actualizarCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
        
       

        // Mostrar productos al cargar la página
        document.addEventListener('DOMContentLoaded', mostrarProductos);
   









