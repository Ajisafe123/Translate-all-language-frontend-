<script setup>
import { onMounted, ref } from 'vue'

const isDarkMode = ref(false)

onMounted(() => {
  // Check dark mode
  const darkMode = localStorage.getItem('darkMode')
  if (darkMode) {
    isDarkMode.value = JSON.parse(darkMode)
    updateDarkMode()
  }
})

const updateDarkMode = () => {
  const html = document.documentElement
  if (isDarkMode.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}
</script>

<template>
  <router-view />
</template>

<style>
@import './assets/main.css';
</style>
