import React, { useState } from "react";
import styles from "./KnowledgePanel.module.css";
import plus from "../../../assets/icons/plus.svg";
import search from "../../../assets/icons/search.svg";
import AddEntryModal from "../../modal/addEntryModal/AddEntryModal";
import apiService from "../../../services/api";

const TAGS = [
  "All",
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

const KnowledgePanel = ({ onEntryAdded, activeTag, onTagChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddEntry = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitEntry = async (entryData) => {
    setIsSubmitting(true);
    try {
      const response = await apiService.createKnowledgeEntry(entryData);
      console.log('Entry created successfully:', response);
      
      // Notify parent component that a new entry was added
      if (onEntryAdded) {
        onEntryAdded();
      }
      
      // Close modal
      handleCloseModal();
    } catch (error) {
      console.error('Failed to create entry:', error);
      alert('Failed to create entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.knowledgePanel}>
      <div className={styles.header}>
        <p className="header">Knowledge Base</p>
        <button className={`${styles.entryButton}`} onClick={handleAddEntry}>
          <img src={plus} alt="Add Entry Here" />
          <span className="body-text">Add Entry</span>
        </button>
      </div>

      <div className={styles.search}>
        <img src={search} alt="" />
        <input type="text" placeholder="Search Knowledge base..." />
      </div>

      <div className={styles.tagPanel}>
        {TAGS.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagButton} ${
              activeTag === tag ? styles.active : ""
            }`}
            onClick={() => onTagChange && onTagChange(tag)}
          >
            <span className={`${styles.tagName} note-text`}>{tag}</span>
          </button>
        ))}
      </div>
      
      <AddEntryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEntry}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default KnowledgePanel;
