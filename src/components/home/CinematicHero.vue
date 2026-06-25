<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useContentStore } from '../../stores/contentStore'
import fallbackHero from '../../assets/testing_2.png'

const content = useContentStore()
const active = ref(0)
let timer

const fallbackSlides = [
  {
    title: 'Drive',
    backgroundWord: 'Your Style',
    subtitle: 'Premium car care',
    primaryCtaLabel: 'Explore Collection',
    primaryCtaLink: '/products',
    image: fallbackHero,
    imagePosition: 'center center',
    statOneValue: '100%',
    statOneLabel: 'Authentic',
    statTwoValue: 'Fast',
    statTwoLabel: 'Secure Shipping',
    statThreeValue: 'Easy',
    statThreeLabel: 'Returns',
  },
]

const slides = computed(() => {
  const items = content.heroSlides?.length ? content.heroSlides : fallbackSlides
  return items.filter((slide) => slide.active !== false)
})

const slide = computed(() => slides.value[active.value] || fallbackSlides[0])
const slideCount = computed(() => Math.max(slides.value.length, 1))
const heroImage = computed(() => slide.value?.image || fallbackHero)
const imagePosition = computed(() => slide.value?.imagePosition || 'center center')

const specs = computed(() => {
  const current = slide.value || {}

  return [
    { value: current.statOneValue || '100%', label: current.statOneLabel || 'Authentic' },
    { value: current.statTwoValue || 'Fast', label: current.statTwoLabel || 'Secure Shipping' },
    { value: current.statThreeValue || 'Easy', label: current.statThreeLabel || 'Returns' },
  ]
})


const next = () => {
  active.value = (active.value + 1) % slideCount.value
}

const prev = () => {
  active.value = (active.value - 1 + slideCount.value) % slideCount.value
}

const goTo = (index) => {
  active.value = index
}

watch(slides, (items) => {
  if (active.value >= items.length) active.value = 0
})

onMounted(async () => {
  await content.loadStorefrontContent()

  if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(next, 7200)
  }
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <section
    data-hero-section
    class="relative isolate h-[100svh] overflow-hidden bg-black pt-[74px] text-white"
    aria-label="Haxon cinematic opening"
  >
    <transition name="hero-image-fade" mode="out-in">
      <img
        :key="heroImage + active"
        :src="heroImage"
        :alt="slide?.imageAlt || slide?.title || 'Haxon automotive hero image'"
        class="absolute inset-0 -z-30 h-full w-full object-cover"
        :style="{ objectPosition: imagePosition }"
        @error="$event.target.src = fallbackHero"
      />
    </transition>

    <div class="absolute inset-0 -z-20 bg-black/25"></div>

    <div
      class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_55%_48%,transparent_0%,rgba(0,0,0,0.04)_32%,rgba(0,0,0,0.9)_100%)]"
    ></div>

    <div
      class="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.6)_24%,rgba(0,0,0,0.1)_52%,rgba(0,0,0,0.55)_100%)]"
    ></div>

    <div
      class="absolute inset-x-0 bottom-0 -z-20 h-44 bg-gradient-to-t from-black via-black/65 to-transparent"
    ></div>

    <div class="mx-auto flex h-full max-w-[1500px] px-5 sm:px-8 lg:px-12">
      <transition name="hero-copy" mode="out-in">
        <div
          :key="slide?.id || slide?.title || active"
          class="relative grid h-full w-full grid-rows-[minmax(0,1fr)_auto] pb-4"
        >
          <div class="grid min-h-0 items-center lg:grid-cols-[0.76fr_1fr_0.42fr]">
            <div class="max-w-xl">
              <div
                class="mb-4 h-1 w-12 bg-[#E50914] shadow-[0_0_18px_rgba(229,9,20,0.75)]"
              ></div>

              <p
                class="hero-short-hide mb-3 hidden text-[10px] font-black uppercase tracking-[0.28em] text-white/55 sm:block"
              >
                {{ slide?.eyebrow || 'Premium Automotive Accessories' }}
              </p>

              <h1
                class="text-[clamp(2.9rem,6vw,6.1rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-white"
              >
                {{ slide?.title || 'Drive' }}
              </h1>

              <h2
                class="mt-1 text-[clamp(2.35rem,5.1vw,5.2rem)] font-light uppercase leading-[0.88] tracking-[-0.04em] text-white/75"
              >
                {{ slide?.backgroundWord || 'Your Style' }}
              </h2>

              <p
                class="hero-short-tight mt-5 max-w-md text-sm font-medium leading-6 text-white/58 sm:text-base sm:leading-7"
              >
                {{
                  slide?.subtitle ||
                  'Premium car care, LED lighting & performance accessories from trusted brands.'
                }}
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <router-link
                  :to="slide?.primaryCtaLink || '/products'"
                  class="group inline-flex h-11 items-center gap-5 border border-[#E50914] bg-black/25 px-6 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#E50914]"
                >
                  {{ slide?.primaryCtaLabel || 'Explore Collection' }}
                  <span class="text-lg transition group-hover:translate-x-1">→</span>
                </router-link>
              </div>
            </div>

            <div class="hidden lg:block"></div>

            
          </div>

          <div
  class="grid shrink-0 gap-4 border-t border-white/10 pt-4 lg:grid-cols-[1fr_auto] lg:items-end"
