<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { productImage } from '../lib/catalog'

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

  return Number(item.price || item.salePrice || 0)
}

const getOldPrice = (item) => {
  return Number(item.compareAtPrice || item.oldPrice || item.mrp || 0)
}

const hasDiscount = (item) => {
  const oldPrice = getOldPrice(item)
  const price = getItemPrice(item)

  return oldPrice > price && price > 0
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
  <main class="min-h-screen bg-black  text-white">
    <section class="relative overflow-hidden border-b border-white/10 bg-[#050607]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(229,9,20,0.12),transparent_34%),radial-gradient(circle_at_12%_80%,rgba(255,255,255,0.07),transparent_32%)]"
      ></div>

      <p
        class="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,19vw,20rem)] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.035] lg:block"
      >
        Cart
      </p>

      <div class="relative mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-12">
        <div class="max-w-3xl">
          <div class="mb-6 h-1 w-10 bg-[#E50914] shadow-[0_0_18px_rgba(229,9,20,.7)]"></div>

          <p class="text-[11px] font-black uppercase tracking-[0.32em] text-white/45">
            Haxon Checkout
          </p>

          <h1 class="mt-5 text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.84] tracking-[-0.075em]">
            Shopping cart.
          </h1>

          <p class="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            Review your selected accessories before checkout. Availability and fitment are confirmed before dispatch.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12">
      <div
        v-if="cartStore.items.length"
        class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]"
      >
        <div class="space-y-3">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="grid gap-4 border border-white/10 bg-[#050607] p-4 transition hover:border-white/20 md:grid-cols-[120px_1fr]"
          >
            <router-link
              :to="`/products/${item.id}`"
              class="relative flex h-32 items-center justify-center overflow-hidden border border-white/10 bg-[#07080a]"
            >
              <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.1),transparent_46%)]"
              ></div>

              <img
                :src="productImage(item) || item.image || '/image/products/no-image.jpeg'"
                :alt="item.name"
                class="relative z-10 h-[92%] w-[92%] object-contain"
                @error="$event.target.src = '/image/products/no-image.jpeg'"
              />
            </router-link>

            <div class="min-w-0">
              <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div class="min-w-0">
                  <p class="text-[10px] font-black uppercase tracking-[0.2em] text-white/38">
                    {{ item.category || 'Accessory' }}
                  </p>

                  <router-link :to="`/products/${item.id}`">
                    <h2 class="mt-2 line-clamp-2 text-xl font-black leading-tight tracking-[-0.035em] text-white/90 transition hover:text-white">
                      {{ item.name }}
                    </h2>
                  </router-link>

                  <p class="mt-2 line-clamp-1 text-sm text-white/42">
                    {{ item.carBrand || item.brand || 'Universal' }}
                    {{ item.carModel || item.fitmentNotes || '' }}
                  </p>
                </div>

                <div class="shrink-0 md:text-right">
                  <p
                    v-if="hasDiscount(item)"
                    class="text-xs font-semibold text-white/28 line-through"
                  >
                    {{ formatPrice(getOldPrice(item)) }}
                  </p>

                  <p class="mt-1 text-xl font-black tracking-[-0.03em] text-white">
                    {{ formatPrice(getItemPrice(item)) }}
                  </p>
                </div>
              </div>

              <div class="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex w-fit items-center border border-white/10 bg-white/[0.025]">
                  <button
                    class="grid h-10 w-10 place-items-center text-lg font-black text-white/55 transition hover:bg-[#E50914] hover:text-white"
                    @click="cartStore.decreaseQuantity(item.id)"
                  >
                    -
                  </button>

                  <span class="grid h-10 min-w-10 place-items-center border-x border-white/10 px-3 text-sm font-black">
                    {{ item.quantity }}
                  </span>

                  <button
                    class="grid h-10 w-10 place-items-center text-lg font-black text-white/55 transition hover:bg-[#E50914] hover:text-white"
                    @click="cartStore.increaseQuantity(item.id)"
                  >
                    +
                  </button>
                </div>

                <div class="flex items-center justify-between gap-5 sm:justify-end">
                  <p class="text-sm font-black uppercase tracking-[0.08em] text-white/82">
                    {{ formatPrice(getItemPrice(item) * Number(item.quantity || 1)) }}
                  </p>

                  <button
                    class="text-[11px] font-black uppercase tracking-[0.16em] text-white/38 transition hover:text-[#E50914]"
                    @click="cartStore.removeFromCart(item.id)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <router-link
            to="/products"
            class="inline-flex pt-4 text-[11px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:text-white"
          >
            ← Continue shopping
          </router-link>
        </div>

        <aside class="h-fit border border-white/10 bg-[#050607] p-6 lg:sticky lg:top-24">
          <p class="text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
            Order Summary
          </p>

          <h2 class="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">
            Checkout
          </h2>

          <div class="mt-7 divide-y divide-white/10 text-sm">
            <div class="flex justify-between py-4">
              <span class="text-white/42">Items</span>
              <span class="font-black">{{ cartStore.totalItems }}</span>
            </div>

            <div class="flex justify-between py-4">
              <span class="text-white/42">Subtotal</span>
              <span class="font-black">{{ formatPrice(subtotal) }}</span>
            </div>

            <div class="flex justify-between py-4">
              <span class="text-white/42">Delivery</span>
              <span class="font-black text-white/70">{{ deliveryEstimate }}</span>
            </div>
          </div>

          <div class="mt-6 border-t border-white/10 pt-6">
            <div class="flex items-end justify-between gap-4">
              <span class="text-sm text-white/42">
                Estimated Total
              </span>

              <span class="text-3xl font-black tracking-[-0.05em] text-white">
                {{ formatPrice(subtotal) }}
              </span>
            </div>
          </div>

          <router-link
            to="/checkout"
            class="mt-7 grid h-12 place-items-center border border-[#E50914] bg-[#E50914] px-6 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
          >
            Proceed to Checkout
          </router-link>

          <p class="mt-5 text-xs leading-6 text-white/38">
            Final delivery charges, availability, and fitment are confirmed before dispatch.
          </p>

          <div class="mt-6 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-5">
            <div class="pr-3">
              <p class="text-[9px] font-black uppercase tracking-[0.14em] text-white/65">
                Checked
              </p>
              <p class="mt-1 text-[11px] text-white/35">
                Fitment
              </p>
            </div>

            <div class="px-3">
              <p class="text-[9px] font-black uppercase tracking-[0.14em] text-white/65">
                Secure
              </p>
              <p class="mt-1 text-[11px] text-white/35">
                Checkout
              </p>
            </div>

            <div class="pl-3">
              <p class="text-[9px] font-black uppercase tracking-[0.14em] text-white/65">
                Support
              </p>
              <p class="mt-1 text-[11px] text-white/35">
                WhatsApp
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div
        v-else
        class="relative overflow-hidden border border-white/10 bg-[#050607] px-6 py-20 text-center"
      >
        <p
          class="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(7rem,15vw,15rem)] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.035] lg:block"
        >
          Empty
        </p>

        <div class="relative mx-auto max-w-lg">
          <p class="text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
            Your cart is empty
          </p>

          <h2 class="mt-4 text-4xl font-black uppercase tracking-[-0.05em]">
            Start building your order.
          </h2>

          <p class="mt-4 text-sm leading-7 text-white/45">
            Add accessories to your cart and review them here before checkout.
          </p>

          <router-link
            to="/products"
            class="mt-7 inline-grid h-12 place-items-center border border-[#E50914] bg-[#E50914] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
          >
            Browse Products
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>