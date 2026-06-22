<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const mobileMenu = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 shadow-lg">
    <!-- Top Bar -->
    <div class="bg-red-600 text-white text-center py-2 text-sm">
      🚗 Premium Car Accessories Delivered Across Pakistan
    </div>

    <nav
      class="bg-slate-950 text-white"
    >
      <div
        class="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between"
      >
        <!-- Logo -->
        <router-link
          to="/"
          class="text-3xl font-black"
        >
          Haxon<span class="text-red-500">Automotive</span>
        </router-link>

        <!-- Desktop -->
        <div
          class="hidden md:flex items-center gap-8"
        >
          <router-link
            to="/"
            class="hover:text-red-500 transition"
          >
            Home
          </router-link>

          <router-link
            to="/products"
            class="hover:text-red-500 transition"
          >
            Shop
          </router-link>

          <router-link
            to="/contact"
            class="hover:text-red-500 transition"
          >
            Contact
          </router-link>

          <router-link
            to="/cart"
            class="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl transition"
          >
            🛒 {{ cartStore.totalItems }}
          </router-link>
        </div>

        <!-- Mobile -->
        <div
          class="md:hidden flex items-center gap-5"
        >
          <router-link
            to="/cart"
            class="relative text-2xl"
          >
            🛒

            <span
              v-if="cartStore.totalItems"
              class="absolute -top-2 -right-3 bg-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center"
            >
              {{ cartStore.totalItems }}
            </span>
          </router-link>

          <button
            @click="mobileMenu = !mobileMenu"
            class="text-3xl"
          >
            ☰
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenu"
        class="md:hidden bg-slate-900 border-t border-slate-700"
      >
        <router-link
          to="/"
          class="block px-6 py-4 border-b border-slate-700"
          @click="mobileMenu = false"
        >
          Home
        </router-link>

        <router-link
          to="/products"
          class="block px-6 py-4 border-b border-slate-700"
          @click="mobileMenu = false"
        >
          Shop
        </router-link>

        <router-link
          to="/contact"
          class="block px-6 py-4 border-b border-slate-700"
          @click="mobileMenu = false"
        >
          Contact
        </router-link>

        <router-link
          to="/cart"
          class="block px-6 py-4"
          @click="mobileMenu = false"
        >
          Cart ({{ cartStore.totalItems }})
        </router-link>
      </div>
    </nav>
  </header>
</template>