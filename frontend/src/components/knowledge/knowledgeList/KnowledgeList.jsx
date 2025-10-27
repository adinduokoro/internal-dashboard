import React, { useState, useEffect } from 'react'
import styles from "./KnowledgeList.module.css"
import KnowledgeEntryModal from "../../modal/knowledgeEntryModal/KnowledgeEntryModal"
import apiService from "../../../services/api"

const KnowledgeList = ({ activeTag, refreshTrigger }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Convert "All" tag to null for API call
      const tagFilter = activeTag === "All" ? null : activeTag;
      const data = await apiService.getKnowledgeEntries(tagFilter);
      
      // Parse tags from comma-separated string to array
      const processedEntries = data.map(entry => ({
        ...entry,
        tags: entry.tags ? entry.tags.split(',').map(tag => tag.trim()) : []
      }));
      
      setEntries(processedEntries);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
      setError('Failed to load knowledge entries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [activeTag, refreshTrigger]);

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  if (loading) {
    return (
      <div className={styles.knowledgeList}>
        <div className={styles.loading}>Loading knowledge entries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.knowledgeList}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.knowledgeList}>
      {entries.length === 0 ? (
        <div className={styles.empty}>
          No knowledge entries found for the selected tag.
        </div>
      ) : (
        entries.map((item) => (
          <div 
            key={item.id} 
            className={styles.card}
            onClick={() => handleCardClick(item)}
          >
            <p className={`${styles.question} body-text`}>{item.question}</p>
            <div className={styles.tags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  <span className={`${styles.tagName} note-text`}>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        ))
      )}
      
      <KnowledgeEntryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        entry={selectedEntry}
      />
    </div>
  )
}

export default KnowledgeList
