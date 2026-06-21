<script setup>
import { ref, onMounted } from 'vue'
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../../firebase/config'

const products = ref([])

const fetchProducts = async () => {
  const snapshot = await getDocs(
    collection(db, 'products')
  )

  products.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

const removeProduct = async (id) => {
  const confirmDelete = confirm(
    'Delete this product?'
  )

  if (!confirmDelete) return

  await deleteDoc(doc(db, 'products', id))

  await fetchProducts()
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-10">
    <div
      class="flex justify-between items-center mb-10"
    >
      <h1 class="text-4xl font-bold">
        Products
      </h1>

      <router-link
        to="/admin/products/add"
        class="bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Add Product
      </router-link>
    </div>

    <div
      class="bg-white rounded-2xl shadow overflow-hidden"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="p-4 text-left">
              Name
            </th>

            <th class="p-4 text-left">
              Category
            </th>

            <th class="p-4 text-left">
              Price
            </th>

            <th class="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-b"
          >
            <td class="p-4">
              {{ product.name }}
            </td>

            <td class="p-4">
              {{ product.category }}
            </td>

            <td class="p-4">
              Rs. {{ product.price }}
            </td>

            <td class="p-4 flex gap-3">
              <router-link
  :to="`/admin/products/edit/${product.id}`"
  class="bg-blue-600 text-white px-4 py-2 rounded"
>
  Edit
</router-link>

              <button
                @click="
                  removeProduct(product.id)
                "
                class="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>