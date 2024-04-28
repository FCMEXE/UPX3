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
        console.log("Dados enviados com sucesso:", responseData);
        criarCard(responseData);
        
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
       
      });
  });

  // function criarCard(data) {
  //   const cardsSec = document.querySelector(".cardsSec");

  //   const card = document.createElement("div");
  //   card.classList.add("containerCard");
  //   card.innerHTML = `
  //     <div class="card">
  //       <div class="box">
  //         <div class="content">
  //           <h2>${data.id}</h2>
  //           <h3>${data.nomequadra}</h3>
  //           <p>
  //             Endereço: ${data.endeco}<br>
  //             Número de Jogadores: ${data.numeroplayers}<br>
  //             Preço por Hora: ${data.precohora}<br>
  //             Horários Disponíveis: ${data.horariosdisponiveis.join(", ")}
  //           </p>
  //           <button class="btnCard" onclick="getInfo()">Detalhes da quadra</button>
  //         </div>
  //       </div>
  //     </div>
  //   `;

  //   cardsSec.appendChild(".card");
  // }

  function criarCard(quadra) {
    const cardsSec = document.querySelector(".cardsSec");
    if (!cardsSec) {
      console.error("Elemento .cardsSec não encontrado.");
      return;
    }
  
    const containerCard = document.createElement("div");
    containerCard.classList.add("containerCard");
  
    const card = document.createElement("div");
    card.classList.add("card");
  
    const box = document.createElement("div");
    box.classList.add("box");
  
    const content = document.createElement("div");
    content.classList.add("content");
  
    content.innerHTML = `
      <h2>${quadra.id}</h2>
      <h3>${quadra.nomequadra}</h3>
      <p>${quadra.endereco}</p>
      <p>Número de Jogadores: ${quadra.numeroplayers}</p>
      <p>Preço por Hora: ${quadra.precohora}</p>
      <button class="btnCard" onclick="getInfo(${quadra.id})">
        Detalhes da quadra
      </button>
    `;
  
    content.appendChild(containerCard);
    containerCard.appendChild(card);
    card.appendChild(box);
    box.appendChild(content);
  
    cardsSec.appendChild(containerCard);
  }  

  function fetchQuadras() {
    fetch('https://6626eb22b625bf088c06e78f.mockapi.io/quadras')
        .then(response => response.json())
        .then(data => {
            data.forEach(quadra => {
                criarCard(quadra);
            });
        })
        .catch(error => console.error('Erro:', error));
  }

  fetchQuadras();
 
  function obterTiposTerrenoSelecionados() {
    const checkboxes = document.querySelectorAll('input[name="terreno"]:checked');
    const tiposTerrenoSelecionados = Array.from(checkboxes).map((checkbox) => checkbox.value);
    return tiposTerrenoSelecionados;
  }

  
  function formatarPrecoHora(preco) {
    return "R$ " + parseFloat(preco).toFixed(2); 
  }

  function obterHorariosDisponiveisSelecionados() {
    const checkboxes = document.querySelectorAll('input[name="horarios"]:checked');
    const horariosSelecionados = Array.from(checkboxes).map((checkbox) => checkbox.value);
    return horariosSelecionados;
  }
});


function getInfo() {
  window.location.href = "MainSystem/Quadras/QuadraCreate/quadrasCreate.html";
}

async function getDadosQuadra(){

  let url = "https://6626eb22b625bf088c06e78f.mockapi.io/quadras";

  let resposta = await Promise.all([fetch(url)]);

  let dados = await resposta[0].json();

}