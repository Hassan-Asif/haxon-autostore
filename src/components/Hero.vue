<template>
  <section class="bg-gray-900 text-white">
    <div
      class="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center"
    >
      <div>
        <p class="text-red-500 font-semibold mb-3">
          Premium Car Accessories
        </p>

        <h1 class="text-5xl font-bold leading-tight mb-6">
          Upgrade Your Car
          With Premium Accessories
        </h1>

        <p class="text-gray-300 mb-8">
          Exterior Accessories, Interior Accessories,
          LED Lights, Car Care and Security Products.
        </p>

        <div class="flex gap-4">
          <router-link
            to="/products"
            class="bg-red-600 px-6 py-3 rounded-lg"
          >
            Shop Now
          </router-link>

          <a
            href="https://wa.me/923263972241"
            class="border border-white px-6 py-3 rounded-lg"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
          class="rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  </section>
</template>