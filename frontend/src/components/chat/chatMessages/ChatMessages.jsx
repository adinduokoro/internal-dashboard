import React from "react";
import styles from "./ChatMessages.module.css";

const ChatMessages = ({ messages = [], isLoading = false }) => {
  return (
    <div className={styles.chatMessages}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${
            message.isUser ? styles.userMessage : styles.assistantMessage
          } ${message.isError ? styles.errorMessage : ''}`}
        >
          <p className="body-text">{message.text}</p>
        </div>
      ))}
      {isLoading && (
        <div className={`${styles.message} ${styles.assistantMessage} ${styles.loadingMessage}`}>
          <p className="body-text">Thinking...</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
