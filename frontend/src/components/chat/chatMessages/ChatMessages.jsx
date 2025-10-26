import React from "react";
import styles from "./ChatMessages.module.css";

const ChatMessages = () => {
  // Sample messages for demonstration
  const messages = [
    { id: 1, text: "Hello! How can I help you today?", isUser: false },
    { id: 2, text: "What is the company's vacation policy?", isUser: true },
        { id: 1, text: "Hello! How can I help you today?", isUser: false },
    { id: 2, text: "What is the company's vacation policy?", isUser: true },    { id: 1, text: "Hello! How can I help you today?", isUser: false },
    { id: 2, text: "What is the company's vacation policy?", isUser: true },    { id: 1, text: "Hello! How can I help you today?", isUser: false },
    { id: 2, text: "What is the company's vacation policy?", isUser: true },    { id: 1, text: "Hello! How can I help you today?", isUser: false },
    { id: 2, text: "What is the company's vacation policy?", isUser: true },    { id: 1, text: "Hello! How can I help you today?", isUser: false },
    { id: 2, text: "What is the company's vacation policy?", isUser: true },
  
   
  ];

  return (
    <div className={styles.chatMessages}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${
            message.isUser ? styles.userMessage : styles.assistantMessage
          }`}
        >
          <p className="body-text">{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
