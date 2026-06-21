<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.fetchProducts()
  }
})

const product = computed(() =>
  productStore.products.find(
    p => p.id === route.params.id
  )
)
</script>

<template>
  <div
    v-if="product"
    class="max-w-7xl mx-auto p-10"
  >
    <div class="grid lg:grid-cols-2 gap-12">
      <img
        :src="
          product.image ||
          '/images/no-image.jpg'
        "
        :alt="product.name"
        class="w-full rounded-2xl shadow"
      />

      <div>
        <span
          class="inline-block bg-gray-100 text-gray-600 px-4 py-1 rounded-full mb-4"
        >
          {{ product.category }}
        </span>

        <h1 class="text-4xl font-bold">
          {{ product.name }}
        </h1>

        <p
          class="text-red-600 text-3xl font-bold mt-4"
        >
          Rs. {{ product.price }}
        </p>

        <p class="mt-6 text-gray-600">
          {{ product.description }}
        </p>

        <div
          class="mt-8 space-y-3 text-gray-700"
        >
          <p>
            <strong>Car Brand:</strong>
            {{ product.carBrand }}
          </p>

          <p>
            <strong>Car Model:</strong>
            {{ product.carModel }}
          </p>

          <p>
            <strong>Availability:</strong>
            {{ product.availabilityStatus }}
          </p>

          <p>
            <strong>Estimated Delivery:</strong>
            {{ product.estimatedDelivery }}
          </p>
        </div>

        <div class="flex gap-4 mt-10">
          <button
            @click="cartStore.addToCart(product)"
            class="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
          >
            Add to Cart
          </button>

          <a
            href="https://wa.me/923263972241"
            target="_blank"
            class="border border-gray-900 px-8 py-3 rounded-lg"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="max-w-7xl mx-auto p-10 text-center"
  >
    <h1 class="text-3xl font-bold">
      Product Not Found
    </h1>

    <router-link
      to="/products"
      class="text-red-600 mt-6 inline-block"
    >
      Back to Products
    </router-link>
  </div>
</template>