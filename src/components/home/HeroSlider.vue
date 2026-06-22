<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentSlide = ref(0)

const slides = [
  {
    badge: 'Haxon Automotive',
    title: 'Upgrade The Way Your Car Feels',
    subtitle:
      'Premium automotive accessories, lighting, multimedia, car care, and essentials delivered across Pakistan.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80',
  },
  {
    badge: 'Performance Accessories',
    title: 'Built For Style, Comfort & Utility',
    subtitle:
      'From LED lighting to Android panels, interior upgrades, emergency tools, and daily-use accessories.',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80',
  },
  {
    badge: 'Across Pakistan',
    title: 'Confirmed Before Dispatch',
    subtitle:
      'We check availability before shipping, so your order stays clear, confirmed, and drama-free.',
    image:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1800&q=80',
  },
]

let sliderTimer = null

const nextSlide = () => {
  currentSlide.value =
    (currentSlide.value + 1) % slides.length
}

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? slides.length - 1
      : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

onMounted(() => {
  sliderTimer = setInterval(nextSlide, 5000)
})

onBeforeUnmount(() => {
  if (sliderTimer) {
    clearInterval(sliderTimer)
  }
})
</script>

<template>
  <section class="relative min-h-[88vh] overflow-hidden">
    <div
      v-for="(slide, index) in slides"
      :key="slide.title"
      class="absolute inset-0 transition-opacity duration-700"
      :class="
        currentSlide === index
          ? 'opacity-100'
          : 'opacity-0'
      "
    >
      <img
        :src="slide.image"
        :alt="slide.title"
        class="w-full h-full object-cover"
      />

      <div class="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/85 to-[#121212]/20"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 min-h-[88vh] flex items-center">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-3 bg-white/10 border border-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
          <span class="w-2 h-2 rounded-full bg-[#D90429] animate-pulse"></span>

          <span class="text-xs uppercase tracking-[0.35em] text-[#C0C0C0]">
            {{ slides[currentSlide].badge }}
          </span>
        </div>

        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
          {{ slides[currentSlide].title }}
        </h1>

        <p class="text-[#C0C0C0] text-lg md:text-xl mt-7 max-w-2xl leading-relaxed">
          {{ slides[currentSlide].subtitle }}
        </p>

        <div class="mt-9 flex flex-col sm:flex-row gap-4">
          <router-link
            to="/products"
            class="bg-[#D90429] hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold transition shadow-2xl shadow-[#D90429]/25 text-center"
          >
            Shop Products →
          </router-link>

          <router-link
            to="/contact"
            class="border border-white/15 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold transition text-center"
          >
            Find Accessories For My Car
          </router-link>
        </div>
      </div>
    </div>

    <button
      @click="previousSlide"
      class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-[#D90429] border border-white/10 items-center justify-center transition text-3xl"
      aria-label="Previous slide"
    >
      ‹
    </button>

    <button
      @click="nextSlide"
      class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-[#D90429] border border-white/10 items-center justify-center transition text-3xl"
      aria-label="Next slide"
    >
      ›
    </button>

    <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="h-2 rounded-full transition-all"
        :class="
          currentSlide === index
            ? 'w-12 bg-[#D90429]'
            : 'w-3 bg-white/40'
        "
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>