<script setup>
import { computed, onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()

onMounted(() => {
  if (!productStore.products.length) {
    productStore.fetchProducts()
  }
})

const featuredProducts = computed(() =>
  productStore.products.filter(
    product => product.isFeatured
  )
)
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="
        bg-gradient-to-r
        from-slate-950
        via-slate-900
        to-slate-800
        text-white
        py-28
      "
    >
      <div
        class="max-w-7xl mx-auto px-6 text-center"
      >
        <h1
          class="text-5xl md:text-6xl font-black mb-6"
        >
          Premium Car Accessories
        </h1>

        <p
          class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Premium accessories, confirmed
          before dispatch and delivered
          across Pakistan.
        </p>

        <router-link
          to="/products"
          class="
            bg-red-600
            hover:bg-red-700
            px-8
            py-4
            rounded-xl
            inline-block
            font-semibold
            transition
          "
        >
          Shop Now
        </router-link>
      </div>
    </section>

    <!-- Categories -->
    <section
      class="max-w-7xl mx-auto px-6 py-20"
    >
      <h2
        class="text-4xl font-bold text-center mb-12"
      >
        Shop By Category
      </h2>

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        <div
          class="bg-white rounded-2xl shadow-md p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          🚗 Exterior
        </div>

        <div
          class="bg-white rounded-2xl shadow-md p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          🛋️ Interior
        </div>

        <div
          class="bg-white rounded-2xl shadow-md p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          💡 LED & Lighting
        </div>

        <div
          class="bg-white rounded-2xl shadow-md p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          🧽 Car Care
        </div>

        <div
          class="bg-white rounded-2xl shadow-md p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          🔒 Security
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section
      class="max-w-7xl mx-auto px-6 py-20"
    >
      <div
        class="flex justify-between items-center mb-10"
      >
        <h2
          class="text-4xl font-bold"
        >
          Featured Products
        </h2>

        <router-link
          to="/products"
          class="text-red-600 font-semibold"
        >
          View All →
        </router-link>
      </div>

      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- Why Choose Us -->
    <section
      class="bg-slate-100 py-20"
    >
      <div
        class="max-w-7xl mx-auto px-6"
      >
        <h2
          class="text-4xl font-bold text-center mb-12"
        >
          Why Choose Us
        </h2>

        <div
          class="grid md:grid-cols-3 gap-8"
        >
          <div
            class="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            🚗
            <h3
              class="font-bold text-xl mt-4"
            >
              Premium Products
            </h3>

            <p class="mt-3 text-gray-500">
              Carefully selected
              accessories for your
              vehicle.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            📦
            <h3
              class="font-bold text-xl mt-4"
            >
              Delivery Across Pakistan
            </h3>

            <p class="mt-3 text-gray-500">
              Fast and secure delivery
              nationwide.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            ✅
            <h3
              class="font-bold text-xl mt-4"
            >
              Confirmed Availability
            </h3>

            <p class="mt-3 text-gray-500">
              Every order is confirmed
              before dispatch.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>