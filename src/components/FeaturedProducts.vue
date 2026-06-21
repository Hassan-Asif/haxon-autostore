<script setup>
import ProductCard from './ProductCard.vue'

const products = [
  {
    id: 1,
    name: 'Toyota Corolla LED Headlights',
    price: '4,999',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
  },
  {
    id: 2,
    name: 'Premium Dashboard Mat',
    price: '2,499',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
  },
  {
    id: 3,
    name: 'Car Wash Kit',
    price: '1,999',
    image:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1',
  },
]
</script>

<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">
        Featured Products
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>