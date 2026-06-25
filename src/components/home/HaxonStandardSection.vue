<template>
  <section class="relative overflow-hidden bg-black py-10 text-white sm:py-14">
    <div class="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
      <div class="relative overflow-hidden border border-white/10 bg-[#050607]">
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(229,9,20,0.13),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(255,255,255,0.07),transparent_32%)]"
        ></div>

        <p
          class="pointer-events-none absolute -left-3 top-6 hidden text-[clamp(7rem,17vw,18rem)] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.035] lg:block"
        >
          Standard
        </p>

        <div class="relative grid lg:grid-cols-[0.95fr_1.05fr]">
          <div class="flex min-h-[430px] flex-col justify-between border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r">
            <div>
              <div class="mb-6 h-1 w-10 bg-[#E50914] shadow-[0_0_18px_rgba(229,9,20,0.65)]"></div>

              <p class="text-[11px] font-black uppercase tracking-[0.32em] text-white/45">
                Haxon Standard
              </p>

              <h2 class="mt-7 max-w-xl text-[clamp(2.7rem,5.4vw,6.4rem)] font-black uppercase leading-[0.88] tracking-[-0.065em]">
                Not a store.
                <span class="block font-light text-white/72">A filter.</span>
              </h2>

              <p class="mt-7 max-w-md text-base leading-7 text-white/52">
                Thousands of accessories exist. Most never deserve to touch your car.
                We find the ones that do.
              </p>
            </div>

            <router-link
              to="/standard"
              class="group mt-10 inline-flex h-12 w-fit items-center gap-12 border border-white/25 bg-black/20 px-7 text-[12px] font-black uppercase tracking-[0.2em] text-white transition hover:border-[#E50914] hover:bg-[#E50914]"
            >
              Learn More
              <span class="text-lg transition group-hover:translate-x-1">→</span>
            </router-link>
          </div>

          <div class="flex min-h-[430px] flex-col justify-between p-7 sm:p-9">
            <div>
              <div class="flex items-center gap-5">
                <span class="text-5xl font-black leading-none text-[#E50914]">“</span>
                <div class="h-px flex-1 bg-white/15"></div>
              </div>

              <p class="mt-9 max-w-2xl text-[clamp(2rem,3.6vw,4.4rem)] font-light leading-[1.08] tracking-[-0.055em] text-white/92">
                Premium isn’t expensive.
                <span class="block">Premium is choosing</span>
                <span class="block">the right thing once.</span>
              </p>

              <div class="mt-9 flex items-center gap-5">
                <div class="h-px w-8 bg-[#E50914]"></div>
                <p class="text-[11px] font-black uppercase tracking-[0.42em] text-white/58">
                  Built around quality, not quantity
                </p>
              </div>
            </div>

            <div class="mt-12 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div class="group border-white/10 sm:border-r sm:pr-6">
                <p class="text-[10px] font-black uppercase tracking-[0.24em] text-white/80">
                  01 Selected
                </p>
                <p class="mt-3 text-sm leading-6 text-white/45">
                  Curated products only — not endless catalog clutter.
                </p>
              </div>

              <div class="group border-white/10 sm:border-r sm:px-6">
                <p class="text-[10px] font-black uppercase tracking-[0.24em] text-white/80">
                  02 Verified
                </p>
                <p class="mt-3 text-sm leading-6 text-white/45">
                  Checked for finish, fitment, and daily-use reliability.
                </p>
              </div>

              <div class="group sm:pl-6">
                <p class="text-[10px] font-black uppercase tracking-[0.24em] text-white/80">
                  03 Ready
                </p>
                <p class="mt-3 text-sm leading-6 text-white/45">
                  Chosen to install cleanly and feel right on the car.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>