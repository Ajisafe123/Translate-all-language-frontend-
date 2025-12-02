// API Service for frontend
const API_BASE_URL = "http://localhost:5000/api";

class APIService {
  constructor() {
    this.token = localStorage.getItem("authToken");
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }

  getToken() {
    return this.token || localStorage.getItem("authToken");
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("authToken");
  }

  getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      "Content-Type": "application/json",
    };
  }

  // AUTH ENDPOINTS

  async register(email, username, password, fullName) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, fullName }),
    });
    const data = await response.json();
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders(),
    });
    return await response.json();
  }

  async updateProfile(fullName, username) {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ fullName, username }),
    });
    return await response.json();
  }

  // TRANSLATION ENDPOINTS

  async translate(text, sourceLang, targetLang) {
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ text, sourceLang, targetLang }),
    });
    return await response.json();
  }

  async getTranslationHistory(limit = 50) {
    const response = await fetch(
      `${API_BASE_URL}/translations/history?limit=${limit}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
    return await response.json();
  }

  async clearTranslationHistory() {
    const response = await fetch(`${API_BASE_URL}/translations/history`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });
    return await response.json();
  }

  // SPEECH TO TEXT

  async speechToText(audioBlob, language = "en") {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("language", language);

    const response = await fetch(`${API_BASE_URL}/speech-to-text`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.getToken()}` },
      body: formData,
    });
    return await response.json();
  }

  // SETTINGS ENDPOINTS

  async getSettings() {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      headers: this.getAuthHeaders(),
    });
    return await response.json();
  }

  async updateSettings(settings) {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    return await response.json();
  }

  // MISC ENDPOINTS

  async getLanguages() {
    const response = await fetch(`${API_BASE_URL}/languages`);
    return await response.json();
  }

  async getHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  }

  logout() {
    this.clearToken();
    localStorage.removeItem("currentUser");
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

// Export as default
export default new APIService();
