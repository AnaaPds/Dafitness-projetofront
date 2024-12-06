document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("foi")
    
    const nome = document.getElementById('nomeAluno').value;
    const idade = document.getElementById('numberAluno').value;
    const email = document.getElementById('emailAluno').value;
    const modalidade = document.getElementById('modalidadeAluno').value;
    
    
    if (!nome || !idade || !email || !modalidade) {
        alert("Todos os campos são obrigatórios.");
        return; // Interrompe a execução se algum campo estiver vazio
    }

    // Criação do objeto aluno
    const aluno = {
        nome,
        idade,
        email,
        modalidade
    };

    // Envia os dados para o servidor
    try {
        const response = await fetch("http://localhost:8080/academias/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(aluno), // Envia os dados corretamente como aluno
        });
        
        if (response.ok) {
            console.log("Cadastro realizado com sucesso!");
            alert("Aluno cadastrado com sucesso!");
            // Aqui você pode adicionar um código para limpar o formulário ou mostrar uma mensagem de sucesso
            document.getElementById('cadastroForm').reset(); // Limpa o formulário após o envio
        } else {
            console.error("Falha ao cadastrar. Status:", response.status);
            alert("Falha ao cadastrar aluno. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao cadastrar aluno. Tente novamente.");
    }
});
