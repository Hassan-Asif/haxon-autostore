<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const formatPrice = (value) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

const getItemPrice = (item) => {
  if (
    item.saleEnabled &&
    item.salePrice &&
    Number(item.salePrice) < Number(item.price)
  ) {
    return Number(item.salePrice)
  }

  return Number(item.price || 0)
}

const subtotal = computed(() => {
  return cartStore.items.reduce((total, item) => {
    return total + getItemPrice(item) * Number(item.quantity || 1)
  }, 0)
})

const deliveryEstimate = computed(() => {
  return cartStore.items.length ? 'Confirmed at checkout' : '-'
})
</script>

<template>
  <div class="storefront-page min-h-screen pt-24 text-white">
    <section class="relative bg-transparent border-b border-white/10 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(135deg,#101112_0%,#1B1E21_45%,#252A2F_55%,#111213_100%)]"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-12">
        <div class="flex items-center gap-4 mb-4">
          <span class="h-px w-10 bg-[#E50914]"></span>

          <p class="uppercase tracking-[0.34em] text-[#C0C0C0] text-[11px] font-semibold">
            Haxon Checkout
          </p>

          <span class="h-px w-10 bg-[#E50914]"></span>
        </div>

        <h1 class="text-4xl md:text-6xl font-black tracking-tight">
          Shopping cart.
        </h1>

        <p class="text-[#C0C0C0] mt-4 max-w-2xl">
          Review your selected accessories before checkout. Availability is confirmed before dispatch.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-10">
      <div
        v-if="cartStore.items.length"
        class="grid lg:grid-cols-3 gap-8"
      >
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="bg-[#181A1D] border border-white/10 rounded-3xl p-4 md:p-5 flex flex-col md:flex-row gap-5 hover:border-[#D90429]/40 transition"
          >
            <img
              :src="item.image || '/image/products/no-image.jpeg'"
              :alt="item.name"
              class="w-full md:w-32 h-44 md:h-32 object-cover rounded-2xl border border-white/10 bg-[#121212]"
              @error="$event.target.src = '/image/products/no-image.jpeg'"
            />

            <div class="flex-1">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.24em] text-[#C0C0C0]">
                    {{ item.category || 'Accessory' }}
                  </p>

                  <h2 class="text-xl font-black mt-2">
                    {{ item.name }}
                  </h2>

                  <p class="text-[#C0C0C0] text-sm mt-2">
                    {{ item.carBrand || 'Universal' }}
                    {{ item.carModel || '' }}
                  </p>
                </div>

                <div class="md:text-right">
                  <p
                    v-if="item.saleEnabled && item.salePrice"
                    class="text-sm text-[#C0C0C0] line-through"
                  >
                    {{ formatPrice(item.price) }}
                  </p>

                  <p class="text-2xl font-black text-[#E50914]">
                    {{ formatPrice(getItemPrice(item)) }}
                  </p>
                </div>
              </div>

              <div class="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center gap-3">
                  <button
                    @click="cartStore.decreaseQuantity(item.id)"
                    class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-[#E50914] transition font-bold"
                  >
                    -
                  </button>

                  <span class="min-w-10 text-center font-bold">
                    {{ item.quantity }}
                  </span>

                  <button
                    @click="cartStore.increaseQuantity(item.id)"
                    class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-[#E50914] transition font-bold"
                  >
                    +
                  </button>
                </div>

                <div class="flex items-center gap-4">
                  <p class="font-bold">
                    {{ formatPrice(getItemPrice(item) * Number(item.quantity || 1)) }}
                  </p>

                  <button
                    @click="cartStore.removeFromCart(item.id)"
                    class="text-[#C0C0C0] hover:text-[#E50914] transition font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <router-link
            to="/products"
            class="inline-flex mt-4 text-[#C0C0C0] hover:text-white transition"
          >
            ← Continue shopping
          </router-link>
        </div>

        <aside class="bg-[#181A1D] border border-white/10 rounded-3xl p-6 h-fit sticky top-28 shadow-2xl shadow-black/20">
          <h2 class="text-2xl font-black">
            Order Summary
          </h2>

          <div class="mt-6 space-y-4 text-sm">
            <div class="flex justify-between">
              <span class="text-[#C0C0C0]">
                Items
              </span>

              <span class="font-bold">
                {{ cartStore.totalItems }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-[#C0C0C0]">
                Subtotal
              </span>

              <span class="font-bold">
                {{ formatPrice(subtotal) }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-[#C0C0C0]">
                Delivery
              </span>

              <span class="font-bold">
                {{ deliveryEstimate }}
              </span>
            </div>
          </div>

          <div class="border-t border-white/10 mt-6 pt-6 flex justify-between items-center">
            <span class="text-[#C0C0C0]">
              Estimated Total
            </span>

            <span class="text-3xl font-black text-[#E50914]">
              {{ formatPrice(subtotal) }}
            </span>
          </div>

          <router-link
            to="/checkout"
            class="block w-full mt-6 bg-[#E50914] hover:bg-red-700 text-white px-6 py-4 rounded-2xl text-center font-black transition shadow-xl shadow-black/30"
          >
            Proceed to Checkout
          </router-link>

          <p class="text-xs text-[#C0C0C0] mt-4 leading-relaxed">
            Final delivery charges and availability will be confirmed before dispatch.
          </p>
        </aside>
      </div>

      <div
        v-else
        class="bg-[#181A1D] border border-white/10 rounded-[2rem] p-12 text-center"
      >
        <div class="text-6xl mb-5">
          🛒
        </div>

        <h2 class="text-3xl font-black">
          Your cart is empty
        </h2>

        <p class="text-[#C0C0C0] mt-3">
          Start adding accessories to build your order.
        </p>

        <router-link
          to="/products"
          class="inline-block mt-6 bg-[#E50914] hover:bg-red-700 text-white px-7 py-4 rounded-2xl font-black transition"
        >
          Browse Products
        </router-link>
      </div>
    </section>
  </div>
</template>