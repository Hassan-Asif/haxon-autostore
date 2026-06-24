<template>
  <section class="premium-section pt-0">
    <div class="premium-container grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
      <div class="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(229,9,20,.2),transparent_20rem),linear-gradient(135deg,#151a21,#080a0f)] p-8 md:p-12">
        <p class="premium-eyebrow">Fitment first</p><h2 class="mt-5 text-4xl font-black leading-none tracking-[-.05em] md:text-6xl">Not every accessory fits every car. Haxon checks the fit before the dispatch.</h2><p class="mt-6 max-w-2xl text-lg leading-8 text-haxon-muted">Tell us your vehicle year, variant, and build goal. We confirm compatibility, availability, and sourcing route before your order moves.</p><router-link to="/contact" class="premium-btn premium-btn-light mt-8">Fitment Help</router-link>
      </div>
      <div class="grid gap-3">
        <div v-for="(step,i) in ['Tell us your vehicle','We confirm compatibility','You get price/availability','Dispatch or source on request']" :key="step" class="rounded-[1.5rem] border border-white/10 bg-white/[.045] p-6"><p class="text-xs font-black uppercase tracking-[.25em] text-white/35">0{{ i+1 }}</p><h3 class="mt-3 text-2xl font-black">{{ step }}</h3></div>
      </div>
    </div>
  </section>
</template>
