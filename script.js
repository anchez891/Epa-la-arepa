/* ============================================================
   📌 CÓMO AGREGAR UNA FOTO A UN PLATO:
   1. Guarda la imagen dentro de la carpeta assets/img/platos/
      (créala si todavía no existe), por ejemplo:
      assets/img/platos/pabellon.jpg
   2. En el objeto del plato correspondiente aquí abajo en MENU,
      agrega la propiedad "imagen" con esa ruta, así:
         { nombre:"Pabellón", precio:"$5.00", imagen:"assets/img/platos/pabellon.jpg" }
   3. Si un plato NO tiene la propiedad "imagen", se seguirá
      mostrando automáticamente el recuadro de marcador de
      posición (placeholder) — no rompe nada dejarla sin poner.
   ============================================================ */
const MENU = [
  { categoria:"Tequeños", platos:[
    { nombre:"Tequeños o deditos de queso", precio:"$5.00", imagen:"assets/img/icono.jpeg", desc:"6 unidades" }
  ]},
  { categoria:"Arepas Venezolanas", platos:[
    { nombre:"Pabellón", precio:"$5.00", imagen:"assets/img/arepa-pabellon.jpg", desc:"Frijol negro + maduro frito + carne" },
    { nombre:"Reina pepiada", precio:"$5.00", imagen:"assets/img/arepa-reina-pepiada.jpg", desc:"Pollo + aguacate + queso crema" },
    { nombre:"Llanera", precio:"$5.00", imagen:"assets/img/arepa-llanera.jpg", desc:"Carne + tomate + aguacate" },
    { nombre:"Pelua'", precio:"$5.00", imagen:"assets/img/icono.jpeg", desc:"Carne + queso" },
    { nombre:"Catira", precio:"$5.00", imagen:"assets/img/icono.jpeg", desc:"Pollo + queso" },
    { nombre:"Vegetariana", precio:"$5.00", imagen:"assets/img/icono.jpeg", desc:"Frijol negro + maduro frito + aguacate" },
    { nombre:"Vegana (sin queso)", precio:"$5.00", imagen:"assets/img/icono.jpeg", desc:"Frijol negro + tomate + maduro frito + champiñones" }
  ]}, 
  { categoria:"Empanadas", platos:[
    { nombre:"Empanada de Carne", precio:"$2.00", imagen:"assets/img/empanada.jpg" },
    { nombre:"Empanada de Pollo", precio:"$2.00", imagen:"assets/img/empanada.jpg" },
    { nombre:"Empanada de Jamón y queso", precio:"$2.00", imagen:"assets/img/empanada.jpg" },
    { nombre:"Empanada de Chorizo y queso", precio:"$2.00", imagen:"assets/img/empanada.jpg" },
    { nombre:"Empanada de Queso", precio:"$2.00", imagen:"assets/img/empanada.jpg" },
    { nombre:"Empanada de Dominó", precio:"$2.00", imagen:"assets/img/empanada.jpg" },
    { nombre:"Empanada de Pabellón", precio:"$3.50", imagen:"assets/img/empanada.jpg" }
  ]},
  { grupo:"Platos Fuertes", categoria:"Patacón", platos:[
    { nombre:"Venezolano", precio:"$8.00", imagen:"assets/img/patacon-venezolano.jpg", desc:"Carne + pollo + ensalada + huevo + aguacate + queso" },
    { nombre:"Trifásico", precio:"$8.00", imagen:"assets/img/icono.jpeg", desc:"Carne, pollo, chicharrón y huevo frito" }
  ]},
  { grupo:"Platos Fuertes", categoria:"Cachapa", platos:[
    { nombre:"Vegana", precio:"$5.00", imagen:"assets/img/icono.jpeg", desc:"Frijol negro + maduro frito + aguacate" },
    { nombre:"Vegetariana", precio:"$5.00", imagen:"assets/img/icono.jpeg", desc:"Salteado de vegetales" },
    { nombre:"Jamón y queso", precio:"$5.00", imagen:"assets/img/cachapa.jpg" },
    { nombre:"Queso", precio:"$5.00", imagen:"assets/img/icono.jpeg" },
    { nombre:"Carne o pollo y queso", precio:"$6.50", imagen:"assets/img/icono.jpeg" },
    { nombre:"Chancho y queso", imagen:"assets/img/cachapa-chancho.jpg", precio:"$6.50" },
    { nombre:"Mixta", precio:"$8.00", imagen:"assets/img/icono.jpeg", desc:"Carne + pollo" }
  ]},
  { grupo:"Platos Fuertes", categoria:"Pabellón Criollo", platos:[
    { nombre:"Pabellón Criollo", imagen:"assets/img/pabellon-criollo.jpg", precio:"$8.00" }
  ]},
  { categoria:"Bebidas", imagen:"assets/img/icono.jpeg", platos:[
    { nombre:"Chicha venezolana", imagen:"assets/img/icono.jpeg", precio:"$2.00" },
    { nombre:"Papelón con limón / Jugos", imagen:"assets/img/icono.jpeg", precio:"$1.50" },
    { nombre:"Agua / Gaseosas / Malta", imagen:"assets/img/icono.jpeg", precio:"$1.00" },
    { nombre:"Café", imagen:"assets/img/icono.jpeg", precio:"$1.00" },
    { nombre:"Café con leche", imagen:"assets/img/icono.jpeg", precio:"$1.50" },
    { nombre:"Té caliente", imagen:"assets/img/icono.jpeg", precio:"$1.25" },
    { nombre:"Agua", imagen:"assets/img/icono.jpeg", precio:"$1.00" }
  ]}
];

