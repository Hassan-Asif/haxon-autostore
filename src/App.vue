<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <Navbar />

    <main>
      <RouterView />
      <Toaster
    position="top-right"
    richColors
    closeButton
    expand
    theme="dark"
  />
    </main>

    <Footer />

    <!-- Floating WhatsApp -->
    <a
      href="https://wa.me/923263972241"
      target="_blank"
      class="
        fixed
        bottom-6
        right-6
        bg-green-500
        hover:bg-green-600
        text-white
        w-14
        h-14
        rounded-full
        shadow-2xl
        flex
        items-center
        justify-center
        text-2xl
        z-50
        transition
      "
    >
      💬
    </a>
  </div>
</template>
