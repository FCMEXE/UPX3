
const apiUrl = 'https://6626eb22b625bf088c06e78f.mockapi.io/quadras';

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
