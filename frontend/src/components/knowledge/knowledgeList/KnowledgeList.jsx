import React, { useState } from 'react'
import styles from "./KnowledgeList.module.css"
import KnowledgeEntryModal from "../../modal/knowledgeEntryModal/KnowledgeEntryModal"

const ENTRIES = [
  {
    id: 1,
    question: "What is the company's vacation policy?",
    answer: "Employees are entitled to 20 days of paid vacation per year, which can be taken in increments of half days or full days. Vacation requests should be submitted at least 2 weeks in advance through the HR portal. Unused vacation days can be carried over to the next year up to a maximum of 5 days.",
    tags: ["HR", "Policy", "Benefits"],
  },
  {
    id: 2,
    question: "How do I submit an expense report?",
    answer: "Use the Finance Portal to submit expense reports. Upload receipts, categorize expenses, and submit for approval. Reimbursements are processed within 5 business days.",
    tags: ["Finance", "Processes"],
  },
  {
    id: 3,
    question: "What are the remote work guidelines?",
    answer: "Remote work is allowed up to 3 days per week with manager approval. Employees must maintain regular communication, attend all scheduled meetings, and ensure a professional workspace. All company policies apply regardless of work location.",
    tags: ["HR", "Policy", "Remote"],
  },
  {
    id: 4,
    question: "How do I access the VPN?",
    answer: "Download the company VPN client from the IT portal. Use your employee credentials to authenticate. Contact IT support if you experience connection issues or need assistance with setup.",
    tags: ["IT", "Security", "Onboarding"],
  },
];

const KnowledgeList = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  return (
    <div className={styles.knowledgeList}>
      {ENTRIES.map((item) => (
        <div 
          key={item.id} 
          className={styles.card}
          onClick={() => handleCardClick(item)}
        >
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
      
      <KnowledgeEntryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        entry={selectedEntry}
      />
    </div>
  )
}

export default KnowledgeList
