import React from "react";
import styles from "./KnowledgeBase.module.css";
import { KnowledgeHeader, KnowledgePanel, KnowledgeList } from "."; // ✅ Corrected

const KnowledgeBase = () => {
  return (
    <div className={styles.knowledgeBase}>
      <KnowledgeHeader />
      <KnowledgePanel />
      <KnowledgeList />
    </div>
  );
};

export default KnowledgeBase;
