<script setup>
const about = {
  eyebrow: 'About Haxon',
  title: 'Built for drivers who notice the details.',
  intro:
    'Haxon is a premium automotive accessories store focused on curated products, clean fitment, and upgrades that actually belong on the car.',
  statement:
    'We are not trying to list everything. We are trying to filter the noise and bring forward accessories worth installing.',
}
</script>

<template>
  <main class="min-h-screen bg-black  text-white">
    <section class="relative overflow-hidden border-b border-white/10 bg-[#050607]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(229,9,20,0.12),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.07),transparent_32%)]"
      ></div>

      <p
        class="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,19vw,20rem)] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.035] lg:block"
      >
        Haxon
      </p>

      <div class="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12">
        <div class="max-w-4xl">
          <div class="mb-6 h-1 w-10 bg-[#E50914] shadow-[0_0_18px_rgba(229,9,20,.7)]"></div>

          <p class="text-[11px] font-black uppercase tracking-[0.32em] text-white/45">
            {{ about.eyebrow }}
          </p>

          <h1 class="mt-5 text-[clamp(3.1rem,7vw,7.5rem)] font-black uppercase leading-[0.84] tracking-[-0.075em]">
            {{ about.title }}
          </h1>

          <p class="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            {{ about.intro }}
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 lg:px-12">
      <div class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div class="border border-white/10 bg-[#050607] p-7 sm:p-9">
          <p class="text-[11px] font-black uppercase tracking-[0.28em] text-[#E50914]">
            The Standard
          </p>

          <h2 class="mt-5 text-[clamp(2.4rem,5vw,5.5rem)] font-black uppercase leading-[0.88] tracking-[-0.06em]">
            Not a store.
            <span class="block font-light text-white/70">A filter.</span>
          </h2>
        </div>

        <div class="border border-white/10 bg-[#050607] p-7 sm:p-9">
          <p class="max-w-3xl text-[clamp(1.7rem,3vw,3.5rem)] font-light leading-[1.12] tracking-[-0.045em] text-white/90">
            “Premium isn’t expensive. Premium is choosing the right thing once.”
          </p>

          <p class="mt-7 max-w-2xl text-base leading-8 text-white/52">
            {{ about.statement }}
          </p>
        </div>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div class="border border-white/10 bg-[#050607] p-6">
          <p class="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
            01
          </p>
          <h3 class="mt-4 text-xl font-black uppercase">Selected</h3>
          <p class="mt-3 text-sm leading-6 text-white/45">
            We focus on products that make sense for real cars, real roads, and real use.
          </p>
        </div>

        <div class="border border-white/10 bg-[#050607] p-6">
          <p class="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
            02
          </p>
          <h3 class="mt-4 text-xl font-black uppercase">Verified</h3>
          <p class="mt-3 text-sm leading-6 text-white/45">
            Fitment, finish, and supplier quality matter before anything reaches the catalog.
          </p>
        </div>

        <div class="border border-white/10 bg-[#050607] p-6">
          <p class="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
            03
          </p>
          <h3 class="mt-4 text-xl font-black uppercase">Supported</h3>
          <p class="mt-3 text-sm leading-6 text-white/45">
            Haxon is built around guidance, confirmation, and clean dispatch — not blind checkout.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>