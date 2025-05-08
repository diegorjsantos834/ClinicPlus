// Função para buscar dados do CEP usando a API ViaCEP
async function buscarCep(cep) {
    // Remove caracteres não numéricos
    cep = cep.replace(/\D/g, '');
    
    // Verifica se o CEP tem o formato correto
    if (cep.length !== 8) {
        mostrarAlerta('Por favor, insira um CEP válido com 8 dígitos.', 'erro');
        return null;
    }
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            mostrarAlerta('CEP não encontrado. Verifique e tente novamente.', 'erro');
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        mostrarAlerta('Erro ao buscar CEP. Tente novamente mais tarde.', 'erro');
        return null;
    }
}

// Elementos para armazenar as clínicas encontradas
let clinicasEncontradas = [];

// Função para criar o modal simplificado
function criarModalSimplificado() {
    // Cria o modal se ainda não existir
    if (!document.getElementById('cepModal')) {
        const modalHTML = `
            <div id="cepModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 hidden overflow-y-auto">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-lg my-6 mx-auto relative">
                    <div class="p-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-800">Clínicas encontradas</h3>
                        <button id="fecharModal" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="p-4">
                        <div id="infoEndereco" class="mb-3 text-gray-700 text-sm"></div>
                        <div id="clinicasProximas" class="max-h-80 overflow-y-auto"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Adiciona evento para fechar o modal
        document.getElementById('fecharModal').addEventListener('click', () => {
            document.getElementById('cepModal').classList.add('hidden');
        });
    }
}

// Mostrar alerta na interface
function mostrarAlerta(mensagem, tipo = 'sucesso') {
    // Remove alertas anteriores
    const alertaAnterior = document.getElementById('alerta-busca');
    if (alertaAnterior) {
        alertaAnterior.remove();
    }
    
    // Cria o alerta
    const alerta = document.createElement('div');
    alerta.id = 'alerta-busca';
    alerta.className = `text-sm p-2 rounded-md mt-2 ${
        tipo === 'erro' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
    }`;
    alerta.innerHTML = mensagem;
    
    // Adiciona o alerta após o campo de busca
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.appendChild(alerta);
        
        // Remove o alerta após alguns segundos
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.remove();
            }
        }, 5000);
    } else {
        console.error("Elemento search-box não encontrado!");
    }
}

// Função para validar se uma especialidade foi selecionada
function validarEspecialidade() {
    const especialidadeSelect = document.querySelector('select');
    if (especialidadeSelect && especialidadeSelect.value === "Especialidade médica") {
        mostrarAlerta('Por favor, selecione uma especialidade médica antes de buscar.', 'erro');
        return false;
    }
    return true;
}

// Função para buscar localização pelo CEP
async function buscarLocalizacaoPorCep() {
    // Valida se uma especialidade foi selecionada
    if (!validarEspecialidade()) {
        return;
    }
    
    const cepInput = document.querySelector('input[placeholder="Localização ou CEP"]');
    const especialidadeSelect = document.querySelector('select');
    
    if (!cepInput || !cepInput.value) {
        mostrarAlerta('Por favor, insira um CEP válido.', 'erro');
        return;
    }
    
    const cepData = await buscarCep(cepInput.value);
    if (!cepData) return;
    
    // Cria o modal antes de tudo
    criarModalSimplificado();
    
    // Mostra endereço encontrado
    document.getElementById('infoEndereco').innerHTML = `
        <div class="bg-blue-50 p-3 rounded-lg">
            <p class="font-medium">Endereço encontrado:</p>
            <p>${cepData.logradouro}, ${cepData.bairro}, ${cepData.localidade}/${cepData.uf}</p>
            <p class="text-sm text-gray-600 mt-1">CEP: ${cepData.cep}</p>
        </div>
    `;
    
    // Busca clínicas próximas ao CEP
    const especialidade = especialidadeSelect ? especialidadeSelect.value : null;
    buscarClinicasProximasCep(cepData, especialidade);
    
    // Mostra o modal
    document.getElementById('cepModal').classList.remove('hidden');
}

// Função para buscar clínicas próximas pelo CEP
function buscarClinicasProximasCep(cepData, especialidade) {
    // Dados simulados de clínicas (em um sistema real, isso viria de uma API)
    const clinicas = [
        { 
            nome: "Clínica Coração Feliz", 
            endereco: `Rua das Flores, 123 - ${cepData.bairro}`,
            especialidades: ["Cardiologia", "Pediatria"],
            avaliacao: 4.9,
            distancia: 0.8
        },
        { 
            nome: "Hospital Vida Plena", 
            endereco: `Rua Oscar Freire, 500 - ${cepData.bairro}`,
            especialidades: ["Pediatria", "Ginecologia", "Neurologia"],
            avaliacao: 4.9,
            distancia: 1.2
        },
        { 
            nome: "Instituto Bem Estar", 
            endereco: `Rua Augusta, 2000 - ${cepData.bairro}`,
            especialidades: ["Psicologia", "Nutrição", "Fisioterapia"],
            avaliacao: 4.7,
            distancia: 1.5
        },
        { 
            nome: "Clínica São Lucas", 
            endereco: `Avenida Paulista, 1500 - ${cepData.bairro}`,
            especialidades: ["Ortopedia", "Dermatologia", "Oftalmologia"],
            avaliacao: 4.6,
            distancia: 1.7
        },
        { 
            nome: "Centro Médico Esperança", 
            endereco: `Rua Consolação, 800 - ${cepData.bairro}`,
            especialidades: ["Cardiologia", "Endocrinologia", "Geriatria"],
            avaliacao: 4.8,
            distancia: 2.3
        }
    ];
    
    // Filtrar por especialidade se fornecida
    let clinicasFiltradas = clinicas;
    if (especialidade && especialidade !== "Especialidade médica") {
        clinicasFiltradas = clinicas.filter(c => 
            c.especialidades.some(e => e.toLowerCase() === especialidade.toLowerCase())
        );
    }
    
    // Salva as clínicas encontradas
    clinicasEncontradas = clinicasFiltradas;
    
    // Atualiza a lista de clínicas próximas
    const clinicasProximasEl = document.getElementById('clinicasProximas');
    
    if (clinicasFiltradas.length === 0) {
        clinicasProximasEl.innerHTML = `
            <div class="bg-yellow-100 p-3 rounded-lg text-yellow-800 mb-4">
                Não encontramos clínicas dessa especialidade próximas ao CEP informado.
            </div>
        `;
        return;
    }
    
    // Ordenar por distância
    clinicasFiltradas.sort((a, b) => a.distancia - b.distancia);
    
    let clinicasHTML = `
        <h4 class="font-bold text-base mb-3">Encontramos ${clinicasFiltradas.length} clínicas próximas:</h4>
        <div class="space-y-3">
    `;
    
    clinicasFiltradas.forEach((clinica, index) => {
        clinicasHTML += `
            <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-all">
                <h5 class="font-bold text-green-600">${clinica.nome}</h5>
                <div class="flex items-center text-sm text-gray-600 mt-1">
                    <i class="fas fa-map-marker-alt mr-1"></i> ${clinica.endereco}
                </div>
                <div class="flex items-center mt-1">
                    <div class="flex items-center text-yellow-400 mr-3">
                        <i class="fas fa-star mr-1"></i>
                        <span class="text-gray-700">${clinica.avaliacao}</span>
                    </div>
                    <div class="text-sm text-gray-600">
                        <i class="fas fa-road mr-1"></i> ${clinica.distancia} km
                    </div>
                </div>
                <div class="flex flex-wrap gap-1 mt-2">
                    ${clinica.especialidades.map(esp => 
                        `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${esp}</span>`
                    ).join('')}
                </div>
                <div class="mt-2">
                    <button class="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded transition-colors" 
                            onclick="agendarClinica(${index})">
                        Agendar consulta
                    </button>
                </div>
            </div>
        `;
    });
    
    clinicasHTML += `</div>`;
    clinicasProximasEl.innerHTML = clinicasHTML;
}

// Função para simular agendamento
function agendarClinica(index) {
    if (index >= 0 && index < clinicasEncontradas.length) {
        const clinica = clinicasEncontradas[index];
        alert(`Agendamento simulado na clínica ${clinica.nome}`);
        // Aqui você pode adicionar um redirecionamento para página de agendamento
        // ou abrir outro modal para seleção de data/hora
    }
}

// Inicializa os eventos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado, inicializando eventos");
    
    // Adiciona o evento ao botão de busca
    const botaoBusca = document.querySelector('.search-box button');
    if (botaoBusca) {
        console.log("Botão de busca encontrado, adicionando evento");
        botaoBusca.addEventListener('click', buscarLocalizacaoPorCep);
    } else {
        console.warn("Botão de busca não encontrado!");
    }
    
    // Adiciona evento para buscar ao pressionar Enter no campo de CEP
    const campoCep = document.querySelector('input[placeholder="Localização ou CEP"]');
    if (campoCep) {
        console.log("Campo de CEP encontrado, adicionando eventos");
        campoCep.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarLocalizacaoPorCep();
            }
        });
        
        // Formata o CEP enquanto digita
        campoCep.addEventListener('input', function() {
            let cep = this.value.replace(/\D/g, '');
            if (cep.length > 5) {
                cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
            }
            if (cep.length > 9) {
                cep = cep.slice(0, 9);
            }
            this.value = cep;
        });
    } else {
        console.warn("Campo de CEP não encontrado!");
    }
    
    // Adiciona a função agendarClinica ao objeto window para ser acessível pelo onclick
    window.agendarClinica = agendarClinica;
});