<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'
import { toast } from 'vue-sonner'


const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const selectedImage = ref('')

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.fetchProducts()
  }

  if (product.value) {
    selectedImage.value = mainImage.value
  }
})

const product = computed(() =>
  productStore.products.find(
    p => p.id === route.params.id
  )
)

const galleryImages = computed(() => {
  if (!product.value) return []

  const images = [
    product.value.image,
    ...(product.value.gallery || []),
  ].filter(Boolean)

  return images.length
    ? images
    : ['/images/no-image.jpg']
})

const mainImage = computed(() => {
  return galleryImages.value[0] || '/images/no-image.jpg'
})

const availability = computed(() => {
  return (
    product.value?.availability ||
    product.value?.availabilityStatus ||
    'Check Availability'
  )
})

const hasSale = computed(() => {
  return (
    product.value?.saleEnabled &&
    product.value?.salePrice &&
    Number(product.value.salePrice) < Number(product.value.price)
  )
})

const displayPrice = computed(() => {
  if (!product.value) return 0

  return hasSale.value
    ? product.value.salePrice
    : product.value.price
})

const saving = computed(() => {
  if (!hasSale.value) return 0

  return Number(product.value.price) -
    Number(product.value.salePrice)
})

const formatPrice = (value) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

const whatsappLink = computed(() => {
  const name = product.value?.name || 'this product'

  const message =
    `Hi Haxon, I want to ask about ${name}.`

  return `https://wa.me/923263972241?text=${encodeURIComponent(message)}`
})

const addToCart = () => {
  if (!product.value) return


  cartStore.addToCart(product.value)
  
toast.success('Product added successfully.')
}
</script>

<template>
  <div
    v-if="product"
    class="min-h-screen bg-[#121212] text-white"
  >
    <section class="relative bg-[#17191B] border-b border-white/10 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(135deg,#101112_0%,#1B1E21_45%,#252A2F_55%,#111213_100%)]"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-10">
        <router-link
          to="/products"
          class="inline-flex items-center text-[#C0C0C0] hover:text-white transition mb-6"
        >
          ← Back to products
        </router-link>

        <div class="flex flex-wrap items-center gap-3">
          <span class="text-xs uppercase tracking-[0.3em] text-[#C0C0C0]">
            {{ product.category || 'Accessory' }}
          </span>

          <span class="w-1.5 h-1.5 rounded-full bg-[#D90429]"></span>

          <span class="text-xs uppercase tracking-[0.3em] text-[#C0C0C0]">
            {{ product.carBrand || 'Universal' }}
            {{ product.carModel || '' }}
          </span>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <div class="bg-[#181A1D] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30">
            <img
              :src="selectedImage || mainImage"
              :alt="product.name"
              class="w-full aspect-square object-cover"
              @error="$event.target.src = '/images/no-image.jpg'"
            />
          </div>

          <div
            v-if="galleryImages.length > 1"
            class="grid grid-cols-4 gap-3 mt-4"
          >
            <button
              v-for="image in galleryImages"
              :key="image"
              @click="selectedImage = image"
              class="rounded-2xl overflow-hidden border transition"
              :class="
                selectedImage === image
                  ? 'border-[#D90429]'
                  : 'border-white/10 hover:border-white/30'
              "
            >
              <img
                :src="image"
                :alt="product.name"
                class="w-full aspect-square object-cover"
                @error="$event.target.src = '/images/no-image.jpg'"
              />
            </button>
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-if="product.featured || product.isFeatured"
              class="bg-[#D90429] text-white text-xs font-bold px-3 py-1 rounded-full"
            >
              Featured
            </span>

            <span
              v-if="hasSale"
              class="bg-white text-[#D90429] text-xs font-bold px-3 py-1 rounded-full"
            >
              Sale
            </span>

            <span class="border border-white/10 text-[#C0C0C0] text-xs font-semibold px-3 py-1 rounded-full">
              {{ availability }}
            </span>
          </div>

          <h1 class="text-4xl md:text-6xl font-black leading-tight tracking-tight">
            {{ product.name }}
          </h1>

          <div class="mt-6">
            <p
              v-if="hasSale"
              class="text-[#C0C0C0] text-lg line-through"
            >
              {{ formatPrice(product.price) }}
            </p>

            <p class="text-[#D90429] text-4xl md:text-5xl font-black">
              {{ formatPrice(displayPrice) }}
            </p>

            <p
              v-if="hasSale"
              class="text-green-400 font-semibold mt-2"
            >
              You save {{ formatPrice(saving) }}
            </p>
          </div>

          <p class="mt-7 text-[#C0C0C0] leading-relaxed text-lg">
            {{ product.description }}
          </p>

          <div class="mt-8 grid sm:grid-cols-2 gap-4">
            <div class="bg-[#181A1D] border border-white/10 rounded-2xl p-5">
              <p class="text-[#C0C0C0] text-xs uppercase tracking-[0.24em]">
                Car Brand
              </p>

              <p class="text-white font-bold mt-2">
                {{ product.carBrand || 'Universal' }}
              </p>
            </div>

            <div class="bg-[#181A1D] border border-white/10 rounded-2xl p-5">
              <p class="text-[#C0C0C0] text-xs uppercase tracking-[0.24em]">
                Car Model
              </p>

              <p class="text-white font-bold mt-2">
                {{ product.carModel || 'Multiple Models' }}
              </p>
            </div>

            <div class="bg-[#181A1D] border border-white/10 rounded-2xl p-5">
              <p class="text-[#C0C0C0] text-xs uppercase tracking-[0.24em]">
                Availability
              </p>

              <p class="text-white font-bold mt-2">
                {{ availability }}
              </p>
            </div>

            <div class="bg-[#181A1D] border border-white/10 rounded-2xl p-5">
              <p class="text-[#C0C0C0] text-xs uppercase tracking-[0.24em]">
                Delivery
              </p>

              <p class="text-white font-bold mt-2">
                {{ product.estimatedDelivery || 'Confirm before dispatch' }}
              </p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              @click="addToCart"
              class="flex-1 bg-[#D90429] hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition shadow-xl shadow-black/30"
            >
              Add to Cart
            </button>

            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 border border-white/15 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-black text-center transition"
            >
              Ask on WhatsApp
            </a>
          </div>

          <div class="mt-6 text-sm text-[#C0C0C0]">
            Orders are confirmed before dispatch to ensure fitment and availability.
          </div>
        </div>
      </div>
    </section>
  </div>

  <div
    v-else
    class="min-h-screen bg-[#121212] text-white flex items-center justify-center px-6"
  >
    <div class="text-center">
      <h1 class="text-4xl font-black">
        Product Not Found
      </h1>

      <p class="text-[#C0C0C0] mt-3">
        This product may have been removed or is not available.
      </p>

      <router-link
        to="/products"
        class="inline-block mt-6 bg-[#D90429] text-white px-6 py-3 rounded-2xl font-bold"
      >
        Back to Products
      </router-link>
    </div>
  </div>
</template>