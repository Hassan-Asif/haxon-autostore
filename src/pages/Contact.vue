<script setup>
const whatsappNumber = '923263972241'
</script>

<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Hero -->
    <section
      class="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white py-20"
    >
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-5xl font-black mb-4">
          Contact Us
        </h1>

        <p class="text-slate-300 text-lg">
          Need help finding an accessory for your car?
          We're here to help.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid lg:grid-cols-2 gap-10">
        <!-- Information -->
        <div
          class="bg-white rounded-3xl shadow-lg p-8"
        >
          <h2 class="text-3xl font-bold mb-8">
            Get In Touch
          </h2>

          <div class="space-y-6">
            <div>
              <p
                class="text-sm text-slate-500 mb-1"
              >
                WhatsApp
              </p>

              <p class="text-lg font-semibold">
                +92 326 3972241
              </p>
            </div>

            <div>
              <p
                class="text-sm text-slate-500 mb-1"
              >
                Email
              </p>

              <p class="text-lg font-semibold">
                info@autohub.pk
              </p>
            </div>

            <div>
              <p
                class="text-sm text-slate-500 mb-1"
              >
                Location
              </p>

              <p class="text-lg font-semibold">
                Karachi, Pakistan
              </p>
            </div>

            <div>
              <p
                class="text-sm text-slate-500 mb-1"
              >
                Business Hours
              </p>

              <p class="text-lg font-semibold">
                Mon - Sat
              </p>

              <p class="text-slate-500">
                10:00 AM - 9:00 PM
              </p>
            </div>
          </div>

          <a
            :href="`https://wa.me/${whatsappNumber}`"
            target="_blank"
            class="
              inline-block
              mt-10
              bg-green-500
              hover:bg-green-600
              text-white
              px-8
              py-4
              rounded-xl
              transition
            "
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        <!-- Form -->
        <div
          class="bg-white rounded-3xl shadow-lg p-8"
        >
          <h2 class="text-3xl font-bold mb-8">
            Send a Message
          </h2>

          <form class="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
              "
            />

            <input
              type="email"
              placeholder="Your Email"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
              "
            />

            <input
              type="text"
              placeholder="Phone Number"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
              "
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
              "
            ></textarea>

            <button
              type="button"
              class="
                w-full
                bg-red-600
                hover:bg-red-700
                text-white
                py-4
                rounded-xl
                font-semibold
                transition
              "
            >
              Send Message
            </button>
          </form>

          <p
            class="text-sm text-slate-500 mt-5"
          >
            For faster responses, please contact us
            via WhatsApp.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>