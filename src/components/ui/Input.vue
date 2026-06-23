<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  dark: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="block">
    <span
      v-if="label"
      class="mb-2 block text-xs font-bold uppercase tracking-[0.22em]"
      :class="dark ? 'text-[#B8BDC5]' : 'text-[#555]'"
    >
      {{ label }}
    </span>

    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
      :class="[
        dark
          ? 'border-white/10 bg-white/5 text-white placeholder:text-white/35 focus:border-[#D90429]/70'
          : 'border-black/10 bg-white text-[#121212] placeholder:text-black/35 focus:border-[#D90429]/70',
        error && 'border-[#D90429] focus:border-[#D90429]'
      ]"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <p
      v-if="error || hint"
      class="mt-2 text-xs"
      :class="error ? 'text-[#D90429]' : dark ? 'text-white/45' : 'text-black/45'"
    >
      {{ error || hint }}
    </p>
  </label>
</template>