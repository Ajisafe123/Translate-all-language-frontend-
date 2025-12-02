<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Navbar -->
    <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <!-- Sidebar -->
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main History Interface -->
    <main class="max-w-6xl mx-auto px-6 py-12">
      <div class="text-center mb-12">
        <h2 class="text-5xl md:text-4xl font-bold mb-4">
          <span
            class="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Translation History
          </span>
        </h2>
        <p class="text-white/60 text-lg">Your recent translations</p>
      </div>

      <!-- Empty State -->
      <div
        v-if="history.length === 0"
        class="flex flex-col items-center justify-center py-24"
      >
        <div
          class="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6"
        >
          <svg
            class="w-10 h-10 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p class="text-white/60 text-xl mb-6">No translation history yet</p>
        <button
          @click="$router.push('/translate')"
          class="px-8 py-3 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-xl font-bold shadow-2xl transition-all"
        >
          Start Translating
        </button>
      </div>

      <!-- History List -->
      <div v-else class="space-y-4">
        <!-- Search & Filter -->
        <div class="mb-8">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search history..."
            class="w-full px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-white/40"
          />
        </div>

        <!-- History Items -->
        <div
          v-for="(item, index) in filteredHistory"
          :key="index"
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer group"
          @click="reuseTranslation(item)"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4h16v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H7z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-white/70 text-sm">
                  {{ getLanguageName(item.sourceLanguage) }} →
                  {{ getLanguageName(item.targetLanguage) }}
                </p>
                <p class="text-white/40 text-xs">
                  {{ formatDate(item.timestamp) }}
                </p>
              </div>
            </div>

            <!-- Delete Button -->
            <button
              @click.stop="deleteHistory(index)"
              class="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Source & Target Text -->
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-white/40 text-xs mb-2 uppercase tracking-wide">
                From
              </p>
              <p class="text-white/80 wrap-break-word line-clamp-2">
                {{ item.sourceText }}
              </p>
            </div>
            <div>
              <p class="text-white/40 text-xs mb-2 uppercase tracking-wide">
                To
              </p>
              <p class="text-emerald-300 wrap-break-word line-clamp-2">
                {{ item.translatedText }}
              </p>
            </div>
          </div>

          <!-- Copy Button -->
          <div class="flex gap-3">
            <button
              @click.stop="copyToClipboard(item.translatedText)"
              class="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 text-sm transition-all flex items-center justify-center gap-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              Copy
            </button>
            <button
              @click.stop="reuseTranslation(item)"
              class="flex-1 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-300 text-sm transition-all flex items-center justify-center gap-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Reuse
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toastMessage" class="fixed top-6 right-6 z-50">
        <div
          class="px-6 py-4 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/50 rounded-xl shadow-2xl flex items-center gap-3 font-medium text-emerald-200"
        >
          <span>✓</span>
          {{ toastMessage }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import apiService from "@/services/api";

const router = useRouter();
const sidebarOpen = ref(false);
const history = ref([]);
const searchQuery = ref("");
const toastMessage = ref("");
const isLoading = ref(false);

// Language names mapping
const languageNames = {
  auto: "Auto",
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  ar: "Arabic",
  hi: "Hindi",
  nl: "Dutch",
  sv: "Swedish",
  tr: "Turkish",
  pl: "Polish",
};

// Check authentication and load history
onMounted(async () => {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    router.push("/login");
    return;
  }

  isLoading.value = true;
  try {
    const response = await apiService.getTranslationHistory(100);
    if (response.translations && Array.isArray(response.translations)) {
      history.value = response.translations.map(item => ({
        sourceText: item.sourceText,
        translatedText: item.translatedText,
        sourceLanguage: item.sourceLang,
        targetLanguage: item.targetLang,
        timestamp: item.createdAt
      }));
    }
  } catch (error) {
    console.error("Failed to load history:", error);
    const savedHistory = localStorage.getItem("translationHistory");
    if (savedHistory) {
      history.value = JSON.parse(savedHistory);
    }
  } finally {
    isLoading.value = false;
  }
});

// Computed filtered history
const filteredHistory = computed(() => {
  if (!searchQuery.value) return history.value;

  return history.value.filter(
    (item) =>
      item.sourceText.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.translatedText
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

// Get language name
const getLanguageName = (code) => {
  return languageNames[code] || code;
};

// Format date
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
};

// Copy to clipboard
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toastMessage.value = "Copied!";
  setTimeout(() => (toastMessage.value = ""), 2000);
};

// Reuse translation
const reuseTranslation = (item) => {
  localStorage.setItem(
    "reuseTranslation",
    JSON.stringify({
      sourceText: item.sourceText,
      sourceLanguage: item.sourceLanguage,
      targetLanguage: item.targetLanguage,
    })
  );
  router.push("/translate");
};

// Delete history entry
const deleteHistory = async (index) => {
  history.value.splice(index, 1);
  
  try {
    await apiService.clearTranslationHistory();
  } catch (error) {
    console.error("Failed to clear history on backend:", error);
  }
  
  localStorage.setItem("translationHistory", JSON.stringify(history.value));
  toastMessage.value = "Translation removed";
  setTimeout(() => (toastMessage.value = ""), 2000);
};
</script>

<style scoped>
.toast-enter-active {
  animation: toastIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  animation: toastOut 0.4s ease forwards;
}
@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes toastOut {
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
