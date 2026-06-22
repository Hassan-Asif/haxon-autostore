<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()

const categories = [
  'All',
  'Exterior Accessories',
  'Interior Accessories',
  'LED & Lighting',
  'Android Panels',
  'Audio & Multimedia',
  'Car Care',
  'Security',
  'Tools',
  'Emergency Tools',
  'Phone Holders',
  'Charging Accessories',
  'Air Pumps',
  'Seat Covers',
  'Other',
]

onMounted(() => {
  productStore.fetchProducts()

  if (route.query.category) {
    productStore.category = route.query.category
  }

  if (route.query.brand) {
    productStore.search = route.query.brand
  }
})

const activeCount = computed(() => {
  return productStore.filteredProducts.filter(
    (product) =>
      product.active !== false &&
      product.isActive !== false
  ).length
})
</script>

<template>
  <div class="min-h-screen bg-[#121212] text-white">
    <section class="relative overflow-hidden bg-[#17191B] border-b border-white/10">
      <div class="absolute inset-0 bg-[linear-gradient(135deg,#101112_0%,#1B1E21_45%,#252A2F_55%,#111213_100%)]"></div>
      <div class="absolute inset-0 opacity-[0.1] bg-[linear-gradient(115deg,transparent_0%,transparent_38%,rgba(255,255,255,0.18)_50%,transparent_62%,transparent_100%)]"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-14">
        <div class="max-w-3xl">
          <div class="flex items-center gap-4 mb-4">
            <span class="h-px w-10 bg-[#D90429]"></span>

            <p class="uppercase tracking-[0.34em] text-[#C0C0C0] text-[11px] font-semibold">
              Haxon Collection
            </p>

            <span class="h-px w-10 bg-[#D90429]"></span>
          </div>

          <h1 class="text-4xl md:text-6xl font-black tracking-tight">
            Car accessories.
          </h1>

          <p class="text-[#C0C0C0] mt-5 max-w-2xl leading-relaxed">
            Browse premium automotive accessories by category, fitment, availability,
            and style. Every order is confirmed before dispatch.
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-10">
      <div class="bg-[#181A1D] border border-white/10 rounded-[2rem] p-5 md:p-6 shadow-2xl shadow-black/20 mb-10">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div class="lg:col-span-2">
            <label class="block text-xs uppercase tracking-[0.24em] text-[#C0C0C0] mb-2">
              Search
            </label>

            <input
              v-model="productStore.search"
              placeholder="Search Corolla LED, Civic mats, Toyota..."
              class="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-4 text-white placeholder:text-[#C0C0C0]/50 focus:outline-none focus:border-[#D90429] transition"
            />
          </div>

          <div>
            <label class="block text-xs uppercase tracking-[0.24em] text-[#C0C0C0] mb-2">
              Category
            </label>

            <select
              v-model="productStore.category"
              class="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-[#D90429] transition"
            >
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <div class="flex items-end">
            <button
              @click="
                productStore.search = '';
                productStore.category = 'All'
              "
              class="w-full bg-[#D90429] hover:bg-red-700 text-white rounded-2xl px-4 py-4 font-bold transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[#C0C0C0]">
          <p>
            Showing
            <span class="text-white font-bold">
              {{ productStore.filteredProducts.length }}
            </span>
            products
          </p>

          <p>
            Active listings:
            <span class="text-[#D90429] font-bold">
              {{ activeCount }}
            </span>
          </p>
        </div>
      </div>

      <div
        v-if="productStore.filteredProducts.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in productStore.filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div
        v-else
        class="bg-[#181A1D] border border-white/10 rounded-[2rem] p-14 text-center"
      >
        <div class="text-6xl mb-5">
          🔍
        </div>

        <h2 class="text-3xl font-black">
          No products found
        </h2>

        <p class="text-[#C0C0C0] mt-3">
          Try changing the search or category filter.
        </p>
      </div>
    </section>
  </div>
</template>