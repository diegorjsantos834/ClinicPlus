        // Script para controlar o pop-up de consentimento de cookies
        document.addEventListener('DOMContentLoaded', function() {
            const cookieConsent = document.getElementById('cookieConsent');
            const acceptAllBtn = document.getElementById('acceptAllCookies');
            const acceptSelectedBtn = document.getElementById('acceptSelectedCookies');
            const rejectAllBtn = document.getElementById('rejectAllCookies');
            
            // Garantir que as caixas analíticas e de marketing estejam marcadas por padrão
            document.getElementById('analyticalCookies').checked = true;
            document.getElementById('marketingCookies').checked = true;
            
            // Mostrar o pop-up ao carregar a página
            cookieConsent.classList.add('active');
            
            // Função para aplicar as preferências de cookies
            function applyCookiePreferences(preference) {
                // Aqui você implementa a lógica para ativar/desativar os cookies
                // com base nas preferências do usuário
                console.log(`Aplicando preferências de cookies: ${preference}`);
                
                // Exemplo de como você poderia implementar:
                if (preference.includes('analytical')) {
                    // Ativar cookies analíticos
                    console.log('Cookies analíticos ativados');
                    // Aqui você adicionaria código para inicializar Analytics, etc.
                } else {
                    // Desativar cookies analíticos
                    console.log('Cookies analíticos desativados');
                    // Aqui você adicionaria código para desativar Analytics, etc.
                }
                
                if (preference.includes('marketing')) {
                    // Ativar cookies de marketing
                    console.log('Cookies de marketing ativados');
                    // Aqui você adicionaria código para inicializar ferramentas de marketing, etc.
                } else {
                    // Desativar cookies de marketing
                    console.log('Cookies de marketing desativados');
                    // Aqui você adicionaria código para desativar ferramentas de marketing, etc.
                }
            }
            
            // Função para salvar a preferência e fechar o pop-up
            function savePreference(preference) {
                localStorage.setItem('cookieConsent', preference);
                cookieConsent.classList.remove('active');
                
                // Aplicar as preferências de cookies
                applyCookiePreferences(preference);
            }
            
            // Verificar se já existe uma preferência salva e aplicá-la
            const savedPreference = localStorage.getItem('cookieConsent');
            if (savedPreference) {
                applyCookiePreferences(savedPreference);
            }
            
            // Aceitar todos os cookies
            acceptAllBtn.addEventListener('click', function() {
                document.getElementById('analyticalCookies').checked = true;
                document.getElementById('marketingCookies').checked = true;
                savePreference('essential,analytical,marketing');
            });
            
            // Aceitar apenas os cookies selecionados
            acceptSelectedBtn.addEventListener('click', function() {
                const analytical = document.getElementById('analyticalCookies').checked;
                const marketing = document.getElementById('marketingCookies').checked;
                
                let preference = 'essential';
                if (analytical) preference += ',analytical';
                if (marketing) preference += ',marketing';
                
                savePreference(preference);
            });
            
            // Recusar todos os cookies não essenciais
            rejectAllBtn.addEventListener('click', function() {
                document.getElementById('analyticalCookies').checked = false;
                document.getElementById('marketingCookies').checked = false;
                savePreference('essential');
            });
        });