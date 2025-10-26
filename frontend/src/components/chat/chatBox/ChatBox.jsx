import React from "react";
import styles from "./ChatBox.module.css";
import { ChatHeader, ChatInput, ChatMessages } from "..";

const ChatBox = () => {
  return (
    <div className={`${styles.chatbox}`}>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatBox;
