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
    
    // Funcionalidade do menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animação do ícone de hambúrguer para X
            const bars = document.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars.forEach(bar => {
                    bar.style.transform = 'rotate(0) translate(0)';
                    bar.style.opacity = '1';
                });
            }
        });
    }
    
    // Fechar menu ao clicar em um item (para mobile)
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const bars = document.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'rotate(0) translate(0)';
                    bar.style.opacity = '1';
                });
            }
            
            // Ativar item clicado
            navMenu.querySelectorAll('.active').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    });
    
    // Efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Funcionalidade do modal de consulta
    if (btnMarcarConsultas) {
        btnMarcarConsultas.forEach(botao => {
            botao.addEventListener('click', function() {
                const nomeClinica = this.getAttribute('data-clinica');
                if (nomeClinicaModal) {
                    nomeClinicaModal.textContent = nomeClinica;
                }
                if (modalConsulta) {
                    modalConsulta.style.display = 'block';
                }
            });
        });
    }
    
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