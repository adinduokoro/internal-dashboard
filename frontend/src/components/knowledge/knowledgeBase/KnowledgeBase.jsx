import React, { useState } from "react";
import styles from "./KnowledgeBase.module.css";
import { KnowledgePanel, KnowledgeList } from ".."; 

const KnowledgeBase = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTagChange = (tag) => {
    setActiveTag(tag);
  };

  const handleEntryAdded = () => {
    // Trigger a refresh of the knowledge list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className={styles.knowledgeBase}>
      <KnowledgePanel 
        activeTag={activeTag}
        onTagChange={handleTagChange}
        onEntryAdded={handleEntryAdded}
      />
      <KnowledgeList 
        activeTag={activeTag}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default KnowledgeBase;
