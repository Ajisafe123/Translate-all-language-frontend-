<template>
  <!-- Sidebar Backdrop -->
  <Transition name="backdrop">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
      @click="$emit('close')"
    ></div>
  </Transition>

  <!-- Sidebar -->
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="fixed left-0 top-0 h-screen w-64 bg-black border-r border-white/10 backdrop-blur-xl z-40 overflow-y-auto"
    >
      <!-- Close Button (Mobile) -->
      <div class="flex items-center justify-between p-6 lg:hidden">
        <h2 class="text-lg font-bold text-white">Menu</h2>
        <button @click="$emit('close')" class="text-white/60 hover:text-white">
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- User Info Section -->
      <div class="px-6 py-4 border-b border-white/10">
        <div class="flex items-center gap-3 mb-4">
          <div
            class="w-12 h-12 rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="text-white font-semibold text-sm">
              {{ currentUser.username }}
            </p>
            <p class="text-white/60 text-xs">{{ currentUser.email }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="px-4 py-6 space-y-3">
        <!-- Translate -->
        <router-link
          to="/translate"
          @click="$emit('close')"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all"
          active-class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
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
              d="M7 16V4m0 0L3 8m4-4l4 4h16v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H7z"
            ></path>
          </svg>
          <span>Translate</span>
        </router-link>

        <!-- History -->
        <router-link
          to="/history"
          @click="$emit('close')"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all"
          active-class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>History</span>
        </router-link>

        <!-- Profile -->
        <router-link
          to="/profile"
          @click="$emit('close')"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all"
          active-class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <span>Profile</span>
        </router-link>

        <!-- Settings -->
        <router-link
          to="/settings"
          @click="$emit('close')"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all"
          active-class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span>Settings</span>
        </router-link>
      </nav>

      <!-- Divider -->
      <div class="my-4 border-t border-white/10"></div>

      <!-- Additional Info -->
      <div class="px-6 py-4 text-white/60 text-xs">
        <p class="mb-3">Version 1.0.0</p>
        <p class="text-white/40">© 2024 LinguaFlow. All rights reserved.</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  isOpen: Boolean,
});

defineEmits(["close"]);

const currentUser = ref({
  username: "User",
  email: "user@example.com",
});

onMounted(() => {
  const user = localStorage.getItem("currentUser");
  if (user) {
    currentUser.value = JSON.parse(user);
  }
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
