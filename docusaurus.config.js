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
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/Shahzain-Ali/agentive-solutions-book/tree/main/',
        },
        blog: false, // Book site — no blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Google Analytics 4 — replace with your real Measurement ID before deploy
        gtag: {
          trackingID: 'G-XXXXXXXXXX',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
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
            href: 'https://github.com/Shahzain-Ali/agentive-solutions-book',
            label: 'GitHub',
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
          {
            title: 'More',
            items: [
              {
                label: 'Book GitHub',
                href: 'https://github.com/Shahzain-Ali/agentive-solutions-book',
              },
              {
                label: 'n8n Course GitHub',
                href: 'https://github.com/Shahzain-Ali/n8n-mastery',
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
