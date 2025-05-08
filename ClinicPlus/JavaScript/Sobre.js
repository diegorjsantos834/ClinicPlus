document.addEventListener('DOMContentLoaded', function() {
    // Selecionar elementos necessários
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        // Alternar menu mobile
        menuToggle.addEventListener('click', function() {
            // Toggle da classe active no menu
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
    
    // Fechar menu ao clicar em um item do menu (para mobile)
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Resetar a animação do ícone quando fechar o menu
                const bars = document.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'rotate(0) translate(0)';
                    bar.style.opacity = '1';
                });
            }
            
            // Ativar item clicado
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            if (this.parentElement) {
                this.parentElement.classList.add('active');
            }
        });
    });
    
    // Efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });
});