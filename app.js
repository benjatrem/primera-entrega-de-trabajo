// USMP CONECTA - JS SEPARADO
let DATA = null;

async function loadData() {
  const res = await fetch("data.json");
  DATA = await res.json();
  document.getElementById("avatarTop").src = DATA.usuario.avatar;
}

function render(view) {
  const c = document.getElementById("content");
  document
    .querySelectorAll("#menu li")
    .forEach((li) => li.classList.toggle("active", li.dataset.view === view));

  if (view === "inicio") {
    c.innerHTML = `
      <div class="greet">HOLA ESTUDIANTE 👋</div>
      <div class="cards">
        <div class="card" data-go="tareas"><div class="icon">📖</div><div><h3>Tareas</h3><p>3 Tareas pendientes</p></div></div>
        <div class="card" data-go="eventos"><div class="icon">📅</div><div><h3>Eventos</h3><p>3 TAREAS PENDIENTES</p></div></div>
        <div class="card" data-go="comidas"><div class="icon">🍴</div><div><h3>Comidas</h3><p>Menú del día</p></div></div>
        <div class="card" data-go="perfil"><div class="icon">👤</div><div><h3>Perfil</h3><p>Ver perfil y ajustes</p></div></div>
      </div>`;
  }
  if (view === "tareas") {
    c.innerHTML =
      `<div class="section-title">MIS TAREAS</div>` +
      DATA.tareas
        .map(
          (t) =>
            `<div class="task">${t.curso} &nbsp;&nbsp;&nbsp; TAREA: ${t.tarea}<br>ENTREGA: ${t.entrega}</div>`
        )
        .join("");
  }
  if (view === "eventos") {
    c.innerHTML =
      `<div class="section-title">EVENTOS</div>
      <div class="events">` +
      DATA.eventos
        .map(
          (e) => `
        <div class="event">
          <strong>${e.titulo}<br>${e.fecha}</strong>
          <img src="images/eventos.png" alt="">
          <p>"${e.desc}"</p>
        </div>`
        )
        .join("") +
      `</div>`;
  }
  if (view === "comidas") {
    c.innerHTML =
      `<div class="section-title">COMIDA UNIVERSITARIA</div>
      <div class="comidas">
        <div class="list">` +
      DATA.comidas
        .map(
          (m) => `
          <div class="item">
            <div class="item-head">
              <strong>${m.nombre}</strong>
              <span class="badge ${
                m.estado === "ABIERTO" ? "open" : "closed"
              }">${m.estado}</span>
            </div>
            <div>Precio: ${m.precio}</div>
            <div class="muted">${m.distancia}</div>
            <div class="muted">Horario: ${m.horario}</div>
          </div>`
        )
        .join("") +
      `
        </div>
        <img src="images/comidas.png" alt="comida">
      </div>`;
  }
  if (view === "perfil") {
    const u = DATA.usuario;
    c.innerHTML = `
      <div class="perfil-wrap">
        <div class="perfil-header">Perfil Universitario</div>
        <div class="perfil-info">
          <img src="${u.avatar}" alt="">
          <h2>${u.nombre}</h2>
        </div>
        <div class="info-box">
          <h4>INFORMACION DEL ESTUDIANTE</h4>
          <p><span>Codigo universitario:</span> ${u.codigo}</p>
          <p><span>Universidad:</span> ${u.universidad}</p>
          <p><span>Carrera:</span> ${u.carrera}</p>
          <p><span>Ciclo:</span> ${u.ciclo}</p>
        </div>
      </div>`;
  }
  c.querySelectorAll("[data-go]").forEach(
    (el) => (el.onclick = () => render(el.dataset.go))
  );
}

document.getElementById("btnLogin").onclick = async () => {
  if (!DATA) await loadData();
  document.getElementById("login").classList.add("hidden");
  document.getElementById("main").classList.remove("hidden");
  render("inicio");
};

document.getElementById("btnLogout").onclick = () => {
  document.getElementById("main").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
};

document.getElementById("menu").onclick = (e) => {
  const li = e.target.closest("li");
  if (li) render(li.dataset.view);
};

loadData();