>
  <div class="hidden gap-6 md:grid md:grid-cols-4">
    <div class="border-r border-white/10 pr-5 last:border-r-0">
      <p class="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
        Lighting
      </p>
      <p class="mt-1 text-[11px] font-medium text-white/42">
        LED · Fog · Ambient
      </p>
    </div>

    <div class="border-r border-white/10 pr-5 last:border-r-0">
      <p class="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
        Interior
      </p>
      <p class="mt-1 text-[11px] font-medium text-white/42">
        Android · Audio · Comfort
      </p>
    </div>

    <div class="border-r border-white/10 pr-5 last:border-r-0">
      <p class="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
        Exterior
      </p>
      <p class="mt-1 text-[11px] font-medium text-white/42">
        Protection · Styling
      </p>
    </div>

    <div class="pr-5">
      <p class="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
        Essentials
      </p>
      <p class="mt-1 text-[11px] font-medium text-white/42">
        Tools · Care · Safety
      </p>
    </div>
  </div>

  <div class="flex items-center justify-between gap-5 md:justify-end">
    <p class="text-xs font-black tracking-[0.16em] text-white">
      {{ String(active + 1).padStart(2, '0') }}
      /
      {{ String(slideCount).padStart(2, '0') }}
    </p>

    <button
      class="text-lg text-white/45 transition hover:text-white"
      aria-label="Previous slide"
      @click="prev"
    >
      ←
    </button>

    <div class="flex items-center gap-2">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="h-[2px] w-9 bg-white/25 transition"
        :class="i === active ? '!bg-[#E50914]' : ''"
        :aria-label="`Go to slide ${i + 1}`"
        @click="goTo(i)"
      ></button>
    </div>

    <button
      class="text-lg text-white/45 transition hover:text-white"
      aria-label="Next slide"
      @click="next"
    >
      →
    </button>
  </div>
</div>
          
        </div>
      </transition>
    </div>

    <div
      class="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="h-1.5 w-1.5 rounded-full bg-white/30 transition"
        :class="i === active ? 'scale-[1.8] bg-white ring-1 ring-white/60 ring-offset-4 ring-offset-black' : ''"
        :aria-label="`Go to slide ${i + 1}`"
        @click="goTo(i)"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.hero-image-fade-enter-active,
.hero-image-fade-leave-active {
  transition:
    opacity 0.8s ease,
    transform 1.2s ease;
}

.hero-image-fade-enter-from,
.hero-image-fade-leave-to {
  opacity: 0;
  transform: scale(1.035);
}

.hero-copy-enter-active,
.hero-copy-leave-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.hero-copy-enter-from,
.hero-copy-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

@media (max-height: 760px) and (min-width: 1024px) {
  .hero-short-hide {
    display: none;
  }

  .hero-short-tight {
    margin-top: 1rem;
  }
}

@media (max-height: 700px) and (min-width: 1024px) {
  .hero-bottom-note {
    display: none;
  }
}

@media (max-width: 767px) {
  section[data-hero-section] {
    padding-top: 68px;
  }
}
</style>