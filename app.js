// ─── Catálogo de equipos ───────────────────────────────────────────────────
const EQUIPOS = [
  { id: 'EQ-01', nombre: 'Laptop Lenovo' },
  { id: 'EQ-02', nombre: 'Laptop HP' },
  { id: 'EQ-03', nombre: 'Proyector Epson' },
  { id: 'EQ-04', nombre: 'Cámara Canon' },
  { id: 'EQ-05', nombre: 'Tablet Samsung' },
];

// ─── Clave de almacenamiento ───────────────────────────────────────────────
const CLAVE = 'prestamos_is2';

// ─── Utilidades ───────────────────────────────────────────────────────────
function cargarPrestamos() {
  return JSON.parse(localStorage.getItem(CLAVE) || '[]');
}

function guardarPrestamos(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

function formatearFecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// ─── Poblar selector de equipos ───────────────────────────────────────────
function poblarEquipos() {
  const sel = document.getElementById('equipo');
  EQUIPOS.forEach(eq => {
    const op = document.createElement('option');
    op.value = eq.id;
    op.textContent = `${eq.nombre} (${eq.id})`;
    sel.appendChild(op);
  });
}

// ─── Renderizar tabla ────────────────────────────────────────────────────
function renderizar() {
  const lista = cargarPrestamos();
  const tbody = document.querySelector('#tabla-prestamos tbody');
  const contador = document.getElementById('contador');

  tbody.innerHTML = '';

  const activos = lista.filter(p => p.estado === 'Activo').length;
  contador.textContent = `${activos} activo${activos !== 1 ? 's' : ''}`;

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">Aún no hay préstamos registrados.</td></tr>';
    return;
  }

  lista.forEach((p, idx) => {
    const eq = EQUIPOS.find(e => e.id === p.equipoId);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${eq ? eq.nombre : p.equipoId}</td>
      <td>${p.solicitante}</td>
      <td>${formatearFecha(p.fechaPrestamo)}</td>
      <td>${formatearFecha(p.fechaDevolucion)}</td>
      <td><span class="estado-${p.estado.toLowerCase()}">${p.estado}</span></td>
      <td>
        ${p.estado === 'Activo'
          ? `<button onclick="registrarDevolucion(${idx})">Devolver</button>`
          : '<span class="devuelto-label">—</span>'}
      </td>`;
    tbody.appendChild(tr);
  });
}

// ─── Registrar préstamo ───────────────────────────────────────────────────
function registrarPrestamo() {
  const equipoId = document.getElementById('equipo').value;
  const solicitante = document.getElementById('solicitante').value.trim();
  const fechaPrestamo = document.getElementById('fecha-prestamo').value;
  const fechaDevolucion = document.getElementById('fecha-devolucion').value;
  const msg = document.getElementById('mensaje');

  msg.textContent = '';
  msg.className = 'mensaje';

  if (!equipoId || !solicitante || !fechaPrestamo || !fechaDevolucion) {
    msg.textContent = 'Complete todos los campos antes de registrar.';
    msg.classList.add('error');
    return;
  }

  if (solicitante.length < 3) {
    msg.textContent = 'El solicitante debe tener al menos 3 caracteres.';
    msg.classList.add('error');
    return;
  }

  if (fechaDevolucion <= fechaPrestamo) {
    msg.textContent = 'La fecha de devolución debe ser posterior a la de préstamo.';
    msg.classList.add('error');
    return;
  }

  const lista = cargarPrestamos();
  const yaActivo = lista.some(p => p.equipoId === equipoId && p.estado === 'Activo');
  if (yaActivo) {
    msg.textContent = 'Este equipo ya tiene un préstamo activo.';
    msg.classList.add('error');
    return;
  }

  lista.push({ equipoId, solicitante, fechaPrestamo, fechaDevolucion, estado: 'Activo' });
  guardarPrestamos(lista);

  msg.textContent = 'Préstamo registrado correctamente.';
  msg.classList.add('ok');

  document.getElementById('solicitante').value = '';
  document.getElementById('fecha-prestamo').value = '';
  document.getElementById('fecha-devolucion').value = '';
  document.getElementById('equipo').selectedIndex = 0;

  renderizar();
}

// ─── Registrar devolución ─────────────────────────────────────────────────
function registrarDevolucion(idx) {
  const lista = cargarPrestamos();
  lista[idx].estado = 'Devuelto';
  guardarPrestamos(lista);
  renderizar();
}

// ─── MEJORA FICHA 29: Eliminar registros devueltos ────────────────────────
function eliminarDevueltos() {
  const lista = cargarPrestamos();
  const devueltos = lista.filter(p => p.estado === 'Devuelto');

  if (devueltos.length === 0) {
    alert('No hay registros con estado "Devuelto" para eliminar.');
    return;
  }

  const confirmado = confirm(
    `¿Desea eliminar ${devueltos.length} registro(s) con estado "Devuelto"?\n` +
    'Esta acción no se puede deshacer. Los préstamos activos no serán afectados.'
  );

  if (!confirmado) {
    // CP-02: el usuario canceló, no se elimina nada
    return;
  }

  // CP-01: se eliminan únicamente los devueltos
  const nuevaLista = lista.filter(p => p.estado !== 'Devuelto');
  guardarPrestamos(nuevaLista);
  renderizar();

  const msg = document.getElementById('mensaje');
  msg.textContent = `Se eliminaron ${devueltos.length} registro(s) devuelto(s) correctamente.`;
  msg.className = 'mensaje ok';
}

// ─── Restablecer datos de ejemplo ────────────────────────────────────────
function restablecerEjemplo() {
  const ejemplo = [
    { equipoId: 'EQ-01', solicitante: 'Ana Quispe', fechaPrestamo: '2026-07-20', fechaDevolucion: '2026-07-25', estado: 'Devuelto' },
    { equipoId: 'EQ-03', solicitante: 'Luis Mamani', fechaPrestamo: '2026-07-27', fechaDevolucion: '2026-07-30', estado: 'Activo' },
  ];
  guardarPrestamos(ejemplo);
  renderizar();
}

// ─── Inicio ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  poblarEquipos();
  renderizar();
});
