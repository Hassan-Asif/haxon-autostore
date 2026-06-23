<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  to: { type: String, default: null },
  type: { type: String, default: 'button' },
})
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :type="to ? undefined : type"
    class="inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
    :class="[
      size === 'sm' && 'px-4 py-2 text-xs rounded-xl',
      size === 'md' && 'px-5 py-3 text-sm rounded-2xl',
      size === 'lg' && 'px-7 py-4 text-base rounded-2xl',

      variant === 'primary' && 'bg-[#D90429] text-white hover:bg-[#b80322] shadow-lg shadow-[#D90429]/20',
      variant === 'dark' && 'bg-[#121212] text-white hover:bg-[#23272B]',
      variant === 'light' && 'bg-white text-[#121212] hover:bg-[#F1F1F1] border border-black/10',
      variant === 'ghost' && 'bg-transparent text-current hover:bg-black/5 border border-current/10',
      variant === 'outline' && 'bg-transparent text-current border border-current/20 hover:border-[#D90429] hover:text-[#D90429]',
    ]"
  >
    <slot />
  </component>
</template>