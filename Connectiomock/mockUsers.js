const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function interagirUsuario() {
  rl.question('O que você gostaria de fazer? (adicionar, editar, excluir ou visualizar): ', (resposta) => {
    if (resposta === 'adicionar') {
      adicionarUsuario();
    } else if (resposta === 'editar') {
      editarUsuario();
    } else if (resposta === 'excluir') {
      excluirUsuario();
    } else if (resposta === 'visualizar') {
      visualizarUsuario();
    } else {
      console.log('Opção inválida.');
      interagirUsuario(); 
    }
  });
}

function obterUsuarios() {
  console.log('Tentando obter os dados dos usuários...');
  
  return axios.get('https://66259991052332d553205bbc.mockapi.io/usuarios')
    .then(response => {
      console.log('Dados dos usuários obtidos:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Erro ao obter usuários:', error);
      throw error;
    });
}

function adicionarUsuario() {
  console.log('Você escolheu adicionar um novo usuário.');

  const novoUsuario = {
    name: 'Novo Usuário',
    celular: '123456789',
    cpf: '123.456.789-10',
    data_nascimento: '1990-01-01',
    email: 'novo@email.com',
    endereco: 'Rua ABC, 123',
    senha: 'senha123'
  };

  adicionarUsuarioComDados(novoUsuario)
    .then(() => {
      
      rl.close();
    })
    .catch(error => {
     
      console.error('Erro ao adicionar novo usuário:', error);
      rl.close();
    });
}


function adicionarUsuarioComDados(novoUsuario) {
  console.log('Tentando adicionar um novo usuário:', novoUsuario);
  
  return axios.post('https://66259991052332d553205bbc.mockapi.io/usuarios', novoUsuario)
    .then(response => {
      console.log('Novo usuário adicionado com sucesso:', response.data);
    })
    .catch(error => {
      console.error('Erro ao adicionar novo usuário:', error);
      throw error;
    });
}


function editarUsuario() {
  console.log('Você escolheu editar um usuário existente.');

  rl.question('Insira o ID do usuário que deseja editar: ', (id) => {
    visualizarUsuario(id);
  });
}


function visualizarUsuario(id) {
  console.log(`Você escolheu visualizar informações do usuário com o ID ${id}.`);

  
  axios.get(`https://66259991052332d553205bbc.mockapi.io/usuarios/${id}`)
    .then(response => {
      const usuario = response.data;
      console.log('Informações do usuário:', usuario);

      
      editarUsuarioComDados(id, usuario);
    })
    .catch(error => {
      console.error('Erro ao obter informações do usuário:', error);
      rl.close();
    });
}

// Função para editar um usuário existente 
function editarUsuarioComDados(id, dadosAtualizados) {
    console.log('Agora você pode editar as informações do usuário.');
  
    rl.question('Insira o novo nome do usuário: ', (nome) => {
      dadosAtualizados.name = nome;
  
      rl.question('Insira o novo celular do usuário: ', (celular) => {
        dadosAtualizados.celular = celular;
  
        rl.question('Insira o novo CPF do usuário: ', (cpf) => {
          dadosAtualizados.cpf = cpf;
  
          rl.question('Insira a nova data de nascimento do usuário (Formato: YYYY-MM-DD): ', (data_nascimento) => {
            dadosAtualizados.data_nascimento = data_nascimento;
  
            rl.question('Insira o novo email do usuário: ', (email) => {
              dadosAtualizados.email = email;
  
              rl.question('Insira o novo endereço do usuário: ', (endereco) => {
                dadosAtualizados.endereco = endereco;
  
                rl.question('Insira a nova senha do usuário: ', (senha) => {
                  dadosAtualizados.senha = senha;
  
                  
                  axios.put(`https://66259991052332d553205bbc.mockapi.io/usuarios/${id}`, dadosAtualizados)
                    .then(() => {
                      console.log('Informações do usuário atualizadas com sucesso.');
                      rl.close();
                    })
                    .catch(error => {
                      console.error('Erro ao atualizar informações do usuário:', error);
                      rl.close();
                    });
                });
              });
            });
          });
        });
      });
    });
  }


function excluirUsuario() {
  console.log('Você escolheu excluir um usuário existente.');

  rl.question('Insira o ID do usuário que deseja excluir: ', (id) => {
    excluirUsuarioComId(id)
      .then(() => {
      
        rl.close();
      })
      .catch(error => {
        
        console.error('Erro ao excluir usuário:', error);
        rl.close();
      });
  });
}

// Função para excluir um usuário existente 
function excluirUsuarioComId(id) {
  console.log(`Tentando excluir o usuário com o ID ${id}`);
  
  return axios.delete(`https://66259991052332d553205bbc.mockapi.io/usuarios/${id}`)
    .then(() => {
      console.log('Usuário excluído com sucesso.');
    })
    .catch(error => {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    });
}


interagirUsuario();
