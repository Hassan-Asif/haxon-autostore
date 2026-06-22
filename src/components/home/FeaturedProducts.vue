<script setup>
import { computed, onMounted } from 'vue'
import { useProductStore } from '../../stores/productStore'
import ProductCard from '../ProductCard.vue'

const productStore = useProductStore()

onMounted(() => {
  if (!productStore.products.length) {
    productStore.fetchProducts()
  }
})

const featuredProducts = computed(() =>
  productStore.products
    .filter(
      product =>
        product.featured === true ||
        product.isFeatured === true
    )
    .filter(
      product =>
        product.active !== false &&
        product.isActive !== false
    )
    .slice(0, 8)
)
</script>

<template>
  <section class="relative bg-[#F4F1EC] py-20 overflow-hidden">
    <div
      class="absolute inset-0 opacity-[0.035]"
      style="
        background-image:
          linear-gradient(90deg, #000 1px, transparent 1px),
          linear-gradient(#000 1px, transparent 1px);
        background-size: 38px 38px;
      "
    ></div>

    <div class="relative max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="w-10 h-px bg-[#D90429]"></span>

            <p class="uppercase tracking-[0.34em] text-[#777] text-[11px] font-semibold">
              Featured Picks
            </p>
          </div>

          <h2 class="text-3xl md:text-5xl font-black text-[#121212] tracking-tight">
            Built for the road.
          </h2>

          <p class="text-[#666] mt-4 max-w-2xl leading-relaxed">
            Selected accessories that make your car look cleaner, feel sharper,
            and stay ready for daily use.
          </p>
        </div>

        <router-link
          to="/products"
          class="inline-flex items-center justify-center bg-[#121212] hover:bg-[#D90429] text-white px-6 py-3 rounded-2xl font-bold transition shadow-xl shadow-black/10"
        >
          View All Products
          <span class="ml-2">→</span>
        </router-link>
      </div>

      <div
        v-if="featuredProducts.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div
        v-else
        class="bg-white/70 border border-black/5 rounded-3xl p-12 text-center shadow-xl shadow-black/5"
      >
        <div class="text-5xl mb-4">
          🏁
        </div>

        <h3 class="text-2xl font-black text-[#121212]">
          No featured products yet
        </h3>

        <p class="text-[#666] mt-2">
          Mark products as featured from the admin panel.
        </p>
      </div>
    </div>
  </section>
</template>