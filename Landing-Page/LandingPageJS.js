

const btn = document.getElementById("btn-form");

btn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;

  fetch("https://66259991052332d553205bbc.mockapi.io/usuarios")
    .then((resposta) => resposta.json())
    .then((dados) => {
      const usuarioEncontrado = dados.find(
        (usuario) => usuario.email === email
      );

      if (usuarioEncontrado) {
        console.log("foi essa buceta!")
        window.location.href = "../MainSystem/main.html";
       
        
      } else {
        // User not found, handle accordingly
        alert("Senha ou Usuario Invalido!")
        
      }
    })
    .catch((error) => {
       alert("Erro ao encontrar ")
    });
});


 


  


//   //recebe os proprietários da API
//   const proprietarioResponse = fetch(
//     "https://66259991052332d553205bbc.mockapi.io/proprietarios"
//   );
//   const dadosProprietarios = proprietarioResponse.json();

//   const proprietarioEncontrado = dadosProprietarios.find(
//     (proprietario) => proprietario.email === email
//   );

//   //verifica se o usuário foi encontrado
//   if (usuarioEncontrado) {
//     if (usuarioEncontrado.senha === senha) {
//       alert("Login realizado com sucesso!");
//       window.location.href = "../MainSystem/main.html";
//     } else {
//       alert("Senha incorreta!");
//     }
//   } else if (proprietarioEncontrado) {
//     //verifica se o proprietário foi encontrado
//     if (proprietarioEncontrado.senha === senha) {
//       alert("Login realizado com sucesso!");
//       window.location.href = "../MainSystem/main.html";
//     } else {
//       alert("Senha incorreta!");
//     }
//   } else {
//     alert("E-mail não cadastrado!");
//   }
// });

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