/* Convierte un precio con formato "$5.00" a número (5) */
function precioNumerico(texto){
  return parseFloat(texto.replace(/[^0-9.]/g,"")) || 0;
}

/* Genera el HTML de la foto de un plato: si el plato tiene la
   propiedad "imagen" definida (ver instrucciones arriba de MENU),
   muestra esa foto real; si no la tiene, muestra el marcador de
   posición de siempre. Se usa tanto en el menú como en el carrito. */
function imagenPlato(plato, textoAlt){
  return plato.imagen
    ? `<img src="${plato.imagen}" alt="${textoAlt}" class="foto-plato" loading="lazy">`
    : `<div class="placeholder-img">Foto: ${textoAlt}</div>`;
}

/* Asigna un id único a cada plato y arma un mapa plano id -> {nombre, precio}
   para que el carrito pueda buscar cualquier plato sin recorrer categorías. */
const MENU_PLANO = {};
MENU.forEach((cat, ci)=>{
  cat.platos.forEach((p, pi)=>{
    p.id = `p${ci}-${pi}`;
    MENU_PLANO[p.id] = { nombre:p.nombre, precio:precioNumerico(p.precio), imagen:p.imagen };
  });
});

/* =========================================================
   DATOS DE RESEÑAS Y ESPECIALIDADES (contenido de ejemplo)
   ========================================================= */
const RESENAS = [
  { inicial:"A", nombre:"Angel Alexander Burgos Cisneros", fecha:"Hace 6 meses", texto:"Para ser mi primera vez probando una empanada venezolana, es lo más delicioso que puede haber lo recomiendo 100% que vengan a este local es muy buena la comida y la atención es excelente." },
  { inicial:"G", nombre:"Guillermo Nieves", fecha:"Hace 6 meses", texto:"🔥 ¡Espectacular experiencia! La atención de las chicas es increíble: llenas de energía, vitalidad y con una calidez que te hace sentir como en casa 🇻🇪.<br> 🎶 La música siempre está en su punto, creando el ambiente perfecto para relajarte y disfrutar.<br>🍽️ Si realmente quieres pasar una tarde agradable en Baños, con excelente comida y buena vibra, te recomiendo al 100% venir a EPA LA AREPA 🙌🏼." },
  { inicial:"H", nombre:"Hugo Deloire", fecha:"Hace un año", texto:"Un lugar increíble! La chef cocina de manera excepcional, cada plato es una explosión de sabores que te deja sin palabras. Además, los jugos de frutas son frescos y deliciosos, perfectos para acompañar cualquier la excelente comida. ¡Totalmente recomendado!." }
];

