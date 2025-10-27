import React, { useState, useEffect, useCallback } from "react";
import styles from "./KnowledgeBase.module.css";
import { KnowledgePanel, KnowledgeList } from ".."; 

const KnowledgeBase = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleTagChange = (tag) => {
    setActiveTag(tag);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
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
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <KnowledgeList 
        activeTag={activeTag}
        searchQuery={debouncedSearchQuery}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default KnowledgeBase;
