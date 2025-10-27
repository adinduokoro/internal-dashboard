import React, { useState } from 'react'
import styles from './AddEntryModal.module.css'

const TAGS = [
  "Benefits",
  "Finance", 
  "HR",
  "IT",
  "Onboarding",
  "Policy",
  "Processes",
  "Remote",
  "Security",
];

const AddEntryModal = ({ isOpen, onClose, onSubmit, isSubmitting = false }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onSubmit({
        question: question.trim(),
        answer: answer.trim(),
        tags: selectedTags
      });
      // Reset form
      setQuestion('');
      setAnswer('');
      setSelectedTags([]);
      onClose();
    }
  };

  const handleClose = () => {
    setQuestion('');
    setAnswer('');
    setSelectedTags([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Knowledge Entry</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <span>&times;</span>
          </button>
        </div>
        
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="question" className={styles.label}>Question</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="answer" className={styles.label}>Answer</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer..."
              className={styles.textarea}
              rows={6}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tags</label>
            <div className={styles.tagContainer}>
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.tagButton} ${
                    selectedTags.includes(tag) ? styles.tagSelected : ''
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={handleClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEntryModal