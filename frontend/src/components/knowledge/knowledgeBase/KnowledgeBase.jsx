import React from "react";
import styles from "./KnowledgeBase.module.css";
import { KnowledgePanel, KnowledgeList } from ".."; 

const KnowledgeBase = () => {
  return (
    <div className={styles.knowledgeBase}>
      <KnowledgePanel />
      <KnowledgeList />
    </div>
  );
};

export default KnowledgeBase;
