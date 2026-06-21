<script setup>
import { ref } from 'vue'
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../firebase/config'

const form = ref({
  name: '',
  category: '',
  description: '',
  carBrand: '',
  carModel: '',
  price: '',
  availabilityStatus: 'Available on Confirmation',
  estimatedDelivery: '2-3 Days',
  isFeatured: false,
})

const loading = ref(false)

const saveProduct = async () => {
  try {
    loading.value = true

    await addDoc(collection(db, 'products'), {
      name: form.value.name,
      category: form.value.category,
      description: form.value.description,
      carBrand: form.value.carBrand,
      carModel: form.value.carModel,
      price: Number(form.value.price),
      availabilityStatus:
        form.value.availabilityStatus,
      estimatedDelivery:
        form.value.estimatedDelivery,
      isFeatured: form.value.isFeatured,
      isActive: true,
      image:
        '/images/no-image.jpg',
      createdAt: serverTimestamp(),
    })

    alert('Product Added Successfully!')

    form.value = {
      name: '',
      category: '',
      description: '',
      carBrand: '',
      carModel: '',
      price: '',
      availabilityStatus:
        'Available on Confirmation',
      estimatedDelivery: '2-3 Days',
      isFeatured: false,
    }
  } catch (err) {
    console.error(err)
    alert('Failed to add product.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-10">
    <h1 class="text-3xl font-bold mb-8">
      Add Product
    </h1>

    <div class="bg-white shadow rounded-2xl p-6 space-y-4">
      <input
        v-model="form.name"
        placeholder="Product Name"
        class="w-full border rounded-lg p-3"
      />

      <select
        v-model="form.category"
        class="w-full border rounded-lg p-3"
      >
        <option value="">Select Category</option>
        <option>Exterior Accessories</option>
        <option>Interior Accessories</option>
        <option>LED & Lighting</option>
        <option>Car Care</option>
        <option>Security & Utility</option>
      </select>

      <textarea
        v-model="form.description"
        placeholder="Description"
        rows="4"
        class="w-full border rounded-lg p-3"
      />

      <input
        v-model="form.carBrand"
        placeholder="Car Brand"
        class="w-full border rounded-lg p-3"
      />

      <input
        v-model="form.carModel"
        placeholder="Car Model"
        class="w-full border rounded-lg p-3"
      />

      <input
        v-model="form.price"
        type="number"
        placeholder="Price"
        class="w-full border rounded-lg p-3"
      />

      <select
        v-model="form.availabilityStatus"
        class="w-full border rounded-lg p-3"
      >
        <option>
          Available on Confirmation
        </option>
        <option>
          Usually Dispatched in 2–3 Days
        </option>
        <option>
          Check Availability
        </option>
        <option>
          Out of Stock
        </option>
      </select>

      <input
        v-model="form.estimatedDelivery"
        placeholder="Estimated Delivery"
        class="w-full border rounded-lg p-3"
      />

      <label class="flex items-center gap-3">
        <input
          v-model="form.isFeatured"
          type="checkbox"
        />
        Featured Product
      </label>

      <button
        @click="saveProduct"
        :disabled="loading"
        class="bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        {{ loading ? 'Saving...' : 'Save Product' }}
      </button>
    </div>
  </div>
</template>