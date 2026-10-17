// @ts-check
// `@type` JSDoc annotations allow IDEs and type-checking tools to autocomplete
// and validate type information for your code.

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Agentive Solutions',
  tagline: 'Interactive books for AI automation — starting with n8n Mastery',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://shahzain-ali.github.io',
  baseUrl: '/agentive-solutions-book/',

  // GitHub pages deployment config.
  organizationName: 'Shahzain-Ali', // Usually your GitHub org/user name.
  projectName: 'agentive-solutions-book', // Usually your repo name.
  deploymentBranch: 'gh-pages', // The branch to deploy to.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Custom fields for RAG Chatbot configuration
  // (env var overrides for local dev: REACT_APP_API_URL=http://localhost:8000)
  customFields: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://agentive-solutions-book.onrender.com',
  },

  i18n: {
    // English is the default locale, so `docs/` holds the ENGLISH content and
    // `i18n/ur-Latn/.../current/` holds the Roman Urdu translation.
    defaultLocale: 'en',

    locales: ['en', 'ur-Latn'],

    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
      },
      // BCP 47: Urdu written in Latin script. Do NOT use plain 'ur' — that
      // means Arabic-script Urdu, and it flips the whole site to RTL.
      'ur-Latn': {
        label: 'Roman Urdu',
        direction: 'ltr',
        htmlLang: 'ur-Latn',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // No editUrl — the source repository is not linked from the site.
          // It may be made private later; a public "Edit this page" link on
          // every lesson is the widest possible invitation to clone it.
        },
        blog: false, // Book site — no blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Google Analytics 4
        gtag: {
          trackingID: 'G-8Z5NYX6WLN',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      docs: {
        sidebar: {
          // Adds the collapse tab on the sidebar's right edge.
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: 'Agentive Solutions',
        logo: {
          alt: 'Agentive Solutions Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'booksSidebar',
            position: 'left',
            label: 'Books',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://www.youtube.com/@SolutionsWithShahzain',
            label: 'YouTube',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Books',
            items: [
              {
                label: 'n8n Mastery',
                to: 'docs/n8n-mastery/lesson-01',
              },
              {
                label: 'Library',
                to: 'docs/',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@SolutionsWithShahzain',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/shahzain-ali1',
              },
              {
                label: 'Instagram',
                href: 'https://instagram.com/shahzainalibangash1',
              },
              {
                label: 'Facebook',
                href: 'https://facebook.com/shahzainalibangash1',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Agentive Solutions. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
