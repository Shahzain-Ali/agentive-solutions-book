// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  booksSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '📚 Library',
    },
    {
      type: 'category',
      label: '⚙️ n8n Mastery',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Module 1 — Foundations',
          collapsed: false,
          items: [
            'n8n-mastery/lesson-01',
            'n8n-mastery/lesson-02',
            'n8n-mastery/lesson-03',
          ],
        },
        'n8n-mastery/coming-soon',
      ],
    },
  ],
};

module.exports = sidebars;
