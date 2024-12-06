const tableBody = document.querySelector("table tbody");
 
 async function buscarAluno() {
        try {
            const response = await fetch("http://localhost:8080/academias"); // Requisição para a API
            if (response.ok) {
                const alunos = await response.json(); // Converte a resposta em JSON
                exibirAlunos(alunos); // Passa os dados para a função de exibição
            } else {
                console.error("Erro na requisição:", response.status);
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
        }
    }

    // Função para exibir alunos no HTML
    function exibirAlunos(alunos) {
        const tabela = document.getElementById("tabela-academia"); // Tabela onde os dados serão inseridos
        tabela.querySelector("tbody").innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

        alunos.forEach((aluno) => {
            const novaLinha = document.createElement("tr");

            novaLinha.innerHTML = `
                <td>${tableBody.children.length + 1}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.email}</td>
                <td>${aluno.modalidade}</td>
                <td><a href ="/edit.html"><button class="btn-edit" id="btn-edit"><img src="./scr/image/editar.png" alt="Editar" data_edit="${aluno.id}"></button></a></td>
                <td><button class="btn-delete" data_del="${aluno.id}"><img src="./scr/image/lixeira.png" alt="Excluir"></button></td>
            `;

        
            tabela.querySelector("tbody").appendChild(novaLinha);
        });
    }

    buscarAluno();

    document.addEventListener("DOMContentLoaded", () => {
    
        if (tableBody) {
            tableBody.addEventListener("click", async (event) => {
                // Verifica se o botão de excluir foi clicado
                const botao_excluir = event.target.closest(".btn-delete");
                if (botao_excluir) {
                    console.log("O botão está sendo clicado")
                    const alunoId = botao_excluir.getAttribute("data_del");
                    botao_excluir.addEventListener("click", async () => {
                        await excluirAluno(alunoId);
                    });
                }
            });
        } else {
            console.error("Tabela de academia não encontrada!");
        }
    });



async function excluirAluno(id) {
    try {
        const response = await fetch(`http://localhost:8080/academias/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            buscarAluno(); 
        } else {
            console.error("Erro ao excluir aluno:", response.status);
            console.log(id)
        }
    } catch (error) {
        console.error("Erro de conexão ao excluir aluno:", error);
    }
}

    




    // document.addEventListener("DOMContentLoaded", () => {
    //     const saveButton = document.querySelector(".btn-save");
    //     const nameInput = document.querySelector(".form-add input[placeholder='Nome']");
    //     const ageInput = document.querySelector(".form-add input[placeholder='Idade']");
    //     const emailInput = document.querySelector(".form-add input[placeholder='Email']");
    //     const modalityInput = document.querySelector(".form-add select");
    //     const tableBody = document.querySelector("table tbody");});





    // Função para adicionar um novo aluno à tabela
// saveButton.addEventListener("click", async (event) => {
//     event.preventDefault(); // Impede o comportamento padrão do botão
    
//     // Verifica se todos os campos estão preenchidos
//     if (!nameInput.value || !ageInput.value || !emailInput.value || !modalityInput.value) {
//         alert("Por favor, preencha todos os campos antes de salvar.");
//         return;
//     }

//     // Cria um objeto com os dados do aluno
//     const aluno = {
//         nome: nameInput.value,
//         idade: ageInput.value,
//         email: emailInput.value,
//         modalidade: modalityInput.value
//     };

//     try {
//         // Envia os dados para o servidor via POST
//         const response = await fetch('http://localhost:8080/academias/post', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(aluno)
//         });

//         if (!response.ok) {
//             throw new Error('Erro ao adicionar o aluno!');
//         }

//         // Adiciona o aluno à tabela
//         const newRow = document.createElement("tr");
//         newRow.innerHTML = `
//             <td>${tableBody.children.length + 1}</td>
//             <td>${nameInput.value}</td>
//             <td>${ageInput.value}</td>
//             <td>${emailInput.value}</td>
//             <td>${modalityInput.value}</td>
//             <td><button class="btn-edit"><img src="./scr/image/editar.png" alt="Editar"></button></td>
//             <td><button class="btn-delete"><img src="./scr/image/lixeira.png" alt="Excluir"></button></td>
//         `;
//         tableBody.appendChild(newRow);

//         // Limpa os campos do formulário
//         nameInput.value = "";
//         ageInput.value = "";
//         emailInput.value = "";
//         modalityInput.value = "";

//         // Adiciona eventos aos botões da nova linha
//         addRowEvents(newRow);
//     } catch (error) {
//         console.error('Erro:', error);
//         alert('Falha ao adicionar o aluno');
//     }
// });

//     // Função para adicionar eventos de edição e exclusão às linhas
//     function addRowEvents(row) {
//         const editButton = row.querySelector(".btn-edit");
//         const deleteButton = row.querySelector(".btn-delete");
    
//         // Botão Editar
//             // Botão Editar
//     editButton.addEventListener("click", () => {
//         const cells = row.children;
//         const id = cells[0].innerText;
//         const name = cells[1].innerText;
//         const age = cells[2].innerText;
//         const email = cells[3].innerText;
//         const modality = cells[4].innerText;

//         const url = `edit.html?id=${id}&name=${encodeURIComponent(name)}&age=${age}&email=${encodeURIComponent(email)}&modality=${encodeURIComponent(modality)}`;
//         window.location.href = url;
//         console.log(url)
//     });

//     // Botão Excluir
//     deleteButton.addEventListener("click", async () => {
//         const cells = row.children;
//         const id = cells[0].innerText;
//         if (confirm("Tem certeza que deseja excluir este aluno?")) {
//             row.remove();
//             alert("Aluno excluído com sucesso!");
//             console.log(id)
//             await deletarAluno(id)
//         }
//     });
// }


// async function deletarAluno(id) { 
//     try {
//         // Enviar a requisição DELETE para o backend
//         const response = await fetch(`http://localhost:8080/${id}`, {
//             method: 'DELETE'
//         });

//         if (!response.ok) {
//             throw new Error('Erro ao excluir a aluno!');
//         }


//     } catch (error) {
//         console.error('Erro:', error);
//         alert('Falha ao excluir o aluno');
//     }
// }
//     // Adiciona eventos às linhas existentes
//     const rows = tableBody.querySelectorAll("tr");
//     rows.forEach(addRowEvents);
// });















































