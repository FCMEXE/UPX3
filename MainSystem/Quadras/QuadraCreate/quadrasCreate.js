document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const data = {
      tipoquadra: obterTiposTerrenoSelecionados(),
      numeroplayers: formData.get("numJogadores"),
      endeco: formData.get("endereco"),
      superficie: "",
      nomequadra: formData.get("name"),
      precohora: formatarPrecoHora(formData.get("precoPorHora")),
      horariosdisponiveis: obterHorariosDisponiveisSelecionados(),
    };

    fetch("https://6626eb22b625bf088c06e78f.mockapi.io/quadras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao enviar os dados.");
        }
        return response.json();
      })
      .then((responseData) => {
        alert("Quadra Cadastrada")
        console.log("Dados enviados com sucesso:", responseData);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  });

  function obterTiposTerrenoSelecionados() {
    const checkboxes = document.querySelector(
      'input[name="terreno"]:checked'
    );
    const tiposTerrenoSelecionados = Array.from(checkboxes).map(
      (checkbox) => checkbox.value
    );
    return tiposTerrenoSelecionados;
  }

  function formatarPrecoHora(preco) {
    return "R$ " + parseFloat(preco).toFixed(2);
  }

  function obterHorariosDisponiveisSelecionados() {
    const checkboxes = document.querySelectorAll(
      'input[name="horarios"]:checked'
    );
    const horariosSelecionados = Array.from(checkboxes).map(
      (checkbox) => checkbox.value
    );
    return horariosSelecionados;
  }
});

function getInfo() {
  window.location.href = "MainSystem/Quadras/QuadraCreate/quadrasCreate.html";
}
