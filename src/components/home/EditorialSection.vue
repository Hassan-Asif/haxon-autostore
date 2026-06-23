<script setup>
const editorials = [
  {
    eyebrow: 'Guide',
    title: 'How to choose lighting without ruining the look.',
    description:
      'Brightness matters, but beam pattern, color temperature and fitment matter more.',
    meta: 'Lighting / 4 min read',
    image: '/images/editorial-lighting.jpg',
    to: '/products?category=Lighting',
  },
  {
    eyebrow: 'Fitment',
    title: 'The clean upgrade rule: fitted, not forced.',
    description:
      'The best accessory should feel like it belonged in the car from day one.',
    meta: 'Interior / 3 min read',
    image: '/images/editorial-fitment.jpg',
    to: '/products',
  },
  {
    eyebrow: 'Garage',
    title: 'Essentials every daily driver should keep.',
    description:
      'A compact kit for emergencies, cleaning, charging and long-route peace of mind.',
    meta: 'Tools / 5 min read',
    image: '/images/editorial-garage.jpg',
    to: '/products?category=Tools',
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-[#f5f3ef] py-16 text-[#111] sm:py-20">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <div class="mb-10 flex flex-col gap-5 border-b border-black/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="mb-4 flex items-center gap-4">
            <span class="h-px w-10 bg-[#d90429]"></span>

            <p class="text-[10px] font-black uppercase tracking-[0.34em] text-black/45">
              Editorial
            </p>
          </div>

          <h2 class="max-w-3xl text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl">
            Buy with better taste.
          </h2>

          <p class="mt-4 max-w-2xl text-sm leading-6 text-black/55">
            Less noise, better decisions. Simple guides for choosing upgrades that actually suit the car.
          </p>
        </div>

        <router-link
          to="/products"
          class="text-[11px] font-black uppercase tracking-[0.2em] text-[#d90429] transition hover:text-[#111]"
        >
          Shop the edit →
        </router-link>
      </div>

      <div class="grid gap-5 lg:grid-cols-3">
        <router-link
          v-for="article in editorials"
          :key="article.title"
          :to="article.to"
          class="group overflow-hidden border border-black/10 bg-white/70 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-black/10"
        >
          <div class="relative h-64 overflow-hidden bg-[#111]">
            <img
              :src="article.image"
              :alt="article.title"
              class="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
              @error="$event.target.style.display = 'none'"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

            <p class="absolute left-5 top-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#d90429]">
              {{ article.eyebrow }}
            </p>
          </div>

          <div class="p-6">
            <p class="text-[10px] font-black uppercase tracking-[0.24em] text-black/35">
              {{ article.meta }}
            </p>

            <h3 class="mt-3 text-2xl font-black leading-[0.95] tracking-[-0.045em]">
              {{ article.title }}
            </h3>

            <p class="mt-4 text-sm leading-6 text-black/55">
              {{ article.description }}
            </p>

            <div class="mt-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#d90429]">
              Read / Browse
              <span class="transition group-hover:translate-x-1">→</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>