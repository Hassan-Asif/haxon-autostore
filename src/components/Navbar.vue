<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()

const mobileMenu = ref(false)

const isAdmin = computed(() => route.path.startsWith('/admin'))

const storeLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'Track', to: '/track-order' },
  { label: 'Brands', to: '/brands' },
  { label: 'Contact', to: '/contact' },
]

const adminLinks = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'View Store', to: '/' },
]

const links = computed(() => (isAdmin.value ? adminLinks : storeLinks))

const closeMobileMenu = () => {
  mobileMenu.value = false
}

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="fixed left-0 right-0 top-0 z-50 px-3 pt-3 text-white sm:px-5 sm:pt-5">
    <nav class="mx-auto max-w-7xl rounded-[1.6rem] border border-white/12 bg-[#090B0F]/70 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div class="flex items-center justify-between px-4 py-3 sm:px-5">
        <router-link :to="isAdmin ? '/admin' : '/'" class="leading-none" @click="closeMobileMenu">
          <span class="block text-2xl font-black tracking-[0.24em] md:text-3xl">HAXON</span>
          <span class="mt-1 block text-[9px] font-black uppercase tracking-[0.42em] text-[#E50914]">{{ isAdmin ? 'Control Panel' : 'Autostore' }}</span>
        </router-link>
        <div class="hidden items-center rounded-full border border-white/10 bg-white/[.045] p-1 lg:flex">
          <router-link v-for="link in links" :key="link.label" :to="link.to" class="rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/58 transition hover:bg-white/10 hover:text-white" :class="isActive(link.to) ? 'bg-white text-black' : ''">{{ link.label }}</router-link>
        </div>
        <div class="hidden items-center gap-2 lg:flex">
          <router-link v-if="!isAdmin" to="/products" class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[.04] text-lg transition hover:bg-white hover:text-black" aria-label="Search">⌕</router-link>
          <router-link v-if="!isAdmin" to="/cart" class="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[.04] text-lg transition hover:bg-white hover:text-black" aria-label="Cart">☐<span v-if="cartStore.totalItems" class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E50914] px-1 text-[10px] font-black text-white">{{ cartStore.totalItems }}</span></router-link>
          <router-link v-if="!isAdmin" to="/admin" class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[.04] transition hover:bg-white hover:text-black" aria-label="Admin">⌁</router-link>
          <router-link v-else to="/admin/products/add" class="rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[.16em] text-black">+ Add Product</router-link>
        </div>
        <div class="flex items-center gap-2 lg:hidden">
          <router-link v-if="!isAdmin" to="/cart" class="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[.05]" @click="closeMobileMenu">☐<span v-if="cartStore.totalItems" class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E50914] px-1 text-[10px] font-black text-white">{{ cartStore.totalItems }}</span></router-link>
          <button type="button" class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[.05] text-xl" @click="mobileMenu = !mobileMenu" aria-label="Toggle menu">{{ mobileMenu ? '×' : '☰' }}</button>
        </div>
      </div>
      <transition name="hero-fade"><div v-if="mobileMenu" class="border-t border-white/10 p-3 lg:hidden"><router-link v-for="link in links" :key="link.label" :to="link.to" class="block rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white/65 transition hover:bg-white/10 hover:text-white" :class="isActive(link.to) ? 'bg-white text-black' : ''" @click="closeMobileMenu">{{ link.label }}</router-link><router-link v-if="!isAdmin" to="/admin" class="mt-2 block rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-black uppercase tracking-[0.16em]" @click="closeMobileMenu">Admin</router-link></div></transition>
    </nav>
  </header>
</template>