/* Para cambiar la foto de una especialidad, edita su propiedad "imagen"
   y escribe la ruta del archivo dentro de assets/img/. */
const ESPECIALIDADES = [
  { nombre:"Pabellón", imagen:"assets/img/arepa-pabellon.jpg" },
  { nombre:"Reina Pepiada", imagen:"assets/img/arepa-reina-pepiada.jpg" },
  { nombre:"Llanera", imagen:"assets/img/arepa-llanera.jpg" },
  { nombre:"Cachapa Mixta", imagen:"assets/img/cachapa-chancho.jpg" },
];

/* =========================================================
   DEFINICIÓN DE RUTAS (SPA)
   Cada ruta tiene un id de sección y una función que
   construye su HTML. El enrutador solo alterna visibilidad.
   ========================================================= */
const RUTAS = ["inicio","menu","nosotros","checkout"];

/* ---------- Construcción de la Navbar (dinámica) ---------- */
function construirNavbar(){
  const nav = document.getElementById("navbar");
  nav.innerHTML = `
    <div class="nav-interior">
      <div class="nav-identidad">
        <img src="assets/img/logo.jpg" alt="Logo de ¡Epa! La Arepa" class="nav-logo">
        <a href="#" class="nav-marca" data-ir="inicio">¡Epa! La Arepa</a>
      </div>
      <button type="button" class="nav-toggle" aria-label="Abrir menú de navegación" aria-expanded="false" aria-controls="nav-links">☰</button>
      <nav class="nav-links" id="nav-links" aria-label="Navegación principal">
        <a href="#" data-ir="inicio">Inicio</a>
        <a href="#" data-ir="menu">Menú</a>
        <a href="#" data-ir="nosotros">Nosotros</a>
        <a href="#" data-ir="menu" class="btn-pedido">Haz tu pedido</a>
      </nav>
    </div>`;

  /* Botón hamburguesa: solo alterna la clase "abierto" (visible por CSS en móvil) */
  const boton = nav.querySelector(".nav-toggle");
  const enlaces = nav.querySelector(".nav-links");
  boton.addEventListener("click", ()=>{
    const abierto = enlaces.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    boton.textContent = abierto ? "✕" : "☰";
  });
}

/* Cierra el menú móvil desplegado tras elegir una opción de navegación */
function cerrarMenuMovil(){
  const enlaces = document.querySelector(".nav-links");
  const boton = document.querySelector(".nav-toggle");
  if(enlaces && enlaces.classList.contains("abierto")){
    enlaces.classList.remove("abierto");
    boton.setAttribute("aria-expanded","false");
    boton.textContent = "☰";
  }
}

