const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});
searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    modeText.innerText = "Light";
  } else {
    modeText.innerText = "Dark";
  }
});

function renderizarConteudo(event) {
  // Previne o comportamento padrão do link
  event.preventDefault();

  const arquivoHTML = event.currentTarget.dataset.file;

  fetch(arquivoHTML)
    .then((response) => response.text())
    .then((html) => {
      document.querySelector(".home").innerHTML = html;
      document.querySelector(".quadras").innerHTML = html;
      document.querySelector(".lobbie").innerHTML = html;
      document.querySelector(".agenda").innerHTML = html;
      document.querySelector(".amigos").innerHTML = html;
      document.querySelector(".wallet").innerHTML = html;
      document.querySelector(".proprietario").innerHTML = html;
      document.querySelector(".logout").innerHTML = html;
    })
    .catch((error) => console.error("Erro ao carregar o conteúdo:", error));
}

function carregarConteudoHome() {
  const arquivoHome = "Home/home.html";

  // Carrega e renderiza o conteúdo da página Home
  fetch(arquivoHome)
    .then((response) => response.text())
    .then((html) => {
      document.querySelector(".home").innerHTML = html;
    })
    .catch((error) =>
      console.error("Erro ao carregar o conteúdo da Home:", error)
    );
}

// Carrega o conteúdo da página Home ao iniciar a página
carregarConteudoHome();

document.querySelectorAll(".nav-link").forEach((item) => {
  item.addEventListener("click", renderizarConteudo);
});
