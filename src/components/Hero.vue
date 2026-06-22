<script setup>
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()

const currentSlide = ref(0)

const heroSlides = [
  {
    title: 'Premium Car Accessories',
    subtitle:
      'Upgrade your ride with lighting, interior styling, multimedia, and essentials delivered across Pakistan.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    button: 'Shop Now',
    route: '/products',
  },
  {
    title: 'Performance Meets Style',
    subtitle:
      'From LED lights to Android panels, make your car feel sharper, cleaner, and more premium.',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
    button: 'Explore Products',
    route: '/products',
  },
  {
    title: 'Confirmed Before Dispatch',
    subtitle:
      'We verify availability before shipping, so customers avoid the classic online shopping betrayal arc.',
    image:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1600&q=80',
    button: 'Contact Us',
    route: '/contact',
  },
]

const categories = [
  {
    icon: '🚗',
    name: 'Exterior',
    category: 'Exterior Accessories',
  },
  {
    icon: '🛋️',
    name: 'Interior',
    category: 'Interior Accessories',
  },
  {
    icon: '💡',
    name: 'LED & Lighting',
    category: 'LED & Lighting',
  },
  {
    icon: '📱',
    name: 'Android Panels',
    category: 'Android Panels',
  },
  {
    icon: '🔊',
    name: 'Audio',
    category: 'Audio & Multimedia',
  },
  {
    icon: '🧽',
    name: 'Car Care',
    category: 'Car Care',
  },
  {
    icon: '🔒',
    name: 'Security',
    category: 'Security',
  },
  {
    icon: '🧰',
    name: 'Tools',
    category: 'Tools',
  },
]

let sliderInterval = null

const nextSlide = () => {
  currentSlide.value =
    (currentSlide.value + 1) % heroSlides.length
}

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? heroSlides.length - 1
      : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

onMounted(() => {
  if (!productStore.products.length) {
    productStore.fetchProducts()
  }

  sliderInterval = setInterval(() => {
    nextSlide()
  }, 5000)
})

onBeforeUnmount(() => {
  if (sliderInterval) {
    clearInterval(sliderInterval)
  }
})

const featuredProducts = computed(() =>
  productStore.products
    .filter(
      (product) =>
        product.featured === true ||
        product.isFeatured === true
    )
    .filter(
      (product) =>
        product.active !== false &&
        product.isActive !== false
    )
    .slice(0, 8)
)
</script>

