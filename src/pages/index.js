import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import React from 'react';
import styles from './index.module.css';

const books = [
  {
    icon: '⚙️',
    title: 'n8n Mastery',
    subtitle: 'Zero to AI Automation Expert',
    description:
      '42 lessons across 6 modules — from your first workflow to AI agents, RAG, MCP, and running automation as a business.',
    status: 'available',
    link: '/docs/n8n-mastery/lesson-01',
    meta: '6 modules · 42 lessons',
  },
  {
    icon: '🤖',
    title: 'Google ADK',
    subtitle: 'Agent Development Kit',
    description:
      'Build production AI agents with Google’s Agent Development Kit — multi-agent systems, tools, and deployment.',
    status: 'coming-soon',
    link: null,
    meta: 'Coming soon',
  },
  {
    icon: '🧠',
    title: 'OpenAI Agents SDK',
    subtitle: 'Custom AI Agents from Scratch',
    description:
      'Design custom AI agents with the OpenAI Agents SDK and MCP servers — real agents, not ChatGPT wrappers.',
    status: 'coming-soon',
    link: null,
    meta: 'Coming soon',
  },
];

const steps = [
  {
    icon: '📖',
    title: 'Learn',
    text: 'Every lesson is a full book chapter — video, notes, quiz, and assignment in one place.',
  },
  {
    icon: '🛠️',
    title: 'Build',
    text: 'Hands-on workflows and real business automations you build alongside each lesson.',
  },
  {
    icon: '💼',
    title: 'Earn',
    text: 'Turn automation skills into freelance income, a job, or your own AI automation business.',
  },
];

function BookCard({ book }) {
  const inner = (
    <>
      <div className={styles.bookIcon}>{book.icon}</div>
      <div className={styles.bookMeta}>{book.meta}</div>
      <h3>{book.title}</h3>
      <p className={styles.bookSubtitle}>{book.subtitle}</p>
      <p className={styles.bookDescription}>{book.description}</p>
      <span
        className={
          book.status === 'available' ? styles.readBadge : styles.soonBadge
        }
      >
        {book.status === 'available' ? 'Start Reading →' : 'Coming Soon'}
      </span>
    </>
  );

  if (book.link) {
    return (
      <Link to={book.link} className={`${styles.bookCard} ${styles.bookCardActive}`}>
        {inner}
      </Link>
    );
  }
  return <div className={styles.bookCard}>{inner}</div>;
}

export default function Home() {
  return (
    <Layout
      title="Interactive Books for AI Automation"
      description="Agentive Solutions — interactive books for AI automation, starting with n8n Mastery. Learn, build, and earn with hands-on automation courses.">
      <main>
        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroBadge}>📚 Interactive Book Platform</div>
          <h1 className={styles.heroTitle}>AGENTIVE SOLUTIONS</h1>
          <p className={styles.heroTagline}>
            Interactive books for AI automation — learn by reading, watching,
            and building.
          </p>
          <p className={styles.heroSub}>
            Structured, bilingual course books with video lessons, hands-on
            assignments, and quizzes. Starting with <b>n8n Mastery</b> — zero
            to AI automation expert.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/docs/n8n-mastery/lesson-01" className={styles.primaryBtn}>
              START READING
            </Link>
            <Link to="/docs/" className={styles.secondaryBtn}>
              Browse Library
            </Link>
          </div>
        </header>

        {/* Books */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Library</h2>
          <p className={styles.sectionSub}>
            One platform, many books — each course is a complete, living book.
          </p>
          <div className={styles.bookGrid}>
            {books.map((book) => (
              <BookCard key={book.title} book={book} />
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2 className={styles.sectionTitle}>Learn → Build → Earn</h2>
          <div className={styles.stepGrid}>
            {steps.map((step) => (
              <div key={step.title} className={styles.stepCard}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <h2>Start your automation journey today</h2>
          <p>Lesson 1 is live — no prerequisites, no cost.</p>
          <Link to="/docs/n8n-mastery/lesson-01" className={styles.primaryBtn}>
            Open n8n Mastery →
          </Link>
        </section>
      </main>
    </Layout>
  );
}
