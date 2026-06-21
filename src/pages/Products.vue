<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-10">
    <h1 class="text-4xl font-bold mb-8">
      Car Accessories
    </h1>

    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <input
        v-model="productStore.search"
        placeholder="Search Corolla LED, Civic Mats..."
        class="border rounded-lg p-3"
      />

      <select
        v-model="productStore.category"
        class="border rounded-lg p-3"
      >
        <option>All</option>
        <option>Exterior Accessories</option>
        <option>Interior Accessories</option>
        <option>LED & Lighting</option>
        <option>Car Care</option>
        <option>Security & Utility</option>
      </select>
    </div>

    <div
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <ProductCard
        v-for="product in productStore.filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

      <div
        v-if="!productStore.filteredProducts.length"
        class="text-center py-20 text-gray-500"
      >
        No products found.
      </div>
  </div>
</template>