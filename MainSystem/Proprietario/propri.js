
const apiUrl = 'https://6626eb22b625bf088c06e78f.mockapi.io/quadras';
const apiUrlLobbie = 'https://66416a533d66a67b3433d202.mockapi.io/lobbie/userLobbies'

async function promptDeleteQuadra() {
  const quadraName = prompt('Digite o nome da quadra que deseja excluir:');
  if (quadraName) {
    await deleteQuadra(quadraName);
  }
}
async function deleteQuadra(nomequadra) {
  try {
    const response = await fetch(apiUrl);
    const quadras = await response.json();
    
    const quadraToDelete = quadras.find(quadra => quadra.nomequadra === nomequadra);
    
    if (!quadraToDelete) {
      alert(`Quadra com o nome ${nomequadra} não encontrada.`);
      return;
    }
    const deleteResponse = await fetch(`${apiUrl}/${quadraToDelete.id}`, {
      method: 'DELETE',
    });
    
    if (deleteResponse.ok) {
      alert(`Quadra ${nomequadra} excluída com sucesso.`);
    } else {
      alert('Erro ao excluir a quadra.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao excluir a quadra.');
  }
}


async function promptDeleteLobbie() {
  const nomeLobbie = prompt('Digite o nome do lobbie que deseja excluir:');
  if (nomeLobbie) {
    await deleteQuadra(nomeLobbie);
  }
}
async function deleteQuadra(nomeLobbie) {
  try {
    const responseLobbie = await fetch(apiUrlLobbie);
    const lobbies = await response.json();
    
    const LobbieToDelete = lobbies.find(lobbie => lobbie.nomeLobbie === nomeLobbie);
    
    if (!LobbieToDelete) {
      alert(`Quadra com o nome ${nomeLobbie} não encontrada.`);
      return;
    }
    const deleteResponse = await fetch(`${apiUrlLobbie}/${LobbieToDelete.id}`, {
      method: 'DELETE',
    });
    
    if (deleteResponse.ok) {
      alert(`Quadra ${nomeLobbie} excluída com sucesso.`);
    } else {
      alert('Erro ao excluir a quadra.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao excluir a quadra.');
  }
}
