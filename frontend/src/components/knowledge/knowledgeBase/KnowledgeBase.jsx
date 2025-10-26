import React from "react";
import styles from "./KnowledgeBase.module.css";

const KnowledgeBase = () => {
  return (
    <div className={styles.knowledgeBase}>
      <div className={styles.KnowledgeHeader}>KnowledgeHeader</div>
      <div className={styles.KnowledgePanel}>KnowledgePanel</div>
      <div className={styles.KnowledgeList}>KnowledgeList</div>
    </div>
  );
};

export default KnowledgeBase;
