

        // Array con los objetos 
        const productos =[
            {
                id: 1,
                nombre: 'Mesa de luz',
                imagen: 'imagenes/mesaluz.jpg',
                precio: 5000
            },
            {
                id: 2,
                nombre: 'Biblioteca',
                imagen: 'imagenes/biblioteca.jpg',
                precio: 7000
            },
            {
                id: 3,
                nombre: 'Sillon de tela',
                imagen: 'imagenes/sillon.jpg',
                precio: 4000
            }
        ];

        // Array para almacenar productos en el carrito
        const carrito = [];

        // Función para mostrar productos en el DOM
        function mostrarProductos() {
            const contenedor = document.getElementById('productos');
            
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
                carrito.push(producto);
                actualizarCarrito();
                // Almacenar carrito en localStorage
                localStorage.setItem("carrito",JSON.stringify(carrito));
                // Mostrar mensaje de alerta
                clickCompra();
            }
        }

        // Función para eliminar productos del carrito
        function eliminarDelCarrito(id) {
            const index = carrito.findIndex(p => p.id === id);
            if (index !== -1) {
                carrito.splice(index, 1);
                actualizarCarrito();
                // Actualizar localStorage
                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert('Se ha eliminado el producto del carrito!');
            }
        }

        // Función para actualizar la visualización del carrito
        function actualizarCarrito() {
            const contenedorCarrito = document.getElementById('carrito');
            contenedorCarrito.innerHTML = '<h3>Artículos de su carrito</h3>';

            carrito.forEach(producto => {
                const div = document.createElement('div');
                div.classList.add('producto-carrito');
                div.innerHTML = `
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio}</p>
                    <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                `;
                contenedorCarrito.appendChild(div);
            });
        }

        // Función que se ejecuta al hacer clic en "Agregar al carrito" 
        function clickCompra() {
            alert('Se ha agregado el producto al carrito!');
        }

        // Mostrar productos al cargar la página
        document.addEventListener('DOMContentLoaded', mostrarProductos);
   









