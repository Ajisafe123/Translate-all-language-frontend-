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
            Profile
          </span>
        </h2>
        <p class="text-white/60 text-lg">Manage your account information</p>
      </div>

      <!-- Profile Card -->
      <div
        class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8"
      >
        <!-- Profile Header -->
        <div
          class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8"
        >
          <!-- Avatar -->
          <div
            class="w-32 h-32 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl flex-shrink-0"
          >
            <svg
              class="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-3xl font-bold text-white mb-2">
              {{ currentUser.username }}
            </h3>
            <p class="text-white/60 text-lg mb-4">{{ currentUser.email }}</p>
            <div class="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                @click="editMode = !editMode"
                class="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-lg text-emerald-300 transition-all"
              >
                {{ editMode ? "Cancel" : "Edit Profile" }}
              </button>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-if="editMode" class="border-t border-white/10 pt-8 space-y-6">
          <h4 class="text-xl font-bold text-white mb-6">
            Edit Profile Information
          </h4>

          <!-- Username Field -->
          <div>
            <label class="block text-sm font-semibold text-white/90 mb-2"
              >Username</label
            >
            <input
              v-model="formData.username"
              type="text"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
          </div>

          <!-- Email Field -->
          <div>
            <label class="block text-sm font-semibold text-white/90 mb-2"
              >Email Address</label
            >
            <input
              v-model="formData.email"
              type="email"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
          </div>

          <!-- Bio Field -->
          <div>
            <label class="block text-sm font-semibold text-white/90 mb-2"
              >Bio</label
            >
            <textarea
              v-model="formData.bio"
              rows="4"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none transition-all"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <!-- Save Button -->
          <div class="flex gap-4 pt-4">
            <button
              @click="saveProfile"
              class="px-8 py-3 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-lg font-bold shadow-lg transition-all"
            >
              Save Changes
            </button>
            <button
              @click="editMode = false"
              class="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-all"
            >
              Discard
            </button>
          </div>
        </div>

        <!-- View Mode -->
        <div v-else class="border-t border-white/10 pt-8 space-y-6">
          <div>
            <p class="text-white/60 text-sm uppercase tracking-wide mb-2">
              Email
            </p>
            <p class="text-lg text-white">{{ currentUser.email }}</p>
          </div>

          <div>
            <p class="text-white/60 text-sm uppercase tracking-wide mb-2">
              Member Since
            </p>
            <p class="text-lg text-white">
              {{ formatDate(currentUser.loginTime) }}
            </p>
          </div>

          <div>
            <p class="text-white/60 text-sm uppercase tracking-wide mb-2">
              Bio
            </p>
            <p class="text-lg text-white">
              {{ currentUser.bio || "No bio added yet" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Account Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          class="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center"
        >
          <p class="text-white/60 text-sm mb-2">Translations</p>
          <p class="text-3xl font-bold text-emerald-400">
            {{ stats.translations }}
          </p>
        </div>
        <div
          class="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center"
        >
          <p class="text-white/60 text-sm mb-2">Characters Translated</p>
          <p class="text-3xl font-bold text-teal-400">{{ stats.characters }}</p>
        </div>
        <div
          class="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center"
        >
          <p class="text-white/60 text-sm mb-2">Favorite Language</p>
          <p class="text-3xl font-bold text-cyan-400">{{ stats.language }}</p>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
        <h4 class="text-xl font-bold text-red-400 mb-4">Danger Zone</h4>
        <p class="text-white/60 mb-6">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          class="px-8 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-red-300 font-bold transition-all"
        >
          Delete Account
        </button>
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
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

const router = useRouter();
const sidebarOpen = ref(false);
const editMode = ref(false);
const toastMessage = ref("");
const currentUser = ref({
  username: "User",
  email: "user@example.com",
  bio: "",
  loginTime: new Date().toISOString(),
});

const formData = ref({
  username: "",
  email: "",
  bio: "",
});

const stats = computed(() => {
  const history = JSON.parse(
    localStorage.getItem("translationHistory") || "[]"
  );
  let totalChars = 0;
  let languages = {};

  history.forEach((item) => {
    totalChars += item.sourceText.length;
    languages[item.targetLanguage] = (languages[item.targetLanguage] || 0) + 1;
  });

  const topLanguage = Object.entries(languages).sort((a, b) => b[1] - a[1])[0];

  return {
    translations: history.length,
    characters: totalChars,
    language: topLanguage ? topLanguage[0].toUpperCase() : "N/A",
  };
});

onMounted(() => {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    router.push("/login");
    return;
  }

  currentUser.value = JSON.parse(user);
  formData.value = { ...currentUser.value };
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const saveProfile = () => {
  currentUser.value = { ...currentUser.value, ...formData.value };
  localStorage.setItem("currentUser", JSON.stringify(currentUser.value));
  editMode.value = false;
  toastMessage.value = "Profile updated successfully!";
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
