const form = document.getElementById('form');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  //recebe os usuários da API
  const userResponse = await fetch('https://66259991052332d553205bbc.mockapi.io/usuarios');
  const dadosUsuarios = await userResponse.json();

  const usuarioEncontrado = dadosUsuarios.find(usuario => usuario.email === email);

  //recebe os proprietários da API
  const proprietarioResponse = await fetch('https://66259991052332d553205bbc.mockapi.io/proprietarios')
  const dadosProprietarios = await proprietarioResponse.json();

  const proprietarioEncontrado = dadosProprietarios.find(proprietario => proprietario.email === email);

  //verifica se o usuário foi encontrado
  if (usuarioEncontrado) {
    if (usuarioEncontrado.senha === senha) {
      alert('Login realizado com sucesso!');
      window.location.href = '../MainSystem/main.html';
    }
    else {
      alert('Senha incorreta!');
    }
  }
  else if (proprietarioEncontrado) {
    //verifica se o proprietário foi encontrado
    if (proprietarioEncontrado.senha === senha) {
      alert('Login realizado com sucesso!');
      window.location.href = '../MainSystem/main.html';
    }
    else {
      alert('Senha incorreta!');
    }
  }
  else {
    alert('E-mail não cadastrado!');
  }
});

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

function redirectToGoogle() {
  window.location.href = "";
}
