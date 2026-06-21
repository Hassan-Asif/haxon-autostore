<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/config'

const route = useRoute()
const router = useRouter()

const loading = ref(false)

const form = ref({
  name: '',
  category: '',
  description: '',
  carBrand: '',
  carModel: '',
  price: '',
  image: '',
  availabilityStatus: '',
  estimatedDelivery: '',
  isFeatured: false,
})

const loadProduct = async () => {
  const docRef = doc(
    db,
    'products',
    route.params.id
  )

  const snap = await getDoc(docRef)

  if (snap.exists()) {
    form.value = {
      ...snap.data(),
    }
  }
}

const saveProduct = async () => {
  try {
    loading.value = true

    await updateDoc(
      doc(db, 'products', route.params.id),
      {
        ...form.value,
        price: Number(form.value.price),
      }
    )

    alert('Product Updated!')
    router.push('/admin/products')
  } catch (err) {
    console.error(err)
    alert('Failed to update.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-10">
    <h1 class="text-3xl font-bold mb-8">
      Edit Product
    </h1>

    <div class="bg-white rounded-2xl shadow p-6 space-y-4">
      <input
        v-model="form.name"
        placeholder="Product Name"
        class="w-full border rounded-lg p-3"
      />

      <input
        v-model="form.category"
        placeholder="Category"
        class="w-full border rounded-lg p-3"
      />

      <textarea
        v-model="form.description"
        rows="4"
        placeholder="Description"
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

      <input
        v-model="form.image"
        placeholder="Image Path"
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

      <label class="flex gap-3 items-center">
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
        {{
          loading
            ? 'Saving...'
            : 'Update Product'
        }}
      </button>
    </div>
  </div>
</template>