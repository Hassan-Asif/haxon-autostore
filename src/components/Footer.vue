<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isAdmin = computed(() => {
  return route.path.startsWith('/admin')
})
</script>

<template>
  <footer
    v-if="!isAdmin"
    class="bg-[#121212] text-white border-t border-white/10"
  >
    <div class="max-w-7xl mx-auto px-6 py-14">
      <div class="grid md:grid-cols-4 gap-10">
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-12 h-12 rounded-2xl bg-[#D90429] flex items-center justify-center font-black text-2xl shadow-lg shadow-[#D90429]/25">
              H
            </div>

            <div>
              <h3 class="text-3xl font-black leading-none">
                Haxon
              </h3>

              <p class="text-xs tracking-[0.32em] uppercase text-[#C0C0C0] mt-1">
                Automotive
              </p>
            </div>
          </div>

          <p class="text-[#C0C0C0] max-w-md leading-relaxed">
            Premium car accessories, lighting, multimedia, emergency tools,
            and interior upgrades delivered across Pakistan.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <span class="border border-white/10 rounded-full px-4 py-2 text-sm text-[#C0C0C0]">
              Matte Black
            </span>

            <span class="border border-white/10 rounded-full px-4 py-2 text-sm text-[#C0C0C0]">
              Performance Red
            </span>

            <span class="border border-white/10 rounded-full px-4 py-2 text-sm text-[#C0C0C0]">
              Premium Finish
            </span>
          </div>
        </div>

        <div>
          <h3 class="font-bold mb-5 text-white">
            Quick Links
          </h3>

          <div class="space-y-3">
            <router-link
              to="/"
              class="block text-[#C0C0C0] hover:text-[#D90429] transition"
            >
              Home
            </router-link>

            <router-link
              to="/products"
              class="block text-[#C0C0C0] hover:text-[#D90429] transition"
            >
              Shop
            </router-link>

            <router-link
              to="/contact"
              class="block text-[#C0C0C0] hover:text-[#D90429] transition"
            >
              Contact
            </router-link>

            <router-link
              to="/cart"
              class="block text-[#C0C0C0] hover:text-[#D90429] transition"
            >
              Cart
            </router-link>
          </div>
        </div>

        <div>
          <h3 class="font-bold mb-5 text-white">
            Contact
          </h3>

          <div class="space-y-3 text-[#C0C0C0]">
            <p>
              WhatsApp:
              <span class="text-white font-medium">
                +92 326 3972241
              </span>
            </p>

            <p>
              Karachi, Pakistan
            </p>

            <p>
              Delivery across Pakistan
            </p>
          </div>

          <a
            href="https://wa.me/923263972241"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex mt-5 bg-[#D90429] hover:bg-red-700 text-white px-5 py-3 rounded-2xl font-semibold transition"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[#C0C0C0]">
        <p>
          © {{ new Date().getFullYear() }} Haxon Automotive. All rights reserved.
        </p>

        <p>
          Built for drivers who like their cars a little too much.
        </p>
      </div>
    </div>
  </footer>

  <footer
    v-else
    class="bg-[#121212] text-white border-t border-white/10"
  >
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-[#D90429] flex items-center justify-center font-black text-xl">
          H
        </div>

        <div>
          <p class="font-bold">
            Haxon Control Panel
          </p>

          <p class="text-xs text-[#C0C0C0]">
            Store management dashboard
          </p>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 text-sm text-[#C0C0C0]">
        <router-link
          to="/admin"
          class="hover:text-[#D90429] transition"
        >
          Dashboard
        </router-link>

        <router-link
          to="/admin/products"
          class="hover:text-[#D90429] transition"
        >
          Products
        </router-link>

        <router-link
          to="/admin/orders"
          class="hover:text-[#D90429] transition"
        >
          Orders
        </router-link>

        <router-link
          to="/"
          class="hover:text-[#D90429] transition"
        >
          View Store
        </router-link>
      </div>

      <p class="text-xs text-[#C0C0C0]">
        © {{ new Date().getFullYear() }} Haxon Admin
      </p>
    </div>
  </footer>
</template>