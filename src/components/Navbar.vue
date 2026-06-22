<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()

const mobileMenu = ref(false)

const isAdmin = computed(() => {
  return route.path.startsWith('/admin')
})

const closeMobileMenu = () => {
  mobileMenu.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-[#121212] text-white shadow-xl border-b border-[#C0C0C0]/10">
    <div
      v-if="!isAdmin"
      class="bg-[#D90429] text-white"
    >
      <div class="max-w-7xl mx-auto px-5 py-2 flex items-center justify-center text-xs md:text-sm font-medium tracking-wide">
        🚗 Premium Car Accessories Delivered Across Pakistan
      </div>
    </div>

    <nav class="bg-[#121212]">
      <div class="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <router-link
          :to="isAdmin ? '/admin' : '/'"
          class="group flex items-center gap-3"
          @click="closeMobileMenu"
        >
          <div class="w-12 h-12 rounded-2xl bg-[#D90429] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-[#D90429]/25 border border-white/10">
            H
          </div>

          <div class="leading-none">
            <span class="block text-2xl md:text-3xl font-black tracking-tight">
              Haxon
            </span>

            <span class="block text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#C0C0C0] group-hover:text-[#D90429] transition mt-1">
              {{ isAdmin ? 'Control Panel' : 'Automotive' }}
            </span>
          </div>
        </router-link>

        <div
          v-if="!isAdmin"
          class="hidden md:flex items-center gap-2"
        >
          <router-link
            to="/"
            class="px-4 py-2 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
          >
            Home
          </router-link>

          <router-link
            to="/products"
            class="px-4 py-2 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
          >
            Shop
          </router-link>

          <router-link
            to="/contact"
            class="px-4 py-2 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
          >
            Contact
          </router-link>
        </div>

        <div
          v-else
          class="hidden md:flex items-center gap-2"
        >
          <router-link
            to="/admin"
            class="px-4 py-2 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
          >
            Dashboard
          </router-link>

          <router-link
            to="/admin/products"
            class="px-4 py-2 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
          >
            Products
          </router-link>

          <router-link
            to="/admin/orders"
            class="px-4 py-2 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
          >
            Orders
          </router-link>

          <router-link
            to="/"
            class="px-4 py-2 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
          >
            View Store
          </router-link>
        </div>

        <div
          v-if="!isAdmin"
          class="hidden md:flex items-center gap-3"
        >
          <router-link
            to="/cart"
            class="relative bg-[#D90429] hover:bg-red-700 px-5 py-3 rounded-2xl transition font-semibold shadow-lg shadow-[#D90429]/20"
          >
            <span class="mr-2">🛒</span>
            Cart

            <span
              v-if="cartStore.totalItems"
              class="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-white text-[#D90429] text-xs font-bold"
            >
              {{ cartStore.totalItems }}
            </span>
          </router-link>
        </div>

        <div
          v-else
          class="hidden md:flex items-center gap-3"
        >
          <router-link
            to="/admin/products/add"
            class="bg-[#D90429] hover:bg-red-700 px-5 py-3 rounded-2xl transition font-semibold shadow-lg shadow-[#D90429]/20"
          >
            + Add Product
          </router-link>
        </div>

        <div class="md:hidden flex items-center gap-4">
          <router-link
            v-if="!isAdmin"
            to="/cart"
            class="relative w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
            @click="closeMobileMenu"
          >
            🛒

            <span
              v-if="cartStore.totalItems"
              class="absolute -top-2 -right-2 bg-[#D90429] text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-bold"
            >
              {{ cartStore.totalItems }}
            </span>
          </router-link>

          <router-link
            v-else
            to="/"
            class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold"
            @click="closeMobileMenu"
          >
            Store
          </router-link>

          <button
            @click="mobileMenu = !mobileMenu"
            class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl"
            aria-label="Toggle menu"
          >
            {{ mobileMenu ? '×' : '☰' }}
          </button>
        </div>
      </div>

      <div
        v-if="mobileMenu"
        class="md:hidden bg-[#121212] border-t border-white/10"
      >
        <div
          v-if="!isAdmin"
          class="px-5 py-4 space-y-2"
        >
          <router-link
            to="/"
            class="block px-4 py-3 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
            @click="closeMobileMenu"
          >
            Home
          </router-link>

          <router-link
            to="/products"
            class="block px-4 py-3 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
            @click="closeMobileMenu"
          >
            Shop
          </router-link>

          <router-link
            to="/contact"
            class="block px-4 py-3 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
            @click="closeMobileMenu"
          >
            Contact
          </router-link>

          <router-link
            to="/cart"
            class="block px-4 py-3 rounded-xl bg-[#D90429] text-white font-semibold transition"
            @click="closeMobileMenu"
          >
            Cart ({{ cartStore.totalItems }})
          </router-link>
        </div>

        <div
          v-else
          class="px-5 py-4 space-y-2"
        >
          <router-link
            to="/admin"
            class="block px-4 py-3 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
            @click="closeMobileMenu"
          >
            Dashboard
          </router-link>

          <router-link
            to="/admin/products"
            class="block px-4 py-3 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
            @click="closeMobileMenu"
          >
            Products
          </router-link>

          <router-link
            to="/admin/orders"
            class="block px-4 py-3 rounded-xl text-[#C0C0C0] hover:text-white hover:bg-white/5 transition"
            @click="closeMobileMenu"
          >
            Orders
          </router-link>

          <router-link
            to="/admin/products/add"
            class="block px-4 py-3 rounded-xl bg-[#D90429] text-white font-semibold transition"
            @click="closeMobileMenu"
          >
            Add Product
          </router-link>

          <router-link
            to="/"
            class="block px-4 py-3 rounded-xl border border-white/10 text-white transition"
            @click="closeMobileMenu"
          >
            View Store
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>