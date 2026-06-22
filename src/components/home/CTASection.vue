<script setup>
</script>

<template>
  <section class="relative overflow-hidden bg-[#121212] py-24">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(180deg,#101010_0%,#17191B_45%,#0E0E0E_100%)]"
    ></div>

    <div
      class="absolute inset-0 opacity-[0.08] bg-[linear-gradient(120deg,transparent_0%,transparent_35%,rgba(255,255,255,0.12)_50%,transparent_65%,transparent_100%)]"
    ></div>

    <div class="relative max-w-7xl mx-auto px-6">
      <div
        class="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-[#181A1D]/90
          p-10
          md:p-16
        "
      >
        <!-- Decorative -->
        <div
          class="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-[#D90429]/20"
        ></div>

        <div
          class="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-white/5"
        ></div>

        <div class="max-w-3xl">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-12 h-px bg-[#D90429]"></span>

            <span
              class="uppercase tracking-[0.35em] text-[#C0C0C0] text-xs font-semibold"
            >
              Premium Automotive
            </span>

            <span class="w-12 h-px bg-[#D90429]"></span>
          </div>

          <h2
            class="
              text-white
              text-4xl
              md:text-6xl
              font-black
              leading-tight
              tracking-tight
            "
          >
            Upgrade the way
            <br />

            <span class="text-[#D90429]">
              your car feels.
            </span>
          </h2>

          <p
            class="
              mt-8
              text-[#C0C0C0]
              text-lg
              leading-relaxed
              max-w-2xl
            "
          >
            Premium accessories, verified fitments,
            nationwide delivery and honest pricing.

            Every product is selected to improve your
            driving experience — not just fill a catalogue.
          </p>

          <div
            class="flex flex-wrap gap-4 mt-10"
          >
            <router-link
              to="/products"
              class="
                group
                bg-[#D90429]
                hover:bg-[#b90322]
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                transition
                flex
                items-center
                gap-3
              "
            >
              Shop Collection

              <span
                class="group-hover:translate-x-1 transition"
              >
                →
              </span>
            </router-link>

            <router-link
              to="/contact"
              class="
                border
                border-white/10
                hover:border-[#D90429]
                hover:bg-white/5
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                transition
              "
            >
              Contact Us
            </router-link>
          </div>

          <div
            class="
              flex
              flex-wrap
              gap-8
              mt-12
              pt-8
              border-t
              border-white/10
            "
          >
            <div>
              <h3
                class="text-2xl font-black text-white"
              >
                1000+
              </h3>

              <p
                class="text-[#C0C0C0] text-sm mt-1"
              >
                Products
              </p>
            </div>

            <div>
              <h3
                class="text-2xl font-black text-white"
              >
                Pakistan
              </h3>

              <p
                class="text-[#C0C0C0] text-sm mt-1"
              >
                Nationwide Delivery
              </p>
            </div>

            <div>
              <h3
                class="text-2xl font-black text-white"
              >
                Support
              </h3>

              <p
                class="text-[#C0C0C0] text-sm mt-1"
              >
                Fitment Assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>