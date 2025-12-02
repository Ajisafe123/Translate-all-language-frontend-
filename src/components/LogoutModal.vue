<template>
  <!-- Modal Backdrop -->
  <Transition name="fade">
    <div
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      @click="$emit('cancel')"
    ></div>
  </Transition>

  <!-- Modal Content -->
  <Transition name="modal">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div
        class="bg-black border border-white/20 rounded-2xl p-8 w-96 shadow-2xl backdrop-blur-xl pointer-events-auto"
        @click.stop
      >
        <!-- Close Button -->
        <button
          @click="$emit('cancel')"
          class="absolute top-4 right-4 text-white/50 hover:text-white transition"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <!-- Icon -->
        <div
          class="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-8 h-8 text-red-400"
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
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-white text-center mb-2">Logout?</h2>

        <!-- Message -->
        <p class="text-white/60 text-center mb-8">
          Are you sure you want to logout? You'll need to login again to
          continue translating.
        </p>

        <!-- Action Buttons -->
        <div class="flex gap-4">
          <button
            @click="$emit('cancel')"
            class="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="flex-1 px-6 py-3 bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active {
  animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active {
  animation: modalSlideOut 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modalSlideOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
}
</style>
