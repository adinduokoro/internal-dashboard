import React, { useState } from 'react'
import styles from './KnowledgeEntryModal.module.css'
import apiService from '../../../services/api'

const KnowledgeEntryModal = ({ isOpen, onClose, entry, onEntryDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!isOpen || !entry) return null;

  const handleClose = () => {
    setShowConfirmDelete(false);
    onClose();
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await apiService.deleteKnowledgeEntry(entry.id);
      
      // Call the callback to refresh the list
      if (onEntryDeleted) {
        onEntryDeleted();
      }
      
      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Failed to delete entry:', error);
      alert('Failed to delete entry. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
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
          <button 
            className={styles.deleteButton} 
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Entry'}
          </button>
          <button className={styles.closeModalButton} onClick={handleClose}>
            Close
          </button>
        </div>
        
        {showConfirmDelete && (
          <div className={styles.confirmOverlay}>
            <div className={styles.confirmDialog}>
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this knowledge entry?</p>
              <p className={styles.warningText}>This action cannot be undone.</p>
              <div className={styles.confirmButtons}>
                <button 
                  className={styles.confirmDeleteButton} 
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button 
                  className={styles.cancelButton} 
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default KnowledgeEntryModal