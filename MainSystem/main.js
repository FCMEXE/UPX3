document.addEventListener("DOMContentLoaded", function () {
  const body = document.body,
    sidebar = document.querySelector(".sidebar"),
    toggle = document.querySelector(".toggle"),
    searchBtn = document.querySelector(".search-box");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
  });

  function renderizarConteudo(event) {
    event.preventDefault();

    const arquivoHTML = event.currentTarget.dataset.file;

    fetch(arquivoHTML)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo HTML');
        }
        return response.text();
      })
      .then((html) => {
        const secoes = ["home", "quadras", "lobbies", "agenda", "wallet", "proprietario", "logout"];
        secoes.forEach((secao) => {
          document.querySelector(`.${secao}`).innerHTML = html;
        });
      })
      .catch((error) => console.error("Erro ao carregar o conteúdo:", error));
  }

  function carregarConteudoHome() {
    const arquivoHome = "Home/home.html";

    fetch(arquivoHome)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo HTML da Home');
        }
        return response.text();
      })
      .then((html) => {
        document.querySelector(".home").innerHTML = html;
      })
      .catch((error) =>
        console.error("Erro ao carregar o conteúdo da Home:", error)
      );
  }

  carregarConteudoHome();

  document.querySelectorAll(".nav-link").forEach((item) => {
    item.addEventListener("click", renderizarConteudo);
  });
});


let emailObj = JSON.parse(emailString);
console.log(emailObj.nome);

function rediricionaNego() {
  document.getElementById("yes").addEventListener("click", function () {
    localStorage.removeItem('email');
    localStorage.removeItem('senha');
    window.location.href = "../../Landing-Page/index.html";
    alert("Você foi desconectado!");
  });

  function redirecionaBranco(){
    document.getElementById("cancel").addEventListener("click", function () {
      window.history.back();
       window.open("../../Home/home.html");
    });
  }
}

 







