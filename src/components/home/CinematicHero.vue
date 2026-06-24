<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const slides = [
  { kicker: 'Premium lighting', word: 'DRIVE', title: 'Light the road like a studio shot.', copy: 'LED upgrades and visibility accessories composed for clean fitment, confident night drives, and a sharper front-end presence.', image: '/src/assets/hero.png', cta: 'Explore Lighting' },
  { kicker: 'Cabin refinement', word: 'DETAIL', title: 'Interior upgrades with a factory-clean feel.', copy: 'Organized cabin essentials, trims, mats, and comfort accessories curated for daily Pakistani roads.', image: '/src/assets/testing.png', cta: 'Shop Interior' },
  { kicker: 'Android panels', word: 'MEDIA', title: 'Bring the cockpit into the present.', copy: 'Multimedia panels, audio upgrades, and smart interfaces sourced with fitment checks before dispatch.', image: '/src/assets/testing_2.png', cta: 'View Panels' },
  { kicker: 'Care & protection', word: 'HAXON', title: 'Protect the finish. Preserve the drama.', copy: 'Car care, security, emergency, and protection essentials for serious owners.', image: '/image/products/no-image.jpeg', cta: 'Car Care' },
]
const active = ref(0)
let timer
onMounted(() => { timer = setInterval(() => { active.value = (active.value + 1) % slides.length }, 6200) })
onUnmounted(() => clearInterval(timer))
const slide = computed(() => slides[active.value])
</script>
<template>
  <section class="cinema-hero relative min-h-[92vh] overflow-hidden pt-28 text-haxon-main">
    <transition name="hero-fade" mode="out-in">
      <div :key="slide.title" class="absolute inset-0">
        <img :src="slide.image" class="h-full w-full object-cover opacity-55" @error="$event.target.src='/image/products/no-image.jpeg'" />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(229,9,20,.18),transparent_28rem),linear-gradient(90deg,rgba(5,6,8,.96),rgba(5,6,8,.64)_42%,rgba(5,6,8,.92)),linear-gradient(0deg,#050608,transparent_42%)]"></div>
      </div>
    </transition>
    <div class="relative mx-auto flex min-h-[calc(92vh-7rem)] max-w-7xl flex-col justify-center px-5 py-16 sm:px-6 lg:px-8">
      <p class="premium-eyebrow">{{ slide.kicker }}</p>
      <div class="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[17vw] font-black tracking-[-.1em] text-white/[.035] lg:block">{{ slide.word }}</div>
      <div class="max-w-4xl">
        <h1 class="text-[clamp(3.2rem,9vw,8.6rem)] font-black leading-[.86] tracking-[-.08em]">{{ slide.title }}</h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-haxon-muted md:text-xl">{{ slide.copy }}</p>
        <div class="mt-9 flex flex-wrap gap-3">
          <router-link to="/products" class="premium-btn premium-btn-light">Explore Collection</router-link>
          <router-link to="/contact" class="premium-btn premium-btn-ghost">Fitment Help</router-link>
        </div>
        <div class="mt-7 flex flex-wrap gap-4 text-sm text-haxon-muted">
          <router-link to="/track-order" class="hover:text-white">Track Order →</router-link>
          <router-link to="/brands" class="hover:text-white">View Brands →</router-link>
        </div>
      </div>
      <div class="mt-12 grid gap-2 border-y border-white/10 py-4 sm:grid-cols-4">
        <div v-for="item in ['Ready Dispatch','Fitment Checked','Premium Imports','Custom Sourcing']" :key="item" class="flex items-center gap-3 text-xs font-black uppercase tracking-[.22em] text-white/70"><span class="h-px w-8 bg-haxon-red"></span>{{ item }}</div>
      </div>
      <div class="absolute bottom-8 right-6 flex gap-2">
        <button v-for="(_,i) in slides" :key="i" class="h-1.5 rounded-full transition-all" :class="i===active ? 'w-12 bg-white' : 'w-6 bg-white/25'" @click="active=i"></button>
      </div>
    </div>
  </section>
</template>
