const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Knowledge Base API methods
  async getKnowledgeEntries(tag = null) {
    const endpoint = tag ? `/knowledge?tag=${encodeURIComponent(tag)}` : '/knowledge';
    return this.request(endpoint);
  }

  async createKnowledgeEntry(entryData) {
    return this.request('/knowledge', {
      method: 'POST',
      body: JSON.stringify(entryData),
    });
  }

  async deleteKnowledgeEntry(id) {
    return this.request(`/knowledge/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
