<template>
  <div class="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
    <div class="w-full max-w-sm relative z-10">

      <div class="bg-white/5 backdrop-blur-xl rounded-xl py-6 px-7 transition-all duration-300 hover:bg-white/10 relative">

        <div v-if="isLoading" class="absolute inset-0 bg-black/70 backdrop-blur-md rounded-xl flex flex-col items-center justify-center gap-5 z-50">
          <div class="loader"></div>
          <p class="text-white/90 text-lg font-medium">Signing you in securely...</p>
        </div>

        <div class="text-center mb-7">
          <h1 class="text-2xl font-bold text-white mb-1 pacifico-regular">LinguaFlow</h1>
          <p class="text-teal-200/80 text-sm">Professional translation at your fingertips</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-white/90 mb-2">Email Address</label>
            <input v-model="email" type="email" placeholder="name@company.com"
              class="w-full px-4 py-2.5 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/15 transition-all duration-200" required />
          </div>

          <div>
            <label class="block text-sm font-semibold text-white/90 mb-2">Password</label>
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                class="w-full px-4 py-2.5 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/15 transition-all duration-200" required />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-3 top-2.5 text-white/50 hover:text-white/80 transition-colors">
                <EyeOffIcon v-if="showPassword" />
                <EyeIcon v-else />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs pt-1">
            <label class="flex items-center text-white/70 hover:text-white/90 cursor-pointer transition-colors">
              <input type="checkbox" class="w-3.5 h-3.5 rounded bg-white/10 accent-teal-400" />
              <span class="ml-2">Remember me</span>
            </label>
            <button class="text-teal-400 hover:text-teal-300 transition-colors">Forgot password?</button>
          </div>

          <button @click="handleLogin" :disabled="isLoading"
            class="w-full relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-teal-500 to-cyan-600 group-hover:from-teal-500 group-hover:to-cyan-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-400 disabled:opacity-50 mt-4 transition-all duration-200">
            <span class="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-black rounded-md group-hover:bg-opacity-0">
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </span>
          </button>
        </div>

        <div class="mt-5 text-center">
          <p class="text-white/70 text-sm">
            Don't have an account?
            <router-link to="/signup" class="text-emerald-400 hover:text-emerald-300 font-semibold transition">
              Create one now!
            </router-link>
          </p>
        </div>
      </div>

      <p class="text-center text-white/50 text-xs mt-6">Secure login • Enterprise-grade encryption</p>
    </div>

    <Transition name="toast">
      <div v-if="errorMessage"
        class="fixed top-6 right-4 z-50 max-w-sm animate-in fade-in slide-in-from-top-5 duration-500">
        <div :class="[
          'px-5 py-3 rounded-xl shadow-2xl border backdrop-blur-xl font-medium text-sm flex items-center gap-2',
          errorMessage.includes('Welcome')
            ? 'bg-emerald-500/20 text-emerald-100 border-emerald-500/50'
            : 'bg-red-500/20 text-red-100 border-red-500/50'
        ]">
          <span v-if="errorMessage.includes('Welcome')" class="text-lg">Checkmark</span>
          <span>{{ errorMessage }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  errorMessage.value = ''
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  if (!email.value.includes('@')) {
    errorMessage.value = 'Please enter a valid email address'
    return
  }

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    errorMessage.value = 'Welcome back! Redirecting...'
    setTimeout(() => errorMessage.value = '', 4000)
  }, 2500)
}

const EyeIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", 'stroke-width': "2", 'stroke-linecap': "round", 'stroke-linejoin': "round" }, [
  h('path', { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }),
  h('circle', { cx: "12", cy: "12", r: "3" })
])

const EyeOffIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", 'stroke-width': "2", 'stroke-linecap': "round", 'stroke-linejoin': "round" }, [
  h('path', { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }),
  h('path', { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }),
  h('path', { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }),
  h('line', { x1: "2", x2: "22", y1: "2", y2: "22" })
])
</script>

<style scoped>
.pacifico-regular { font-family: "Pacifico", cursive; font-weight: 400; font-style: normal; }

.toast-enter-active { animation: toastIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-leave-active { animation: toastOut 0.4s ease forwards; }

@keyframes toastIn {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes toastOut {
  to { opacity: 0; transform: translateY(-30px); }
}

.loader {
  width: 64px; height: 64px; border-radius: 50%; position: relative; animation: rotate 1s linear infinite;
}
.loader::before, .loader::after {
  content: ""; box-sizing: border-box; position: absolute; inset: 0px; border-radius: 50%;
  border: 6px solid transparent; border-top-color: #06b6d4; border-bottom-color: #22d3ee;
  animation: prixClipFix 2s linear infinite;
}
.loader::after {
  inset: 10px; transform: rotate3d(90, 90, 0, 180deg);
  border-top-color: #99f6e4; border-left-color: #14b8a6; border-right-color: #67e8f9; border-bottom-color: #22d3ee;
  animation: prixClipFix 2s linear infinite reverse;
}
@keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes prixClipFix {
  0%   { clip-path: polygon(50% 50%,0 0,0 0,0 0,0 0,0 0); }
  25%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0); }
  50%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%); }
  75%  { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%); }
  100% { clip-path: polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0); }
}
</style>