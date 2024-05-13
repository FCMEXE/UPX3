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
          throw new Error("Erro ao carregar o arquivo HTML");
        }
        return response.text();
      })
      .then((html) => {
        const secoes = [
          "home",
          "quadras",
          "lobbies",
          "agenda",
          "wallet",
          "proprietario",
          "logout",
        ];
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
          throw new Error("Erro ao carregar o arquivo HTML da Home");
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

// let emailObj = JSON.parse(emailString);
// console.log(emailObj.nome);

// function rediricionaNego() {
//   document.getElementById("yes").addEventListener("click", function () {
//     localStorage.removeItem("email");
//     localStorage.removeItem("senha");
//     window.location.href = "../../Landing-Page/index.html";
//     alert("Você foi desconectado!");
//   });

//   function redirecionaBranco() {
//     document.getElementById("cancel").addEventListener("click", function () {
//       window.history.back();
//       window.open("../../Home/home.html");
//     });
//   }
// }

//REDIRECIONA O USUARIO PARA A PAGINA DE SUPORTE (BOTAO LOCALIZADO NA PAGINA DE QUADRAS)
function redirectToSup() {
  window.open("../Landing-Page/LandingSup/suporte.html");
}

// FUNÇÃO PARA PESQUISAR AS QUADRAS
function search () { // criação da ArrowFunction
  const searchBox = document.getElementById("pesquisa").value.toUpperCase(); //pega as informações que o usuário digitou e transforma em maiúsculo
  const storeQuadras = document.getElementById("containerCardId");
  const quadras = document.querySelectorAll(".card");

  quadras.forEach((quadra) => { // roda um loop para todas as quadras e pega o nome das quadras e transforma em maiúsculo
    const nomeQuadra = quadra.querySelector("h3").textContent.toUpperCase();

    if (nomeQuadra.includes(searchBox)) { // verifica se as informações fornecidas pelo usuário batem com os nomes das quadras
      quadra.style.display = ""; //se sim, mostra as quadras correspondentes
    } 
    else {
      quadra.style.display = "none"; //se não, esconde as quadras não correspondentes
    }
  });
};

async function gerarHorarios() {
  const userId = localStorage.getItem('userID');
  const urlLobbie = `https://66416a533d66a67b3433d202.mockapi.io/lobbie/userLobbies/?userid=${userId}`;
  const resposta = await fetch(urlLobbie);
  const resultado = await resposta.json();

  const diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
  const horarios = [
      "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
      "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
  ]

  const tabela = document.getElementById('tableId');

  resultado.forEach(agenda => {
      const diaSemana = agenda.diaSemana;
      const horario = agenda.horario;
      const nome = agenda.nome;

      const indexDia = diasSemana.indexOf(diaSemana) + 1;
      const indexHorario = horarios.indexOf(horario) + 1;

      if (indexDia > 0 && indexDia < tabela.rows.length && indexHorario > 0) {
          // Preencher a célula correspondente com o nome do lobbie
          const horarioCell = tabela.rows[indexHorario].cells[indexDia];
          horarioCell.textContent = nome;
          horarioCell.style.backgroundColor = 'forestgreen';
      }
  });
}

gerarHorarios();