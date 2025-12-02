<template>
  <div class="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
    <div class="w-full max-w-sm relative z-10">

      <div class="bg-white/5 backdrop-blur-xl rounded-xl py-8 px-7 transition-all duration-300 hover:bg-white/10 relative">
        <div v-if="isLoading" class="absolute inset-0 bg-black/70 backdrop-blur-md rounded-xl flex flex-col items-center justify-center gap-5 z-50">
          <div class="loader"></div>
          <p class="text-white/90 text-lg font-medium">Sending reset link...</p>
        </div>
        <div v-if="emailSent" class="text-center py-10">
          <h2 class="text-2xl font-bold text-white mb-3">Check your email</h2>
          <p class="text-white/70 text-sm leading-relaxed">
            We’ve sent a password reset link to<br>
            <span class="text-emerald-300 font-medium">{{ email }}</span>
          </p>
          <button @click="emailSent = false; email = ''" class="mt-8 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
            ← Send to another email
          </button>
        </div>
        <div v-else>
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-white mb-1 pacifico-regular">LinguaFlow</h1>
            <p class="text-teal-200/80 text-sm">Reset your password</p>
          </div>

          <form @submit.prevent="handleReset" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-white/90 mb-2">Email Address</label>
              <input v-model="email" type="email" placeholder="you@example.com" required
                class="w-full px-4 py-2.5 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition-all duration-200" />
            </div>

            <button type="submit" :disabled="isLoading || !email.includes('@')"
              class="w-full relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-emerald-500 to-teal-600 group-hover:from-emerald-500 group-hover:to-teal-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-emerald-400 disabled:opacity-50 mt-6 transition-all duration-200">
              <span class="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-black rounded-md group-hover:bg-opacity-0 font-medium">
                {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
              </span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-white/70 text-sm">
              Remember your password?
              <router-link to="/login" class="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                Sign in
              </router-link>
            </p>
          </div>
        </div>
      </div>

      <p class="text-center text-white/50 text-xs mt-6">Secure • Fast • Unlimited translations</p>
    </div>

    <!-- Top-Right Toast -->
    <Transition name="toast">
      <div v-if="toastMessage" class="fixed top-6 right-4 z-50 max-w-xs">
        <div :class="[
          'px-5 py-3 rounded-xl shadow-2xl border backdrop-blur-xl font-medium text-sm flex items-center gap-2',
          toastMessage.includes('sent') || toastMessage.includes('Check') ? 'bg-emerald-500/20 text-emerald-100 border-emerald-500/50' : 'bg-red-500/20 text-red-100 border-red-500/50'
        ]">
          <span v-if="toastMessage.includes('sent')" class="text-lg">Checkmark</span>
          {{ toastMessage }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const isLoading = ref(false)
const emailSent = ref(false)
const toastMessage = ref('')

const handleReset = () => {
  if (!email.value || !email.value.includes('@')) {
    toastMessage.value = 'Please enter a valid email'
    setTimeout(() => toastMessage.value = '', 3000)
    return
  }

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    emailSent.value = true
    toastMessage.value = 'Reset link sent successfully!'
    setTimeout(() => toastMessage.value = '', 4000)
  }, 2200)
}
</script>

<style scoped>
.pacifico-regular { font-family: "Pacifico", cursive; font-weight: 400; font-style: normal; }

.toast-enter-active { animation: toastIn 0.5s cubic-bezier(0.16,1,0.3,1); }
.toast-leave-active { animation: toastOut 0.4s ease forwards; }
@keyframes toastIn  { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes toastOut { to   { opacity: 0; transform: translateY(-30px); } }

.loader { width: 64px; height: 64px; border-radius: 50%; position: relative; animation: rotate 1s linear infinite; }
.loader::before, .loader::after { content: ""; box-sizing: border-box; position: absolute; inset: 0px; border-radius: 50%; border: 6px solid transparent; border-top-color: #10b981; border-bottom-color: #34d399; animation: prixClipFix 2s linear infinite; }
.loader::after { inset: 10px; transform: rotate3d(90,90,0,180deg); border-top-color: #6ee7b7; border-left-color: #34d399; border-right-color: #5eead4; animation: prixClipFix 2s linear infinite reverse; }
@keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes prixClipFix {
  0%   { clip-path: polygon(50% 50%,0 0,0 0,0 0,0 0,0 0); }
  25%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0); }
  50%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%); }
  75%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%); }
  100% { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0); }
}
</style>