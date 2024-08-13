let tarjetaStorage = JSON.parse(localStorage.getItem("tarjetaProductos")) || [];
let tarjetaContenedor = document.getElementById("tarjetaCompras");
let totalContenedor = document.getElementById("totalCarrito");
let calcularBtn = document.getElementById("calcular");
let resultadoInput = document.getElementById("resultado");
let comprarBtn = document.getElementById("comprar");
let formularioUsuario = document.getElementById("formularioUsuario");
let confirmarCompraBtn = document.getElementById("confirmarCompra");
let montoTotalDiv = document.getElementById("montoTotal");
let detalleCuotasDiv = document.getElementById("detalleCuotas");

function renderCarrito(tarjetaProductos) {
  tarjetaContenedor.innerHTML = "";
  tarjetaProductos.forEach((producto) => {
    const tarjetaCarrito = document.createElement("div");
    tarjetaCarrito.classList.add("carrito-item");
    tarjetaCarrito.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button onclick="incrementarCantidad(${producto.id})">+</button>
            <button onclick="disminuirCantidad(${producto.id})">-</button>
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>     
        `;
    tarjetaContenedor.appendChild(tarjetaCarrito);
  });

  actualizarTotal();
}

function actualizarTotal() {
  let total = tarjetaStorage.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  totalContenedor.innerText = `Total: $${total.toFixed(2)}`;
}

// Función para calcular el monto por cuota
function calcularCuotas(total, cuotas) {
  return (total / cuotas).toFixed(2);
}

// Evento del botón "Calcular"
calcularBtn.addEventListener("click", () => {
  let total = tarjetaStorage.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  let cuotasSeleccionadas = document.getElementById("cuotas").value;
  let valorPorCuota = calcularCuotas(total, cuotasSeleccionadas);

  // Mostrar el resultado en el cuadro de texto
  resultadoInput.value = `Monto total: $${total.toFixed(2)} en ${cuotasSeleccionadas} cuotas de $${valorPorCuota}`;
});

// Evento del botón "Comprar" para mostrar el formulario
comprarBtn.addEventListener("click", () => {
  let total = tarjetaStorage.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0 );
  let cuotasSeleccionadas = document.getElementById("cuotas").value;
  let valorPorCuota = calcularCuotas(total, cuotasSeleccionadas);

  // Mostrar el formulario de usuario
  formularioUsuario.style.display = "block";

  // Mostrar monto total y detalles de las cuotas en el formulario
  montoTotalDiv.innerText = `Monto Total a Pagar: $${total.toFixed(2)}`;
  detalleCuotasDiv.innerHTML = `Total de cuotas ${cuotasSeleccionadas}, valor  : $${valorPorCuota}`;
});

// Evento del botón "Confirmar Compra"
confirmarCompraBtn.addEventListener("click", () => {
  // Obtener los datos del usuario
  let nombre = document.getElementById("nombre").value;
  let direccion = document.getElementById("direccion").value;
  let telefono = document.getElementById("telefono").value;
  if (nombre && direccion && telefono) {
    Swal.fire({
      icon: "success",
      title: "Compra confirmada!",
      html: `Nombre: ${nombre}<br>
             Dirección: ${direccion}<br>
             Teléfono: ${telefono}`,
      showConfirmButton: false,
      timer: 2500,
      position: "center",
    });

    // Limpiar el carrito y el formulario después de la compra
    localStorage.removeItem("tarjetaProductos");
    tarjetaStorage = [];
    renderCarrito(tarjetaStorage); // Actualizar la vista del carrito

    formularioUsuario.style.display = "none";

    // Limpiar campos específicos
    document.getElementById("cuotas").value = ''; // Limpiar el campo de cuotas
    resultadoInput.value = ''; // Limpiar el campo de resultado
    montoTotalDiv.innerText = ''; // Limpiar el div del monto total
    detalleCuotasDiv.innerHTML = ''; // Limpiar el div de detalle de cuotas
  } else {
    Swal.fire({
      icon: "error",
      title: "Verificar",
      text: "Por favor completa los datos!",
    });
  }
});

// Funciones para manejar el carrito (incrementar, disminuir, eliminar) siguen siendo las mismas
function incrementarCantidad(id) {
  const producto = tarjetaStorage.find((prod) => prod.id === id);
  if (producto) {
    producto.cantidad = (producto.cantidad || 1) + 1;
    actualizarCarrito();
  }
}

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

function eliminarDelCarrito(id) {
  tarjetaStorage = tarjetaStorage.filter((producto) => producto.id !== id);
  actualizarCarrito();
}

function actualizarCarrito() {
  localStorage.setItem("tarjetaProductos", JSON.stringify(tarjetaStorage));
  renderCarrito(tarjetaStorage);
}

renderCarrito(tarjetaStorage);
