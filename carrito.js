let productos = JSON.parse(localStorage.getItem("productosConStock")) || [];
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


// FUNCION PARA ACTUALIZAR TOTAL DE COMPRA 
function actualizarTotal() {
  let total = tarjetaStorage.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  totalContenedor.innerText = `Total: $${total.toFixed(2)}`;
}

// FUCION PARA CALCULAR EL VALOR DE CUOTAS 
function calcularCuotas(total, cuotas) {
  return (total / cuotas).toFixed(2);
}

// EVENTO CALCULAR 
calcularBtn.addEventListener("click", () => {
  let total = tarjetaStorage.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  let cuotasSeleccionadas = document.getElementById("cuotas").value;
  let valorPorCuota = calcularCuotas(total, cuotasSeleccionadas);
  resultadoInput.value = `Monto total: $${total.toFixed(2)} en ${cuotasSeleccionadas} cuotas de $${valorPorCuota}`;
});


// EVENTO COMPRAR 
comprarBtn.addEventListener("click", () => {
  let total = tarjetaStorage.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  let cuotasSeleccionadas = document.getElementById("cuotas").value;
  let valorPorCuota = calcularCuotas(total, cuotasSeleccionadas);
  formularioUsuario.style.display = "block";
  montoTotalDiv.innerText = `Monto Total a Pagar: $${total.toFixed(2)}`;
  detalleCuotasDiv.innerHTML = `Nº cuotas:  ${cuotasSeleccionadas}, valor: $${valorPorCuota}`;
});


// EVENTO CONFIRMAR COMPRA y LIMPIAR FORMULARIO.
confirmarCompraBtn.addEventListener("click", () => {
  let nombre = document.getElementById("nombre").value.trim();
  let direccion = document.getElementById("direccion").value.trim();
  let telefono = document.getElementById("telefono").value.trim();
  let correo = document.getElementById("correo").value.trim();

  const nombreValido = /^[a-zA-Z\s]+$/.test(nombre);
  const direccionValida = direccion.length > 0;
  const telefonoValido = /^[0-9]{8,15}$/.test(telefono);
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  if (nombreValido && direccionValida && telefonoValido && correoValido) {
    Swal.fire({
      icon: "success",
      title: "Compra confirmada!",
      html: `Nombre: ${nombre}<br>
             Dirección: ${direccion}<br>
             Teléfono: ${telefono}<br>
             Correo: ${correo}`,
      showConfirmButton: false,
      timer: 2500,
      position: "center",
    }).then(() => {
      localStorage.removeItem("tarjetaProductos");
      tarjetaStorage = [];
      renderCarrito(tarjetaStorage);
      formularioUsuario.style.display = "none";
      document.getElementById("cuotas").value = '';
      resultadoInput.value = '';
      montoTotalDiv.innerText = '';
      detalleCuotasDiv.innerHTML = '';
    });
  } else {
    let mensajeError = '';
    if (!nombreValido) {
      mensajeError += 'El nombre es inválido.Intente nuevamente .<br>';
    }
    if (!direccionValida) {
      mensajeError += 'La dirección no puede estar vacía.<br>';
    }
    if (!telefonoValido) {
      mensajeError += 'El teléfono es inválido. Debe contener entre 8 y 15 dígitos.<br>';
    }
    if (!correoValido) {
      mensajeError += 'El correo electrónico es inválido.<br>';
    }
    Swal.fire({
      icon: "error",
      title: "Datos inválidos",
      html: mensajeError,
      confirmButtonText: "Corregir"
    });
  }
});



// FUNCION PARA INCREMENTAR CANTIDAD EN CARRITO 
function incrementarCantidad(id) {
  const productoEnCarrito = tarjetaStorage.find((prod) => prod.id === id);
  const productoOriginal = productos.find((prod) => prod.id === id);

  if (productoEnCarrito && productoOriginal) {
    if (productoEnCarrito.cantidad < productoOriginal.stock) {
      productoEnCarrito.cantidad += 1;
      actualizarCarrito();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Stock insuficiente',
        text: `No hay suficiente stock disponible para agregar más de este producto.`,
        confirmButtonText: 'OK'
      });
    }
  }
}



// FUNCION PARA DISMINUTIR CANTIDAD EN CARRITO 
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

// FUNCION PARA ELIMINAR DEL CARRITO
function eliminarDelCarrito(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Este producto será eliminado del carrito.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      tarjetaStorage = tarjetaStorage.filter((producto) => producto.id !== id);
      actualizarCarrito();

      Swal.fire(
        'Eliminado!',
        'El producto ha sido eliminado del carrito.',
        'success'
      );
    }
  });
}

// FUNCION ACTULIZAR CARRITO 
function actualizarCarrito() {
  localStorage.setItem("tarjetaProductos", JSON.stringify(tarjetaStorage));
  renderCarrito(tarjetaStorage);
}
renderCarrito(tarjetaStorage);
