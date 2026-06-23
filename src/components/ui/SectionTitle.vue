<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  align: { type: String, default: 'left' },
  dark: { type: Boolean, default: false },
})
</script>

<template>
  <div :class="align === 'center' ? 'text-center mx-auto' : ''" class="max-w-3xl">
    <div
      v-if="eyebrow"
      class="mb-4 flex items-center gap-3"
      :class="align === 'center' ? 'justify-center' : ''"
    >
      <span class="h-px w-10 bg-[#D90429]"></span>
      <p
        class="text-[11px] font-bold uppercase tracking-[0.32em]"
        :class="dark ? 'text-[#B8BDC5]' : 'text-[#777]'"
      >
        {{ eyebrow }}
      </p>
    </div>

    <h2
      class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95]"
      :class="dark ? 'text-white' : 'text-[#121212]'"
    >
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="mt-4 text-sm sm:text-base leading-relaxed"
      :class="dark ? 'text-[#B8BDC5]' : 'text-[#666]'"
    >
      {{ description }}
    </p>
  </div>
</template>