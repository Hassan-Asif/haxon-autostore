<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const year = new Date().getFullYear()

const isAdmin = computed(() => route.path.startsWith('/admin'))

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'Contact', to: '/contact' },
  { label: 'Cart', to: '/cart' },
]

const adminLinks = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'View Store', to: '/' },
]
</script>

<template>
  <footer
    v-if="!isAdmin"
    class="relative overflow-hidden border-t border-white/10 bg-[#070707] text-white"
  >
    <div class="pointer-events-none absolute inset-0 opacity-[0.035]">
      <div
        class="h-full w-full"
        style="
          background-image:
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
          background-size: 44px 44px;
        "
      ></div>
    </div>

    <div class="pointer-events-none absolute right-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d90429]/8 blur-[140px]"></div>

    <div class="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_0.9fr]">
        <div>
          <router-link to="/" class="inline-block leading-none">
            <span class="block text-4xl font-black tracking-[0.24em]">
              HAXON
            </span>

            <span class="mt-2 block text-[10px] font-black uppercase tracking-[0.44em] text-[#d90429]">
              Automotive Goods
            </span>
          </router-link>

          <p class="mt-6 max-w-md text-sm leading-7 text-white/55">
            Curated car accessories, lighting, multimedia, emergency tools and
            interior upgrades delivered across Pakistan.
          </p>

          <div class="mt-7 flex flex-wrap gap-3">
            <span class="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/45">
              Verified Fitment
            </span>

            <span class="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/45">
              Clean Pricing
            </span>

            <span class="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/45">
              Pakistan Delivery
            </span>
          </div>
        </div>

        <div>
          <h3 class="text-[10px] font-black uppercase tracking-[0.34em] text-white/35">
            Explore
          </h3>

          <div class="mt-6 space-y-3">
            <router-link
              v-for="link in links"
              :key="link.label"
              :to="link.to"
              class="block text-sm font-semibold text-white/55 transition hover:text-[#d90429]"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>

        <div>
          <h3 class="text-[10px] font-black uppercase tracking-[0.34em] text-white/35">
            Contact
          </h3>

          <div class="mt-6 space-y-3 text-sm leading-6 text-white/55">
            <p>
              WhatsApp:
              <span class="font-semibold text-white">
                +92 326 3972241
              </span>
            </p>

            <p>Karachi, Pakistan</p>
            <p>Delivery across Pakistan</p>
          </div>

          <a
            href="https://wa.me/923263972241"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center justify-center rounded-full bg-[#d90429] px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[#111]"
          >
            WhatsApp Us →
          </a>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <p>
          © {{ year }} Haxon Automotive. All rights reserved.
        </p>

        <p>
          Built for drivers who like their cars a little too much.
        </p>
      </div>
    </div>
  </footer>

  <footer
    v-else
    class="border-t border-white/10 bg-[#070707] text-white"
  >
    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <div>
        <p class="text-xl font-black tracking-[0.18em]">
          HAXON
        </p>

        <p class="mt-1 text-xs font-semibold text-white/40">
          Control Panel
        </p>
      </div>

      <div class="flex flex-wrap gap-4 text-sm">
        <router-link
          v-for="link in adminLinks"
          :key="link.label"
          :to="link.to"
          class="text-white/50 transition hover:text-[#d90429]"
        >
          {{ link.label }}
        </router-link>
      </div>

      <p class="text-xs text-white/35">
        © {{ year }} Haxon Admin
      </p>
    </div>
  </footer>
</template>