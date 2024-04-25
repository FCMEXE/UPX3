const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function interagirQuadra() {
  rl.question('O que você gostaria de fazer? (adicionar, editar, excluir ou visualizar): ', (resposta) => {
    if (resposta === 'adicionar') {
      adicionarQuadra();
    } else if (resposta === 'editar') {
      editarQuadra();
    } else if (resposta === 'excluir') {
      excluirQuadra();
    } else if (resposta === 'visualizar') {
      visualizarQuadra();
    } else {
      console.log('Opção inválida.');
      interagirQuadra(); 
    }
  });
}

async function obterQuadras() {
  console.log('Tentando obter os dados das quadras...');
  
  try {
    const response = await axios.get('https://6626eb22b625bf088c06e78f.mockapi.io/quadras');
    console.log('Dados das quadras obtidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter quadras:', error);
    throw error;
  }
}

function adicionarQuadra() {
  console.log('Você escolheu adicionar uma nova quadra.');

  const novaQuadra = {
    tipoquadra: 'Tipo',
    numeroplayers: 0,
    endereco: 'Endereço',
    superficie: 'Superfície',
    nomequadra: 'Nome da Quadra',
    precohora: 'Preço por Hora',
    horariosdisponiveis: 'Horários Disponíveis',
    codigodaquadra: 'Código da Quadra',
    datasdisponiveis: 'Datas Disponíveis'
  };

  adicionarQuadraComDados(novaQuadra)
    .then(() => {
      rl.close();
    })
    .catch(error => {
      console.error('Erro ao adicionar nova quadra:', error);
      rl.close();
    });
}

function adicionarQuadraComDados(novaQuadra) {
  console.log('Tentando adicionar uma nova quadra:', novaQuadra);
  
  return axios.post('https://6626eb22b625bf088c06e78f.mockapi.io/quadras', novaQuadra)
    .then(response => {
      console.log('Nova quadra adicionada com sucesso:', response.data);
    })
    .catch(error => {
      console.error('Erro ao adicionar nova quadra:', error);
      throw error;
    });
}

function editarQuadra() {
  console.log('Você escolheu editar uma quadra existente.');

  rl.question('Insira o ID da quadra que deseja editar: ', (id) => {
    visualizarQuadra(id);
  });
}

function visualizarQuadra(id) {
  console.log(`Você escolheu visualizar informações da quadra com o ID ${id}.`);

  axios.get(`https://6626eb22b625bf088c06e78f.mockapi.io/quadras/${id}`)
    .then(response => {
      const quadra = response.data;
      console.log('Informações da quadra:', quadra);

      editarQuadraComDados(id, quadra);
    })
    .catch(error => {
      console.error('Erro ao obter informações da quadra:', error);
      rl.close();
    });
}

function editarQuadraComDados(id, dadosAtualizados) {
  console.log('Agora você pode editar as informações da quadra.');
  
  rl.question('Insira o novo tipo da quadra: ', (tipoquadra) => {
    dadosAtualizados.tipoquadra = tipoquadra;

    rl.question('Insira o novo número de players da quadra: ', (numeroplayers) => {
      dadosAtualizados.numeroplayers = numeroplayers;

      rl.question('Insira o novo endereço da quadra: ', (endereco) => {
        dadosAtualizados.endereco = endereco;

        rl.question('Insira a nova superfície da quadra: ', (superficie) => {
          dadosAtualizados.superficie = superficie;

          rl.question('Insira o novo nome da quadra: ', (nomequadra) => {
            dadosAtualizados.nomequadra = nomequadra;

            rl.question('Insira o novo preço por hora da quadra: ', (precohora) => {
              dadosAtualizados.precohora = precohora;

              rl.question('Insira os novos horários disponíveis da quadra: ', (horariosdisponiveis) => {
                dadosAtualizados.horariosdisponiveis = horariosdisponiveis;

                rl.question('Insira o novo código da quadra: ', (codigodaquadra) => {
                  dadosAtualizados.codigodaquadra = codigodaquadra;

                  rl.question('Insira as novas datas disponíveis da quadra: ', (datasdisponiveis) => {
                    dadosAtualizados.datasdisponiveis = datasdisponiveis;

                    axios.put(`https://6626eb22b625bf088c06e78f.mockapi.io/quadras/${id}`, dadosAtualizados)
                      .then(() => {
                        console.log('Informações da quadra atualizadas com sucesso.');
                        rl.close();
                      })
                      .catch(error => {
                        console.error('Erro ao atualizar informações da quadra:', error);
                        rl.close();
                      });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function excluirQuadra() {
  console.log('Você escolheu excluir uma quadra existente.');

  rl.question('Insira o ID da quadra que deseja excluir: ', (id) => {
    excluirQuadraComId(id)
      .then(() => {
        rl.close();
      })
      .catch(error => {
        console.error('Erro ao excluir quadra:', error);
        rl.close();
      });
  });
}

function excluirQuadraComId(id) {
  console.log(`Tentando excluir a quadra com o ID ${id}`);
  
  return axios.delete(`https://6626eb22b625bf088c06e78f.mockapi.io/quadras/${id}`)
    .then(() => {
      console.log('Quadra excluída com sucesso.');
    })
    .catch(error => {
      console.error('Erro ao excluir quadra:', error);
      throw error;
    });
}

interagirQuadra();