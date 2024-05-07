

 // Function to redirect to quadra details page
      function getInfo(quadraId) {
        window.location.href = `MainSystem/Quadras/QuadraCreate/quadrasCreate.html?id=${quadraId}`;
      }

      // Function to fetch quadra data asynchronously
      async function fetchQuadras() {
        try {
          const response = await fetch(
            'https://6626eb22b625bf088c06e78f.mockapi.io/quadras'
          );
          const data = await response.json();
          data.forEach(quadra => {
            criarCard(quadra);
          });
        } catch (error) {
          console.error('Erro:', error);
        }
      }

      // Call the fetchQuadras function
      fetchQuadras();

      // Function to create a card for each quadra
      function criarCard(quadra) {
        const cardsSec = document.getElementById('containerCardId');
        if (!cardsSec) {
          console.error('Elemento #containerCardId não encontrado.');
          return;
        }

        // Create card elements
        const containerCard = document.createElement('div');
        containerCard.classList.add('containerCard');

        const card = document.createElement('div');
        card.classList.add('card');

        const box = document.createElement('div');
        box.classList.add('box');

        const content = document.createElement('div');
        content.classList.add('content');

        // Inject quadra data into the card
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

        // Append card elements to the container
        content.appendChild(containerCard);
        containerCard.appendChild(card);
        card.appendChild(box);
        box.appendChild(content);
        cardsSec.appendChild(containerCard);
      }