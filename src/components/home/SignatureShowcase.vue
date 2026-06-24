<script setup>
import { computed } from 'vue'
import { FALLBACK_IMAGE, formatPrice, productBrand, productImage, productMode } from '../../lib/catalog'
const props = defineProps({ product: { type: Object, default: null } })
const item = computed(() => props.product || { id: '', name: 'Haxon Signature Fitment Kit', category: 'Premium Accessories', brand: 'HAXON', price: 0, image: FALLBACK_IMAGE, fitmentNotes: 'Vehicle-first sourcing with compatibility confirmation before dispatch.', productMode: 'Confirm Fitment' })
</script>
<template>
  <section class="premium-section pt-0">
    <div class="premium-container">
      <article class="relative overflow-hidden rounded-[2.6rem] border border-black/10 bg-[#f4f1ea] p-6 text-[#08090b] shadow-2xl shadow-black/35 md:p-10">
        <div class="absolute inset-x-0 top-10 text-center text-[17vw] font-black leading-none tracking-[-.12em] text-black/[.055]">HAXON</div>
        <div class="relative grid gap-8 lg:grid-cols-[.8fr_1.3fr_.7fr] lg:items-center">
          <div><p class="text-xs font-black uppercase tracking-[.32em] text-black/45">Signature product</p><h2 class="mt-4 text-5xl font-black leading-none tracking-[-.06em] md:text-7xl">{{ item.name }}</h2><p class="mt-5 text-sm uppercase tracking-[.22em] text-black/45">{{ productBrand(item) }} · {{ item.category }}</p></div>
          <div class="relative"><img :src="productImage(item)" class="mx-auto aspect-[16/9] w-full rounded-[2rem] object-cover mix-blend-multiply saturate-90" @error="$event.target.src=FALLBACK_IMAGE" /></div>
          <div class="divide-y divide-black/10 border-y border-black/10"><div class="py-5"><p class="text-xs uppercase tracking-[.22em] text-black/45">Mode</p><p class="mt-2 font-black">{{ productMode(item) }}</p></div><div class="py-5"><p class="text-xs uppercase tracking-[.22em] text-black/45">Price</p><p class="mt-2 text-3xl font-black">{{ Number(item.price || item.salePrice) ? formatPrice(item.salePrice || item.price) : 'On request' }}</p></div><div class="py-5"><p class="text-xs uppercase tracking-[.22em] text-black/45">Fitment</p><p class="mt-2 text-sm leading-6 text-black/60">{{ item.fitmentNotes || 'Confirmed before dispatch.' }}</p></div><router-link :to="item.id ? `/products/${item.id}` : '/contact'" class="mt-6 inline-flex w-full justify-center rounded-full bg-black px-6 py-4 text-sm font-black uppercase tracking-[.18em] text-white">Configure →</router-link></div>
        </div>
      </article>
    </div>
  </section>
</template>
