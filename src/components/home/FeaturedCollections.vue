<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
let testing2 = 'src/assets/testing_2.png'

const activeIndex = ref(0)
let interval = null

const collections = [
  {
    eyebrow: 'Lighting',
    title: 'Night Drive',
    description: 'LEDs, fog lamps and visibility upgrades.',
    image: testing2,
  },
  {
    eyebrow: 'Interior',
    title: 'Cabin Finish',
    description: 'Mats, trims, organizers and daily-use details.',
    image: testing2,
  },
  {
    eyebrow: 'Multimedia',
    title: 'Smart Console',
    description: 'Android panels, cameras and connectivity.',
    image: testing2,
  },
  {
    eyebrow: 'Exterior',
    title: 'Body Finish',
    description: 'Body kits, covers and exterior details.',
    image: testing2,
  },
]

const activeCollection = computed(() => collections[activeIndex.value])

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % collections.length
}

onMounted(() => {
  interval = setInterval(nextSlide, 4500)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <section class="relative min-h-[90vh] overflow-hidden bg-[#070707] text-white">
    <transition name="banner-fade" mode="out-in">
      <img
        :key="activeCollection.image + activeCollection.title"
        :src="activeCollection.image"
        :alt="activeCollection.title"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </transition>

    <div class="absolute inset-0 bg-black/20"></div>

    <div
      class="absolute inset-0"
      style="
        background:
          linear-gradient(90deg,
            rgba(7,7,7,0.30) 0%,
            rgba(7,7,7,0.20) 38%,
            rgba(7,7,7,0.62) 68%,
            rgba(7,7,7,0.96) 100%
          ),
          linear-gradient(0deg,
            rgba(7,7,7,0.92) 0%,
            rgba(7,7,7,0.20) 42%,
            rgba(7,7,7,0.72) 100%
          );
      "
    ></div>

    <div class="relative z-10 grid min-h-[90vh] items-end px-5 py-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-16 lg:py-20">
      
      <!-- Left Rotating Text -->
      <div class="pb-4">
        <transition name="text-fade" mode="out-in">
          <div :key="activeCollection.title">
            <p class="text-[10px] font-black uppercase tracking-[0.36em] text-[#d90429]">
              {{ activeCollection.eyebrow }}
            </p>

            <h3 class="mt-4 max-w-xl text-5xl font-black leading-[0.84] tracking-[-0.075em] sm:text-7xl">
              {{ activeCollection.title }}
            </h3>

            <p class="mt-5 max-w-sm text-sm leading-7 text-white/70">
              {{ activeCollection.description }}
            </p>
          </div>
        </transition>
      </div>

      <!-- Right Static Brand Text -->
      <div class="mt-12 pb-4 lg:mt-0 lg:pl-12">
        <p class="mb-5 text-[10px] font-black uppercase tracking-[0.36em] text-white/40">
          Haxon Select
        </p>

        <h2 class="max-w-xl text-5xl font-black leading-[0.84] tracking-[-0.075em] sm:text-7xl">
          Your car, but sharper.
        </h2>

        <p class="mt-6 max-w-md text-sm leading-7 text-white/62">
          From lighting to cabin tech, every upgrade should feel fitted — not forced.
        </p>

        <router-link
          to="/products"
          class="mt-9 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#d90429] transition hover:text-white"
        >
          Explore collections
          <span>→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner-fade-enter-active,
.banner-fade-leave-active {
  transition:
    opacity 1000ms ease,
    transform 1300ms ease,
    filter 1000ms ease;
}

.banner-fade-enter-from {
  opacity: 0;
  transform: scale(1.035);
  filter: blur(8px);
}

.banner-fade-leave-to {
  opacity: 0;
  transform: scale(1.01);
  filter: blur(4px);
}

.text-fade-enter-active,
.text-fade-leave-active {
  transition:
    opacity 600ms ease,
    transform 700ms ease,
    filter 600ms ease;
}

.text-fade-enter-from {
  opacity: 0;
  transform: translateY(14px);
  filter: blur(5px);
}

.text-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  filter: blur(3px);
}
</style>