<template>
  <div class="min-h-screen bg-black text-white pb-12">
    <!-- Navbar + Sidebar -->
    <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Compact Hero -->
    <div class="text-center pt-10 pb-8 px-5">
      <h1
        class="text-4xl h-15 md:text-6xl font-bold pacifico-regular bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
      >
        LinguaFlow
      </h1>
      <p class="text-white/60 mt-2 text-sm md:text-base">
        Instant • Accurate • Beautiful
      </p>
    </div>

    <!-- Language Selector (Stacked on mobile, inline on larger) -->
    <div class="px-4 mb-5">
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto"
      >
        <select
          v-model="sourceLang"
          class="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 border-emerald-500/60 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/60 text-white text-sm sm:text-base font-medium transition-all appearance-none cursor-pointer"
          style="
            background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22><path d=%22M6 9l6 6 6-6%22/></svg>');
            background-repeat: no-repeat;
            background-position: right 0.5rem center;
            background-size: 1.5em 1.5em;
            padding-right: 2.5rem;
          "
        >
          <option value="auto">Detect Language</option>
          <option v-for="(name, code) in languages" :key="code" :value="code">
            {{ name }}
          </option>
        </select>

        <button
          @click="swapLanguages"
          class="p-2 sm:p-2.5 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 hover:from-emerald-500/50 hover:to-teal-500/50 backdrop-blur-xl border border-emerald-500/40 rounded-xl sm:rounded-2xl transition-all hover:scale-110 flex-shrink-0"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </button>

        <select
          v-model="targetLang"
          class="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 border-emerald-500/60 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/60 text-white text-sm sm:text-base font-medium transition-all appearance-none cursor-pointer"
          style="
            background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22><path d=%22M6 9l6 6 6-6%22/></svg>');
            background-repeat: no-repeat;
            background-position: right 0.5rem center;
            background-size: 1.5em 1.5em;
            padding-right: 2.5rem;
          "
        >
          <option v-for="(name, code) in languages" :key="code" :value="code">
            {{ name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Translation Cards — Responsive Grid -->
    <div class="grid md:grid-cols-2 gap-4 px-4 max-w-5xl mx-auto">
      <!-- Input -->
      <div
        class="relative bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 p-4 md:p-5 shadow-2xl"
      >
        <textarea
          v-model="sourceText"
          @input="autoTranslate"
          placeholder="Enter text..."
          class="w-full bg-transparent resize-none outline-none text-white placeholder-white/50 text-sm md:text-base leading-relaxed"
          rows="7"
          style="min-height: 180px"
        ></textarea>

        <div class="flex justify-between items-center mt-3 text-xs md:text-sm">
          <span class="text-white/50">{{ sourceText.length }} / 5000</span>
          <button
            v-if="sourceText"
            @click="sourceText = ''"
            class="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Output -->
      <div
        class="relative bg-emerald-500/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-emerald-500/30 p-4 md:p-5 shadow-2xl min-h-[220px] md:min-h-[260px] flex flex-col justify-center"
      >
        <div v-if="isTranslating" class="text-center">
          <div class="loader mx-auto mb-3"></div>
          <p class="text-emerald-400 font-medium text-sm md:text-base">
            Translating...
          </p>
        </div>

        <div v-else-if="translatedText" class="space-y-3 md:space-y-4">
          <p
            class="text-emerald-300 text-sm md:text-base leading-relaxed break-normal"
          >
            {{ translatedText }}
          </p>
          <div class="flex justify-center gap-2 sm:gap-3">
            <button
              @click="copyToClipboard(translatedText)"
              class="p-2 sm:p-2.5 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-lg sm:rounded-xl border border-emerald-500/60 transition hover:scale-105"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              @click="speak(translatedText)"
              class="p-2 sm:p-2.5 bg-emerald-500/40 hover:bg-emerald-500/60 rounded-lg sm:rounded-xl border border-emerald-400/80 transition hover:scale-105"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586m4.707-4.707L12 3l1.707 1.707m0 12L12 21l-1.707-1.707"
                />
              </svg>
            </button>
          </div>
        </div>

        <p v-else class="text-white/30 text-center italic text-xs md:text-sm">
          Translation appears here
        </p>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="toastMessage"
        class="fixed top-24 left-1/2 -translate-x-1/2 z-50"
      >
        <div
          class="px-6 py-4 bg-emerald-500/30 backdrop-blur-xl border border-emerald-500/60 rounded-full shadow-2xl flex items-center gap-3 font-medium text-emerald-200"
        >
          Checkmark {{ toastMessage }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

const router = useRouter();
const sidebarOpen = ref(false);

const sourceText = ref("");
const translatedText = ref("");
const sourceLang = ref("auto");
const targetLang = ref("es");
const isTranslating = ref(false);
const toastMessage = ref("");

const languages = {
  auto: "Detect Language",
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
  tr: "Turkish",
  pl: "Polish",
};

onMounted(() => {
  if (!localStorage.getItem("currentUser")) router.push("/login");

  const reuse = localStorage.getItem("reuseTranslation");
  if (reuse) {
    const item = JSON.parse(reuse);
    sourceText.value = item.sourceText;
    sourceLang.value = item.sourceLanguage;
    targetLang.value = item.targetLanguage;
    localStorage.removeItem("reuseTranslation");
    setTimeout(translateNow, 500);
  }
});

const autoTranslate = () => {
  if (sourceText.value.length > 0) {
    clearTimeout(window.atTimer);
    window.atTimer = setTimeout(translateNow, 300);
  } else {
    translatedText.value = "";
    isTranslating.value = false;
  }
};

const translateNow = () => {
  if (!sourceText.value.trim()) return;
  isTranslating.value = true;
  translatedText.value = "";

  setTimeout(() => {
    const mock = {
      es: "¡Hola! Texto traducido al instante.",
      fr: "Bonjour ! Texte traduit instantanément.",
      ja: "こんにちは！すぐに翻訳されました。",
      zh: "你好！即时翻译完成。",
    };
    translatedText.value =
      mock[targetLang.value] ||
      `[${languages[targetLang.value]}] ${sourceText.value}`;
    isTranslating.value = false;
    saveToHistory();
  }, 800);
};

const swapLanguages = () => {
  if (sourceLang.value === "auto") return;
  [sourceLang.value, targetLang.value] = [targetLang.value, sourceLang.value];
  if (translatedText.value) {
    sourceText.value = translatedText.value;
    translatedText.value = "";
  }
};

const saveToHistory = () => {
  const entry = {
    sourceText: sourceText.value,
    translatedText: translatedText.value,
    sourceLanguage: sourceLang.value === "auto" ? "en" : sourceLang.value,
    targetLanguage: targetLang.value,
    timestamp: new Date().toISOString(),
  };
  const history = JSON.parse(
    localStorage.getItem("translationHistory") || "[]"
  );
  history.unshift(entry);
  localStorage.setItem(
    "translationHistory",
    JSON.stringify(history.slice(0, 100))
  );
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toastMessage.value = "Copied!";
  setTimeout(() => (toastMessage.value = ""), 2000);
};

const speak = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = targetLang.value;
  speechSynthesis.speak(utter);
};
</script>

<style scoped>
.pacifico-regular {
  font-family: "Pacifico", cursive;
}

.toast-enter-active {
  animation: toastIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  animation: toastOut 0.4s ease forwards;
}
@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes toastOut {
  to {
    opacity: 0;
    transform: translateY(-40px) scale(0.9);
  }
}

.loader {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
}
.loader::before,
.loader::after {
  content: "";
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 6px solid transparent;
  border-top-color: #10b981;
  border-bottom-color: #34d399;
  animation: prixClipFix 2s linear infinite;
}
.loader::after {
  inset: 10px;
  transform: rotate3d(90, 90, 0, 180deg);
  border-top-color: #6ee7b7;
  border-left-color: #34d399;
  border-right-color: #5eead4;
  animation: prixClipFix 2s linear infinite reverse;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
