<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute(); const year = new Date().getFullYear(); const isAdmin = computed(() => route.path.startsWith('/admin'))
const links = [ { label: 'Shop', to: '/products' }, { label: 'Brands', to: '/brands' }, { label: 'Track Order', to: '/track-order' }, { label: 'Contact', to: '/contact' }, { label: 'Admin', to: '/admin' }]
const adminLinks = [ { label: 'Dashboard', to: '/admin' }, { label: 'Products', to: '/admin/products' }, { label: 'Orders', to: '/admin/orders' }, { label: 'View Store', to: '/' }]
</script>
<template>
  <footer v-if="!isAdmin" class="relative overflow-hidden border-t border-white/10 bg-[#050608] text-[#F5F2EA]">
    <div class="absolute inset-x-0 top-0 text-center text-[17vw] font-black leading-none tracking-[-.12em] text-white/[.025]">HAXON</div>
    <div class="pointer-events-none absolute right-[-10rem] top-[-8rem] h-96 w-96 rounded-full bg-[#E50914]/10 blur-[120px]"></div>
    <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1.3fr_.7fr_.9fr]">
        <div><router-link to="/" class="text-5xl font-black tracking-[.22em]">HAXON</router-link><p class="mt-6 max-w-lg text-sm leading-7 text-white/55">Premium automotive accessories for Pakistan — clean fitment guidance, confident sourcing, and cinematic upgrades without marketplace noise.</p><div class="mt-7 flex flex-wrap gap-3"><span v-for="chip in ['Fitment Checked','Clear Pricing','Premium Imports']" :key="chip" class="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-bold text-white/50">{{ chip }}</span></div></div>
        <div><h3 class="premium-eyebrow">Explore</h3><div class="mt-6 space-y-3"><router-link v-for="link in links" :key="link.label" :to="link.to" class="block text-sm font-bold text-white/55 transition hover:text-white">{{ link.label }}</router-link></div></div>
        <div><h3 class="premium-eyebrow">Concierge</h3><p class="mt-6 text-sm leading-7 text-white/55">WhatsApp +92 326 3972241<br>Karachi, Pakistan<br>Delivery across Pakistan</p><a href="https://wa.me/923263972241" target="_blank" rel="noopener noreferrer" class="premium-btn premium-btn-light mt-6">WhatsApp CTA</a></div>
      </div>
      <div class="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row md:justify-between"><p>© {{ year }} Haxon Autostore. All rights reserved.</p><p>Apple/Porsche/German-inspired minimalism for serious car people.</p></div>
    </div>
  </footer>
  <footer v-else class="border-t border-white/10 bg-[#070707] text-white"><div class="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between"><p class="text-xl font-black tracking-[0.18em]">HAXON</p><div class="flex flex-wrap gap-4 text-sm"><router-link v-for="link in adminLinks" :key="link.label" :to="link.to" class="text-white/50 hover:text-white">{{ link.label }}</router-link></div><p class="text-xs text-white/35">© {{ year }} Haxon Admin</p></div></footer>
</template>
