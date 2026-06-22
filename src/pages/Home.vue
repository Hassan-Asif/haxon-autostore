<script setup>
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()
const currentSlide = ref(0)

const slides = [
  {
    title: 'Upgrade The Way Your Car Feels',
    subtitle:
      'Premium automotive accessories, lighting, multimedia, car care, and essentials delivered across Pakistan.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80',
    badge: 'Haxon Automotive',
  },
  {
    title: 'Built For Style, Comfort & Utility',
    subtitle:
      'From LED lighting to Android panels, interior upgrades, emergency tools, and daily-use accessories.',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80',
    badge: 'Performance Accessories',
  },
  {
    title: 'Confirmed Before Dispatch',
    subtitle:
      'We check availability before shipping, so your order stays clear, confirmed, and drama-free.',
    image:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1800&q=80',
    badge: 'Across Pakistan',
  },
]

const categories = [
  { icon: '🚗', name: 'Exterior', query: 'Exterior Accessories' },
  { icon: '🛋️', name: 'Interior', query: 'Interior Accessories' },
  { icon: '💡', name: 'LED & Lighting', query: 'LED & Lighting' },
  { icon: '📱', name: 'Android Panels', query: 'Android Panels' },
  { icon: '🔊', name: 'Audio', query: 'Audio & Multimedia' },
  { icon: '🧽', name: 'Car Care', query: 'Car Care' },
  { icon: '🔒', name: 'Security', query: 'Security' },
  { icon: '🧰', name: 'Tools', query: 'Tools' },
]

let sliderTimer = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

onMounted(() => {
  if (!productStore.products.length) {
    productStore.fetchProducts()
  }

  sliderTimer = setInterval(nextSlide, 5000)
})

onBeforeUnmount(() => {
  if (sliderTimer) {
    clearInterval(sliderTimer)
  }
})

const featuredProducts = computed(() =>
  productStore.products
    .filter(
      product =>
        product.featured === true ||
        product.isFeatured === true
    )
    .filter(
      product =>
        product.active !== false &&
        product.isActive !== false
    )
    .slice(0, 8)
)
</script>

