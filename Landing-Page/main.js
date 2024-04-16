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
