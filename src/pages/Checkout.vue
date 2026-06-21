<script setup>
import { ref } from 'vue'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { db } from '../firebase/config'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

const form = ref({
  name: '',
  phone: '',
  city: '',
  address: '',
  paymentMethod: 'Cash on Delivery',
})

const loading = ref(false)

const placeOrder = async () => {
  if (!cartStore.items.length) {
    alert('Cart is empty.')
    return
  }

  try {
    loading.value = true

    await addDoc(collection(db, 'orders'), {
      customerName: form.value.name,
      phone: form.value.phone,
      city: form.value.city,
      address: form.value.address,
      paymentMethod: form.value.paymentMethod,

      products: cartStore.items,

      total: cartStore.totalPrice,

      status: 'Pending Confirmation',

      createdAt: serverTimestamp(),
    })

    cartStore.clearCart()

    alert('Order placed successfully!')

    router.push('/')
  } catch (err) {
    console.error(err)
    alert('Failed to place order.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-10">
    <h1 class="text-4xl font-bold mb-10">
      Checkout
    </h1>

    <div class="bg-white rounded-2xl shadow p-6 space-y-4">
      <input
        v-model="form.name"
        placeholder="Full Name"
        class="w-full border rounded-lg p-3"
      />

      <input
        v-model="form.phone"
        placeholder="Phone Number"
        class="w-full border rounded-lg p-3"
      />

      <input
        v-model="form.city"
        placeholder="City"
        class="w-full border rounded-lg p-3"
      />

      <textarea
        v-model="form.address"
        placeholder="Delivery Address"
        rows="4"
        class="w-full border rounded-lg p-3"
      />

      <select
        v-model="form.paymentMethod"
        class="w-full border rounded-lg p-3"
      >
        <option>Cash on Delivery</option>
        <option>Bank Transfer</option>
        <option>Easypaisa</option>
        <option>JazzCash</option>
      </select>

      <div class="border-t pt-4">
        <h2 class="font-bold text-2xl">
          Total: Rs. {{ cartStore.totalPrice }}
        </h2>
      </div>

      <button
        @click="placeOrder"
        :disabled="loading"
        class="bg-red-600 text-white px-8 py-3 rounded-lg"
      >
        {{ loading ? 'Placing Order...' : 'Place Order' }}
      </button>
    </div>
  </div>
</template>