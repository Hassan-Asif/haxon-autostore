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
        py-16 md:py-28
      "
    >
      <div
        class="max-w-7xl mx-auto px-4 md:px-6 text-center"
      >
        <h1
          class="text-3xl md:text-6xl font-black mb-4 md:mb-6"
        >
          Premium Car Accessories
        </h1>

        <p
          class="text-slate-300 text-sm md:text-xl max-w-2xl mx-auto mb-8"
        >
          Premium accessories,
          confirmed before dispatch
          and delivered across Pakistan.
        </p>

        <router-link
          to="/products"
          class="
            bg-red-600
            hover:bg-red-700
            px-6
            md:px-8
            py-3
            md:py-4
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
      class="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20"
    >
      <h2
        class="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12"
      >
        Shop By Category
      </h2>

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6"
      >
        <div
          class="bg-white rounded-2xl shadow-md p-5 md:p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          🚗
          <p class="mt-2 text-sm md:text-base">
            Exterior
          </p>
        </div>

        <div
          class="bg-white rounded-2xl shadow-md p-5 md:p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          🛋️
          <p class="mt-2 text-sm md:text-base">
            Interior
          </p>
        </div>

        <div
          class="bg-white rounded-2xl shadow-md p-5 md:p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          💡
          <p class="mt-2 text-sm md:text-base">
            LED & Lighting
          </p>
        </div>

        <div
          class="bg-white rounded-2xl shadow-md p-5 md:p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          🧽
          <p class="mt-2 text-sm md:text-base">
            Car Care
          </p>
        </div>

        <div
          class="bg-white rounded-2xl shadow-md p-5 md:p-8 text-center hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          🔒
          <p class="mt-2 text-sm md:text-base">
            Security
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section
      class="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20"
    >
      <div
        class="flex justify-between items-center mb-6 md:mb-10"
      >
        <h2
          class="text-2xl md:text-4xl font-bold"
        >
          Featured Products
        </h2>

        <router-link
          to="/products"
          class="text-red-600 font-semibold text-sm md:text-base"
        >
          View All →
        </router-link>
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
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
      class="bg-slate-100 py-12 md:py-20"
    >
      <div
        class="max-w-7xl mx-auto px-4 md:px-6"
      >
        <h2
          class="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          Why Choose Us
        </h2>

        <div
          class="grid gap-4 md:grid-cols-3 md:gap-8"
        >
          <div
            class="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            🚗
            <h3
              class="font-bold text-lg md:text-xl mt-3"
            >
              Premium Products
            </h3>

            <p class="mt-3 text-gray-500 text-sm md:text-base">
              Carefully selected accessories
              for your vehicle.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            📦
            <h3
              class="font-bold text-lg md:text-xl mt-3"
            >
              Delivery Across Pakistan
            </h3>

            <p class="mt-3 text-gray-500 text-sm md:text-base">
              Fast and secure delivery
              nationwide.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            ✅
            <h3
              class="font-bold text-lg md:text-xl mt-3"
            >
              Confirmed Availability
            </h3>

            <p class="mt-3 text-gray-500 text-sm md:text-base">
              Every order is confirmed
              before dispatch.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>