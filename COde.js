// --- CONFIGURAÇÕES INICIAIS ---
let saldo = 5000.00;
const PIN_CORRETO = "1234";

// --- FUNÇÃO DE LOGIN ---
function verificarPin() {
    const pinInserido = document.getElementById('pin-input').value;
    const erro = document.getElementById('login-error');
    const telaLogin = document.getElementById('login-screen');
    const conteudoPrincipal = document.getElementById('main-content');

    if (pinInserido === PIN_CORRETO) {
        // Esconde o login e mostra o site
        telaLogin.style.display = 'none';
        conteudoPrincipal.style.display = 'block';
        atualizarDisplay();
    } else {
        erro.innerText = "PIN incorreto! Tente 1234";
        document.getElementById('pin-input').value = "";
    }
}

// --- FUNÇÕES DO SISTEMA FINANCEIRO ---

function atualizarDisplay() {
    const formatado = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // Atualiza o saldo no topo e no card lateral
    if(document.getElementById('display-saldo')) {
        document.getElementById('display-saldo').innerText = formatado;
    }
    document.getElementById('saldo-atual').innerText = formatado;
}

function registrarAtividade(nome, valor, tipo) {
    const lista = document.getElementById('lista-atividades');
    const msgVazia = lista.querySelector('.empty-msg');
    if (msgVazia) msgVazia.remove();

    const item = document.createElement('div');
    item.className = 'history-item';
    
    // Cor diferente para cada tipo
    const cor = tipo === 'compra' ? '#ff9800' : '#ff5252';

    item.innerHTML = `
        <span>${nome}</span>
        <span style="color: ${cor}">- R$ ${valor.toFixed(2)}</span>
    `;

    lista.prepend(item);
}

function comprar(nomeProduto, valor) {
    if (saldo >= valor) {
        saldo -= valor;
        atualizarDisplay();
        registrarAtividade(nomeProduto, valor, 'compra');
        alert("🎉 Compra de " + nomeProduto + " realizada!");
    } else {
        alert("❌ Saldo insuficiente!");
    }
}

function transferir() {
    const campoValor = document.getElementById('valor-transfer');
    const campoDestino = document.getElementById('destinatario');
    const feedback = document.getElementById('msg-feedback');
    
    const valor = parseFloat(campoValor.value);
    const destino = campoDestino.value;

    if (!destino || isNaN(valor) || valor <= 0) {
        feedback.innerText = "⚠️ Preencha os dados corretamente.";
        feedback.style.color = "#ff5252";
        return;
    }

    if (saldo >= valor) {
        saldo -= valor;
        atualizarDisplay();
        registrarAtividade(`Para: ${destino}`, valor, 'transf');
        
        feedback.innerText = "✅ Transferência enviada!";
        feedback.style.color = "#00e676";
        
        // Limpar campos
        campoValor.value = "";
        campoDestino.value = "";
    } else {
        feedback.innerText = "❌ Saldo insuficiente.";
        feedback.style.color = "#ff5252";
    }
}

// Inicializa a tela com o saldo (mas o conteúdo só aparece após o login)
atualizarDisplay();
