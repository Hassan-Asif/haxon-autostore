<script setup>
defineProps({
  dark: { type: Boolean, default: false },
  hover: { type: Boolean, default: true },
})
</script>

<template>
  <div
    class="rounded-3xl border transition-all duration-300"
    :class="[
      dark
        ? 'bg-[#181A1D] border-white/10 text-white'
        : 'bg-white border-black/10 text-[#121212]',
      hover && 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10',
    ]"
  >
    <slot />
  </div>
</template>