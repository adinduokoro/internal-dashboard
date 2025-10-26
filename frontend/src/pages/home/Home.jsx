import React from 'react'
import styles from "./Home.module.css"
import { ChatBox, KnowledgeBase } from '../../components'

const Home = () => {
  return (
    <div className={styles.home}>
      <KnowledgeBase />
      <ChatBox />
    </div>
  )
}

export default Home
