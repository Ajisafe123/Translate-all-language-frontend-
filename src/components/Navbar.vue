<template>
  <nav
    class="border-b border-white/10 backdrop-blur-xl sticky top-0 z-40 bg-black/40"
  >
    <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      <!-- Left: Menu Icon & Logo -->
      <div class="flex items-center gap-4">
        <!-- Menu Icon Button -->
        <button
          @click="$emit('toggle-sidebar')"
          class="p-2 hover:bg-white/10 rounded-lg transition-all text-white"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <!-- Logo -->
        <div
          class="flex items-center gap-3 cursor-pointer hidden sm:flex"
          @click="$router.push('/translate')"
        >
          <div
            class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M9 19h.01"
              />
            </svg>
          </div>
          <h1
            class="text-xl font-bold pacifico-regular bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"
          >
            LinguaFlow
          </h1>
        </div>
      </div>

      <!-- Right: User Dropdown -->
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="p-2.5 hover:bg-white/10 rounded-lg transition-all text-white flex items-center gap-2"
        >
          <svg
            class="w-6 h-6"
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
          <span class="hidden sm:inline text-sm font-medium">{{
            currentUser.username
          }}</span>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-56 bg-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-2 z-50"
          @click="dropdownOpen = false"
        >
          <!-- User Info -->
          <div class="px-4 py-3 border-b border-white/10">
            <p class="text-white font-semibold">{{ currentUser.username }}</p>
            <p class="text-white/60 text-xs">{{ currentUser.email }}</p>
          </div>

          <!-- Menu Items -->
          <router-link
            to="/profile"
            class="block px-4 py-2.5 text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-colors"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <span>Profile</span>
          </router-link>

          <router-link
            to="/settings"
            class="block px-4 py-2.5 text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-colors"
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
            </svg>
            <span>Settings</span>
          </router-link>

          <div class="border-t border-white/10 my-1"></div>

          <button
            @click="handleLogout"
            class="w-full text-left px-4 py-2.5 text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Logout Modal -->
  <LogoutModal
    v-if="showLogoutModal"
    @confirm="handleLogoutConfirm"
    @cancel="closeLogoutModal"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import LogoutModal from "./LogoutModal.vue";

const router = useRouter();
const dropdownOpen = ref(false);
const showLogoutModal = ref(false);
const currentUser = ref({
  username: "User",
  email: "user@example.com",
});

defineEmits(["toggle-sidebar"]);

onMounted(() => {
  const user = localStorage.getItem("currentUser");
  if (user) {
    currentUser.value = JSON.parse(user);
  }
});

const handleLogout = () => {
  showLogoutModal.value = true;
  dropdownOpen.value = false;
};

const closeLogoutModal = () => {
  showLogoutModal.value = false;
};

const handleLogoutConfirm = () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("translationHistory");
  router.push("/login");
};
</script>

<style scoped>
.pacifico-regular {
  font-family: "Pacifico", cursive;
  font-weight: 400;
}
</style>
