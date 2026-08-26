# UFCG Login Customizer

Este é um micro-plugin para GLPI (versão 11.0.0 ou superior) com o objetivo exclusivo de customizar visualmente e reorganizar a tela de login (página anônima).

O plugin não possui interface de configuração administrativa nem cria tabelas no banco de dados. Ele age injetando regras de estilo (CSS) e scripts (JavaScript) nativamente no painel de login.

## Funcionalidades Principais

- **Seletor de Autenticação Unificado:** Oculta os painéis padrão e o formulário de login do GLPI, apresentando em seu lugar botões de acesso rápido:
  - **Entrar com e-mail e senha:** Revela o formulário de login tradicional do GLPI mediante um clique.
  - **Entrar com o Google:** Redireciona para o login via Google (exige o plugin `googlesso` ativo).
  - **Entrar com gov.br:** Redireciona para o login do Governo Federal (exige o plugin `govbrsso` ativo).
- **Detecção Inteligente:** O plugin varre o DOM no momento do carregamento e **apenas exibe** os botões do Google e gov.br se os respectivos plugins estiverem instalados, ativados e configurados para aparecer.
- **Painel de Primeiro Acesso:** Oferece um botão estilizado ("Primeiro acesso? Clique aqui") que, ao ser clicado, carrega e revela de maneira amigável as instruções de cadastro personalizadas, sobrepondo os blocos de texto nativos do painel de administração.
- **Substituição de Logo Otimizada:** Substitui a logo original do GLPI na tela de login por uma logo customizada, utilizando a propriedade CSS `content` (compatível com a nova arquitetura do GLPI 11 e Tabler).
- **Design Blindado:** Utiliza classes e prefixos (`.ufcg-`) para garantir que o leiaute dos botões de login permaneça consistente e que não sofra interferência das personalizações globais de CSS inseridas nas Configurações da Entidade.

## Como Alterar a Logo

A logo exibida na tela de login está localizada no seguinte diretório:
`public/img/logo.svg`

Para utilizar a logo da sua instituição:
1. Acesse a pasta `public/img/` dentro do diretório do plugin.
2. Substitua o arquivo `logo.svg` pela sua imagem vetorial (`.svg`). 
3. *Atenção:* Se você quiser usar um formato diferente (como `.png`), lembre-se de atualizar o caminho na regra `.glpi-logo` dentro de `public/css/login-customizer.css`.

## Como Alterar o Texto de "Primeiro Acesso"

As instruções de primeiro acesso (e o link de direcionamento para novos cadastros) estão em um arquivo estático HTML independente da configuração geral do GLPI.
Para editá-lo:
1. Abra o arquivo `public/html/primeiroacesso.html`.
2. Altere os textos ou a URL do link `"Novo Cadastro"` conforme as regras de negócio da sua organização.

## Instalação

1. Clone ou extraia este repositório para o diretório `plugins/ufcglogincustomizer` da sua instalação do GLPI.
2. Acesse o GLPI com perfil *Super-Admin*.
3. Vá em **Configurar > Plugins**.
4. Localize o **UFCG Login Customizer** na lista, clique em **Instalar** e, em seguida, em **Ativar**.
5. *Dica:* Por se tratar de manipulação pesada de recursos visuais estáticos (CSS/JS), após ativá-lo, force a atualização do cache do seu navegador na tela de login (usando `Ctrl + F5`) para ver as mudanças refletidas.

## Requisitos

- GLPI >= 11.0.0
- PHP >= 8.2

---
**Desenvolvido por [andrefelipeufcg](https://github.com/andrefelipeufcg)**