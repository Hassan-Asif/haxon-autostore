<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <div class="max-w-6xl mx-auto p-10">
    <h1 class="text-4xl font-bold mb-10">
      Shopping Cart
    </h1>

    <div
      v-if="cartStore.items.length"
      class="space-y-6"
    >
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        class="border rounded-xl p-5 flex justify-between items-center"
      >
        <div>
          <h2 class="font-bold text-lg">
            {{ item.name }}
          </h2>

          <p class="text-gray-500">
            Rs. {{ item.price }}
          </p>
        </div>

        <div class="flex gap-3 items-center">
          <button
            @click="
              cartStore.decreaseQuantity(item.id)
            "
            class="bg-gray-200 px-3 py-1 rounded"
          >
            -
          </button>

          <span>
            {{ item.quantity }}
          </span>

          <button
            @click="
              cartStore.increaseQuantity(item.id)
            "
            class="bg-gray-200 px-3 py-1 rounded"
          >
            +
          </button>

          <button
            @click="
              cartStore.removeFromCart(item.id)
            "
            class="bg-red-600 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      </div>

      <div class="text-right">
        <h2 class="text-2xl font-bold">
          Total:
          Rs. {{ cartStore.totalPrice }}
        </h2>

        <router-link
          to="/checkout"
          class="bg-red-600 text-white px-6 py-3 rounded-lg inline-block mt-4"
        >
          Checkout
        </router-link>
      </div>
    </div>

    <div v-else>
      Your cart is empty.
    </div>
  </div>
</template>