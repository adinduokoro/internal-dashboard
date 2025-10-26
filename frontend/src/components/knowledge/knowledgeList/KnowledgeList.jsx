import React from 'react'
import styles from "./KnowledgeList.module.css"

const ENTRIES = [
  {
    id: 1,
    question: "What is the company's vacation policy?",
    tags: ["HR", "Policy", "Benefits"],
  },
  {
    id: 2,
    question: "How do I submit an expense report?",
    tags: ["Finance", "Processes"],
  },
  {
    id: 3,
    question: "What are the remote work guidelines?",
    tags: ["HR", "Policy", "Remote"],
  },
  {
    id: 4,
    question: "How do I access the VPN?",
    tags: ["IT", "Security", "Onboarding"],
  },
];

const KnowledgeList = () => {
  return (
    <div className={styles.knowledgeList}>
      {ENTRIES.map((item) => (
        <div key={item.id} className={styles.card}>
          <p className={`${styles.question} body-text`}>{item.question}</p>
          <div className={styles.tags}>
            {item.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                <span className={`${styles.tagName} note-text`}>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default KnowledgeList
