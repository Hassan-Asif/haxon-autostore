<script setup>
import { ref } from 'vue'

const sliderRef = ref(null)

const categories = [
  {
    name: 'Exterior',
    label: 'Exterior Accessories',
    description: 'Styling • Trims • Aero',
    icon: '🚗',
  },
  {
    name: 'Interior',
    label: 'Interior Accessories',
    description: 'Comfort • Mats • Cabin',
    icon: '🛋️',
  },
  {
    name: 'LED',
    label: 'LED & Lighting',
    description: 'Headlights • Fog • DRLs',
    icon: '💡',
  },
  {
    name: 'Android',
    label: 'Android Panels',
    description: 'Screens • Navigation • Smart',
    icon: '📱',
  },
  {
    name: 'Audio',
    label: 'Audio & Multimedia',
    description: 'Speakers • Sound • Media',
    icon: '🔊',
  },
  {
    name: 'Car Care',
    label: 'Car Care',
    description: 'Detailing • Polish • Clean',
    icon: '🧽',
  },
  {
    name: 'Security',
    label: 'Security',
    description: 'Safety • Locks • Utility',
    icon: '🔒',
  },
  {
    name: 'Tools',
    label: 'Tools',
    description: 'Pumps • Kits • Emergency',
    icon: '🧰',
  },
]

const scrollSlider = (direction) => {
  if (!sliderRef.value) return

  sliderRef.value.scrollBy({
    left: direction * 320,
    behavior: 'smooth',
  })
}

const handleWheel = (event) => {
  if (!sliderRef.value) return

  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault()

    sliderRef.value.scrollBy({
      left: event.deltaY,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <section class="relative overflow-hidden bg-[#17191B] border-y border-white/10">
    <div class="absolute inset-0 bg-[linear-gradient(180deg,#1B1E21_0%,#252A2F_48%,#151719_100%)]"></div>
    <div class="absolute inset-0 opacity-[0.12] bg-[linear-gradient(115deg,transparent_0%,transparent_38%,rgba(255,255,255,0.16)_50%,transparent_62%,transparent_100%)]"></div>
    <div class="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,transparent_42%)]"></div>

    <div class="relative max-w-7xl mx-auto px-6 py-12">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-7">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="w-9 h-px bg-[#D90429]"></span>

            <p class="uppercase tracking-[0.35em] text-[#C0C0C0] text-[11px] font-semibold">
              Collections
            </p>
          </div>

          <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight">
            Shop by category.
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="scrollSlider(-1)"
            class="hidden md:flex w-11 h-11 rounded-full border border-white/10 bg-white/[0.04] hover:bg-[#D90429] hover:border-[#D90429] items-center justify-center transition text-2xl"
            aria-label="Scroll categories left"
          >
            ‹
          </button>

          <button
            @click="scrollSlider(1)"
            class="hidden md:flex w-11 h-11 rounded-full border border-white/10 bg-white/[0.04] hover:bg-[#D90429] hover:border-[#D90429] items-center justify-center transition text-2xl"
            aria-label="Scroll categories right"
          >
            ›
          </button>

          <router-link
            to="/products"
            class="text-[#D90429] font-bold hover:text-white transition"
          >
            Browse all →
          </router-link>
        </div>
      </div>

      <div class="relative">
        <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#202429] to-transparent z-10"></div>
        <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#202429] to-transparent z-10"></div>

        <div
          ref="sliderRef"
          class="category-scroll flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 py-3"
          @wheel="handleWheel"
        >
          <router-link
            v-for="category in categories"
            :key="category.name"
            :to="`/products?category=${encodeURIComponent(category.label)}`"
            class="group relative snap-start shrink-0 w-[235px] md:w-[255px] min-h-[135px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#181A1D] p-5 transition-all duration-300 hover:w-[290px] hover:-translate-y-1 hover:border-[#D90429]/60 hover:shadow-2xl hover:shadow-black/40"
          >
            <div class="absolute inset-0 bg-[linear-gradient(135deg,#202429_0%,#151719_58%,#101112_100%)]"></div>

            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.09)_45%,transparent_62%)]"></div>

            <div class="absolute -right-8 -top-8 w-28 h-28 rounded-full border border-white/10 group-hover:border-[#D90429]/40 transition"></div>

            <div class="relative z-10 flex h-full flex-col">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-2xl group-hover:bg-[#D90429] group-hover:border-[#D90429] transition">
                  {{ category.icon }}
                </div>

                <span class="text-[#D90429] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition font-bold">
                  Explore →
                </span>
              </div>

              <div class="mt-auto pt-5">
                <h3 class="text-white text-xl font-black">
                  {{ category.name }}
                </h3>

                <p class="text-[#C0C0C0] text-sm mt-2 whitespace-nowrap">
                  {{ category.description }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-scroll {
  scrollbar-width: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}
</style>