<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const currentSlide = ref(0)
const isPaused = ref(false)
const touchStartX = ref(0)

const slides = [
  {
    theme: 'dark',
    eyebrow: 'Premium Automotive Accessories',
    title: 'Details that complete the car.',
    subtitle:
      'Lighting, interiors, multimedia, tools and essentials — curated for drivers who care about fit, finish and feel.',
    image: '/images/toyota-dark-hero.png',
    tag: 'Curated Parts',
  },
  {
    theme: 'light',
    eyebrow: 'Built Around Fitment',
    title: 'Find the right upgrade faster.',
    subtitle:
      'Choose by vehicle, category or purpose. Cleaner browsing, clearer choices, better parts for your car.',
    image: '/images/toyota-light-hero.png',
    tag: 'Verified Fit',
  },
  {
    theme: 'dark',
    eyebrow: 'Haxon Standard',
    title: 'No noise. Just good parts.',
    subtitle:
      'Clean pricing, confirmed availability and products selected with actual use in mind.',
    image: '/images/toyota-black-hero.png',
    tag: 'Ready to Dispatch',
  },
]

const activeSlide = computed(() => slides[currentSlide.value])
const isDark = computed(() => activeSlide.value.theme === 'dark')

let timer = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const handleTouchStart = (event) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchEnd = (event) => {
  const touchEndX = event.changedTouches[0].clientX
  const difference = touchStartX.value - touchEndX

  if (Math.abs(difference) > 50) {
    difference > 0 ? nextSlide() : previousSlide()
  }
}

onMounted(() => {
  timer = setInterval(() => {
    if (!isPaused.value) nextSlide()
  }, 7000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    class="relative h-[560px] overflow-hidden transition-colors duration-700 sm:h-[600px] lg:h-[640px]"
    :class="isDark ? 'bg-[#070707] text-white' : 'bg-[#f5f3ef] text-[#111]'"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="absolute inset-0">
      <div
        v-for="(slide, index) in slides"
        :key="slide.title"
        class="absolute inset-0 transition-opacity duration-1000 ease-out"
        :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          class="absolute top-0 h-full w-full object-cover object-center transition-transform duration-[7000ms] ease-out lg:w-[74%]"
          :class="[
            currentSlide === index ? 'scale-[1.025]' : 'scale-100',
            slide.theme === 'dark'
              ? 'right-[-5%] opacity-80'
              : 'right-[-3%] opacity-95',
          ]"
        />

        <template v-if="slide.theme === 'dark'">
          <div class="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/96 via-[30%] to-[#070707]/18"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#070707]/85 via-transparent to-[#070707]/15"></div>
        </template>

        <template v-else>
          <div class="absolute inset-0 bg-gradient-to-r from-[#f5f3ef] via-[#f5f3ef]/90 via-[30%] to-[#f5f3ef]/10"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#f5f3ef]/65 via-transparent to-white/10"></div>
        </template>
      </div>
    </div>

    <div
      class="pointer-events-none absolute left-[-160px] top-[-160px] h-[430px] w-[430px] rounded-full blur-[130px]"
      :class="isDark ? 'bg-[#d90429]/8' : 'bg-[#d90429]/10'"
    ></div>

    <div class="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="h-px w-12 bg-[#d90429]"></span>

          <Transition
            mode="out-in"
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <p
              :key="activeSlide.eyebrow"
              class="text-[10px] font-black uppercase tracking-[0.34em]"
              :class="isDark ? 'text-white/65' : 'text-black/55'"
            >
              {{ activeSlide.eyebrow }}
            </p>
          </Transition>
        </div>

        <p
          class="hidden text-[10px] font-black uppercase tracking-[0.26em] sm:block"
          :class="isDark ? 'text-white/45' : 'text-black/40'"
        >
          Haxon / Automotive Goods
        </p>
      </div>

      <div class="flex flex-1 items-center">
        <div class="max-w-[620px]">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-700 ease-out"
            enter-from-class="translate-y-5 opacity-0 blur-sm"
            enter-to-class="translate-y-0 opacity-100 blur-0"
            leave-active-class="transition duration-250 ease-in"
            leave-from-class="translate-y-0 opacity-100 blur-0"
            leave-to-class="-translate-y-3 opacity-0 blur-sm"
          >
            <div :key="currentSlide">
              <p class="mb-5 text-[11px] font-black tracking-[0.34em] text-[#d90429]">
                {{ String(currentSlide + 1).padStart(2, '0') }}
              </p>

              <h1 class="max-w-[620px] text-5xl font-black leading-[0.84] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                {{ activeSlide.title }}
              </h1>

              <p
                class="mt-6 max-w-[540px] text-sm leading-7 sm:text-base"
                :class="isDark ? 'text-white/64' : 'text-black/60'"
              >
                {{ activeSlide.subtitle }}
              </p>
            </div>
          </Transition>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <router-link
              to="/products"
              class="group inline-flex min-w-[220px] items-center justify-center rounded-full px-7 py-4 text-[11px] font-black uppercase tracking-[0.16em] shadow-lg transition duration-300"
              :class="
                isDark
                  ? 'border border-white/10 bg-[#111] text-white shadow-black/25 hover:border-[#d90429]/70 hover:bg-[#181818]'
                  : 'border border-black/10 bg-[#FFFF] text-white shadow-black/10 hover:border-[#d90429]/70 hover:bg-[#dcdcdc]'
              "
            >
              Explore Products
              <span class="ml-3 transition group-hover:translate-x-1">→</span>
            </router-link>

            <router-link
              to="/products"
              class="inline-flex min-w-[220px] items-center justify-center rounded-full border px-7 py-4 text-[11px] font-black uppercase tracking-[0.16em] transition duration-300"
              :class="
                isDark
                  ? 'border-white/20 bg-transparent text-white/90 hover:border-white/45 hover:bg-white/[0.06] hover:text-white'
                  : 'border-black/20 bg-white/40 text-black hover:border-black/45 hover:bg-white/70'
              "
            >
              Browse Categories
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end">
        <div
          class="flex items-center gap-5 rounded-full px-1 py-1"
          :class="isDark ? 'bg-black/10' : 'bg-white/20'"
        >
          <button
            v-for="(slide, index) in slides"
            :key="slide.title"
            type="button"
            class="group flex items-center gap-3"
            @click="goToSlide(index)"
            :aria-label="`Go to slide ${index + 1}`"
          >
            <span
              class="text-[10px] font-black tracking-[0.22em] transition-colors duration-300"
              :class="
                currentSlide === index
                  ? 'text-[#d90429]'
                  : isDark
                    ? 'text-white/38 group-hover:text-white/65'
                    : 'text-black/35 group-hover:text-black/60'
              "
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <span
              class="relative h-[2px] overflow-hidden rounded-full transition-all duration-500"
              :class="[
                currentSlide === index ? 'w-20' : 'w-8',
                isDark
                  ? 'bg-white/16 group-hover:bg-white/30'
                  : 'bg-black/14 group-hover:bg-black/28',
              ]"
            >
              <span
                v-if="currentSlide === index"
                class="absolute inset-y-0 left-0 rounded-full bg-[#d90429]"
                :class="isPaused ? 'w-1/2' : 'animate-[slideProgress_7s_linear_infinite]'"
              ></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes slideProgress {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
</style>