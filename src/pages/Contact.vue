<script setup>
import { computed, reactive } from 'vue'

const whatsappNumber = '923263972241'

const fitment = reactive({
  make: '',
  model: '',
  year: '',
  product: '',
  question: '',
})

const whatsappMessage = computed(() =>
  encodeURIComponent(
    `Hi Haxon, I need fitment help.\nMake: ${fitment.make || '-'}\nModel: ${
      fitment.model || '-'
    }\nYear: ${fitment.year || '-'}\nProduct: ${fitment.product || '-'}\nQuestion: ${
      fitment.question || '-'
    }`,
  ),
)

const supportCards = [
  {
    title: 'WhatsApp',
    value: '+92 326 3972241',
    text: 'Fitment, availability and order updates.',
  },
  {
    title: 'Email',
    value: 'info@autohub.pk',
    text: 'Product lists, import requests and business details.',
  },
  {
    title: 'Tracking',
    value: 'Order number',
    text: 'Confirmation, dispatch and delivery progress.',
  },
  {
    title: 'Fitment',
    value: 'Vehicle first',
    text: 'Tell us the car before buying the accessory.',
  },
]
</script>

<template>
  <main class="min-h-screen bg-black  text-white">
    <section class="relative overflow-hidden border-b border-white/10 bg-[#050607]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(229,9,20,0.12),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.07),transparent_32%)]"
      ></div>

      <p
        class="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,19vw,20rem)] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.035] lg:block"
      >
        Support
      </p>

      <div class="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12">
        <div class="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <div class="mb-6 h-1 w-10 bg-[#E50914] shadow-[0_0_18px_rgba(229,9,20,.7)]"></div>

            <p class="text-[11px] font-black uppercase tracking-[0.32em] text-white/45">
              Haxon fitment concierge
            </p>

            <h1 class="mt-5 max-w-4xl text-[clamp(3rem,7vw,7.3rem)] font-black uppercase leading-[0.84] tracking-[-0.075em]">
              Fitment help.
              <span class="block font-light text-white/70">Order support.</span>
            </h1>

            <p class="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Tell us the vehicle before the accessory. Haxon helps confirm fitment,
              availability and cleaner upgrade options before dispatch.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a
                :href="`https://wa.me/${whatsappNumber}`"
                target="_blank"
                class="inline-flex h-12 items-center border border-[#E50914] bg-[#E50914] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
              >
                WhatsApp Haxon
              </a>

              <router-link
                to="/track-order"
                class="inline-flex h-12 items-center border border-white/10 px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white/70 transition hover:border-white/25 hover:text-white"
              >
                Track Order
              </router-link>
            </div>
          </div>

          <div class="border border-white/10 bg-black/25 p-6 backdrop-blur">
            <p class="text-[11px] font-black uppercase tracking-[0.22em] text-white/40">
              Support promise
            </p>

            <div class="mt-5 divide-y divide-white/10">
              <div
                v-for="item in [
                  'Ready dispatch where available',
                  'Fitment checked before recommendation',
                  'Premium imports and on-request options',
                  'Clear customer updates',
                ]"
                :key="item"
                class="flex items-center gap-4 py-4 text-sm font-semibold text-white/62"
              >
                <span class="grid h-7 w-7 shrink-0 place-items-center border border-white/15 text-[#E50914]">
                  ✓
                </span>
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="card in supportCards"
          :key="card.title"
          class="border border-white/10 bg-[#050607] p-6 transition hover:border-white/20 hover:bg-[#08090b]"
        >
          <p class="text-[10px] font-black uppercase tracking-[0.24em] text-white/38">
            {{ card.title }}
          </p>

          <h2 class="mt-4 text-xl font-black uppercase tracking-[-0.02em]">
            {{ card.value }}
          </h2>

          <p class="mt-3 text-sm leading-6 text-white/45">
            {{ card.text }}
          </p>
        </article>
      </div>
    </section>

    <section class="mx-auto grid max-w-[1500px] gap-6 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_.82fr] lg:px-12">
      <div class="border border-white/10 bg-[#050607] p-6 sm:p-8">
        <p class="text-[11px] font-black uppercase tracking-[0.3em] text-[#E50914]">
          Fitment request
        </p>

        <h2 class="mt-4 text-[clamp(2.2rem,4vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
          Tell us your vehicle first.
        </h2>

        <p class="mt-5 max-w-2xl text-sm leading-7 text-white/48">
          This builds a WhatsApp message with the details our team needs.
          No backend required for now.
        </p>

        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <input
            v-model="fitment.make"
            class="h-12 border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#E50914]/70"
            placeholder="Car make e.g. Toyota"
          />

          <input
            v-model="fitment.model"
            class="h-12 border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#E50914]/70"
            placeholder="Model e.g. Corolla"
          />

          <input
            v-model="fitment.year"
            class="h-12 border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#E50914]/70"
            placeholder="Year e.g. 2022"
          />

          <input
            v-model="fitment.product"
            class="h-12 border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#E50914]/70"
            placeholder="Product you want"
          />

          <textarea
            v-model="fitment.question"
            rows="5"
            class="border border-white/10 bg-black/30 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#E50914]/70 md:col-span-2"
            placeholder="Current issue or question"
          ></textarea>
        </div>

        <a
          :href="`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`"
          target="_blank"
          class="mt-6 inline-flex h-12 items-center border border-[#E50914] bg-[#E50914] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
        >
          Send fitment request
        </a>
      </div>

      <aside class="grid gap-6">
        <div class="border border-white/10 bg-[#050607] p-6">
          <p class="text-[11px] font-black uppercase tracking-[0.22em] text-white/40">
            How support works
          </p>

          <div class="mt-6 divide-y divide-white/10">
            <div
              v-for="step in [
                ['01', 'Tell us your vehicle.'],
                ['02', 'We confirm fitment.'],
                ['03', 'You receive price and availability.'],
                ['04', 'Order is dispatched or arranged.'],
              ]"
              :key="step[0]"
              class="grid grid-cols-[3rem_1fr] gap-4 py-4"
            >
              <p class="text-xs font-black text-[#E50914]">
                {{ step[0] }}
              </p>

              <p class="text-sm font-semibold text-white/62">
                {{ step[1] }}
              </p>
            </div>
          </div>
        </div>

        <div class="border border-[#E50914]/25 bg-[#E50914]/10 p-6">
          <p class="text-[11px] font-black uppercase tracking-[0.22em] text-red-100/55">
            Karachi, Pakistan
          </p>

          <h3 class="mt-4 text-3xl font-black uppercase tracking-[-0.04em]">
            Mon — Sat
          </h3>

          <p class="mt-3 text-sm text-red-100/70">
            10:00 AM — 9:00 PM
          </p>
        </div>
      </aside>
    </section>
  </main>
</template>