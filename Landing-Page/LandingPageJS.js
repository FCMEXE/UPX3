const btn = document.getElementById("btn-form");

btn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;

  fetch("https://66259991052332d553205bbc.mockapi.io/usuarios")
    .then((resposta) => resposta.json())
    .then((dados) => {

      const usuarioEncontrado = dados.find(
        (usuario) => usuario.email === email && usuario.senha === senha
      );

      if (usuarioEncontrado) {
        // Armazena o ID do usuário no localStorage
        localStorage.setItem('userID', usuarioEncontrado.id);
        
        // Redireciona para a página principal
        window.location.href = "../MainSystem/main.html";
        
      } else {
        // Usuário não encontrado ou senha incorreta
        alert("Senha ou Usuário Inválido!");
      }
    })
    .catch((error) => {
       alert("Erro ao encontrar usuário");
    });
});

// Outras funções que você tem
function scrollToSuporte() {
  var suporteSection = document.querySelector(".Suporte");
  suporteSection.scrollIntoView({ behavior: "smooth" });
}

function scrollToAboutUs() {
  var aboutUsSection = document.querySelector(".Sobre-nos");
  aboutUsSection.scrollIntoView({ behavior: "smooth" });
}

function scrollToSignUp() {
  var aboutUsSection = document.querySelector(".register");
  aboutUsSection.scrollIntoView({ behavior: "smooth" });
}

function redirectToIndex() {
  window.location.href = "./LandingSup/suporte.html";
}
