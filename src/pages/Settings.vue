<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Navbar -->
    <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <!-- Sidebar -->
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-5xl md:text-4xl font-bold mb-4">
          <span
            class="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Settings
          </span>
        </h2>
        <p class="text-white/60 text-lg">
          Customize your translation experience
        </p>
      </div>

      <!-- General Settings -->
      <div class="space-y-6">
        <!-- Language Preferences -->
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <h3
            class="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          >
            <svg
              class="w-6 h-6 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M9 19h.01"
              ></path>
            </svg>
            Language Preferences
          </h3>

          <div class="space-y-6">
            <!-- Default Source Language -->
            <div>
              <label class="block text-sm font-semibold text-white/90 mb-3"
                >Default Source Language</label
              >
              <select
                v-model="settings.defaultSourceLang"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
              </select>
            </div>

            <!-- Default Target Language -->
            <div>
              <label class="block text-sm font-semibold text-white/90 mb-3"
                >Default Target Language</label
              >
              <select
                v-model="settings.defaultTargetLang"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Display Settings -->
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <h3
            class="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          >
            <svg
              class="w-6 h-6 text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z"
              ></path>
            </svg>
            Display Settings
          </h3>

          <div class="space-y-4">
            <!-- Use System Theme -->
            <div
              class="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div>
                <p class="text-white font-semibold">Use System Theme</p>
                <p class="text-white/60 text-sm">
                  Follow your device's theme preference
                </p>
              </div>
              <label class="relative flex items-center cursor-pointer">
                <input
                  v-model="settings.useSystemTheme"
                  type="checkbox"
                  class="sr-only peer"
                  checked
                  @change="onSystemThemeChange"
                />
                <div
                  class="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"
                ></div>
              </label>
            </div>

            <!-- Manual Theme Selection -->
            <div v-if="!settings.useSystemTheme" class="space-y-3">
              <p class="text-white font-semibold text-sm">Theme</p>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="applyThemeMode('dark')"
                  :class="[
                    'p-3 rounded-lg border transition-all flex items-center justify-center gap-2 font-medium',
                    settings.themeMode === 'dark'
                      ? 'bg-emerald-500/30 border-emerald-500/60 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10',
                  ]"
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
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    ></path>
                  </svg>
                  Dark
                </button>
                <button
                  @click="applyThemeMode('light')"
                  :class="[
                    'p-3 rounded-lg border transition-all flex items-center justify-center gap-2 font-medium',
                    settings.themeMode === 'light'
                      ? 'bg-emerald-500/30 border-emerald-500/60 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10',
                  ]"
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
                      d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707.707m-12.02 12.02l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Light
                </button>
              </div>
            </div>

            <!-- Auto-translate -->
            <div
              class="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div>
                <p class="text-white font-semibold">Auto-translate on Input</p>
                <p class="text-white/60 text-sm">
                  Automatically translate as you type
                </p>
              </div>
              <label class="relative flex items-center cursor-pointer">
                <input
                  v-model="settings.autoTranslate"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"
                ></div>
              </label>
            </div>

            <!-- Sound Notifications -->
            <div
              class="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div>
                <p class="text-white font-semibold">Sound Notifications</p>
                <p class="text-white/60 text-sm">
                  Play sound on translation complete
                </p>
              </div>
              <label class="relative flex items-center cursor-pointer">
                <input
                  v-model="settings.soundNotifications"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Privacy & Security -->
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <h3
            class="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          >
            <svg
              class="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
            Privacy & Security
          </h3>

          <div class="space-y-4">
            <!-- Save History -->
            <div
              class="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div>
                <p class="text-white font-semibold">Save Translation History</p>
                <p class="text-white/60 text-sm">
                  Keep track of your translations
                </p>
              </div>
              <label class="relative flex items-center cursor-pointer">
                <input
                  v-model="settings.saveHistory"
                  type="checkbox"
                  class="sr-only peer"
                  checked
                />
                <div
                  class="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"
                ></div>
              </label>
            </div>

            <!-- Clear History Button -->
            <button
              @click="clearHistory"
              class="w-full px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 rounded-lg text-red-300 font-semibold transition-all flex items-center justify-center gap-2"
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
              Clear All History
            </button>
          </div>
        </div>

        <!-- Data Management -->
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <h3
            class="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          >
            <svg
              class="w-6 h-6 text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Data Management
          </h3>

          <div class="space-y-3">
            <button
              @click="exportData"
              class="w-full px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-lg text-emerald-300 font-semibold transition-all flex items-center justify-center gap-2"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Export Translation Data
            </button>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex gap-4 pt-4">
          <button
            @click="saveSettings"
            class="flex-1 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-lg font-bold shadow-lg transition-all"
          >
            Save All Settings
          </button>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "@/composables/useTheme";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

const router = useRouter();
const { setTheme } = useTheme();
const sidebarOpen = ref(false);
const toastMessage = ref("");

const settings = ref({
  defaultSourceLang: "en",
  defaultTargetLang: "es",
  useSystemTheme: true,
  themeMode: "dark",
  autoTranslate: true,
  soundNotifications: false,
  saveHistory: true,
});

onMounted(() => {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    router.push("/login");
    return;
  }

  const saved = localStorage.getItem("userSettings");
  if (saved) {
    settings.value = { ...settings.value, ...JSON.parse(saved) };
  }
});

const onSystemThemeChange = () => {
  if (settings.value.useSystemTheme) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark);
  }
};

const saveSettings = () => {
  // Save to localStorage
  localStorage.setItem("userSettings", JSON.stringify(settings.value));
  localStorage.setItem(
    "useSystemTheme",
    settings.value.useSystemTheme.toString()
  );

  // Apply theme changes
  if (settings.value.useSystemTheme) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark);
  } else {
    const isDark = settings.value.themeMode === "dark";
    setTheme(isDark);
  }

  toastMessage.value = "Settings saved successfully!";
  setTimeout(() => (toastMessage.value = ""), 3000);
};

const clearHistory = () => {
  if (
    confirm(
      "Are you sure you want to clear all translation history? This cannot be undone."
    )
  ) {
    localStorage.removeItem("translationHistory");
    toastMessage.value = "Translation history cleared!";
    setTimeout(() => (toastMessage.value = ""), 3000);
  }
};

const exportData = () => {
  const history = localStorage.getItem("translationHistory") || "[]";
  const userData = localStorage.getItem("currentUser") || "{}";

  const dataStr = JSON.stringify(
    {
      user: JSON.parse(userData),
      translations: JSON.parse(history),
      exportDate: new Date().toISOString(),
    },
    null,
    2
  );

  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `linguaflow-data-${
    new Date().toISOString().split("T")[0]
  }.json`;
  link.click();
  URL.revokeObjectURL(url);

  toastMessage.value = "Data exported successfully!";
  setTimeout(() => (toastMessage.value = ""), 3000);
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
</style>
