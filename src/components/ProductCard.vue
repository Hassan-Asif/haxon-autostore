<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const displayPrice = computed(() => {
  return props.product.saleEnabled && props.product.salePrice
    ? props.product.salePrice
    : props.product.price
})

const hasSale = computed(() => {
  return (
    props.product.saleEnabled &&
    props.product.salePrice &&
    Number(props.product.salePrice) < Number(props.product.price)
  )
})

const availability = computed(() => {
  return (
    props.product.availability ||
    props.product.availabilityStatus ||
    'Check Availability'
  )
})

const isUnavailable = computed(() => {
  return (
    availability.value === 'Unavailable' ||
    availability.value === 'Out of Stock'
  )
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
  <div
    class="group bg-[#181818] text-white rounded-3xl overflow-hidden border border-white/5 hover:border-[#D90429]/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D90429]/10 transition-all duration-300"
  >
    <div class="relative h-48 md:h-64 bg-[#121212] overflow-hidden">
      <img
        :src="product.image || '/images/no-image.jpg'"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        @error="$event.target.src = '/images/no-image.jpg'"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent"></div>

      <div class="absolute top-3 left-3 flex flex-wrap gap-2">
        <span
          v-if="product.featured || product.isFeatured"
          class="bg-[#D90429] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-lg"
        >
          Featured
        </span>

        <span
          v-if="hasSale"
          class="bg-white text-[#D90429] text-[10px] md:text-xs font-bold px-3 py-1 rounded-full"
        >
          Sale
        </span>
      </div>

      <span
        class="absolute bottom-3 left-3 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full backdrop-blur"
        :class="{
          'bg-green-500/20 text-green-300 border border-green-500/30': availability === 'Available',
          'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30': availability === 'Check Availability',
          'bg-blue-500/20 text-blue-300 border border-blue-500/30': availability === 'Pre Order',
          'bg-red-500/20 text-red-300 border border-red-500/30': isUnavailable
        }"
      >
        {{ availability }}
      </span>
    </div>

    <div class="p-4 md:p-5">
      <p class="text-[#C0C0C0] text-xs uppercase tracking-[0.18em] line-clamp-1">
        {{ product.category || 'Accessory' }}
      </p>

      <h3 class="font-bold text-base md:text-xl mt-2 line-clamp-2 min-h-[48px]">
        {{ product.name }}
      </h3>

      <p class="text-[#C0C0C0] text-xs md:text-sm mt-2 line-clamp-1">
        {{ product.carBrand || 'Universal' }}
        {{ product.carModel || '' }}
      </p>

      <div class="mt-4">
        <p
          v-if="hasSale"
          class="text-[#C0C0C0] text-sm line-through"
        >
          {{ formatPrice(product.price) }}
        </p>

        <p class="text-[#D90429] text-xl md:text-2xl font-black">
          {{ formatPrice(displayPrice) }}
        </p>
      </div>

      <router-link
        :to="`/products/${product.id}`"
        class="mt-5 flex items-center justify-center w-full bg-[#D90429] hover:bg-red-700 text-white py-3 rounded-2xl text-sm md:text-base font-semibold transition shadow-lg shadow-[#D90429]/20"
      >
        View Product
        <span class="ml-2 group-hover:translate-x-1 transition">
          →
        </span>
      </router-link>
    </div>
  </div>
</template>