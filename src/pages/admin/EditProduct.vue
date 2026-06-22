<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../../firebase/config'
import {
  replaceProductImage,
} from '../../services/imageService'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const pageLoading = ref(true)

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
  isActive: true,

  image: '',
  imagePath: '',

  imageFile: null,
  imagePreview: '',
})

const loadProduct = async () => {
  try {
    pageLoading.value = true

    const docRef = doc(db, 'products', route.params.id)
    const snap = await getDoc(docRef)

    if (!snap.exists()) {
      alert('Product not found.')
      router.push('/admin/products')
      return
    }

    const data = snap.data()

    form.value = {
      name: data.name || '',
      category: data.category || '',
      description: data.description || '',
      carBrand: data.carBrand || '',
      carModel: data.carModel || '',
      price: data.price || '',
      availabilityStatus:
        data.availabilityStatus || 'Available on Confirmation',
      estimatedDelivery:
        data.estimatedDelivery || '2-3 Days',
      isFeatured: data.isFeatured || false,
      isActive: data.isActive ?? true,

      image: data.image || '',
      imagePath: data.imagePath || '',

      imageFile: null,
      imagePreview: '',
    }
  } catch (err) {
    console.error(err)
    alert('Failed to load product.')
  } finally {
    pageLoading.value = false
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

const clearSelectedImage = () => {
  if (form.value.imagePreview) {
    URL.revokeObjectURL(form.value.imagePreview)
  }

  form.value.imageFile = null
  form.value.imagePreview = ''
}

const saveProduct = async () => {
  try {
    loading.value = true

    let imageUrl = form.value.image
    let imagePath = form.value.imagePath

    if (form.value.imageFile) {
      const uploadedImage = await replaceProductImage(
        form.value.imageFile,
        form.value.imagePath
      )

      imageUrl = uploadedImage.url
      imagePath = uploadedImage.path
    }

    await updateDoc(
      doc(db, 'products', route.params.id),
      {
        name: form.value.name.trim(),
        category: form.value.category,
        description: form.value.description.trim(),
        carBrand: form.value.carBrand.trim(),
        carModel: form.value.carModel.trim(),
        price: Number(form.value.price),
        availabilityStatus: form.value.availabilityStatus,
        estimatedDelivery: form.value.estimatedDelivery,
        isFeatured: form.value.isFeatured,
        isActive: form.value.isActive,

        image: imageUrl || '/images/no-image.jpg',
        imagePath: imagePath || '',

        updatedAt: serverTimestamp(),
      }
    )

    alert('Product Updated!')
    router.push('/admin/products')
  } catch (err) {
    console.error(err)
    alert(err.message || 'Failed to update product.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 md:p-10">
    <div class="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">
          Edit Product
        </h1>

        <p class="text-gray-500 mt-1">
          Update product details, pricing, availability, and image.
        </p>
      </div>

      <button
        @click="router.push('/admin/products')"
        class="border px-4 py-2 rounded-lg hover:bg-gray-50 transition"
      >
        Back
      </button>
    </div>

    <div
      v-if="pageLoading"
      class="bg-white rounded-2xl shadow p-10 text-center text-gray-500"
    >
      Loading product...
    </div>

    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div class="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-5">
        <div>
          <label class="block text-sm font-medium mb-1">
            Product Name
          </label>

          <input
            v-model="form.name"
            placeholder="Example: M8 LED Headlight"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Category
          </label>

          <select
            v-model="form.category"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
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
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Description
          </label>

          <textarea
            v-model="form.description"
            rows="5"
            placeholder="Write product details, fitment, quality, and notes..."
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Car Brand
            </label>

            <input
              v-model="form.carBrand"
              placeholder="Toyota, Honda, Suzuki..."
              class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Car Model
            </label>

            <input
              v-model="form.carModel"
              placeholder="Civic, Corolla, Alto..."
              class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Price
            </label>

            <input
              v-model="form.price"
              type="number"
              placeholder="Price in PKR"
              class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Estimated Delivery
            </label>

            <input
              v-model="form.estimatedDelivery"
              placeholder="2-3 Days"
              class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Availability Status
          </label>

          <select
            v-model="form.availabilityStatus"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option>Available on Confirmation</option>
            <option>Usually Dispatched in 2–3 Days</option>
            <option>Check Availability</option>
            <option>Out of Stock</option>
          </select>
        </div>

        <div class="flex flex-wrap gap-6 pt-2">
          <label class="flex gap-3 items-center">
            <input
              v-model="form.isFeatured"
              type="checkbox"
              class="w-4 h-4"
            />

            Featured Product
          </label>

          <label class="flex gap-3 items-center">
            <input
              v-model="form.isActive"
              type="checkbox"
              class="w-4 h-4"
            />

            Active Product
          </label>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow p-6 space-y-5 h-fit">
        <div>
          <h2 class="text-xl font-semibold">
            Product Image
          </h2>

          <p class="text-sm text-gray-500 mt-1">
            Upload JPG, PNG, or WEBP under 5MB.
          </p>
        </div>

        <div
          class="border rounded-2xl p-4 bg-gray-50"
        >
          <img
            v-if="form.imagePreview || form.image"
            :src="form.imagePreview || form.image"
            class="w-full h-64 object-cover rounded-xl border bg-white"
          />

          <div
            v-else
            class="w-full h-64 rounded-xl border bg-white flex items-center justify-center text-gray-400"
          >
            No image selected
          </div>
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          @change="handleImage"
          class="w-full border rounded-lg p-3"
        />

        <button
          v-if="form.imagePreview"
          @click="clearSelectedImage"
          class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          Remove Selected Image
        </button>

        <div class="text-xs text-gray-500 break-all">
          <p class="font-medium mb-1">
            Current Storage Path:
          </p>

          <p>
            {{ form.imagePath || 'No storage path saved' }}
          </p>
        </div>

        <button
          @click="saveProduct"
          :disabled="loading"
          class="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-lg transition"
        >
          {{
            loading
              ? 'Saving Changes...'
              : 'Update Product'
          }}
        </button>
      </div>
    </div>
  </div>
</template>