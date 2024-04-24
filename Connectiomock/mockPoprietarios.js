const readline = require('readline');
const axios = require('axios');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function interagirProprietario() {
  rl.question('O que você gostaria de fazer? (adicionar, editar, excluir ou visualizar): ', (resposta) => {
    if (resposta === 'adicionar') {
      adicionarProprietario();
    } else if (resposta === 'editar') {
      editarProprietario();
    } else if (resposta === 'excluir') {
      excluirProprietario();
    } else if (resposta === 'visualizar') {
      visualizarProprietario();
    } else {
      console.log('Opção inválida.');
      interagirProprietario(); 
    }
  });
}

// pra ter os dados do banco
async function obterProprietarios() {
  console.log('Tentando obter os dados dos proprietários...');
  
  try {
    const response = await axios.get('https://66259991052332d553205bbc.mockapi.io/proprietarios');
    console.log('Dados dos proprietários obtidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter proprietários:', error);
    throw error;
  }
}

// adiciona um proprietário novo
function adicionarProprietario() {
  console.log('Você escolheu adicionar um novo proprietário.');

  const novoProprietario = {
    nome: 'Novo Proprietário',
    celular: '123456789',
    cpf: '123.456.789-10',
    data_nascimento: '1990-01-01',
    email: 'novo@email.com',
    senha: 'senha123'
  };

  adicionarProprietarioComDados(novoProprietario)
    .then(() => {
     
      rl.close();
    })
    .catch(error => {
      
      console.error('Erro ao adicionar novo proprietário:', error);
      rl.close();
    });
}


function adicionarProprietarioComDados(novoProprietario) {
  console.log('Tentando adicionar um novo proprietário:', novoProprietario);
  
  return axios.post('https://66259991052332d553205bbc.mockapi.io/proprietarios', novoProprietario)
    .then(response => {
      console.log('Novo proprietário adicionado com sucesso:', response.data);
    })
    .catch(error => {
      console.error('Erro ao adicionar novo proprietário:', error);
      throw error;
    });
}

function editarProprietario() {
  console.log('Você escolheu editar um proprietário existente.');

  rl.question('Insira o ID do proprietário que deseja editar: ', (id) => {
    visualizarProprietario(id);
  });
}


function visualizarProprietario(id) {
  console.log(`Você escolheu visualizar informações do proprietário com o ID ${id}.`);

 
  axios.get(`https://66259991052332d553205bbc.mockapi.io/proprietarios/${id}`)
    .then(response => {
      const proprietario = response.data;
      console.log('Informações do proprietário:', proprietario);

      editarProprietarioComDados(id, proprietario);
    })
    .catch(error => {
      console.error('Erro ao obter informações do proprietário:', error);
      rl.close();
    });
}

// Função para editar um proprietário 
function editarProprietarioComDados(id, dadosAtualizados) {
  console.log('Agora você pode editar as informações do proprietário.');
  
  rl.question('Insira o novo nome do proprietário: ', (nome) => {
    dadosAtualizados.nome = nome;

    rl.question('Insira o novo celular do proprietário: ', (celular) => {
      dadosAtualizados.celular = celular;

      rl.question('Insira o novo CPF do proprietário: ', (cpf) => {
        dadosAtualizados.cpf = cpf;

        rl.question('Insira a nova data de nascimento do proprietário (Formato: YYYY-MM-DD): ', (data_nascimento) => {
          dadosAtualizados.data_nascimento = data_nascimento;

          rl.question('Insira o novo email do proprietário: ', (email) => {
            dadosAtualizados.email = email;

            rl.question('Insira a nova senha do proprietário: ', (senha) => {
              dadosAtualizados.senha = senha;

              
              axios.put(`https://66259991052332d553205bbc.mockapi.io/proprietarios/${id}`, dadosAtualizados)
                .then(() => {
                  console.log('Informações do proprietário atualizadas com sucesso.');
                  rl.close();
                })
                .catch(error => {
                  console.error('Erro ao atualizar informações do proprietário:', error);
                  rl.close();
                });
            });
          });
        });
      });
    });
  });
}

// Função para excluir um proprietário que exista no banco
function excluirProprietario() {
  console.log('Você escolheu excluir um proprietário existente.');

  rl.question('Insira o ID do proprietário que deseja excluir: ', (id) => {
    excluirProprietarioComId(id)
      .then(() => {
       
        rl.close();
      })
      .catch(error => {
        
        console.error('Erro ao excluir proprietário:', error);
        rl.close();
      });
  });
}

// Função que exclui
function excluirProprietarioComId(id) {
  console.log(`Tentando excluir o proprietário com o ID ${id}`);
  
  return axios.delete(`https://66259991052332d553205bbc.mockapi.io/proprietarios/${id}`)
    .then(() => {
      console.log('Proprietário excluído com sucesso.');
    })
    .catch(error => {
      console.error('Erro ao excluir proprietário:', error);
      throw error;
    });
}

interagirProprietario();
