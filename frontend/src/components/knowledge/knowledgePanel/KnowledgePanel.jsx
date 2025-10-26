import React, { useState } from "react";
import styles from "./KnowledgePanel.module.css";
import plus from "../../../assets/icons/plus.svg";
import search from "../../../assets/icons/search.svg";

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

  return (
    <div className={styles.knowledgePanel}>
      <div className={styles.header}>
        <p className="header">Knowledge Base</p>
        <button className={`${styles.entryButton}`}>
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
    </div>
  );
};

export default KnowledgePanel;
