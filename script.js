function calcularObjetivo() {
    // Obter os valores digitados nos inputs
    const goalName = document.getElementById('goalName').value;
    const targetAmount = parseFloat(document.getElementById('targetAmount').value);
    const months = parseInt(document.getElementById('months').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);

    // Validação básica dos dados
    if (!goalName || isNaN(targetAmount) || isNaN(months) || isNaN(annualRate)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // --- MATEMÁTICA APLICADA ---
    
    // 1. Cálculo Simples (sem aplicação financeira/sem juros)
    const monthlySimple = targetAmount / months;

    // 2. Cálculo com Juros Compostos (Aporte Recorrente / Anuidade)
    // Conversão da taxa anual para mensal: i_mensal = (1 + i_anual)^(1/12) - 1
    const iMonthly = Math.pow(1 + (annualRate / 100), 1 / 12) - 1;

    let monthlyInvest = 0;

    if (iMonthly > 0) {
        // Fórmula de Anuidade (PMT): PMT = FV * [ i / ((1 + i)^n - 1) ]
        monthlyInvest = targetAmount * (iMonthly / (Math.pow(1 + iMonthly, months) - 1));
    } else {
        monthlyInvest = monthlySimple;
    }

    // 3. Economia total devido ao rendimento dos juros
    const totalInvested = monthlyInvest * months;
    const savings = targetAmount - totalInvested;

    // --- EXIBIÇÃO DOS RESULTADOS ---
    
    // Função auxiliar para formatar números em Moeda Brasileira (R$)
    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    document.getElementById('resTitle').innerText = `Plano para: ${goalName}`;
    document.getElementById('resMonthlyInvest').innerText = formatCurrency(monthlyInvest);
    document.getElementById('resMonthlySimple').innerText = formatCurrency(monthlySimple);
    document.getElementById('resSavings').innerText = formatCurrency(savings);

    // Exibe o card com o resultado
    document.getElementById('resultCard').style.display = 'block';
}
