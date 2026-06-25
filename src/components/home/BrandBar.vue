<script setup>
const brands = [
  { name: 'Carrera Car Care', logo: '/images/brands/carrera.png', link: '/products?brand=Carrera' },
  { name: 'Bugatti', logo: '/images/brands/bugatti.png', link: '/products?brand=Bugatti' },
  { name: 'Auxito', logo: '/images/brands/auxito.png', link: '/products?brand=Auxito' },
  { name: "Meguiar's", logo: '/images/brands/meguiars.png', link: '/products?brand=Meguiars' },
  { name: 'K&N', logo: '/images/brands/kn.png', link: '/products?brand=K%26N' },
  { name: 'Michelin', logo: '/images/brands/michelin.png', link: '/products?brand=Michelin' },
  { name: 'Motul', logo: '/images/brands/motul.png', link: '/products?brand=Motul' },
]
</script>

<template>
  <section class="bg-black py-8 text-white">
    <div class="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
      <div class="border border-white/10 bg-[#050607] px-6 py-6">
        <div class="mb-5 flex items-center justify-between gap-4">
          <h2 class="text-2xl font-black uppercase tracking-[0.04em]">
            Top Brands
          </h2>

          <router-link
            to="/brands"
            class="group hidden items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:text-white sm:inline-flex"
          >
            View All Brands
            <span class="text-[#E50914] transition group-hover:translate-x-1">→</span>
          </router-link>
        </div>

        <div class="brand-row flex overflow-x-auto">
          <router-link
            v-for="brand in brands"
            :key="brand.name"
            :to="brand.link"
            class="group grid h-24 min-w-[190px] place-items-center border-r border-white/10 px-8 last:border-r-0 transition hover:bg-white/[0.035]"
          >
            <img
              :src="brand.logo"
              :alt="brand.name"
              class="max-h-12 max-w-[150px] object-contain grayscale invert opacity-55 transition duration-300 group-hover:scale-105 group-hover:opacity-95"
            />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brand-row {
  scrollbar-width: none;
}

.brand-row::-webkit-scrollbar {
  display: none;
}
</style>