<template>
  <div class="bg-[#121212] text-white overflow-hidden">
    <!-- Hero Slider -->
    <section class="relative min-h-[88vh]">
      <div
        v-for="(slide, index) in slides"
        :key="slide.title"
        class="absolute inset-0 transition-opacity duration-700"
        :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"
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

          <div class="mt-10 grid grid-cols-3 gap-4 max-w-xl">
            <div class="border border-white/10 bg-white/5 rounded-2xl p-4">
              <p class="text-2xl font-black text-[#D90429]">
                PK
              </p>
              <p class="text-xs text-[#C0C0C0] mt-1">
                Nationwide Delivery
              </p>
            </div>

            <div class="border border-white/10 bg-white/5 rounded-2xl p-4">
              <p class="text-2xl font-black text-[#D90429]">
                ✓
              </p>
              <p class="text-xs text-[#C0C0C0] mt-1">
                Confirmed Stock
              </p>
            </div>

            <div class="border border-white/10 bg-white/5 rounded-2xl p-4">
              <p class="text-2xl font-black text-[#D90429]">
                H
              </p>
              <p class="text-xs text-[#C0C0C0] mt-1">
                Haxon Quality
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="h-2 rounded-full transition-all"
          :class="currentSlide === index ? 'w-12 bg-[#D90429]' : 'w-3 bg-white/40'"
        ></button>
      </div>
    </section>

    <!-- Brand Strip -->
    <section class="border-y border-white/10 bg-[#181818]">
      <div class="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-6 md:gap-10 text-[#C0C0C0] text-sm md:text-base font-semibold tracking-wide">
        <span>Toyota</span>
        <span>Honda</span>
        <span>Suzuki</span>
        <span>Kia</span>
        <span>Hyundai</span>
        <span>MG</span>
        <span>Changan</span>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-6 py-24">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p class="uppercase tracking-[0.35em] text-[#C0C0C0] text-xs font-semibold">
            Collections
          </p>

          <h2 class="text-4xl md:text-6xl font-black mt-3">
            Shop By Category
          </h2>

          <p class="text-[#C0C0C0] mt-4 max-w-2xl">
            Find the right upgrades for style, safety, comfort, care, and daily driving.
          </p>
        </div>

        <router-link
          to="/products"
          class="text-[#D90429] font-bold hover:underline"
        >
          Browse All →
        </router-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <router-link
          v-for="category in categories"
          :key="category.name"
          :to="`/products?category=${encodeURIComponent(category.query)}`"
          class="group relative overflow-hidden bg-[#181818] border border-white/5 rounded-3xl p-6 hover:border-[#D90429]/60 hover:-translate-y-2 transition-all duration-300"
        >
          <div class="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#D90429]/10 group-hover:bg-[#D90429]/25 transition"></div>

          <div class="relative w-16 h-16 rounded-2xl bg-[#D90429]/15 flex items-center justify-center text-3xl mb-7 group-hover:bg-[#D90429] transition">
            {{ category.icon }}
          </div>

          <h3 class="relative font-black text-lg md:text-xl">
            {{ category.name }}
          </h3>

          <p class="relative text-[#C0C0C0] text-sm mt-2">
            Explore collection
          </p>
        </router-link>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="bg-[#0F0F10] py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p class="uppercase tracking-[0.35em] text-[#C0C0C0] text-xs font-semibold">
              Featured Picks
            </p>

            <h2 class="text-4xl md:text-6xl font-black mt-3">
              Built For The Road
            </h2>

            <p class="text-[#C0C0C0] mt-4 max-w-2xl">
              Selected accessories that make your car look better, feel better, and behave like it has standards.
            </p>
          </div>

          <router-link
            to="/products"
            class="bg-[#D90429] hover:bg-red-700 px-6 py-3 rounded-2xl font-bold transition"
          >
            View All Products
          </router-link>
        </div>

        <div
          v-if="featuredProducts.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div
          v-else
          class="bg-[#181818] border border-white/5 rounded-3xl p-14 text-center"
        >
          <div class="text-6xl mb-5">
            🏁
          </div>

          <h3 class="text-3xl font-black">
            No featured products yet
          </h3>

          <p class="text-[#C0C0C0] mt-3">
            Mark products as featured from the admin panel.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Haxon -->
    <section class="max-w-7xl mx-auto px-6 py-24">
      <div class="text-center mb-14">
        <p class="uppercase tracking-[0.35em] text-[#C0C0C0] text-xs font-semibold">
          Why Haxon
        </p>

        <h2 class="text-4xl md:text-6xl font-black mt-3">
          Premium Without The Confusion
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-[#181818] border border-white/5 rounded-3xl p-8 hover:border-[#D90429]/50 transition">
          <div class="text-5xl mb-6">🚗</div>

          <h3 class="text-2xl font-black">
            Selected Products
          </h3>

          <p class="text-[#C0C0C0] mt-4 leading-relaxed">
            Accessories are picked for real use, clean styling, and compatibility — not random catalog chaos.
          </p>
        </div>

        <div class="bg-[#181818] border border-white/5 rounded-3xl p-8 hover:border-[#D90429]/50 transition">
          <div class="text-5xl mb-6">📦</div>

          <h3 class="text-2xl font-black">
            Pakistan Delivery
          </h3>

          <p class="text-[#C0C0C0] mt-4 leading-relaxed">
            Products are packed properly and delivered nationwide through reliable courier channels.
          </p>
        </div>

        <div class="bg-[#181818] border border-white/5 rounded-3xl p-8 hover:border-[#D90429]/50 transition">
          <div class="text-5xl mb-6">✅</div>

          <h3 class="text-2xl font-black">
            Confirmed Availability
          </h3>

          <p class="text-[#C0C0C0] mt-4 leading-relaxed">
            We confirm before dispatch, because “sir item unavailable” after checkout is villain behavior.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-6 pb-24">
      <div class="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem] bg-[#D90429]">
        <div class="absolute inset-0 bg-gradient-to-r from-[#D90429] via-[#D90429] to-black/40"></div>

        <div class="relative p-8 md:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p class="uppercase tracking-[0.35em] text-white/80 text-xs font-semibold">
              Need Help Choosing?
            </p>

            <h2 class="text-4xl md:text-6xl font-black mt-3">
              Tell us your car model.
            </h2>

            <p class="text-white/80 mt-4 max-w-2xl text-lg">
              We’ll help you find compatible accessories instead of letting you buy random parts and pray. Ancient technique. Terrible UX.
            </p>
          </div>

          <router-link
            to="/contact"
            class="bg-white text-[#D90429] hover:bg-[#C0C0C0] px-8 py-4 rounded-2xl font-black text-center transition"
          >
            Contact Haxon →
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>