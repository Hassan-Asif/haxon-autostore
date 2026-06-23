<script setup>
import { watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
  dark: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

watch(
  () => props.open,
  (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
  }
)

const close = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        @click.self="close"
      >
        <Transition
          appear
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-4 scale-[0.98] opacity-0"
          enter-to-class="translate-y-0 scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 scale-100 opacity-100"
          leave-to-class="translate-y-4 scale-[0.98] opacity-0"
        >
          <section
            class="max-h-[90vh] w-full overflow-hidden rounded-[28px] border shadow-2xl"
            :class="[
              size === 'sm' && 'max-w-md',
              size === 'md' && 'max-w-2xl',
              size === 'lg' && 'max-w-4xl',
              size === 'xl' && 'max-w-6xl',
              dark
                ? 'border-white/10 bg-[#181A1D] text-white shadow-black/40'
                : 'border-black/10 bg-white text-[#121212] shadow-black/20'
            ]"
          >
            <header
              v-if="title || $slots.header"
              class="flex items-center justify-between gap-4 border-b px-6 py-5"
              :class="dark ? 'border-white/10' : 'border-black/10'"
            >
              <slot name="header">
                <h2 class="text-xl font-black tracking-tight">
                  {{ title }}
                </h2>
              </slot>

              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-full border text-xl transition hover:border-[#D90429] hover:text-[#D90429]"
                :class="dark ? 'border-white/10 text-white/70' : 'border-black/10 text-black/60'"
                @click="close"
                aria-label="Close modal"
              >
                ×
              </button>
            </header>

            <div class="max-h-[70vh] overflow-y-auto p-6">
              <slot />
            </div>

            <footer
              v-if="$slots.footer"
              class="border-t px-6 py-5"
              :class="dark ? 'border-white/10' : 'border-black/10'"
            >
              <slot name="footer" />
            </footer>
          </section>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>