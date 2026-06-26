<script setup>
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useCartStore } from '../stores/cartStore'
import {
  buildTimelineEntry,
  formatPrice,
  normalizePhone,
  productImage,
  productMode,
} from '../lib/catalog'

const cart = useCartStore()
const loading = ref(false)
const success = ref('')

const form = ref({
  name: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  carMake: '',
  carModel: '',
  carYear: '',
  notes: '',
  paymentMethod: 'Cash on Delivery',
})

const delivery = ref(0)

const subtotal = computed(() =>
  cart.items.reduce(
    (sum, item) =>
      sum + Number(item.salePrice || item.price || 0) * Number(item.quantity || 1),
    0,
  ),
)

const total = computed(() => subtotal.value + Number(delivery.value || 0))

const needsConfirmation = computed(() =>
  cart.items.some((item) =>
    ['Confirm Fitment', 'On Request', 'Premium Import'].includes(productMode(item)),
  ),
)

const orderNumber = () =>
  `HXN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`

const place = async () => {
  if (
    !cart.items.length ||
    !form.value.name ||
    !form.value.phone ||
    !form.value.address ||
    !form.value.city
  ) {
    toast.error('Complete required checkout fields')
    return
  }

  loading.value = true
  const number = orderNumber()

  try {
    const items = cart.items.map((item) => ({
      id: item.id,
      name: item.name,
      brand: item.brand || item.carBrand || '',
      category: item.category || '',
      image: productImage(item),
      price: Number(item.salePrice || item.price || 0),
      quantity: Number(item.quantity || 1),
      productMode: productMode(item),
      fitmentNotes: item.fitmentNotes || '',
    }))

    await addDoc(collection(db, 'orders'), {
      orderNumber: number,
      customer: {
        name: form.value.name,
        phone: form.value.phone,
        normalizedPhone: normalizePhone(form.value.phone),
        email: form.value.email,
        address: form.value.address,
        city: form.value.city,
      },
      vehicle: {
        make: form.value.carMake,
        model: form.value.carModel,
        year: form.value.carYear,
      },
      customerName: form.value.name,
      phone: form.value.phone,
      normalizedPhone: normalizePhone(form.value.phone),
      email: form.value.email,
      address: form.value.address,
      city: form.value.city,
      items,
      products: items,
      subtotal: subtotal.value,
      deliveryCharges: Number(delivery.value || 0),
      delivery: Number(delivery.value || 0),
      discount: 0,
      customAdjustment: 0,
      total: total.value,
      totalAmount: total.value,
      paymentMethod: form.value.paymentMethod,
      paymentStatus: 'Unpaid',
      orderStatus: 'Pending',
      status: 'Pending',
      notes: form.value.notes,
      adminNotes: '',
      timeline: [buildTimelineEntry('Pending', 'Order received by Haxon')],
      requiresFitmentConfirmation: needsConfirmation.value,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    cart.clearCart()
    success.value = number
    toast.success(`Order placed: ${number}`)
  } catch (err) {
    console.error(err)
    toast.error('Checkout failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-black text-white">
    <section class="relative overflow-hidden border-b border-white/10 bg-[#050607]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(229,9,20,0.12),transparent_34%),radial-gradient(circle_at_12%_80%,rgba(255,255,255,0.07),transparent_32%)]"
      ></div>

      <p
        class="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,19vw,20rem)] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.035] lg:block"
      >
        Checkout
      </p>

      <div class="relative mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-12">
        <div class="max-w-3xl">
          <div class="mb-6 h-1 w-10 bg-[#E50914]"></div>

          <p class="text-[11px] font-black uppercase tracking-[0.32em] text-white/45">
            Haxon Checkout
          </p>

          <h1 class="mt-5 text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.84] tracking-[-0.075em]">
            Complete your order.
          </h1>

          <p class="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            We’ll confirm fitment, availability and dispatch details before the order moves.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12">
      <div
        v-if="success"
        class="relative overflow-hidden border border-emerald-400/25 bg-emerald-400/10 px-6 py-16 text-center"
      >
        <p class="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-100/60">
          Order received
        </p>

        <h2 class="mt-4 text-4xl font-black uppercase tracking-[-0.05em]">
          {{ success }}
        </h2>

        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55">
          Haxon will confirm availability, fitment and payment details before dispatch.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/track-order"
            class="grid h-12 place-items-center border border-white/10 bg-white px-7 text-[11px] font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#E50914] hover:text-white"
          >
            Track order
          </router-link>

          <router-link
            to="/products"
            class="grid h-12 place-items-center border border-white/10 px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white/70 transition hover:border-white/25 hover:text-white"
          >
            Continue shopping
          </router-link>
        </div>
      </div>

      <div
        v-else-if="cart.items.length"
        class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]"
      >
        <div class="space-y-6">
          <section class="border border-white/10 bg-[#050607] p-6 sm:p-8">
            <p class="text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
              Customer Details
            </p>

            <div class="mt-6 grid gap-4 md:grid-cols-2">
              <input v-model="form.name" placeholder="Full name *" class="checkout-input" />
              <input v-model="form.phone" placeholder="Phone *" class="checkout-input" />
              <input v-model="form.email" placeholder="Email" class="checkout-input" />
              <input v-model="form.city" placeholder="City *" class="checkout-input" />
              <textarea
                v-model="form.address"
                placeholder="Address *"
                class="checkout-input min-h-[120px] md:col-span-2"
              ></textarea>
            </div>
          </section>

          <section class="border border-white/10 bg-[#050607] p-6 sm:p-8">
            <p class="text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
              Vehicle Information
            </p>

            <div class="mt-6 grid gap-4 md:grid-cols-3">
              <input v-model="form.carMake" placeholder="Make e.g. Toyota" class="checkout-input" />
              <input v-model="form.carModel" placeholder="Model e.g. Corolla" class="checkout-input" />
              <input v-model="form.carYear" placeholder="Year e.g. 2022" class="checkout-input" />
              <textarea
                v-model="form.notes"
                placeholder="Notes / vehicle details"
                class="checkout-input min-h-[120px] md:col-span-3"
              ></textarea>
            </div>

            <p
              v-if="needsConfirmation"
              class="mt-5 border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100/80"
            >
              Some products require fitment or price confirmation before final dispatch.
            </p>
          </section>

          <section class="border border-white/10 bg-[#050607] p-6 sm:p-8">
            <p class="text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
              Payment Method
            </p>

            <div class="mt-6 grid gap-3">
              <label
                v-for="method in ['Cash on Delivery', 'Bank Transfer', 'Easypaisa / JazzCash']"
                :key="method"
                class="flex cursor-pointer items-center justify-between border border-white/10 bg-black/25 p-4 text-sm font-semibold text-white/65 transition hover:border-white/25 hover:text-white"
              >
                <span>{{ method }}</span>

                <input
                  v-model="form.paymentMethod"
                  :value="method"
                  type="radio"
                  class="h-4 w-4 accent-[#E50914]"
                />
              </label>
            </div>
          </section>
        </div>

        <aside class="h-fit border border-white/10 bg-[#050607] p-6 lg:sticky lg:top-24">
          <p class="text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
            Order Summary
          </p>

          <div class="mt-6 max-h-[360px] space-y-4 overflow-y-auto pr-1">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="grid grid-cols-[64px_1fr] gap-3 border-b border-white/10 pb-4 last:border-b-0"
            >
              <div class="relative flex h-16 items-center justify-center border border-white/10 bg-[#07080a]">
                <img
                  :src="productImage(item)"
                  :alt="item.name"
                  class="h-[90%] w-[90%] object-contain"
                  @error="$event.target.src = '/image/products/no-image.jpeg'"
                />
              </div>

              <div class="min-w-0">
                <p class="line-clamp-2 text-sm font-black leading-tight text-white/85">
                  {{ item.name }}
                </p>

                <p class="mt-1 text-xs text-white/40">
                  Qty {{ item.quantity }} × {{ formatPrice(item.salePrice || item.price) }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 divide-y divide-white/10 text-sm">
            <div class="flex justify-between py-4">
              <span class="text-white/42">Subtotal</span>
              <span class="font-black">{{ formatPrice(subtotal) }}</span>
            </div>

            <div class="flex justify-between py-4">
              <span class="text-white/42">Delivery</span>
              <span class="font-black">{{ formatPrice(delivery) }}</span>
            </div>

            <div class="flex items-end justify-between py-5">
              <span class="text-white/42">Total</span>
              <span class="text-3xl font-black tracking-[-0.05em]">
                {{ formatPrice(total) }}
              </span>
            </div>
          </div>

          <button
            class="mt-6 grid h-12 w-full place-items-center border border-[#E50914] bg-[#E50914] px-6 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="loading"
            @click="place"
          >
            {{ loading ? 'Placing order...' : 'Place order' }}
          </button>

          <p class="mt-5 text-xs leading-6 text-white/38">
            Premium isn’t expensive. Premium is choosing the right thing once.
          </p>
        </aside>
      </div>

      <div
        v-else
        class="border border-white/10 bg-[#050607] px-6 py-20 text-center"
      >
        <p class="text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
          Empty cart
        </p>

        <h2 class="mt-4 text-4xl font-black uppercase tracking-[-0.05em]">
          Nothing to checkout.
        </h2>

        <router-link
          to="/products"
          class="mt-7 inline-grid h-12 place-items-center border border-[#E50914] bg-[#E50914] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
        >
          Browse products
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.checkout-input {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.3);
  padding: 0.95rem 1rem;
  color: white;
  outline: none;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.checkout-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.checkout-input:focus {
  border-color: rgba(229, 9, 20, 0.7);
}
</style>