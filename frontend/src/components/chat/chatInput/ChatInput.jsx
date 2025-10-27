import React, { useState } from "react";
import styles from "./ChatInput.module.css";
import plane from "../../../assets/icons/paper-plane.svg"

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className={`${styles.chatInput}`} onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (Shift + Enter for new line)"
        disabled={isLoading}
        rows={1}
        style={{
          resize: 'none',
          minHeight: '40px',
          maxHeight: '120px',
          overflow: 'auto'
        }}
      />
      <button 
        type="submit" 
        disabled={!message.trim() || isLoading}
        className={isLoading ? styles.loading : ''}
      >
        <img src={plane} alt="Send" />
      </button>
    </form>
  );
};

export default ChatInput;