<template>
  <div class="bg-[#121212] text-white">
    <section class="relative min-h-[78vh] overflow-hidden">
      <div
        v-for="(slide, index) in heroSlides"
        :key="slide.title"
        class="absolute inset-0 transition-opacity duration-700"
        :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-full object-cover"
        />

        <div class="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-[#121212]/20"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 min-h-[78vh] flex items-center">
        <div class="max-w-3xl">
          <p class="uppercase tracking-[0.4em] text-[#C0C0C0] text-xs md:text-sm font-semibold mb-4">
            Haxon Automotive
          </p>

          <h1 class="text-4xl md:text-7xl font-black leading-tight">
            {{ heroSlides[currentSlide].title }}
          </h1>

          <p class="text-[#C0C0C0] text-base md:text-xl mt-6 max-w-2xl leading-relaxed">
            {{ heroSlides[currentSlide].subtitle }}
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <router-link
              :to="heroSlides[currentSlide].route"
              class="bg-[#D90429] hover:bg-red-700 text-white px-7 py-4 rounded-2xl font-semibold transition shadow-lg shadow-[#D90429]/25"
            >
              {{ heroSlides[currentSlide].button }}
            </router-link>

            <router-link
              to="/contact"
              class="border border-white/15 hover:bg-white/10 text-white px-7 py-4 rounded-2xl font-semibold transition"
            >
              WhatsApp Inquiry
            </router-link>
          </div>
        </div>
      </div>

      <button
        @click="previousSlide"
        class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-[#D90429] border border-white/10 items-center justify-center transition"
      >
        ‹
      </button>

      <button
        @click="nextSlide"
        class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-[#D90429] border border-white/10 items-center justify-center transition"
      >
        ›
      </button>

      <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        <button
          v-for="(_, index) in heroSlides"
          :key="index"
          @click="goToSlide(index)"
          class="h-2 rounded-full transition-all"
          :class="currentSlide === index ? 'w-10 bg-[#D90429]' : 'w-2 bg-white/40'"
        ></button>
      </div>
    </section>

    <section class="py-10 border-y border-white/10 bg-[#181818]">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <h3 class="text-2xl md:text-3xl font-black text-[#D90429]">
            100+
          </h3>
          <p class="text-[#C0C0C0] text-sm mt-1">
            Accessories
          </p>
        </div>

        <div>
          <h3 class="text-2xl md:text-3xl font-black text-[#D90429]">
            PK
          </h3>
          <p class="text-[#C0C0C0] text-sm mt-1">
            Nationwide Delivery
          </p>
        </div>

        <div>
          <h3 class="text-2xl md:text-3xl font-black text-[#D90429]">
            ✓
          </h3>
          <p class="text-[#C0C0C0] text-sm mt-1">
            Confirmed Stock
          </p>
        </div>

        <div>
          <h3 class="text-2xl md:text-3xl font-black text-[#D90429]">
            H
          </h3>
          <p class="text-[#C0C0C0] text-sm mt-1">
            Haxon Quality
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-20">
      <div class="text-center mb-12">
        <p class="uppercase tracking-[0.35em] text-[#C0C0C0] text-xs font-semibold">
          Collections
        </p>

        <h2 class="text-4xl md:text-5xl font-black mt-3">
          Shop By Category
        </h2>

        <p class="text-[#C0C0C0] mt-4 max-w-2xl mx-auto">
          Find upgrades for lighting, comfort, audio, safety, care, and utility.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <router-link
          v-for="category in categories"
          :key="category.name"
          :to="`/products?category=${encodeURIComponent(category.category)}`"
          class="group bg-[#181818] border border-white/5 rounded-3xl p-5 md:p-7 hover:border-[#D90429]/60 hover:-translate-y-1 transition-all"
        >
          <div class="w-14 h-14 rounded-2xl bg-[#D90429]/15 flex items-center justify-center text-2xl mb-5 group-hover:bg-[#D90429] transition">
            {{ category.icon }}
          </div>

          <h3 class="font-bold text-lg">
            {{ category.name }}
          </h3>

          <p class="text-[#C0C0C0] text-sm mt-2">
            Explore collection
          </p>
        </router-link>
      </div>
    </section>

    <section class="bg-[#0F0F10] py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p class="uppercase tracking-[0.35em] text-[#C0C0C0] text-xs font-semibold">
              Featured Picks
            </p>

            <h2 class="text-4xl md:text-5xl font-black mt-3">
              Built For The Road
            </h2>

            <p class="text-[#C0C0C0] mt-4 max-w-2xl">
              Hand-picked products from the Haxon catalog.
            </p>
          </div>

          <router-link
            to="/products"
            class="text-[#D90429] font-semibold hover:underline"
          >
            View All Products →
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
          class="bg-[#181818] border border-white/5 rounded-3xl p-12 text-center"
        >
          <div class="text-5xl mb-4">
            🏁
          </div>

          <h3 class="text-2xl font-bold">
            No featured products yet
          </h3>

          <p class="text-[#C0C0C0] mt-2">
            Mark products as featured from the admin panel.
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-[#181818] border border-white/5 rounded-3xl p-8">
          <div class="text-4xl mb-5">
            🚗
          </div>

          <h3 class="text-2xl font-bold">
            Premium Products
          </h3>

          <p class="text-[#C0C0C0] mt-4 leading-relaxed">
            Carefully selected accessories for better style, comfort, and daily usability.
          </p>
        </div>

        <div class="bg-[#181818] border border-white/5 rounded-3xl p-8">
          <div class="text-4xl mb-5">
            📦
          </div>

          <h3 class="text-2xl font-bold">
            Delivery Across Pakistan
          </h3>

          <p class="text-[#C0C0C0] mt-4 leading-relaxed">
            Orders are packed carefully and delivered nationwide through trusted couriers.
          </p>
        </div>

        <div class="bg-[#181818] border border-white/5 rounded-3xl p-8">
          <div class="text-4xl mb-5">
            ✅
          </div>

          <h3 class="text-2xl font-bold">
            Confirmed Availability
          </h3>

          <p class="text-[#C0C0C0] mt-4 leading-relaxed">
            We confirm availability before dispatch so customers know exactly what is happening.
          </p>
        </div>
      </div>
    </section>

    <section class="px-6 pb-20">
      <div class="max-w-7xl mx-auto rounded-[2rem] overflow-hidden relative bg-[#D90429]">
        <div class="absolute inset-0 bg-gradient-to-r from-[#D90429] to-black/30"></div>

        <div class="relative p-8 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p class="uppercase tracking-[0.35em] text-white/80 text-xs font-semibold">
              Need Help Choosing?
            </p>

            <h2 class="text-3xl md:text-5xl font-black mt-3">
              Tell us your car model.
            </h2>

            <p class="text-white/80 mt-4 max-w-xl">
              We’ll help you find compatible accessories instead of letting you buy random stuff and pray. Ancient technique, poor results.
            </p>
          </div>

          <router-link
            to="/contact"
            class="bg-white text-[#D90429] px-7 py-4 rounded-2xl font-bold text-center hover:bg-[#C0C0C0] transition"
          >
            Contact Haxon
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>