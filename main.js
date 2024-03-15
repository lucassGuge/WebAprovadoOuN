document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const limparTabelaBtn = document.getElementById("limparTabela");
    const tableBody = document.querySelector(".tabela tbody");

    form.addEventListener("submit", function(event){
        event.preventDefault();
        adicionarLinhaNaTabela();
        verificarConteudoTabela();
        salvarTabelaNoLocalStorage();
    });

    limparTabelaBtn.addEventListener("click", function() {
        limparTabela();
        verificarConteudoTabela();
        salvarTabelaNoLocalStorage();
    });

    function adicionarLinhaNaTabela() {
        const atividade = document.getElementById("inputA").value;
        const nota = parseFloat(document.getElementById("inputB").value);

        const tableBody = document.querySelector(".tabela tbody");
        const newRow = document.createElement("tr");

        const status = nota >= 6 ? "Aprovado" : "Reprovado";

        const cellAtividade = document.createElement("td");
        cellAtividade.textContent = atividade;
        newRow.appendChild(cellAtividade);

        const cellNota = document.createElement("td");
        cellNota.textContent = nota;
        newRow.appendChild(cellNota);
        
        const cellStatus =document.createElement("td")
        cellStatus.textContent = status; 
        
        const statusImage = document.createElement("img");
        statusImage.id = "statusImage";
        statusImage.src = `img/${nota >= 6 ? 'aprovado.png' : 'reprovado.png'}`;
        statusImage.alt = status;
        cellStatus.appendChild(statusImage);
        newRow.appendChild(cellStatus);
      
        if (status === "Aprovado") {
            cellAtividade.style.backgroundColor = "lightgreen";
            cellNota.style.backgroundColor = "lightgreen";
            cellStatus.style.backgroundColor = "lightgreen";
        } else {
            cellAtividade.style.backgroundColor = "lightcoral";
            cellNota.style.backgroundColor = "lightcoral";
            cellStatus.style.backgroundColor = "lightcoral";
        }
      
      
        tableBody.appendChild(newRow);

        document.getElementById("inputA").value = "";
        document.getElementById("inputB").value = "";
    }

    function limparTabela() {
        
        tableBody.innerHTML = "";
    }

    function verificarConteudoTabela() {
        if (tableBody.children.length > 0) {
            limparTabelaBtn.style.display = "block"; 
        } else {
            limparTabelaBtn.style.display = "none"; 
        }
    }
    function salvarTabelaNoLocalStorage() {
        const linhasTabela = tableBody.innerHTML;
        localStorage.setItem("tabela", linhasTabela);
    }

    function carregarTabelaDoLocalStorage() {
        const linhasTabelaSalva = localStorage.getItem("tabela");
        if (linhasTabelaSalva) {
            tableBody.innerHTML = linhasTabelaSalva;
            verificarConteudoTabela();
        }
    }

    
    carregarTabelaDoLocalStorage();
});
