import React from "react";
import styles from "./ChatHeader.module.css";
import trash from "../../../assets/icons/trash.svg"

const ChatHeader = ({ onClearHistory }) => {
  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
    }
  };

  return (
    <div className={`${styles.chatHeader}`}>
      <div className={`${styles.header}`}>
        <p className={`${styles.title} header`}>Chat Assistant</p>
        <p className={`${styles.subHeader} body-text`}>Ask me anything about the knowledge base</p>
      </div>
      <button 
        className={`${styles.clearButton}`}
        onClick={handleClearHistory}
        title="Clear chat history"
      >
        <img src={trash} alt="Clear the message history" />
        <span className="body-text">Clear History</span>
      </button>
    </div>
  );
};

export default ChatHeader;

