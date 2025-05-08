// script.js

// script.js corrigido

document.addEventListener('DOMContentLoaded', function() {
    // Seleção de elementos do DOM
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const modalConsulta = document.getElementById('modal-consulta');
    const btnFecharModal = document.querySelector('.fechar-modal');
    const btnMarcarConsultas = document.querySelectorAll('.btn-marcar-consulta');
    const nomeClinicaModal = document.getElementById('nome-clinica-modal');
    const formConsulta = document.getElementById('form-consulta');
    
    document.addEventListener('DOMContentLoaded', function() {
        // Seleção de elementos do DOM
        const menuToggle = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        // Funcionalidade do menu mobile com toggle de classe no ícone também
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active'); // Adiciona/remove classe active no próprio menu toggle
                
                // Não é mais necessário manipular diretamente o estilo das barras
                // já que estamos usando classes CSS para a animação
            });
        }
        
        // Fechar menu ao clicar em um item (para mobile)
        const navLinks = document.querySelectorAll('.nav-links');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                    }
                }
                
                // Ativar item clicado
                navMenu.querySelectorAll('.active').forEach(item => {
                    item.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            });
        });
        
        // Ajuste da navbar em scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Prevenir que o menu mobile fique aberto ao redimensionar a tela
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            }
        });
        
        // Bloquear rolagem do corpo quando o menu mobile estiver aberto
        function toggleBodyScroll(isLocked) {
            if (isLocked) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        // Observador para aplicar ou remover o bloqueio de rolagem
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isActive = navMenu.classList.contains('active');
                    toggleBodyScroll(isActive && window.innerWidth <= 768);
                }
            });
        });
        
        // Configurar o observador
        if (navMenu) {
            observer.observe(navMenu, { attributes: true });
        }
    });
    
    // Fechar modal ao clicar no X
    if (btnFecharModal && modalConsulta) {
        btnFecharModal.addEventListener('click', function() {
            modalConsulta.style.display = 'none';
        });
    }
    
    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (modalConsulta && event.target == modalConsulta) {
            modalConsulta.style.display = 'none';
        }
    });
    
    // Enviar formulário do modal
    if (formConsulta && modalConsulta) {
        formConsulta.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Solicitação de consulta enviada!');
            modalConsulta.style.display = 'none';
            formConsulta.reset();
        });
    }
    
    // Funcionalidade do botão de agendamento (se existir)
    const appointmentButton = document.querySelector('.appointment-button');
    if (appointmentButton) {
        appointmentButton.addEventListener('click', function() {
            alert('Você será redirecionado para a página de agendamento');
            // window.location.href = '/agendamento.html';
        });
    }
});