<script setup>
import { computed, reactive } from 'vue'

const whatsappNumber = '923263972241'
const fitment = reactive({ make: '', model: '', year: '', product: '', question: '' })
const whatsappMessage = computed(() => encodeURIComponent(`Hi Haxon, I need fitment help.\nMake: ${fitment.make || '-'}\nModel: ${fitment.model || '-'}\nYear: ${fitment.year || '-'}\nProduct: ${fitment.product || '-'}\nQuestion: ${fitment.question || '-'}`))
const supportCards = [
  ['WhatsApp support', '+92 326 3972241', 'Fast help for fitment, availability, and order updates.'],
  ['Email support', 'info@autohub.pk', 'Share product lists, business details, or long import requests.'],
  ['Order tracking', 'Track by order number', 'Check confirmation, dispatch, and delivery progress.'],
  ['Fitment consultation', 'Vehicle-first guidance', 'Tell us your car before you buy the accessory.'],
  ['Business/import inquiry', 'Premium sourcing', 'On-request and premium import options for serious builds.'],
]
</script>

<template>
  <div class="storefront-page min-h-screen pt-24 bg-[#06080c] text-white">
    <section class="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,.32),transparent_26rem),linear-gradient(135deg,#07090d,#17202d_55%,#05070a)]">
      <div class="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <p class="text-xs font-black uppercase tracking-[.35em] text-red-200/70">Haxon fitment concierge</p>
          <h1 class="mt-5 max-w-4xl text-5xl font-black leading-[.95] tracking-[-.05em] md:text-7xl">Fitment help, product questions, and order support.</h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Haxon helps you choose automotive accessories that actually fit your vehicle, match your build goals, and arrive with clear availability updates.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a :href="`https://wa.me/${whatsappNumber}`" target="_blank" class="rounded-full bg-red-600 px-6 py-4 font-black text-white shadow-xl shadow-red-950/40 transition hover:bg-red-700">WhatsApp Haxon</a>
            <router-link to="/track-order" class="rounded-full border border-white/15 px-6 py-4 font-black text-white transition hover:bg-white hover:text-black">Track Order</router-link>
            <router-link to="/products" class="rounded-full border border-white/15 px-6 py-4 font-black text-white transition hover:bg-white/10">Shop Products</router-link>
          </div>
        </div>
        <div class="rounded-[2rem] border border-white/10 bg-white/[.06] p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <p class="text-sm font-bold uppercase tracking-[.22em] text-slate-400">Support promise</p>
          <div class="mt-6 space-y-4">
            <div v-for="item in ['Ready dispatch where available', 'Fitment checked before recommendation', 'Premium imports and on-request options', 'Clear customer updates']" :key="item" class="rounded-2xl border border-white/10 bg-black/20 p-4 text-slate-100">✓ {{ item }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-16">
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <article v-for="card in supportCards" :key="card[0]" class="rounded-[1.5rem] border border-white/10 bg-white/[.045] p-5">
          <h2 class="text-xl font-black">{{ card[0] }}</h2>
          <p class="mt-3 font-bold text-red-200">{{ card[1] }}</p>
          <p class="mt-3 text-sm leading-6 text-slate-400">{{ card[2] }}</p>
        </article>
      </div>
    </section>

    <section class="mx-auto grid max-w-7xl gap-8 px-6 pb-20 lg:grid-cols-[1fr_.8fr]">
      <div class="rounded-[2rem] border border-white/10 bg-white/[.055] p-6 md:p-8">
        <p class="text-xs font-black uppercase tracking-[.3em] text-red-200/70">Fitment help form</p>
        <h2 class="mt-3 text-4xl font-black tracking-[-.04em]">Tell us your vehicle first.</h2>
        <p class="mt-3 text-slate-400">No backend needed here — this builds a WhatsApp message with the key details our team needs.</p>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <input v-model="fitment.make" class="admin-input" placeholder="Car make e.g. Toyota" />
          <input v-model="fitment.model" class="admin-input" placeholder="Model e.g. Corolla" />
          <input v-model="fitment.year" class="admin-input" placeholder="Year e.g. 2022" />
          <input v-model="fitment.product" class="admin-input" placeholder="Product you want" />
          <textarea v-model="fitment.question" rows="5" class="admin-input md:col-span-2" placeholder="Current issue or question"></textarea>
        </div>
        <a :href="`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`" target="_blank" class="mt-6 inline-flex rounded-full bg-red-600 px-7 py-4 font-black text-white hover:bg-red-700">Send fitment request on WhatsApp</a>
      </div>

      <div class="space-y-5">
        <div class="rounded-[2rem] border border-white/10 bg-white/[.045] p-6">
          <h2 class="text-3xl font-black">How support works</h2>
          <ol class="mt-6 space-y-4 text-slate-300">
            <li>1. Tell us your vehicle.</li>
            <li>2. We confirm fitment.</li>
            <li>3. You receive price and availability.</li>
            <li>4. Order is dispatched or arranged.</li>
          </ol>
        </div>
        <div class="rounded-[2rem] border border-red-400/20 bg-red-500/10 p-6 text-red-50">
          <h3 class="text-2xl font-black">Karachi, Pakistan</h3>
          <p class="mt-2 text-red-100/80">Mon - Sat · 10:00 AM - 9:00 PM</p>
        </div>
      </div>
    </section>
  </div>
</template>
