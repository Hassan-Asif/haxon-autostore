<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentSlide = ref(0)

const slides = [
  {
    eyebrow: 'Haxon Automotive',
    title: 'Refined upgrades for serious drivers.',
    subtitle:
      'Premium car accessories selected for fit, finish, and everyday use — confirmed before dispatch and delivered across Pakistan.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80',
  },
  {
    eyebrow: 'Performance Styling',
    title: 'Details that make the car feel complete.',
    subtitle:
      'Lighting, interiors, multimedia, tools, and care products chosen for clean styling and practical daily use.',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80',
  },
  {
    eyebrow: 'Confirmed Availability',
    title: 'Clear orders. No guesswork.',
    subtitle:
      'We verify availability before dispatch so every order moves with clarity from inquiry to delivery.',
    image:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1800&q=80',
  },
]

let sliderTimer = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
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
  sliderTimer = setInterval(nextSlide, 6500)
})

onBeforeUnmount(() => {
  if (sliderTimer) clearInterval(sliderTimer)
})
</script>

<template>
  <section class="relative min-h-[62vh] md:min-h-[66vh] overflow-hidden bg-[#121212] border-b border-white/10">
    <div
      v-for="(slide, index) in slides"
      :key="slide.title"
      class="absolute inset-0 transition-all duration-1000 ease-out"
      :class="
        currentSlide === index
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-105'
      "
    >
      <img
        :src="slide.image"
        :alt="slide.title"
        class="w-full h-full object-cover"
      />

      <div class="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/82 to-[#121212]/35"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-transparent to-[#121212]/20"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 min-h-[62vh] md:min-h-[66vh] flex items-center">
      <div
        :key="currentSlide"
        class="max-w-3xl animate-[heroFade_0.7s_ease-out]"
      >
        <div class="inline-flex items-center gap-3 bg-white/[0.07] border border-white/10 backdrop-blur px-4 py-2 rounded-full mb-5">
          <span class="w-2 h-2 rounded-full bg-[#D90429]"></span>

          <span class="text-[11px] uppercase tracking-[0.35em] text-[#C0C0C0] font-semibold">
            {{ slides[currentSlide].eyebrow }}
          </span>
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight max-w-4xl">
          {{ slides[currentSlide].title }}
        </h1>

        <p class="text-[#C0C0C0] text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
          {{ slides[currentSlide].subtitle }}
        </p>

        <div class="mt-7 flex flex-col sm:flex-row gap-4">
          <router-link
            to="/products"
            class="group bg-[#D90429] hover:bg-red-700 text-white px-7 py-4 rounded-2xl font-bold transition shadow-xl shadow-black/30 text-center"
          >
            Explore Products
            <span class="inline-block ml-2 group-hover:translate-x-1 transition">
              →
            </span>
          </router-link>

          <router-link
            to="/contact"
            class="border border-white/15 hover:bg-white/10 text-white px-7 py-4 rounded-2xl font-bold transition text-center"
          >
            Find My Fitment
          </router-link>
        </div>
      </div>
    </div>

    <button
      @click="previousSlide"
      class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#D90429] border border-white/10 items-center justify-center transition text-2xl backdrop-blur"
      aria-label="Previous slide"
    >
      ‹
    </button>

    <button
      @click="nextSlide"
      class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#D90429] border border-white/10 items-center justify-center transition text-2xl backdrop-blur"
      aria-label="Next slide"
    >
      ›
    </button>

    <div class="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="h-2 rounded-full transition-all duration-300"
        :class="
          currentSlide === index
            ? 'w-10 bg-[#D90429]'
            : 'w-2 bg-white/35 hover:bg-white/60'
        "
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<style scoped>
@keyframes heroFade {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>