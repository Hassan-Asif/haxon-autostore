<script setup>
import { ref, onMounted } from 'vue'
import {
  collection,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore'

import { db } from '../firebase/config'
import ProductCard from './ProductCard.vue'

const products = ref([])
const loading = ref(true)
const error = ref('')

const fetchFeaturedProducts = async () => {
  try {
    loading.value = true
    error.value = ''

    const q = query(
      collection(db, 'products'),
      where('featured', '==', true),
      where('active', '==', true),
      limit(6)
    )

    const snapshot = await getDocs(q)

    products.value = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }))
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load featured products.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFeaturedProducts()
})
</script>

<template>
  <section class="py-24 bg-[#121212] text-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p class="uppercase tracking-[0.35em] text-[#C0C0C0] text-xs font-semibold">
            Featured Picks
          </p>

          <h2 class="text-4xl md:text-5xl font-black mt-3">
            Built For The Road
          </h2>

          <p class="text-[#C0C0C0] mt-4 max-w-2xl">
            Hand-picked car accessories, lighting, interior upgrades, and essentials for drivers who like their cars slightly too much. As they should.
          </p>
        </div>

        <router-link
          to="/products"
          class="inline-flex items-center justify-center bg-[#D90429] hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-lg shadow-[#D90429]/20"
        >
          View All Products
          <span class="ml-2">→</span>
        </router-link>
      </div>

      <div
        v-if="loading"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="bg-[#181818] border border-white/5 rounded-3xl overflow-hidden animate-pulse"
        >
          <div class="h-72 bg-white/5"></div>
          <div class="p-6 space-y-4">
            <div class="h-5 bg-white/10 rounded w-3/4"></div>
            <div class="h-4 bg-white/10 rounded w-1/2"></div>
            <div class="h-10 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>

      <div
        v-else-if="error"
        class="bg-red-950/40 border border-[#D90429]/30 text-red-200 rounded-2xl p-6"
      >
        {{ error }}
      </div>

      <div
        v-else-if="products.length === 0"
        class="bg-[#181818] border border-white/5 rounded-3xl p-12 text-center"
      >
        <div class="text-5xl mb-4">
          🏁
        </div>

        <h3 class="text-2xl font-bold">
          No featured products yet
        </h3>

        <p class="text-[#C0C0C0] mt-2">
          Mark products as featured from the admin panel.
        </p>
      </div>

      <div
        v-else
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>