/* ---------- Plantilla: Sección Inicio ---------- */
function plantillaInicio(){
  return `
    <section class="hero">
      <div class="contenedor">
        <img src="assets/img/logo.jpg" alt="¡Epa! La Arepa" class="hero-logo">
        <h1>¡Epa! La Arepa</h1>
        <p class="tagline">Auténtica comida venezolana hecha con cariño: arepas, cachapas y patacones como los de casa, en cada bocado.</p>
        <div class="hero-acciones">
          <a href="#" class="boton boton-primario" data-ir="menu">Ver menú</a>
          <a href="https://maps.app.goo.gl/vR6e599SQH6eVDj3A?g_st=aw" target="_blank" rel="noopener" class="boton boton-secundario">Cómo ir</a>
        </div>
      </div>
    </section>

    <section class="seccion">
      <div class="contenedor">
        <div class="seccion-titulo-bloque">
          <h2>Nuestras especialidades</h2>
          <p>Los platos favoritos de nuestros comensales.</p>
        </div>
        <div class="grid-especialidades">
          ${ESPECIALIDADES.map(especialidad=>`
            <div class="especialidad-item">
              <img class="especialidad-img" src="${especialidad.imagen}" alt="${especialidad.nombre}" loading="lazy">
              <p class="especialidad-nombre">${especialidad.nombre}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="seccion" style="background:var(--amarillo-suave)">
      <div class="contenedor">
        <div class="seccion-titulo-bloque">
          <h2>Lo que dicen los que ya vinieron</h2>
        </div>
        <div class="grid-resenas">
          ${RESENAS.map(r=>`
            <div class="tarjeta-resena">
              <div class="estrellas">★★★★★</div>
              <p class="logo-google">Google</p>
              <p>${r.texto}</p>
              <div class="resena-encabezado" style="margin-top:12px">
                <div class="avatar-inicial">${r.inicial}</div>
                <div>
                  <div>${r.nombre}</div>
                  <div class="resena-meta">${r.fecha}</div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>`;
}

/* ---------- Plantilla: Sección Menú ---------- */
function plantillaMenu(){
  return `
    <section class="seccion">
      <div class="contenedor">
        <div class="seccion-titulo-bloque">
          <h2>Nuestro Menú</h2>
          <p>Todos nuestros platos están hechos al momento con ingredientes frescos.</p>
        </div>
        ${MENU.map((cat, index)=>`
          ${cat.grupo && MENU[index - 1]?.grupo !== cat.grupo ? `<h3 class="menu-grupo-titulo">${cat.grupo}</h3>` : ""}
          <div class="menu-categoria">
            <h4>${cat.categoria}</h4>
            <div class="grid-platos">
              ${cat.platos.map(p=>`
                <div class="tarjeta-plato">
                  ${imagenPlato(p, p.nombre)}
                  <div class="plato-info">
                    <div class="nombre"><span>${p.nombre}</span><span class="precio">${p.precio}</span></div>
                    ${p.desc ? `<p class="desc">${p.desc}</p>` : ""}
                    <button class="btn-carrito" data-agregar="${p.id}">
                      <span class="icono-carrito-mini">🛒</span> Añadir al carrito
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </section>`;
}

/* ---------- Plantilla: Sección Nosotros ---------- */
function plantillaNosotros(){
  return `
    <section class="seccion">
      <div class="contenedor">
        <div class="nosotros-intro">
          <img src="assets/img/yda.jpg" alt="Foto de la dueña" class="foto-duena">
          <div>
            <h2>Nuestra historia</h2>
            <p>Nacimos de un sueño tejido con el corazón, del anhelo profundo de volar con alas propias y de las ganas infinitas de abrazar el futuro.

<br><br>En estos dos años, el camino nos ha puesto a prueba y hemos sentido el peso de los días difíciles. No ha sido sencillo, pero el amor por lo que hacemos, la entrega de cada mañana y el cariño de quienes nos acompañan nos han sostenido con fuerza.

<br><br>Hoy, EPA la Arepa es mucho más que nuestro proyecto: es un rincón lleno de alma, una historia viva de fe, de entrega y de un amor entrañable por nuestras raíces venezolanas. Cada arepa que preparamos es nuestra forma de decir "gracias" y de regalarte un pedacito de hogar.</p>

          </div>
        </div>

        <div class="datos-curiosos">
          <h3>Datos curiosos</h3>
          <ul class="lista-datos">
            <li>La arepa tiene más de 3.000 años de historia, siendo uno de los alimentos más antiguos de Suramérica.</li>
            <li>El nombre "Reina Pepiada" nace en honor a Susana Duijm, Miss Mundo 1955.</li>
            <li>La cachapa se elabora con maíz tierno, lo que le da su característico sabor dulce.</li>
            <li>El pabellón criollo es considerado el plato nacional de Venezuela.</li>
          </ul>
        </div>

        <div class="info-practica">
          <div>
            <h3>Horario de atención</h3>
            <p>Lunes a Domingo<br>12:00 pm — 9:00 pm</p>
          </div>
          <div>
            <h3>Ubicación</h3>
            <p>Calle Oriente y Eloy Alfaro, Baños de Agua Santa, Ecuador<br>Tel/WhatsApp: +593 99-506 7408</p>
          </div>
        </div>
      </div>
    </section>`;
}

/* ---------- Plantilla: Sección Checkout ---------- */
function plantillaCheckout(){
  const subtotal = calcularSubtotal();
  const envio = deliverySeleccionado ? 1.5 : 0;
  const total = subtotal + envio;
  return `
    <section class="seccion">
      <div class="contenedor">
        <div class="seccion-titulo-bloque">
          <h2>Finalizar pedido</h2>
          <p>Completa tus datos para confirmar el pedido por WhatsApp.</p>
        </div>
        <div class="checkout-grid">
          <form class="form-checkout" id="form-checkout">
            <label class="campo">
              <span>Nombre *</span>
              <input type="text" id="campo-nombre" required placeholder="Tu nombre">
            </label>
            <label class="campo">
              <span>Apellido *</span>
              <input type="text" id="campo-apellido" required placeholder="Tu apellido">
            </label>
            <p id="nota-error" style="display:none;color:var(--rojo);font-weight:700;margin:0"></p>
          </form>

          <div class="resumen-checkout">
            <h3>Resumen de tu pedido</h3>
            <ul class="lista-resumen-checkout">
              ${carrito.length ? carrito.map(i=>`
                <li><span>${i.cantidad}x ${i.nombre}</span><span>$${(i.precio*i.cantidad).toFixed(2)}</span></li>
              `).join("") : "<li>No hay productos en el carrito.</li>"}
            </ul>
            <div class="resumen-linea"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="resumen-linea"><span>Envío</span><span>${envio ? "$"+envio.toFixed(2) : "—"}</span></div>
            <div class="resumen-linea resumen-total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
            <button class="boton boton-primario btn-confirmar" data-confirmar-pedido>
              <img class="icono-whatsapp" src="assets/img/whatsapp.png" alt="WhatsApp"></span> Confirmar pedido
            </button>
          </div>
        </div>
      </div>
    </section>`;
}

const PLANTILLAS = { inicio:plantillaInicio, menu:plantillaMenu, nosotros:plantillaNosotros, checkout:plantillaCheckout };

/* =========================================================
   ESTADO Y LÓGICA DEL CARRITO DE COMPRAS
   Todo se maneja en memoria (arreglo "carrito"), sin usar
   localStorage ni servidor. Cada ítem: {id, nombre, precio, cantidad}
   ========================================================= */
let carrito = [];
let deliverySeleccionado = false;
let rutaActual = "inicio";

function agregarAlCarrito(id){
  const datos = MENU_PLANO[id];
  if(!datos) return;
  const existente = carrito.find(item=>item.id===id);
  if(existente){
    existente.cantidad++;
  } else {
    carrito.push({ id, nombre:datos.nombre, precio:datos.precio, cantidad:1, imagen:datos.imagen });
  }
  actualizarUICarrito();
}

function cambiarCantidad(id, delta){
  const item = carrito.find(i=>i.id===id);
  if(!item) return;
  item.cantidad += delta;
  if(item.cantidad <= 0){
    carrito = carrito.filter(i=>i.id!==id);
  }
  actualizarUICarrito();
}

function eliminarDelCarrito(id){
  carrito = carrito.filter(i=>i.id!==id);
  actualizarUICarrito();
}

function calcularSubtotal(){
  return carrito.reduce((suma, item)=> suma + item.precio*item.cantidad, 0);
}

/* ---------- Construcción (una sola vez) de los elementos flotantes del carrito ---------- */
function construirElementosCarrito(){
  const overlay = document.createElement("div");
  overlay.id = "carrito-overlay";
  const panel = document.createElement("aside");
  panel.id = "panel-carrito";
  panel.setAttribute("aria-label","Carrito de compras");
  const flotante = document.createElement("div");
  flotante.id = "carrito-flotante";
  document.body.append(overlay, panel, flotante);
  overlay.addEventListener("click", cerrarCarrito);
}

function abrirCarrito(){
  document.getElementById("panel-carrito").classList.add("visible");
  document.getElementById("carrito-overlay").classList.add("visible");
}
function cerrarCarrito(){
  document.getElementById("panel-carrito").classList.remove("visible");
  document.getElementById("carrito-overlay").classList.remove("visible");
}

/* ---------- Renderizado de la barra flotante inferior ---------- */
function renderFlotante(){
  const flotante = document.getElementById("carrito-flotante");
  const totalItems = carrito.reduce((s,i)=>s+i.cantidad,0);
  const total = calcularSubtotal() + (deliverySeleccionado ? 1.5 : 0);
  flotante.classList.toggle("visible", totalItems > 0 && rutaActual !== "checkout");
  flotante.innerHTML = `
    <div class="carrito-flotante-izq">
      <span class="carrito-icono-badge">🛒<span class="carrito-badge">${totalItems}</span></span>
      <div class="carrito-flotante-texto">
        <div class="titulo">${totalItems} PRODUCTO${totalItems===1?"":"S"} EN TU CARRITO</div>
        <div class="total">$${total.toFixed(2)}</div>
      </div>
    </div>
    <button class="btn-ver-carrito" data-abrir-carrito>Ver mi carrito →</button>
  `;
}

/* ---------- Renderizado del panel lateral (off-canvas) ---------- */
function renderPanel(){
  const panel = document.getElementById("panel-carrito");
  const subtotal = calcularSubtotal();
  const envio = deliverySeleccionado ? 1.5 : 0;
  const total = subtotal + envio;
  panel.innerHTML = `
    <div class="panel-carrito-header">
      <h3>Tu carrito</h3>
      <button class="btn-cerrar-panel" data-cerrar-carrito aria-label="Cerrar carrito">✕</button>
    </div>
    <div class="panel-carrito-lista">
      ${carrito.length === 0 ? `<p class="carrito-vacio">Tu carrito está vacío.</p>` : carrito.map(item=>`
        <div class="item-carrito">
          ${imagenPlato(item, item.nombre)}
          <div class="item-carrito-info">
            <div class="nombre">${item.nombre}</div>
            <div class="precio-unitario">$${item.precio.toFixed(2)} c/u</div>
            <div class="item-carrito-controles">
              <button class="btn-cantidad" data-cantidad="-1" data-id="${item.id}" aria-label="Disminuir cantidad">−</button>
              <span>${item.cantidad}</span>
              <button class="btn-cantidad" data-cantidad="1" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
              <button class="btn-eliminar" data-eliminar="${item.id}" aria-label="Eliminar del carrito">🗑</button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
    <div class="panel-carrito-footer">
      <label class="chk-delivery">
        <input type="checkbox" id="chk-delivery" ${deliverySeleccionado ? "checked" : ""}>
        Delivery = $1.50
      </label>
      <div class="resumen-linea"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="resumen-linea"><span>Envío</span><span>${envio ? "$"+envio.toFixed(2) : "—"}</span></div>
      <div class="resumen-linea resumen-total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      <button class="boton boton-primario btn-finalizar" data-finalizar ${carrito.length===0?"disabled":""}>Finalizar pedido →</button>
      <button class="boton boton-secundario" data-cerrar-carrito>Seguir comprando</button>
    </div>
  `;
}

/* Punto único que refresca toda la UI relacionada al carrito
   (barra flotante, panel lateral y, si aplica, el resumen del checkout) */
function actualizarUICarrito(){
  renderFlotante();
  renderPanel();
  if(rutaActual === "checkout"){
    document.getElementById("app").innerHTML = plantillaCheckout();
  }
}

/* ---------- Validación y envío del pedido a WhatsApp ---------- */
function confirmarPedido(){
  const campoNombre = document.getElementById("campo-nombre");
  const campoApellido = document.getElementById("campo-apellido");
  const nota = document.getElementById("nota-error");
  const nombre = campoNombre.value.trim();
  const apellido = campoApellido.value.trim();

  if(!nombre || !apellido){
    nota.textContent = "Por favor completa tu nombre y apellido antes de continuar.";
    nota.style.display = "block";
    return;
  }
  nota.style.display = "none";

  const subtotal = calcularSubtotal();
  const envio = deliverySeleccionado ? 1.5 : 0;
  const total = subtotal + envio;

  // Construcción del mensaje con el formato exacto solicitado
  let mensaje = "NUEVO PEDIDO PARA EPA LA AREPA\n";
  mensaje += "Platos:\n\n";
  carrito.forEach(item=>{
    mensaje += `* ${item.cantidad}x ${item.nombre} - $${(item.precio*item.cantidad).toFixed(2)}\n`;
  });
  mensaje += "\n";
  if(deliverySeleccionado){
    mensaje += "Delivery: $1.50\n";
  }
  mensaje += `Suma total del precio = $${total.toFixed(2)}\n`;
  mensaje += `Nombre y Apellido del cliente: ${nombre} ${apellido}`;

  // ============================================================
  // 📌 COLOCA AQUÍ TU NÚMERO REAL DE WHATSAPP (con código de país,
  // sin espacios, sin "+" y sin guiones). Ejemplo Ecuador: "593995067408"
  // ============================================================
  const NUMERO_WHATSAPP = "+593995067408";

  const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(urlWhatsApp, "_blank");
}

/* =========================================================
   ENRUTADOR SPA
   Renderiza la sección solicitada dentro de #app y
   actualiza el estado "activo" de la navbar, sin recargar.
   ========================================================= */
function navegarA(ruta){
  if(!RUTAS.includes(ruta)) ruta = "inicio";
  rutaActual = ruta;
  document.getElementById("app").innerHTML = PLANTILLAS[ruta]();
  document.querySelectorAll(".nav-links a[data-ir]").forEach(a=>{
    a.classList.toggle("activo", a.dataset.ir === ruta && !a.classList.contains("btn-pedido"));
  });
  window.scrollTo({top:0, behavior:"instant"});
  history.replaceState(null,"", "#"+ruta);
  cerrarMenuMovil();
  renderFlotante(); // oculta/muestra la barra flotante según la ruta (ej: se oculta en checkout)
}

/* Delegación de eventos: un solo listener maneja navegación y todas
   las acciones del carrito, usando atributos data-* como interruptores. */
document.addEventListener("click", (e)=>{
  const irEl = e.target.closest("[data-ir]");
  if(irEl){ e.preventDefault(); navegarA(irEl.dataset.ir); return; }

  const agregarEl = e.target.closest("[data-agregar]");
  if(agregarEl){ agregarAlCarrito(agregarEl.dataset.agregar); return; }

  const cantidadEl = e.target.closest("[data-cantidad]");
  if(cantidadEl){ cambiarCantidad(cantidadEl.dataset.id, parseInt(cantidadEl.dataset.cantidad,10)); return; }

  const eliminarEl = e.target.closest("[data-eliminar]");
  if(eliminarEl){ eliminarDelCarrito(eliminarEl.dataset.eliminar); return; }

  if(e.target.closest("[data-abrir-carrito]")){ abrirCarrito(); return; }
  if(e.target.closest("[data-cerrar-carrito]")){ cerrarCarrito(); return; }

  if(e.target.closest("[data-finalizar]")){
    if(carrito.length === 0) return;
    cerrarCarrito();
    navegarA("checkout");
    return;
  }

  if(e.target.closest("[data-confirmar-pedido]")){
    confirmarPedido();
    return;
  }
});

/* El checkbox de delivery se reconstruye junto al panel, así que se
   escucha su cambio por delegación en lugar de un listener directo. */
document.addEventListener("change", (e)=>{
  if(e.target.id === "chk-delivery"){
    deliverySeleccionado = e.target.checked;
    actualizarUICarrito();
  }
});

/* Inicialización */
construirNavbar();
construirElementosCarrito();
actualizarUICarrito();
navegarA(location.hash.replace("#","") || "inicio");
