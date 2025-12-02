<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <!-- Navbar -->
    <nav class="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M9 19h.01"></path>
              </svg>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TranslateApp
            </h1>
          </div>

          <!-- User Welcome -->
          <div class="hidden sm:flex items-center">
            <span class="text-slate-600 dark:text-slate-300 text-sm font-medium">
              Welcome, <span class="text-blue-600 dark:text-blue-400">{{ currentUser.username }}</span>
            </span>
          </div>

          <!-- Right Controls -->
          <div class="flex items-center space-x-3">
            <!-- History Button -->
            <button
              @click="$router.push('/history')"
              class="hidden sm:flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>History</span>
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
                class="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-slate-200 dark:border-slate-600 py-2 z-50"
                @click="menuOpen = false"
              >
                <router-link
                  to="/history"
                  class="block sm:hidden px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center space-x-3 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Translation History</span>
                </router-link>

                <div class="border-t border-slate-200 dark:border-slate-600 my-1"></div>

                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-600 flex items-center space-x-3 transition-colors"
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
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Translation Dashboard
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-300">
          Translate your text between different languages in real-time
        </p>
      </div>

      <!-- Translation Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Source Section -->
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center space-x-3 mb-6">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
              Source Text
            </h3>
          </div>

          <!-- Source Language Selector -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
              From Language
            </label>
            <select
              v-model="sourceLanguage"
              class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white bg-white text-slate-900 font-medium transition-all"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <!-- Source Text Input -->
          <div>
            <textarea
              v-model="sourceText"
              placeholder="Enter text to translate..."
              class="w-full h-64 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white resize-none font-medium text-slate-900 placeholder-slate-400"
            ></textarea>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {{ sourceText.length }} characters
            </p>
          </div>
        </div>

        <!-- Target Section -->
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center space-x-3 mb-6">
            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3L9 20H5v-4l11-11z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
              Translated Text
            </h3>
          </div>

          <!-- Target Language Selector -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
              To Language
            </label>
            <select
              v-model="targetLanguage"
              class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white bg-white text-slate-900 font-medium transition-all"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <!-- Target Text Output -->
          <div>
            <div class="w-full h-64 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 overflow-y-auto">
              <p class="text-slate-900 dark:text-white whitespace-pre-wrap font-medium leading-relaxed">
                {{ translatedText || 'Translation will appear here...' }}
              </p>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {{ translatedText.length }} characters
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <button
          @click="handleTranslate"
          :disabled="!sourceText.trim()"
          class="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4h16v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H7z"></path>
          </svg>
          <span>Translate</span>
        </button>

        <button
          @click="handleCopy"
          :disabled="!translatedText"
          class="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <span>{{ copyMessage || 'Copy' }}</span>
        </button>

        <button
          @click="handleClear"
          class="px-8 py-4 bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          <span>Clear</span>
        </button>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center border border-slate-200 dark:border-slate-700">
          <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Translations</p>
          <p class="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{{ history.length }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center border border-slate-200 dark:border-slate-700">
          <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Characters</p>
          <p class="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{{ totalChars }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center border border-slate-200 dark:border-slate-700">
          <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Source Lang</p>
          <p class="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">{{ sourceLanguage.toUpperCase() }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center border border-slate-200 dark:border-slate-700">
          <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Target Lang</p>
          <p class="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-2">{{ targetLanguage.toUpperCase() }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref({})
const sourceText = ref('')
const translatedText = ref('')
const sourceLanguage = ref('en')
const targetLanguage = ref('es')
const history = ref([])
const copyMessage = ref('')
const isDarkMode = ref(false)
const menuOpen = ref(false)

onMounted(() => {
  const user = localStorage.getItem('currentUser')
  if (!user) {
    router.push('/login')
    return
  }
  currentUser.value = JSON.parse(user)
  
  // Load history
  const savedHistory = localStorage.getItem('translationHistory')
  if (savedHistory) {
    history.value = JSON.parse(savedHistory)
  }

  // Check dark mode
  const darkMode = localStorage.getItem('darkMode')
  if (darkMode) {
    isDarkMode.value = JSON.parse(darkMode)
    updateDarkMode()
  }

  // Load translation data from history if navigating from history page
  const translationData = localStorage.getItem('translationData')
  if (translationData) {
    const data = JSON.parse(translationData)
    sourceText.value = data.sourceText
    translatedText.value = data.translatedText
    sourceLanguage.value = data.sourceLanguage
    targetLanguage.value = data.targetLanguage
    localStorage.removeItem('translationData')
  }
})

const translateText = (text) => {
  // Simple fake translation: reverse the text and add metadata
  return text.split('').reverse().join('') + ` [translated: ${sourceLanguage.value}→${targetLanguage.value}]`
}

const handleTranslate = () => {
  if (!sourceText.value.trim()) return

  translatedText.value = translateText(sourceText.value)

  // Add to history
  const item = {
    sourceText: sourceText.value,
    translatedText: translatedText.value,
    sourceLanguage: sourceLanguage.value,
    targetLanguage: targetLanguage.value,
    timestamp: new Date().toISOString()
  }
  history.value.unshift(item)
  if (history.value.length > 50) history.value.pop()
  localStorage.setItem('translationHistory', JSON.stringify(history.value))
}

const handleCopy = () => {
  if (!translatedText.value) return
  navigator.clipboard.writeText(translatedText.value)
  copyMessage.value = 'Copied!'
  setTimeout(() => {
    copyMessage.value = ''
  }, 2000)
}

const handleClear = () => {
  sourceText.value = ''
  translatedText.value = ''
}

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  localStorage.removeItem('translationHistory')
  localStorage.removeItem('darkMode')
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

const totalChars = computed(() => {
  return sourceText.value.length + translatedText.value.length
})
</script>
