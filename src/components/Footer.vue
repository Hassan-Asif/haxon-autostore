<template>
  <footer class="bg-gray-900 text-white py-12 mt-20">
    <div
      class="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10"
    >
      <div>
        <h3 class="text-2xl font-bold mb-4">
          AutoHub
        </h3>

        <p class="text-gray-400">
          Premium car accessories delivered
          across Pakistan.
        </p>
      </div>

      <div>
        <h3 class="font-bold mb-4">
          Quick Links
        </h3>

        <div class="space-y-2">
          <router-link
            to="/"
            class="block text-gray-400"
          >
            Home
          </router-link>

          <router-link
            to="/products"
            class="block text-gray-400"
          >
            Products
          </router-link>

          <router-link
            to="/contact"
            class="block text-gray-400"
          >
            Contact
          </router-link>
        </div>
      </div>

      <div>
        <h3 class="font-bold mb-4">
          Contact
        </h3>

        <p class="text-gray-400">
          WhatsApp: +92 326 3972241
        </p>

        <p class="text-gray-400">
          Karachi, Pakistan
        </p>
      </div>
    </div>
  </footer>
</template>