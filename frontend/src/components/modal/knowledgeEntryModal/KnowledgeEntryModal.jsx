import React from 'react'
import styles from './KnowledgeEntryModal.module.css'

const KnowledgeEntryModal = ({ isOpen, onClose, entry }) => {
  if (!isOpen || !entry) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Knowledge Entry</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <span>&times;</span>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.questionSection}>
            <h3 className={styles.question}>{entry.question}</h3>
          </div>
          
          <div className={styles.answerSection}>
            <p className={styles.answer}>{entry.answer}</p>
          </div>
          
          <div className={styles.tagsSection}>
            <div className={styles.tagsContainer}>
              {entry.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.closeModalButton} onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeEntryModal