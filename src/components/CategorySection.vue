<script setup>
const categories = [
  'Exterior Accessories',
  'Interior Accessories',
  'LED & Lighting',
  'Car Care',
  'Security & Utility',
]
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">
        Shop by Category
      </h2>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        <div
          v-for="category in categories"
          :key="category"
          class="bg-white rounded-2xl shadow p-8 text-center hover:shadow-lg transition"
        >
          <h3 class="font-semibold">
            {{ category }}
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>