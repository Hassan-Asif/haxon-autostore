<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const hasSale = computed(() => {
  return (
    props.product.saleEnabled &&
    props.product.salePrice &&
    Number(props.product.salePrice) < Number(props.product.price)
  )
})

const displayPrice = computed(() => {
  return hasSale.value ? props.product.salePrice : props.product.price
})

const discountPercent = computed(() => {
  if (!hasSale.value) return 0

  const price = Number(props.product.price)
  const salePrice = Number(props.product.salePrice)

  return Math.round(((price - salePrice) / price) * 100)
})

const availability = computed(() => {
  return (
    props.product.availability ||
    props.product.availabilityStatus ||
    'Check Availability'
  )
})

const isUnavailable = computed(() => {
  return ['Unavailable', 'Out of Stock'].includes(availability.value)
})

const availabilityLabel = computed(() => {
  if (availability.value === 'Available') return 'Ready to Dispatch'
  if (availability.value === 'Pre Order') return 'Available on Order'
  return availability.value
})

const fitment = computed(() => {
  const brand = props.product.carBrand || 'Universal'
  const model = props.product.carModel || ''

  return `${brand} ${model}`.trim()
})

const formatPrice = (value) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}
</script>

<template>
  <article
    class="group overflow-hidden rounded-[28px] border border-black/10 bg-white text-[#121212] shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D90429]/40 hover:shadow-2xl hover:shadow-black/10"
  >
    <router-link
      :to="`/products/${product.id}`"
      class="block"
    >
      <div class="relative aspect-[4/3] overflow-hidden bg-[#111]">
        <img
          :src="product.image || '/images/no-image.jpg'"
          :alt="product.name"
          class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          @error="$event.target.src = '/images/no-image.jpg'"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

        <div class="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            v-if="product.featured || product.isFeatured"
            class="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md"
          >
            Haxon Pick
          </span>
        </div>

        <div
          class="absolute bottom-4 left-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md"
          :class="[
            availability === 'Available'
              ? 'border-green-400/30 bg-green-400/10 text-green-200'
              : availability === 'Pre Order'
                ? 'border-blue-400/30 bg-blue-400/10 text-blue-200'
                : isUnavailable
                  ? 'border-red-400/30 bg-red-400/10 text-red-200'
                  : 'border-white/15 bg-white/10 text-white'
          ]"
        >
          {{ availabilityLabel }}
        </div>
      </div>
    </router-link>

    <div class="p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-[10px] font-bold uppercase tracking-[0.28em] text-[#777]">
            {{ product.category || 'Accessory' }}
          </p>

          <h3 class="mt-2 min-h-[52px] text-lg font-black leading-tight tracking-tight line-clamp-2">
            {{ product.name }}
          </h3>
        </div>

        <button
          type="button"
          class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-lg text-[#777] transition hover:border-[#D90429]/40 hover:text-[#D90429]"
          aria-label="Save product"
        >
          ♡
        </button>
      </div>

      <p class="mt-2 text-sm text-[#777] line-clamp-1">
        {{ fitment }}
      </p>

      <div class="my-5 h-px bg-black/10"></div>

      <div class="flex items-end justify-between gap-4">
        <div>
          <p
            v-if="hasSale"
            class="relative inline-block text-sm font-medium text-[#999]"
          >
            {{ formatPrice(product.price) }}
            <span
              class="absolute left-0 top-1/2 h-px w-full origin-left scale-x-100 bg-[#999]"
            ></span>
          </p>

          <p class="mt-1 text-2xl font-black tracking-tight text-[#121212]">
            {{ formatPrice(displayPrice) }}
          </p>
        </div>

        <p
          v-if="hasSale"
          class="translate-y-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#D90429] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          -{{ discountPercent }}%
        </p>
      </div>

      <router-link
        :to="`/products/${product.id}`"
        class="mt-5 flex items-center justify-between rounded-2xl border border-black/10 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#121212] transition hover:border-[#D90429] hover:text-[#D90429]"
      >
        View Details
        <span class="transition group-hover:translate-x-1">→</span>
      </router-link>
    </div>
  </article>
</template>