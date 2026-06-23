<script setup>
const standards = [
  {
    number: '01',
    title: 'Verified Quality',
    description:
      'Products are selected for practical use, finish, and reliability before being listed.',
  },
  {
    number: '02',
    title: 'Fitment First',
    description:
      'Browse by vehicle and model so the upgrade feels fitted, not forced.',
  },
  {
    number: '03',
    title: 'Clean Pricing',
    description:
      'Simple product pricing with subtle value indicators instead of loud sale noise.',
  },
  {
    number: '04',
    title: 'Confirmed Dispatch',
    description:
      'Availability is checked so your order moves with clarity from inquiry to delivery.',
  },
]
</script>

<template>
  <section
    class="relative overflow-hidden py-20 sm:py-24"
    style="background-color: #101820; color: white;"
  >
    <div
      class="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl"
      style="background-color: rgba(72, 104, 132, 0.35);"
    ></div>

    <div
      class="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full blur-3xl"
      style="background-color: rgba(217, 4, 41, 0.12);"
    ></div>

    <div class="pointer-events-none absolute inset-0 opacity-[0.05]">
      <div
        class="h-full w-full"
        style="
          background-image:
            linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px);
          background-size: 52px 52px;
        "
      ></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <div class="mb-12 max-w-2xl">
        <div class="mb-5 flex items-center gap-4">
          <span class="h-px w-12" style="background-color: #d90429;"></span>

          <p
            class="text-[10px] font-black uppercase tracking-[0.35em]"
            style="color: rgba(255,255,255,0.45);"
          >
            Haxon Standard
          </p>
        </div>

        <h2 class="text-4xl font-black leading-[0.9] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
          Built around standards, not shelf clutter.
        </h2>

        <p
          class="mt-5 max-w-xl text-sm leading-7"
          style="color: rgba(255,255,255,0.6);"
        >
          Every product should earn its place. Fit, finish, pricing, and dispatch
          all need to feel clean before it reaches the customer.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="standard in standards"
          :key="standard.title"
          class="group relative min-h-[280px] overflow-hidden rounded-[2rem] p-6 shadow-2xl backdrop-blur transition duration-500 hover:-translate-y-2"
          style="
            border: 1px solid rgba(255,255,255,0.1);
            background-color: rgba(255,255,255,0.055);
            box-shadow: 0 25px 70px rgba(0,0,0,0.25);
          "
        >
          <div
            class="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition"
            style="background-color: rgba(217,4,41,0.12);"
          ></div>

          <div class="relative flex h-full flex-col justify-between">
            <div>
              <div class="mb-8 flex items-center justify-between">
                <span
                  class="grid h-12 w-12 place-items-center rounded-full text-sm font-black transition"
                  style="
                    border: 1px solid rgba(255,255,255,0.12);
                    background-color: rgba(0,0,0,0.25);
                    color: rgba(255,255,255,0.75);
                  "
                >
                  {{ standard.number }}
                </span>

                <span
                  class="h-2 w-2 rounded-full transition"
                  style="background-color: rgba(255,255,255,0.25);"
                ></span>
              </div>

              <h3 class="text-2xl font-black tracking-[-0.045em]">
                {{ standard.title }}
              </h3>

              <p
                class="mt-4 text-sm leading-7"
                style="color: rgba(255,255,255,0.58);"
              >
                {{ standard.description }}
              </p>
            </div>

            <div class="mt-10">
              <div class="h-px w-full" style="background-color: rgba(255,255,255,0.1);">
                <div
                  class="h-px w-12 transition-all duration-500 group-hover:w-full"
                  style="background-color: #d90429;"
                ></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>