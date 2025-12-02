<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <!-- Navbar -->
    <nav class="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2 cursor-pointer" @click="$router.push('/translate')">
            <div class="bg-linear-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M9 19h.01"></path>
              </svg>
            </div>
            <h1 class="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TranslateApp
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Back to Translate Button -->
            <button
              @click="$router.push('/translate')"
              class="px-4 py-2 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-600 font-semibold rounded-lg transition-colors"
            >
              ← Back to Translate
            </button>

            <!-- Dark Mode Toggle -->
            <button
              @click="toggleDarkMode"
              class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-yellow-400 transition-colors"
              :title="isDarkMode ? 'Light mode' : 'Dark mode'"
            >
              <svg v-if="!isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zm5.414 5.172l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 111.414-1.414zM5 8a1 1 0 100-2H4a1 1 0 000 2h1z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <!-- Menu Dropdown -->
            <div class="relative">
              <button
                @click="menuOpen = !menuOpen"
                class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div
                v-if="menuOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-slate-200 dark:border-slate-600 py-2 z-50"
                @click="menuOpen = false"
              >
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-600 flex items-center space-x-2 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-12">
        <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Translation History
        </h2>
        <p class="text-slate-600 dark:text-slate-300">
          View all your past translations
        </p>
      </div>

      <!-- History Content -->
      <div v-if="history.length > 0" class="grid gap-6">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Translations</p>
            <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">{{ history.length }}</p>
          </div>
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border-l-4 border-green-500">
            <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Languages Used</p>
            <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">{{ uniqueLanguages }}</p>
          </div>
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border-l-4 border-purple-500">
            <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Characters</p>
            <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">{{ totalCharacters }}</p>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-6">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search translations..."
            class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        <!-- History List -->
        <div class="space-y-4">
          <div
            v-for="(item, index) in filteredHistory"
            :key="index"
            class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  {{ getLanguageName(item.sourceLanguage) }} → {{ getLanguageName(item.targetLanguage) }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  {{ formatDate(item.timestamp) }}
                </p>
              </div>
              <button
                @click="removeFromHistory(index)"
                class="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Source -->
              <div>
                <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Source</label>
                <p class="mt-2 p-3 bg-slate-50 dark:bg-slate-700 rounded text-slate-900 dark:text-white text-sm leading-relaxed break-words">
                  {{ item.sourceText }}
                </p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ item.sourceText.length }} characters</p>
              </div>

              <!-- Target -->
              <div>
                <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Translation</label>
                <p class="mt-2 p-3 bg-slate-50 dark:bg-slate-700 rounded text-slate-900 dark:text-white text-sm leading-relaxed break-words">
                  {{ item.translatedText }}
                </p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ item.translatedText.length }} characters</p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-4 flex space-x-2">
              <button
                @click="copyToClipboard(item.sourceText)"
                class="flex-1 px-3 py-2 text-sm bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-600 rounded font-medium transition-colors"
              >
                Copy Source
              </button>
              <button
                @click="copyToClipboard(item.translatedText)"
                class="flex-1 px-3 py-2 text-sm bg-green-50 dark:bg-slate-700 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-slate-600 rounded font-medium transition-colors"
              >
                Copy Translation
              </button>
              <button
                @click="useTranslation(item)"
                class="flex-1 px-3 py-2 text-sm bg-purple-50 dark:bg-slate-700 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-slate-600 rounded font-medium transition-colors"
              >
                Use Again
              </button>
            </div>
          </div>
        </div>

        <!-- Clear History -->
        <div class="mt-8 text-center">
          <button
            @click="clearHistory"
            class="px-6 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg font-semibold transition-colors"
          >
            Clear All History
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-slate-400 dark:text-slate-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m0 0h6"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-slate-900 dark:text-white mb-2">No translations yet</h3>
        <p class="text-slate-600 dark:text-slate-400 mb-6">Start translating to see your history here</p>
        <button
          @click="$router.push('/translate')"
          class="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          Start Translating
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const history = ref([])
const searchQuery = ref('')
const menuOpen = ref(false)
const isDarkMode = ref(false)

const languageNames = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
  zh: 'Chinese'
}

onMounted(() => {
  const user = localStorage.getItem('currentUser')
  if (!user) {
    router.push('/login')
    return
  }

  const savedHistory = localStorage.getItem('translationHistory')
  if (savedHistory) {
    history.value = JSON.parse(savedHistory).map(item => ({
      ...item,
      timestamp: item.timestamp || new Date().toISOString()
    }))
  }

  const darkMode = localStorage.getItem('darkMode')
  if (darkMode) {
    isDarkMode.value = JSON.parse(darkMode)
    updateDarkMode()
  }
})

const filteredHistory = computed(() => {
  if (!searchQuery.value) return history.value
  const query = searchQuery.value.toLowerCase()
  return history.value.filter(item =>
    item.sourceText.toLowerCase().includes(query) ||
    item.translatedText.toLowerCase().includes(query)
  )
})

const uniqueLanguages = computed(() => {
  const languages = new Set()
  history.value.forEach(item => {
    languages.add(item.sourceLanguage)
    languages.add(item.targetLanguage)
  })
  return languages.size
})

const totalCharacters = computed(() => {
  return history.value.reduce((total, item) => total + item.sourceText.length, 0)
})

const getLanguageName = (code) => {
  return languageNames[code] || code
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const removeFromHistory = (index) => {
  history.value.splice(index, 1)
  localStorage.setItem('translationHistory', JSON.stringify(history.value))
}

const clearHistory = () => {
  if (confirm('Are you sure you want to clear all history?')) {
    history.value = []
    localStorage.removeItem('translationHistory')
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
}

const useTranslation = (item) => {
  localStorage.setItem('translationData', JSON.stringify(item))
  router.push('/translate')
}

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/login')
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
  updateDarkMode()
}

const updateDarkMode = () => {
  const html = document.documentElement
  if (isDarkMode.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}
</script>
