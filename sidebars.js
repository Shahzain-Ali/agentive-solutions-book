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
      collapsed: true,
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
    {
      type: 'category',
      label: '🔌 n8n Webhooks & MCP',
      collapsed: true,
      items: [
        'n8n-webhooks-and-mcp/lesson-01',
      ],
    },
    {
      type: 'category',
      label: '📸 Instagram Automation',
      collapsed: true,
      items: [
        'instagram-automation/lesson-01',
        'instagram-automation/lesson-02',
      ],
    },
    {
      type: 'category',
      label: '📕 RAG for Automation',
      collapsed: true,
      items: [
        'rag-for-automation/lesson-01',
        'rag-for-automation/lesson-02',
      ],
    },
    {
      type: 'category',
      label: '🎯 Standalone Guides',
      collapsed: true,
      items: [
        'standalone-guides/ai-automation-vs-ai-agents',
      ],
    },
  ],
};

module.exports = sidebars;
