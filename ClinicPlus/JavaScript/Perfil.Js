// Menu Mobile
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Logout
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if(confirm('Tem certeza que deseja sair da sua conta?')) {
        // Aqui você adicionaria a lógica de logout real
        // Por exemplo, limpar tokens, redirecionar, etc.
        alert('Você foi desconectado com sucesso!');
        window.location.href = '../Home/Inicio.html';
    }
});

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    const profileToggles = document.querySelectorAll('.profile-toggle');
    
    let isClickInside = false;
    profileToggles.forEach(toggle => {
        if (toggle.contains(e.target)) {
            isClickInside = true;
        }
    });
    
    if (!isClickInside) {
        dropdowns.forEach(dropdown => {
            if (dropdown.style.maxHeight) {
                dropdown.style.maxHeight = null;
            }
        });
    }
});

// Carregar dados do usuário (simulação)
function loadUserData() {
    // Em uma aplicação real, isso viria de uma API ou sistema de autenticação
    const userData = {
        name: "Maria da Silva Oliveira",
        email: "maria.silva@email.com",
        phone: "(11) 98765-4321",
        birthDate: "15/03/1985",
        address: "Rua das Flores, 123 - São Paulo/SP",
        bloodType: "A+",
        allergies: "Penicilina, Dipirona",
        medications: "Losartana 50mg (1x ao dia)",
        conditions: "Hipertensão Arterial",
        healthPlan: "Amil Saúde - Platinum",
        planNumber: "AMIL123456789",
        avatar: "images/user-avatar.jpg"
    };
    
    // Atualizar elementos na página
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) profileImg.src = userData.avatar;
    
    // Você pode adicionar mais atualizações aqui conforme necessário
}

// Carregar dados quando a página estiver pronta
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    
    // Adicionar evento de clique para os itens do dropdown no mobile
    const dropdownItems = document.querySelectorAll('.dropdown-menu a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.menu-toggle').classList.remove('active');
            }
        });
    });
});

// Simular confirmação de consulta
document.querySelectorAll('.btn-confirm').forEach(btn => {
    btn.addEventListener('click', function() {
        const appointmentCard = this.closest('.appointment-card');
        const appointmentTitle = appointmentCard.querySelector('h3').textContent;
        alert(`Consulta "${appointmentTitle}" confirmada com sucesso!`);
    });
});

// Simular remarcação de consulta
document.querySelectorAll('.btn-reschedule').forEach(btn => {
    btn.addEventListener('click', function() {
        const appointmentCard = this.closest('.appointment-card');
        const appointmentTitle = appointmentCard.querySelector('h3').textContent;
        alert(`Você será redirecionado para remarcar: "${appointmentTitle}"`);
    });
});