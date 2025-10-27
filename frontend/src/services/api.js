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
  async getKnowledgeEntries(tag = null, search = null) {
    const params = new URLSearchParams();
    if (tag) params.append('tag', tag);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/knowledge?${queryString}` : '/knowledge';
    const response = await this.request(endpoint);
    
    // Return the full response object with entries, count, maxEntries, canAddMore
    return response;
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

  // Chat API methods
  async sendMessage(message, history = []) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  }

  async deleteMessages() {
    return this.request('/messages', {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
