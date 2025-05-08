document.addEventListener('DOMContentLoaded', function() {
    const filtroNome = document.getElementById('buscar-clinica');
    const filtroArea = document.getElementById('filtrar-area');
    const filtroAvaliacao = document.getElementById('filtrar-avaliacao');
    const filtroConvenio = document.getElementById('filtrar-convenio');
    const listaClinicas = document.querySelector('.lista-clinicas');
    const clinicas = listaClinicas.querySelectorAll('.clinica');
    const modalConsulta = document.getElementById('modal-consulta');
    const btnFecharModal = document.querySelector('.fechar-modal');
    const btnMarcarConsultas = document.querySelectorAll('.btn-marcar-consulta');
    const nomeClinicaModal = document.getElementById('nome-clinica-modal');
    const formConsulta = document.getElementById('form-consulta');

    // Função para filtrar as clínicas
    function filtrarClinicas() {
        const textoBusca = filtroNome.value.toLowerCase();
        const areaSelecionada = filtroArea.value;
        const avaliacaoMinima = parseInt(filtroAvaliacao.value) || 0;
        const convenioSelecionado = filtroConvenio.value.toLowerCase();

        clinicas.forEach(clinica => {
            const nomeClinica = clinica.dataset.nome.toLowerCase();
            const areaClinica = clinica.dataset.area;
            const avaliacaoClinica = parseInt(clinica.dataset.avaliacao) || 0;
            const conveniosClinica = (clinica.dataset.convenios || '').toLowerCase().split(',');

            const correspondeNome = nomeClinica.includes(textoBusca);
            const correspondeArea = areaSelecionada === '' || areaClinica === areaSelecionada;
            const correspondeAvaliacao = avaliacaoClinica >= avaliacaoMinima;
            const correspondeConvenio = convenioSelecionado === '' || conveniosClinica.includes(convenioSelecionado);

            if (correspondeNome && correspondeArea && correspondeAvaliacao && correspondeConvenio) {
                clinica.style.display = 'block';
            } else {
                clinica.style.display = 'none';
            }
        });
    }

    // Event listeners para os filtros
    filtroNome.addEventListener('input', filtrarClinicas);
    filtroArea.addEventListener('change', filtrarClinicas);
    filtroAvaliacao.addEventListener('change', filtrarClinicas);
    filtroConvenio.addEventListener('change', filtrarClinicas);

    // Abrir modal de marcação de consulta
    btnMarcarConsultas.forEach(botao => {
        botao.addEventListener('click', function() {
            const nomeClinica = this.dataset.clinica;
            nomeClinicaModal.textContent = nomeClinica;
            modalConsulta.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Impede scroll da página
        });
    });

    // Fechar modal
    btnFecharModal.addEventListener('click', function() {
        modalConsulta.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura scroll da página
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target == modalConsulta) {
            modalConsulta.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Enviar formulário de consulta
    formConsulta.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Coletar dados do formulário
        const dadosConsulta = {
            clinica: nomeClinicaModal.textContent,
            nome: document.getElementById('nome').value,
            idade: document.getElementById('idade').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            tipoConsulta: document.getElementById('tipo-consulta').value,
            data: document.getElementById('data').value,
            horario: document.getElementById('horario').value,
            mensagem: document.getElementById('mensagem').value
        };

        // Validação adicional
        if (dadosConsulta.idade < 0 || dadosConsulta.idade > 120) {
            alert('Por favor, insira uma idade válida');
            return;
        }

        // Aqui você pode enviar os dados para o servidor
        console.log('Dados da consulta:', dadosConsulta);
        
        // Feedback para o usuário
        alert(`Solicitação de consulta enviada para ${dadosConsulta.clinica}!\nTipo: ${dadosConsulta.tipoConsulta}\nEntraremos em contato em breve para confirmar.`);
        
        // Fechar modal e resetar formulário
        modalConsulta.style.display = 'none';
        document.body.style.overflow = 'auto';
        formConsulta.reset();
    });

    // Validação do campo de data para não permitir datas passadas
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.min = hoje;
        
        dataInput.addEventListener('input', function() {
            if (this.value < hoje) {
                this.setCustomValidity('Por favor, selecione uma data futura');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Validação do campo de idade
    const idadeInput = document.getElementById('idade');
    if (idadeInput) {
        idadeInput.addEventListener('input', function() {
            if (this.value < 0 || this.value > 120) {
                this.setCustomValidity('Por favor, insira uma idade entre 0 e 120 anos');
            } else {
                this.setCustomValidity('');
            }
        });
    }

// Main navigation menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar-container') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});
    // Update footer year automatically
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}   );
 


