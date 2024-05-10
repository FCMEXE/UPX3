

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
                   <h2>${data.nomequadra}</h2>
                <p>Endereço: ${data.endeco}</p>
                <p>Jogo: ${data.precohora}</p>
                <p>Qtd. de jogadores: ${data.numeroplayers}</p>
                <p>Escolha seu horario:</p>
                <select name="horario">
                    ${data.horariosdisponiveis.map(horario => `<option value="${horario}">${horario}</option>`).join('')}
                </select>

                <button type="submit">Reservar Lobbie</button>
            `;

            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const selectedTime = form.querySelector('select[name="horario"]').value;

                
               
            });

            containerRight.appendChild(form);
        })
        .catch(error => console.error('Erro:', error));
}



LobbieCard(quadraId);


    

 







