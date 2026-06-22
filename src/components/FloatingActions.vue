<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="fixed bottom-7 right-7 z-[999]">
    <transition
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-200"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="open"
        class="mb-4 w-60 rounded-3xl overflow-hidden border border-white/10 bg-[#181A1D]/95 backdrop-blur-xl shadow-2xl"
      >
        <a
          href="https://wa.me/923263972241"
          target="_blank"
          class="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition"
        >
          <span>WhatsApp</span>
          <span>💬</span>
        </a>

        <a
          href="tel:+923263972241"
          class="flex items-center justify-between px-5 py-4 border-t border-white/10 hover:bg-white/5 transition"
        >
          <span>Call Us</span>
          <span>📞</span>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          class="flex items-center justify-between px-5 py-4 border-t border-white/10 hover:bg-white/5 transition"
        >
          <span>Instagram</span>
          <span>📷</span>
        </a>

        <router-link
          to="/track-order"
          class="flex items-center justify-between px-5 py-4 border-t border-white/10 hover:bg-white/5 transition"
        >
          <span>Track Order</span>
          <span>📦</span>
        </router-link>
      </div>
    </transition>

    <button
      @click="open = !open"
      class="
        w-16
        h-16
        rounded-full
        bg-[#D90429]
        hover:bg-red-700
        shadow-2xl
        flex
        items-center
        justify-center
        text-3xl
        font-black
        transition
        hover:rotate-90
      "
    >
      {{ open ? '×' : '+' }}
    </button>
  </div>
</template>