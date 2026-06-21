<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'

const totalProducts = ref(0)
const totalOrders = ref(0)
const pendingOrders = ref(0)
const deliveredOrders = ref(0)

const loadStats = async () => {
  const productsSnapshot = await getDocs(
    collection(db, 'products')
  )

  totalProducts.value =
    productsSnapshot.size

  const ordersSnapshot = await getDocs(
    collection(db, 'orders')
  )

  totalOrders.value = ordersSnapshot.size

  const orders = ordersSnapshot.docs.map(
    doc => doc.data()
  )

  pendingOrders.value = orders.filter(
    order =>
      order.status ===
      'Pending Confirmation'
  ).length

  deliveredOrders.value = orders.filter(
    order =>
      order.status === 'Delivered'
  ).length
}

onMounted(() => {
  loadStats()
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-10">
    <h1 class="text-4xl font-bold mb-10">
      Dashboard
    </h1>

    <div
      class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
    >
      <div
        class="bg-white p-6 rounded-2xl shadow"
      >
        <p class="text-gray-500">
          Products
        </p>

        <h2 class="text-4xl font-bold mt-3">
          {{ totalProducts }}
        </h2>
      </div>

      <div
        class="bg-white p-6 rounded-2xl shadow"
      >
        <p class="text-gray-500">
          Orders
        </p>

        <h2 class="text-4xl font-bold mt-3">
          {{ totalOrders }}
        </h2>
      </div>

      <div
        class="bg-white p-6 rounded-2xl shadow"
      >
        <p class="text-gray-500">
          Pending
        </p>

        <h2 class="text-4xl font-bold mt-3 text-yellow-500">
          {{ pendingOrders }}
        </h2>
      </div>

      <div
        class="bg-white p-6 rounded-2xl shadow"
      >
        <p class="text-gray-500">
          Delivered
        </p>

        <h2 class="text-4xl font-bold mt-3 text-green-600">
          {{ deliveredOrders }}
        </h2>
      </div>
    </div>

    <div class="flex flex-wrap gap-4">
      <router-link
        to="/admin/products"
        class="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Manage Products
      </router-link>

      <router-link
        to="/admin/orders"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        View Orders
      </router-link>
    </div>
  </div>
</template>