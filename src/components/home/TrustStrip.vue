<script setup>
const features = [
  {
    value: '24h',
    title: 'Confirmed Dispatch',
    description: 'Availability checked before order movement.',
  },
  {
    value: 'PK',
    title: 'Nationwide Delivery',
    description: 'Delivered across Pakistan.',
  },
  {
    value: 'FIT',
    title: 'Fitment Assistance',
    description: 'Need help choosing? We’ll guide you.',
  },
]
</script>

<template>
  <section class="relative overflow-hidden border-y border-black/10 bg-[#f5f3ef] text-[#111]">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <div class="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="border-b border-black/10 py-7 lg:border-b-0 lg:border-r lg:pr-8">
          <p class="text-[10px] font-black uppercase tracking-[0.34em] text-[#d90429]">
            Haxon Automotive
          </p>

          <h2 class="mt-3 max-w-md text-3xl font-black leading-[0.9] tracking-[-0.055em]">
            Built around quality, not quantity.
          </h2>
        </div>

        <div class="grid gap-0 sm:grid-cols-3">
          <div
            v-for="item in features"
            :key="item.title"
            class="group border-b border-black/10 py-7 transition sm:border-b-0 sm:border-r sm:px-6 last:border-r-0 lg:px-8"
          >
            <p class="text-2xl font-black tracking-[-0.06em] text-black/20 transition group-hover:text-[#d90429]">
              {{ item.value }}
            </p>

            <h3 class="mt-3 text-base font-black tracking-[-0.03em]">
              {{ item.title }}
            </h3>

            <p class="mt-2 text-xs leading-5 text-black/50">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>