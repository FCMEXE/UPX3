function deleteLobbie(nomeLobbie) {
  console.log(`Tentando excluir o usuário com o nome ${nomeLobbie}`);
  
  return axios.delete(`https://66416a533d66a67b3433d202.mockapi.io/lobbie/userLobbies/nome/${nomeLobbie}`)
    .then(() => {
      console.log('Usuário excluído com sucesso.');
    })
    .catch(error => {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    });
}