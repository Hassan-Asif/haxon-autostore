<script setup>
import {
  Car,
  Armchair,
  Lightbulb,
  Shield,
  Sparkles,
  Wrench,
  Radio,
  Smartphone,
} from 'lucide-vue-next'

const categories = [
  {
    name: 'Exterior',
    description: 'Body kits, spoilers, trims',
    icon: Car,
    route: '/products?category=Exterior Accessories',
  },
  {
    name: 'Interior',
    description: 'Seat covers & styling',
    icon: Armchair,
    route: '/products?category=Interior Accessories',
  },
  {
    name: 'Lighting',
    description: 'LEDs, fog lamps & DRLs',
    icon: Lightbulb,
    route: '/products?category=LED & Lighting',
  },
  {
    name: 'Android Panels',
    description: 'Smart infotainment systems',
    icon: Smartphone,
    route: '/products?category=Android Panels',
  },
  {
    name: 'Audio',
    description: 'Speakers & multimedia',
    icon: Radio,
    route: '/products?category=Audio & Multimedia',
  },
  {
    name: 'Car Care',
    description: 'Cleaning & detailing',
    icon: Sparkles,
    route: '/products?category=Car Care',
  },
  {
    name: 'Security',
    description: 'Safety & protection',
    icon: Shield,
    route: '/products?category=Security',
  },
  {
    name: 'Tools',
    description: 'Emergency & maintenance',
    icon: Wrench,
    route: '/products?category=Tools',
  },
]
</script>

<template>
  <section class="bg-[#0F0F10] py-24">
    <div class="max-w-7xl mx-auto px-6">

      <div class="text-center mb-14">

        <p
          class="uppercase tracking-[0.35em] text-[#C0C0C0] text-xs font-semibold"
        >
          HAXON COLLECTIONS
        </p>

        <h2
          class="text-4xl md:text-5xl font-black text-white mt-3"
        >
          Shop By Category
        </h2>

        <p
          class="text-[#C0C0C0] mt-5 max-w-2xl mx-auto"
        >
          Premium automotive accessories selected for
          enthusiasts who care about quality, performance,
          and style.
        </p>

      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >

        <router-link
          v-for="category in categories"
          :key="category.name"
          :to="category.route"
          class="group bg-[#181818] border border-white/5 rounded-3xl p-7 hover:border-[#D90429]/50 hover:-translate-y-2 transition-all duration-300"
        >

          <div
            class="w-16 h-16 rounded-2xl bg-[#D90429]/15 flex items-center justify-center mb-6 group-hover:bg-[#D90429] transition"
          >

            <component
              :is="category.icon"
              class="w-8 h-8 text-[#D90429] group-hover:text-white transition"
            />

          </div>

          <h3
            class="text-xl font-bold text-white mb-2"
          >
            {{ category.name }}
          </h3>

          <p
            class="text-[#C0C0C0] text-sm leading-relaxed"
          >
            {{ category.description }}
          </p>

          <div
            class="mt-8 flex items-center text-[#D90429] font-semibold"
          >
            Explore

            <span
              class="ml-2 group-hover:translate-x-2 transition"
            >
              →
            </span>
          </div>

        </router-link>

      </div>

    </div>
  </section>
</template>