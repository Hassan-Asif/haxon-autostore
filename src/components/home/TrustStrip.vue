<script setup>
const features = [
  {
    title: 'Confirmed Availability',
    description:
      'Every order is verified before dispatch.',
  },
  {
    title: 'Nationwide Delivery',
    description:
      'Fast delivery across Pakistan.',
  },
  {
    title: 'Fitment Assistance',
    description:
      "Need help? We'll help you choose.",
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-[#F4F1EC]">
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="
        background-image:
          linear-gradient(
            90deg,
            #000 1px,
            transparent 1px
          ),
          linear-gradient(
            #000 1px,
            transparent 1px
          );
        background-size: 36px 36px;
      "
    ></div>

    <div class="relative max-w-7xl mx-auto px-6 py-14">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10"
      >
        <div class="max-w-xl">
          <p
            class="uppercase tracking-[0.35em] text-xs font-semibold text-[#777]"
          >
            HAXON AUTOMOTIVE
          </p>

          <h2
            class="mt-4 text-4xl md:text-5xl font-black text-[#121212] leading-tight"
          >
            Built around quality,
            <br />
            not quantity.
          </h2>

          <p
            class="mt-5 text-[#666] leading-relaxed"
          >
            Premium accessories selected for
            fit, finish and everyday use.
            Clean styling, honest pricing and
            confirmed availability before
            dispatch.
          </p>
        </div>

        <div
          class="grid md:grid-cols-3 gap-5 lg:w-[55%]"
        >
          <div
            v-for="item in features"
            :key="item.title"
            class="
              group
              bg-white/70
              backdrop-blur
              border
              border-black/5
              rounded-3xl
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div
              class="
                w-12
                h-[2px]
                bg-[#D90429]
                mb-5
                transition-all
                group-hover:w-20
              "
            ></div>

            <h3
              class="font-bold text-lg text-[#121212]"
            >
              {{ item.title }}
            </h3>

            <p
              class="mt-3 text-sm leading-relaxed text-[#666]"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>