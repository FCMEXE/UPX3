function redirectToProp() {
    window.open('formRegisterProp.html', '_blank')
}



    document.addEventListener('DOMContentLoaded', function () {
      const form = document.querySelector('.form');
      const registerButton = document.getElementById('registerButton');

      
      registerButton.addEventListener('click', function (event) {
        event.preventDefault();

        
        const nome = document.querySelector('#name').value;
        const celular = document.querySelector('#tel').value;
        const cpf = document.querySelector('#cpf').value;
        const dataNascimento = document.querySelector('#date').value;
        const email = document.querySelector('#email').value;
        const senha = document.querySelector('#senha').value;

        
        const apiUrl = 'https://66259991052332d553205bbc.mockapi.io/proprietarios';

      
        const novoProprietario = {
          nome: nome,
          celular: celular,
          cpf: cpf,
          data_nascimento: dataNascimento,
          email: email,
          senha: senha
        };

        
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(novoProprietario)
        })
          .then(response => {
            
            if (!response.ok) {
              throw new Error('Erro ao registrar proprietário');
            }
            
             Swal.fire('Sucesso!', 'Após a verificação iremos liberar seu token!', 'success');
          
          })
          .catch(error => {
            console.error('Erro:', error);
            
            Swal.fire('Erro!', 'Erro ao registrar proprietário. Por favor, tente novamente.', 'error');
          });
      });
    });
