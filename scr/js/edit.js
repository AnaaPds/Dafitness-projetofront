const apiUrl = 'http://localhost:8080/academias'; 

// Função para buscar contatos
function fetchContacts() {
  console.log('Carregando dados...');
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados recebidos:', data);
      // Exibir contatos em algum lugar ou apenas carregar um específico
      // Exemplo: apenas para fins de demonstração
      if (data.length > 0) {
        const firstContact = data[0]; // Supondo que você queira editar o primeiro contato como exemplo
        editData(firstContact.id); // Chame a função de edição com o ID do primeiro contato
      }
    })
    .catch(error => {
      console.error('Erro ao carregar dados:', error);
    });
}

// Função para editar dados de um contato
function editData(id) {
  fetch(`${apiUrl}/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados para edição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Preencher os campos do formulário com os dados existentes
      document.getElementById('name').value = data.nome;
      document.getElementById('age').value = data.idade;
      document.getElementById('email').value = data.email;
      document.getElementById('modality').value = data.modalidade;
   
      // Adicionar um evento para o formulário ao ser enviado
      document.getElementById('formulario-edicao').onsubmit = function(event) {
        event.preventDefault(); // Evitar o envio padrão do formulário

        const updatedData = {
          nome: document.getElementById('name').value,
          idade: document.getElementById('age').value,
          email: document.getElementById('email').value,
          modalidade: document.getElementById('modality').value,
        };

        fetch(`${apiUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro ao editar dados: ${response.status}`);
            }
            return response.json();
          })
          .then(() => {
            alert('Dados editados com sucesso!');
            fetchContacts(); // Atualizar a lista de contatos
          })
          .catch(error => {
            console.error('Erro ao editar dados:', error);
            alert(`Erro: ${error.message}`);
          });
      };
    })
    .catch(error => {
      console.error('Erro ao carregar dados para edição:', error);
      alert(`Erro: ${error.message}`);
    });
}

// Chamada inicial para carregar os contatos
fetchContacts();