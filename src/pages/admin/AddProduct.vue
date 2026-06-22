<script setup>
import { ref } from 'vue'
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../../firebase/config'
import { uploadProductImage } from '../../services/imageService'

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

  imageFile: null,
  imagePreview: '',
})

const loading = ref(false)

const resetForm = () => {
  if (form.value.imagePreview) {
    URL.revokeObjectURL(form.value.imagePreview)
  }

  form.value = {
    name: '',
    category: '',
    description: '',
    carBrand: '',
    carModel: '',
    price: '',
    availabilityStatus: 'Available on Confirmation',
    estimatedDelivery: '2-3 Days',
    isFeatured: false,

    imageFile: null,
    imagePreview: '',
  }
}

const handleImage = (event) => {
  const file = event.target.files[0]

  if (!file) return

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  if (!allowedTypes.includes(file.type)) {
    alert('Please select a JPG, PNG, or WEBP image.')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('Please select an image under 5MB.')
    return
  }

  if (form.value.imagePreview) {
    URL.revokeObjectURL(form.value.imagePreview)
  }

  form.value.imageFile = file
  form.value.imagePreview = URL.createObjectURL(file)
}

const saveProduct = async () => {
  try {
    loading.value = true

    let uploadedImage = null

    if (form.value.imageFile) {
      uploadedImage = await uploadProductImage(form.value.imageFile)
    }

    await addDoc(collection(db, 'products'), {
      name: form.value.name.trim(),
      category: form.value.category,
      description: form.value.description.trim(),
      carBrand: form.value.carBrand.trim(),
      carModel: form.value.carModel.trim(),
      price: Number(form.value.price),
      availabilityStatus: form.value.availabilityStatus,
      estimatedDelivery: form.value.estimatedDelivery,
      isFeatured: form.value.isFeatured,
      isActive: true,

      image: uploadedImage?.url || '/images/no-image.jpg',
      imagePath: uploadedImage?.path || '',

      createdAt: serverTimestamp(),
    })

    alert('Product Added Successfully!')
    resetForm()
  } catch (err) {
    console.error(err)
    alert(err.message || 'Failed to add product.')
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
        <option value="">
          Select Category
        </option>

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
        <option>Available on Confirmation</option>
        <option>Usually Dispatched in 2–3 Days</option>
        <option>Check Availability</option>
        <option>Out of Stock</option>
      </select>

      <input
        v-model="form.estimatedDelivery"
        placeholder="Estimated Delivery"
        class="w-full border rounded-lg p-3"
      />

      <div>
        <label class="block mb-2 font-medium">
          Product Image
        </label>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          @change="handleImage"
          class="w-full border rounded-lg p-3"
        />

        <img
          v-if="form.imagePreview"
          :src="form.imagePreview"
          class="mt-4 w-40 h-40 object-cover rounded-lg border"
        />
      </div>

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
        class="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-lg transition"
      >
        {{
          loading
            ? 'Saving...'
            : 'Save Product'
        }}
      </button>
    </div>
  </div>
</template>