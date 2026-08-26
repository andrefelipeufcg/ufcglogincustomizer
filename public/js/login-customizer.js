/**
 * UFCG Login Customizer — JavaScript da tela de login
 *
 * Reorganiza a tela de login do GLPI para apresentar 3 botões de método
 * de acesso, com "primeiro acesso" e formulário de login escondidos atrás
 * de interações do usuário.
 *
 * Depende dos plugins googlesso e govbrsso já estarem ativos
 * (detecta os links de autorização existentes na página).
 */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ---------- Detecta se estamos na tela de login ----------
    var loginForm = document.querySelector('form[action*="login.php"]');
    if (!loginForm) return; // não é a tela de login

    // ---------- Referências do DOM ----------
    var loginCol = loginForm.querySelector('.col-md-5');
    if (loginCol) {
        // Remove classes originais para ignorar qualquer CSS customizado da Entidade
        loginCol.className = 'ufcg-login-column';
        if (loginCol.parentElement) {
            loginCol.parentElement.className = 'ufcg-login-row';
        }
    }
    var textLoginDiv  = loginForm.querySelector('.rich_text_container');
    var cardHeader    = loginCol ? loginCol.querySelector('.card-header') : null;
    var loginNameField = document.getElementById('login_name');

    if (!loginCol || !loginNameField) return; // segurança

    // ---------- Captura URLs dos plugins SSO ----------
    var googleContainer = document.getElementById('googlesso-login-container');
    var govbrContainer  = document.getElementById('govbrsso-login-wrapper');

    var googleUrl = null;
    var govbrUrl  = null;

    if (googleContainer) {
        var googleLink = googleContainer.querySelector('a[href*="googlesso"]');
        if (googleLink) googleUrl = googleLink.getAttribute('href');
    }
    if (govbrContainer) {
        var govbrLink = govbrContainer.querySelector('a[href*="govbrsso"]');
        if (govbrLink) govbrUrl = govbrLink.getAttribute('href');
    }

    // ---------- Esconde elementos originais ----------
    // Esconde o formulário de login inteiro (campos + botão + "esqueceu senha")
    var formElements = loginCol.querySelectorAll('.mb-3, .mb-4, .mb-2, .form-footer');
    formElements.forEach(function (el) {
        el.classList.add('ufcg-login-hidden');
    });

    // Esconde header "Faça login para sua conta"
    if (cardHeader) {
        cardHeader.classList.add('ufcg-login-hidden');
    }

    // Esconde "Esqueceu sua senha?" (está dentro de .form-footer que já escondemos)

    // Esconde os containers dos plugins (vamos recriá-los como botões)
    if (googleContainer) googleContainer.classList.add('ufcg-login-hidden');
    if (govbrContainer)  govbrContainer.classList.add('ufcg-login-hidden');

    // Esconde o painel de texto de primeiro acesso (lado esquerdo)
    if (textLoginDiv) {
        textLoginDiv.classList.add('ufcg-login-hidden');
        textLoginDiv.setAttribute('data-ufcg-first-access', 'true');
    }

    // Esconde o col-auto do hook DISPLAY_LOGIN (painel direito dos plugins)
    var hookCol = loginForm.querySelector('.col-auto.px-2');
    if (hookCol) hookCol.classList.add('ufcg-login-hidden');

    // ---------- Cria a interface de seleção de método ----------
    var selectorDiv = document.createElement('div');
    selectorDiv.id = 'ufcg-method-selector';
    selectorDiv.className = 'ufcg-method-selector';

    // --- Botão "Primeiro acesso? Clique aqui" ---
    if (textLoginDiv) {
        var firstAccessLink = document.createElement('div');
        firstAccessLink.className = 'ufcg-first-access-wrapper';

        var firstAccessBtn = document.createElement('button');
        firstAccessBtn.type = 'button';
        firstAccessBtn.className = 'ufcg-first-access-btn-large';
        firstAccessBtn.innerHTML = '<span class="ufcg-info-icon">ℹ️</span> É seu primeiro acesso? Clique aqui';
        firstAccessBtn.addEventListener('click', function (e) {
            e.preventDefault();
            textLoginDiv.classList.toggle('ufcg-login-hidden');
            // Scroll até o texto se estiver visível
            if (!textLoginDiv.classList.contains('ufcg-login-hidden')) {
                textLoginDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        firstAccessLink.appendChild(firstAccessBtn);
        // Move as instruções de primeiro acesso para ficar logo abaixo do botão
        firstAccessLink.appendChild(textLoginDiv);
        selectorDiv.appendChild(firstAccessLink);
    }

    // Título
    var title = document.createElement('h2');
    title.className = 'ufcg-method-title';
    title.textContent = 'Como você deseja acessar?';
    selectorDiv.appendChild(title);

    // --- Botão Login com email e senha ---
    var loginBtn = createMethodButton(
        'ufcg-btn-login',
        '<span class="ufcg-btn-icon">🔑</span>' +
        '<span>Entrar com e-mail e senha</span>',
        function () {
            // Esconde o seletor de método
            selectorDiv.classList.add('ufcg-login-hidden');
            // Mostra o formulário de login
            if (cardHeader) cardHeader.classList.remove('ufcg-login-hidden');
            formElements.forEach(function (el) {
                el.classList.remove('ufcg-login-hidden');
            });
            // Mostra botão de voltar
            backBtn.classList.remove('ufcg-login-hidden');
            // Foca no campo de usuário
            loginNameField.focus();
        }
    );
    selectorDiv.appendChild(loginBtn);

    // --- Botão Google ---
    if (googleUrl) {
        // Separador OU
        selectorDiv.appendChild(createSeparator());

        var googleBtn = createMethodButton(
            'ufcg-btn-google',
            '<svg class="ufcg-btn-icon" viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>' +
            '<span>Entrar com o Google</span>',
            function () { window.location.href = googleUrl; }
        );
        selectorDiv.appendChild(googleBtn);
    }

    // --- Botão gov.br ---
    if (govbrUrl) {
        // Separador OU
        selectorDiv.appendChild(createSeparator());

        var govbrBtn = createMethodButton(
            'ufcg-btn-govbr',
            '<span>Entrar com </span>' +
            '<span class="ufcg-govbr-brand">' +
                '<span style="color:#1351b4">g</span>' +
                '<span style="color:#fcc400">o</span>' +
                '<span style="color:#00a859">v</span>' +
                '<span style="color:#1351b4">.b</span>' +
                '<span style="color:#fcc400">r</span>' +
            '</span>',
            function () { window.location.href = govbrUrl; }
        );
        selectorDiv.appendChild(govbrBtn);
    }



    // Insere o seletor no início do loginCol
    loginCol.insertBefore(selectorDiv, loginCol.firstChild);

    // ---------- Botão "Voltar" para o seletor de método ----------
    var backBtn = document.createElement('div');
    backBtn.className = 'ufcg-back-btn ufcg-login-hidden';

    var backLink = document.createElement('a');
    backLink.href = '#';
    backLink.innerHTML = '← Voltar';
    backLink.addEventListener('click', function (e) {
        e.preventDefault();
        // Esconde o formulário
        formElements.forEach(function (el) {
            el.classList.add('ufcg-login-hidden');
        });
        if (cardHeader) cardHeader.classList.add('ufcg-login-hidden');
        // Esconde o botão de voltar
        backBtn.classList.add('ufcg-login-hidden');
        // Mostra o seletor de método
        selectorDiv.classList.remove('ufcg-login-hidden');
    });

    backBtn.appendChild(backLink);
    loginCol.insertBefore(backBtn, loginCol.firstChild);

    // ---------- Funções auxiliares ----------

    function createMethodButton(id, innerHTML, onClick) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = id;
        btn.className = 'ufcg-method-btn';
        btn.innerHTML = innerHTML;
        btn.addEventListener('click', onClick);
        return btn;
    }

    function createSeparator() {
        var sep = document.createElement('div');
        sep.className = 'ufcg-separator';
        sep.innerHTML = '<hr class="ufcg-sep-line"><span class="ufcg-sep-text">OU</span><hr class="ufcg-sep-line">';
        return sep;
    }
});
