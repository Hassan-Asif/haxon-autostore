<script setup>
const brands = [
  {
    name: 'Toyota',
    logo: '/brands/toyota.svg',
  },
  {
    name: 'Honda',
    logo: '/brands/honda.svg',
  },
  {
    name: 'Suzuki',
    logo: '/brands/suzuki.svg',
  },
  {
    name: 'Kia',
    logo: '/brands/kia.svg',
  },
  {
    name: 'Hyundai',
    logo: '/brands/hyundai.svg',
  },
  {
    name: 'MG',
    logo: '/brands/mg.svg',
  },
  {
    name: 'Changan',
    logo: '/brands/changan.svg',
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-[#202326] border-y border-white/10">
    <div class="absolute inset-0 bg-[linear-gradient(180deg,#25292D_0%,#202326_48%,#17191B_100%)]"></div>

    <div class="absolute inset-0 opacity-[0.07] bg-[linear-gradient(115deg,transparent_0%,transparent_38%,rgba(255,255,255,0.22)_50%,transparent_62%,transparent_100%)]"></div>

    <div class="relative max-w-7xl mx-auto px-6 py-12">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="w-10 h-px bg-[#D90429]"></span>

            <p class="uppercase tracking-[0.34em] text-[#C0C0C0] text-[11px] font-semibold">
              Shop by vehicle
            </p>
          </div>

          <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight">
            Find your fitment.
          </h2>
        </div>

        <p class="text-[#C0C0C0] max-w-md text-sm md:text-base leading-relaxed">
          Browse accessories by popular vehicle brands in Pakistan.
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        <router-link
          v-for="brand in brands"
          :key="brand.name"
          :to="`/products?brand=${encodeURIComponent(brand.name)}`"
          class="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#17191B]/80 min-h-[150px] p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#D90429]/60 hover:bg-[#202428] hover:shadow-2xl hover:shadow-black/30"
        >
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.08)_48%,transparent_62%)]"></div>

          <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-lg shadow-black/20">
            <img
              :src="brand.logo"
              :alt="`${brand.name} logo`"
              class="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition duration-300"
              @error="$event.target.style.display = 'none'"
            />

            <span class="hidden text-[#121212] font-black text-xl">
              {{ brand.name.charAt(0) }}
            </span>
          </div>

          <h3 class="relative mt-4 text-white font-black uppercase tracking-wide text-sm">
            {{ brand.name }}
          </h3>

          <div class="relative mt-3 h-px w-10 bg-white/10 overflow-hidden">
            <div class="h-full w-0 bg-[#D90429] group-hover:w-full transition-all duration-300"></div>
          </div>

          <p class="relative mt-3 text-[#D90429] text-xs font-bold opacity-0 group-hover:opacity-100 transition">
            Browse →
          </p>
        </router-link>
      </div>
    </div>
  </section>
</template>