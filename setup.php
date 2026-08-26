<?php

/**
 * Plugin UFCG Login Customizer para GLPI 11
 *
 * Micro-plugin sem banco de dados e sem configuração.
 * Único propósito: injetar JavaScript na tela de login (página anônima)
 * para reorganizar visualmente os métodos de autenticação.
 */

use Glpi\Plugin\Hooks;

define('PLUGIN_UFCGLOGINCUSTOMIZER_VERSION', '1.0.1');
define('PLUGIN_UFCGLOGINCUSTOMIZER_MIN_GLPI', '11.0.0');

function plugin_init_ufcglogincustomizer(): void
{
    global $PLUGIN_HOOKS;

    $PLUGIN_HOOKS[Hooks::CSRF_COMPLIANT]['ufcglogincustomizer'] = true;

    // Injeta JS na tela de login (página anônima) via hook oficial.
    $PLUGIN_HOOKS[Hooks::ADD_JAVASCRIPT_ANONYMOUS_PAGE]['ufcglogincustomizer'] = [
        'public/js/login-customizer.js',
    ];

    // CSS complementar para a tela de login.
    $PLUGIN_HOOKS[Hooks::ADD_CSS_ANONYMOUS_PAGE]['ufcglogincustomizer'] = [
        'public/css/login-customizer.css',
    ];
}

function plugin_version_ufcglogincustomizer(): array
{
    return [
        'name'         => __('UFCG Login Customizer', 'ufcglogincustomizer'),
        'version'      => PLUGIN_UFCGLOGINCUSTOMIZER_VERSION,
        'author'       => 'andrefelipeufcg',
        'license'      => 'GPLv3+',
        'homepage'     => '',
        'requirements' => [
            'glpi' => [
                'min' => PLUGIN_UFCGLOGINCUSTOMIZER_MIN_GLPI,
            ],
            'php' => [
                'min' => '8.2',
            ],
        ],
    ];
}

function plugin_ufcglogincustomizer_check_prerequisites(): bool
{
    if (version_compare(GLPI_VERSION, PLUGIN_UFCGLOGINCUSTOMIZER_MIN_GLPI, '<')) {
        echo 'Este plugin requer GLPI >= ' . PLUGIN_UFCGLOGINCUSTOMIZER_MIN_GLPI;
        return false;
    }
    return true;
}

function plugin_ufcglogincustomizer_check_config(): bool
{
    return true;
}
