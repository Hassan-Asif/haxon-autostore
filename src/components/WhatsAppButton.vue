<script setup>
import { ref } from 'vue'

const open = ref(false)

const whatsappNumber = '923263972241'
const phoneNumber = '+923263972241'
const instagramUrl = 'https://instagram.com/haxon.store'

const whatsappMessage =
  'Hi Haxon! I need help finding car accessories.'

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`

const closeMenu = () => {
  open.value = false
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[999]">
    <div
      v-if="open"
      class="mb-4 w-72 bg-[#121212] text-white border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
    >
      <div class="p-5 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-[#D90429] flex items-center justify-center font-black text-xl">
            H
          </div>

          <div>
            <h3 class="font-bold">
              Haxon Support
            </h3>

            <p class="text-xs text-[#C0C0C0]">
              How can we help?
            </p>
          </div>
        </div>
      </div>

      <div class="p-3 space-y-2">
        <a
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-[#D90429] transition"
          @click="closeMenu"
        >
          <span class="text-xl">💬</span>

          <div>
            <p class="font-semibold">
              WhatsApp
            </p>

            <p class="text-xs text-[#C0C0C0]">
              Chat with us
            </p>
          </div>
        </a>

        <a
          :href="`tel:${phoneNumber}`"
          class="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-[#D90429] transition"
          @click="closeMenu"
        >
          <span class="text-xl">📞</span>

          <div>
            <p class="font-semibold">
              Call Us
            </p>

            <p class="text-xs text-[#C0C0C0]">
              Quick assistance
            </p>
          </div>
        </a>

        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-[#D90429] transition"
          @click="closeMenu"
        >
          <span class="text-xl">📷</span>

          <div>
            <p class="font-semibold">
              Instagram
            </p>

            <p class="text-xs text-[#C0C0C0]">
              Latest products
            </p>
          </div>
        </a>

        <router-link
          to="/track-order"
          class="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-[#D90429] transition"
          @click="closeMenu"
        >
          <span class="text-xl">📦</span>

          <div>
            <p class="font-semibold">
              Track Order
            </p>

            <p class="text-xs text-[#C0C0C0]">
              Check order status
            </p>
          </div>
        </router-link>
      </div>
    </div>

    <button
      @click="open = !open"
      class="ml-auto w-16 h-16 rounded-3xl bg-[#D90429] hover:bg-red-700 text-white flex items-center justify-center font-black text-3xl shadow-2xl shadow-[#D90429]/30 border border-white/10 transition hover:-translate-y-1"
      aria-label="Open Haxon support menu"
    >
      {{ open ? '×' : 'H' }}
    </button>
  </div>
</template>