document.getElementById("calcularBtn").addEventListener("click", function () {
    const valor = parseFloat(document.getElementById('valor').value);
    const percentual = parseFloat(document.getElementById('percentual').value);
    const resultadoEl = document.getElementById('resultado');

    if (isNaN(valor) || isNaN(percentual)) {
      resultadoEl.textContent = "⚠️ Por favor, insira valores válidos.";
      return;
    }

    const resultado = (valor * percentual) / 100;
    const resultadoTotal = valor + resultado;
    const resultadoMenos = valor - resultado;

    const resultadoTexto = `
      <p>✅ <strong>${percentual}%</strong> de <strong>R$ ${valor.toFixed(2)}</strong> é <strong>R$ ${resultado.toFixed(2)}</strong></p>
      <p>🔼 Valor + ${percentual}%: <strong>R$ ${resultadoTotal.toFixed(2)}</strong></p>
      <p>🔽 Valor - ${percentual}%: <strong>R$ ${resultadoMenos.toFixed(2)}</strong></p>
    `;

    resultadoEl.innerHTML = resultadoTexto;
    salvarNoHistorico(resultadoTexto);
    carregarHistorico();
  });

  function salvarNoHistorico(resultadoTexto) {
    let historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.unshift(resultadoTexto);
    historico = historico.slice(0, 5);
    localStorage.setItem('historico', JSON.stringify(historico));
  }

  function carregarHistorico() {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    const historicoEl = document.getElementById('historico');
    historicoEl.innerHTML = '<h3>📝 Últimos Cálculos:</h3>';
    
    if (historico.length === 0) {
      historicoEl.innerHTML += '<p>Nenhum cálculo salvo.</p>';
      return;
    }
  
    historico.forEach(item => {
      const p = document.createElement('p');
      p.innerHTML = item;
      historicoEl.appendChild(p);
    });
  }
  
  const toggleBtn = document.getElementById('toggleHistoricoBtn');
  const historicoEl = document.getElementById('historico');
  let historicoCarregado = false;
  
  toggleBtn.addEventListener('click', () => {
    const isVisible = historicoEl.style.display === 'block';
  
    if (!isVisible && !historicoCarregado) {
      carregarHistorico();
      historicoCarregado = true;
    }
  
    historicoEl.style.display = isVisible ? 'none' : 'block';
    toggleBtn.textContent = isVisible ? 'Ver histórico' : 'Ocultar histórico';
  });

  window.addEventListener('load', () => {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log('✅ Service Worker registrado!'))
        .catch(err => console.log('❌ Erro no Service Worker:', err));
    }
  });


  document.getElementById('limparHistoricoBtn').addEventListener('click', () => {
    localStorage.removeItem('historico');
    document.getElementById('historico').innerHTML = '<h3>📝 Últimos Cálculos:</h3><p>Nenhum cálculo salvo.</p>';
  });
  