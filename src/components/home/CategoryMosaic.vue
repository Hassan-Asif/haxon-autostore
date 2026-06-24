<script setup>
import { categories } from '../../lib/catalog'
const copy = {
  'LED & Lighting': 'Projectors, bulbs, DRLs and visibility upgrades.',
  'Android Panels': 'Smart cockpit panels with verified compatibility.',
  'Interior Accessories': 'Cabin finish, comfort, and daily-use refinement.',
  'Exterior Accessories': 'Clean stance, protection, and presence.',
  'Audio & Multimedia': 'Sound and interfaces for modern commutes.',
  'Car Care': 'Detailing essentials for a lasting finish.',
  Security: 'Locks, cameras, sensors and peace of mind.',
  'Tools & Emergency': 'Roadside essentials without the clutter.',
}
</script>
<template>
  <section class="premium-section">
    <div class="premium-container">
      <p class="premium-eyebrow">Featured categories</p>
      <div class="section-split"><h2 class="section-title">Cinematic collections, not cluttered aisles.</h2><p class="section-copy">Browse by upgrade intent. Every tile is built around a real automotive use case: visibility, cabin, media, protection, or emergency readiness.</p></div>
      <div class="mt-10 grid auto-rows-[220px] gap-4 md:grid-cols-4">
        <router-link v-for="(cat,i) in categories" :key="cat" :to="`/products?category=${encodeURIComponent(cat)}`" class="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-haxon-panel p-6 transition duration-500 hover:-translate-y-1 hover:border-white/25" :class="i < 2 ? 'md:col-span-2 md:row-span-2' : ''">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,.14),transparent_16rem),linear-gradient(135deg,rgba(229,9,20,.14),transparent_45%),#0b0e13]"></div>
          <div class="absolute -right-8 bottom-4 text-8xl font-black tracking-[-.08em] text-white/[.035]">{{ String(i+1).padStart(2,'0') }}</div>
          <div class="relative flex h-full flex-col justify-between"><span class="text-xs font-black uppercase tracking-[.25em] text-white/45">Haxon collection</span><div><h3 class="text-3xl font-black tracking-[-.04em]">{{ cat }}</h3><p class="mt-3 max-w-sm text-sm leading-6 text-haxon-muted">{{ copy[cat] }}</p><p class="mt-5 text-sm font-black uppercase tracking-[.18em] text-white/80">Explore →</p></div></div>
        </router-link>
      </div>
    </div>
  </section>
</template>
