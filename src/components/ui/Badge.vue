<script setup>
defineProps({
  tone: { type: String, default: 'default' },
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
    :class="[
      tone === 'default' && 'bg-black/5 text-[#666]',
      tone === 'dark' && 'bg-white/10 text-white',
      tone === 'red' && 'bg-[#D90429]/10 text-[#D90429]',
      tone === 'success' && 'bg-green-500/10 text-green-600',
      tone === 'warning' && 'bg-amber-500/10 text-amber-600',
    ]"
  >
    <slot />
  </span>
</template>