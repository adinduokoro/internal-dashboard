import React from "react";
import styles from "./ChatInput.module.css";
import plane from "../../../assets/icons/paper-plane.svg"

const ChatInput = () => {
  return (
    <div className={`${styles.chatInput}`}>
      <textarea
        type="text"
        placeholder="Type your message... (Shift + Enter for new line)"
      />
      <button>
        <img src={plane} alt="" />
      </button>
    </div>
  );
};

export default ChatInput;

