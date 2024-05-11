function GetIdUrl(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Obtém o valor do parâmetro "quadraId" da URL
const quadraId = GetIdUrl('quadraId');

function LobbieCard(quadraId) {
    fetch(`https://6626eb22b625bf088c06e78f.mockapi.io/quadras/${quadraId}`)
        .then(response => response.json())
        .then(data => {
            const containerRight = document.querySelector('.container-right');
            containerRight.innerHTML = '';

            const form = document.createElement('form');
            form.classList.add('lobbie-form');

            form.innerHTML = `
                <p>Digite o nome do lobbie:<input type="text" id="nomeLobbie" placeholder="aqui..."></p>
                <p>Endereço: ${data.endeco}</p>
                <p>Jogo: ${data.precohora}</p>
                <p>Qtd. de jogadores MAX: ${data.numeroplayers}</p>
                <p>Escolha seu horário:</p>
                <select id="horario" name="horario">
                    ${data.horariosdisponiveis.map(horario => `<option value="${horario}">${horario}</option>`).join('')}
                </select>

                <button type="submit">Reservar Lobbie</button>
            `;
            containerRight.appendChild(form);

            const getForm = document.querySelector('.lobbie-form');
            getForm.addEventListener('submit', function(event) {
                event.preventDefault();

                const nome = document.getElementById('nomeLobbie').value;
                const horario = document.getElementById('horario').value;

                const reserva = {
                    nome: nome,
                    horario: horario,
                    quadraId: quadraId
                };

                fetch('https://662902a454afcabd0737da4c.mockapi.io/Lobbies', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reserva),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao enviar os dados.");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    alert("Lobbie Reservado com sucesso!");
                    console.log("Dados enviados com sucesso:", responseData);
                })
                .catch((error) => {
                    console.error("Erro ao enviar os dados:", error);
                });
            });
        })
        .catch(error => console.error('Erro:', error));
}

LobbieCard(quadraId);
