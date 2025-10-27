import React, { useState } from "react";
import styles from "./KnowledgePanel.module.css";
import plus from "../../../assets/icons/plus.svg";
import search from "../../../assets/icons/search.svg";
import AddEntryModal from "../../modal/addEntryModal/AddEntryModal";

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

const KnowledgePanel = () => {
  const [activeTag, setActiveTag] = useState("Benefits");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEntry = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitEntry = (entryData) => {
    // Here you would typically send the data to your backend
    console.log('New entry:', entryData);
    // For now, we'll just log it
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
            onClick={() => setActiveTag(tag)}
          >
            <span className={`${styles.tagName} note-text`}>{tag}</span>
          </button>
        ))}
      </div>
      
      <AddEntryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEntry}
      />
    </div>
  );
};

export default KnowledgePanel;
