import React from "react";
import styles from "./ChatMessages.module.css";

const ChatMessages = () => {
  // Sample messages for demonstration
  const messages = [
    { id: 1, text: "Hello! How can I help you today?", isUser: false },
    { id: 2, text: "What is the company's vacation policy?", isUser: true },
    {
      id: 3,
      text: "The company offers 15 days of paid vacation per year for employees with less than 5 years of service, and 20 days for those with 5+ years.",
      isUser: false,
    },
    { id: 4, text: "How do I submit an expense report?", isUser: true },
    {
      id: 5,
      text: "You can submit expense reports through the HR portal. Make sure to attach all receipts and provide detailed descriptions.",
      isUser: false,
    },
    { id: 6, text: "What are the remote work guidelines?", isUser: true },
    {
      id: 7,
      text: "Remote work is allowed up to 3 days per week. You need manager approval and must have a suitable home office setup.",
      isUser: false,
    },
    { id: 8, text: "How do I access the VPN?", isUser: true },
    {
      id: 9,
      text: "Download the VPN client from the IT portal and use your company credentials. Contact IT support if you need help.",
      isUser: false,
    },
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
