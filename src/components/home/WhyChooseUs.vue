<script setup>
const reasons = [
  {
    icon: '🚗',
    title: 'Selected Products',
    description:
      'Accessories are picked for real use, clean styling, and fitment — not random catalog chaos.',
  },
  {
    icon: '📦',
    title: 'Pakistan Delivery',
    description:
      'Orders are packed carefully and delivered nationwide through reliable courier channels.',
  },
  {
    icon: '✅',
    title: 'Confirmed Availability',
    description:
      'We confirm before dispatch, because “item unavailable” after checkout is villain behavior.',
  },
]
</script>

<template>
  <section class="relative bg-[#121212] py-20 overflow-hidden">
    <div class="absolute inset-0 bg-[linear-gradient(180deg,#121212_0%,#17191B_50%,#121212_100%)]"></div>

    <div class="relative max-w-7xl mx-auto px-6">
      <div class="text-center mb-12">
        <div class="flex items-center justify-center gap-4 mb-4">
  <span
    class="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-[#D90429]"
  ></span>

  <p
    class="uppercase tracking-[0.34em] text-[#C0C0C0] text-[11px] md:text-xs font-semibold whitespace-nowrap"
  >
    Why Haxon
  </p>

  <span
    class="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-[#D90429]"
  ></span>
</div>

        <h2 class="text-3xl md:text-5xl font-black text-white mt-3">
          Premium without the confusion.
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="reason in reasons"
          :key="reason.title"
          class="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#181A1D] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D90429]/60 hover:shadow-2xl hover:shadow-black/40"
        >
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[linear-gradient(135deg,rgba(217,4,41,0.14),transparent_55%)]"></div>

          <div class="relative">
            <div class="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-3xl group-hover:bg-[#D90429] transition">
              {{ reason.icon }}
            </div>

            <h3 class="text-2xl font-black text-white mt-6">
              {{ reason.title }}
            </h3>

            <p class="text-[#C0C0C0] mt-4 leading-relaxed">
              {{ reason.description }}
            </p>

            <div class="mt-6 h-px w-12 bg-[#D90429] group-hover:w-24 transition-all"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>