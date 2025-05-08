document.addEventListener('DOMContentLoaded', function() {
    // Elementos do modal
    const authButton = document.getElementById('auth-button');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const btnLogin = document.getElementById('btn-login');
    const btnCadastro = document.getElementById('btn-cadastro');
    const goToRegister = document.getElementById('go-to-register');
    
    // Elementos de conteúdo
    const mainContent = document.getElementById('main-content');
    const loginContent = document.getElementById('login-content');
    
    // Mostrar modal quando clicar em Entrar/Cadastrar
    authButton.addEventListener('click', function(e) {
        e.preventDefault();
        authModal.style.display = 'block';
    });
    
    // Fechar modal
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });
    
    // Botão Entrar no modal
    btnLogin.addEventListener('click', function() {
        authModal.style.display = 'none';
        mainContent.style.display = 'none';
        loginContent.style.display = 'block';
        document.title = "Entrar | Clinic+";
    });
    
    // Botão Cadastrar no modal
    btnCadastro.addEventListener('click', function() {
        authModal.style.display = 'none';
        mainContent.style.display = 'block';
        loginContent.style.display = 'none';
        document.title = "Cadastro | Clinic+";
    });
    
    // Link "Cadastre-se" na página de login
    goToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        mainContent.style.display = 'block';
        loginContent.style.display = 'none';
        document.title = "Cadastro | Clinic+";
    });
    
    // Alternar entre abas (Paciente/Médico)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Validação do formulário de cadastro
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const activeTab = document.querySelector('.tab-content.active').id;
            const userType = activeTab === 'paciente' ? 'Paciente' : 'Médico';
            
            let isValid = true;
            const inputs = formCadastro.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff6b6b';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                alert(`Cadastro de ${userType} realizado com sucesso!\nAgora você pode fazer login.`);
                formCadastro.reset();
                // Mostrar página de login após cadastro
                mainContent.style.display = 'none';
                loginContent.style.display = 'block';
                document.title = "Entrar | Clinic+";
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
    
    // Validação do formulário de login
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            
            if (email && senha) {
                // Simulação de login bem-sucedido
                alert('Login realizado com sucesso!');
                // Redirecionar para a página inicial (substitua pela página desejada)
                window.location.href = "index.html";
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Máscaras para CPF e Telefone
    const cpfInput = document.getElementById('cpf-paciente');
    const telInput = document.getElementById('telefone');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }
    
    if (telInput) {
        telInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        });
    }
    
    // Atualiza o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
}); 

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const authButton = document.getElementById('auth-button');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const btnLogin = document.getElementById('btn-login');
    const btnCadastro = document.getElementById('btn-cadastro');
    
    // Conteúdos
    const mainContent = document.getElementById('main-content');
    const loginTypeContent = document.getElementById('login-type-content');
    const loginPacienteContent = document.getElementById('login-paciente-content');
    const loginMedicoContent = document.getElementById('login-medico-content');
    const cadastroPacienteContent = document.getElementById('cadastro-paciente-content');
    const cadastroMedicoContent = document.getElementById('cadastro-medico-content');
    
    // Mostrar modal quando clicar em Entrar/Cadastrar
    authButton.addEventListener('click', function(e) {
        e.preventDefault();
        authModal.style.display = 'block';
    });
    
    // Fechar modal
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });
    
    // Botão Entrar no modal
    btnLogin.addEventListener('click', function() {
        authModal.style.display = 'none';
        hideAllContents();
        loginTypeContent.style.display = 'block';
        document.title = "Entrar | Clinic+";
    });
    
    // Botão Cadastrar no modal
    btnCadastro.addEventListener('click', function() {
        authModal.style.display = 'none';
        hideAllContents();
        mainContent.style.display = 'block';
        document.title = "Cadastro | Clinic+";
    });
    
    // Seleção de tipo para login
    document.querySelectorAll('.type-option[data-type^="paciente-login"], .type-option[data-type^="medico-login"]').forEach(option => {
        option.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            hideAllContents();
            
            if (type === 'paciente-login') {
                loginPacienteContent.style.display = 'block';
            } else {
                loginMedicoContent.style.display = 'block';
            }
        });
    });
    
    // Seleção de tipo para cadastro
    document.querySelectorAll('.type-option[data-type^="paciente-cadastro"], .type-option[data-type^="medico-cadastro"]').forEach(option => {
        option.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            hideAllContents();
            
            if (type === 'paciente-cadastro') {
                cadastroPacienteContent.style.display = 'block';
            } else {
                cadastroMedicoContent.style.display = 'block';
            }
        });
    });
    
    // Links de navegação entre telas
    document.getElementById('go-to-register-from-login-paciente').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllContents();
        mainContent.style.display = 'block';
    });
    
    document.getElementById('go-to-register-from-login-medico').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllContents();
        mainContent.style.display = 'block';
    });
    
    document.getElementById('go-to-login-from-cadastro-paciente').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllContents();
        loginTypeContent.style.display = 'block';
    });
    
    document.getElementById('go-to-login-from-cadastro-medico').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllContents();
        loginTypeContent.style.display = 'block';
    });
    
    // Função para esconder todos os conteúdos
    function hideAllContents() {
        const contents = [
            mainContent,
            loginTypeContent,
            loginPacienteContent,
            loginMedicoContent,
            cadastroPacienteContent,
            cadastroMedicoContent
        ];
        
        contents.forEach(content => {
            content.style.display = 'none';
        });
    }
    
    // Máscaras para formulários
    function applyMasks() {
        // Máscara para CPF
        const cpfInput = document.getElementById('cpf-paciente');
        if (cpfInput) {
            cpfInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            });
        }
        
        // Máscara para Telefone
        const telInputs = document.querySelectorAll('input[type="tel"]');
        telInputs.forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            });
        });
        
        // Máscara para CRM
        const crmInput = document.getElementById('crm-medico');
        if (crmInput) {
            crmInput.addEventListener('input', function(e) {
                let value = e.target.value.toUpperCase();
                value = value.replace(/[^A-Z0-9\/]/g, '');
                e.target.value = value;
            });
        }
    }
    
    // Validação de formulários
    function setupFormValidations() {
        // Formulário de login do paciente
        const formLoginPaciente = document.getElementById('formLoginPaciente');
        if (formLoginPaciente) {
            formLoginPaciente.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm(this)) {
                    alert('Login de paciente realizado com sucesso!');
                    // Redirecionar para dashboard do paciente
                    window.location.href = "../Perfil/Perfil.html";
                }
            });
        }
        
        // Formulário de login do médico
        const formLoginMedico = document.getElementById('formLoginMedico');
        if (formLoginMedico) {
            formLoginMedico.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm(this)) {
                    alert('Login de médico realizado com sucesso!');
                    // Redirecionar para dashboard do médico
                    window.location.href = "../Perfil/Médico.html";
                }
            });
        }
        
        // Formulário de cadastro do paciente
        const formCadastroPaciente = document.getElementById('formCadastroPaciente');
        if (formCadastroPaciente) {
            formCadastroPaciente.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm(this)) {
                    alert('Cadastro de paciente realizado com sucesso!\nAgora você pode fazer login.');
                    hideAllContents();
                    loginTypeContent.style.display = 'block';
                }
            });
        }
        
        // Formulário de cadastro do médico
        const formCadastroMedico = document.getElementById('formCadastroMedico');
        if (formCadastroMedico) {
            formCadastroMedico.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm(this)) {
                    alert('Cadastro de médico realizado com sucesso!\nAgora você pode fazer login.');
                    hideAllContents();
                    loginTypeContent.style.display = 'block';
                }
            });
        }
    }
    
    // Função genérica para validar formulários
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
        
        return isValid;
    }
    
    // Inicialização
    applyMasks();
    setupFormValidations();
    
    // Atualiza o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
document.addEventListener('DOMContentLoaded', function() {
    // Elementos para menu responsivo
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle de menu mobile
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em links de navegação
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Fechar menu ao redimensionar a janela para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
