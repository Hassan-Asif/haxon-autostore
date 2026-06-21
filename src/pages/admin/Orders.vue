<script setup>
import { ref, onMounted } from 'vue'
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/config'

const orders = ref([])

const statuses = [
  'Pending Confirmation',
  'Vendor Checking',
  'Confirmed',
  'Bought from Vendor',
  'Packed',
  'Dispatched',
  'Delivered',
  'Cancelled',
]

const fetchOrders = async () => {
  const snapshot = await getDocs(
    collection(db, 'orders')
  )

  orders.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

const updateStatus = async (
  id,
  status
) => {
  await updateDoc(
    doc(db, 'orders', id),
    {
      status,
    }
  )

  await fetchOrders()
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-10">
    <h1 class="text-4xl font-bold mb-10">
      Orders
    </h1>

    <div
      v-if="orders.length"
      class="space-y-6"
    >
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white rounded-2xl shadow p-6"
      >
        <div
          class="flex justify-between items-start"
        >
          <div>
            <h2
              class="text-xl font-bold"
            >
              {{ order.customerName }}
            </h2>

            <p>
              {{ order.phone }}
            </p>

            <p>
              {{ order.city }}
            </p>

            <p>
              {{ order.address }}
            </p>

            <p class="mt-2">
              Payment:
              {{ order.paymentMethod }}
            </p>

            <p class="mt-2">
              Total:
              Rs. {{ order.total }}
            </p>

            <p class="mt-2">
              Status:
              <strong>
                {{ order.status }}
              </strong>
            </p>
          </div>

          <div>
            <select
              :value="order.status"
              @change="
                updateStatus(
                  order.id,
                  $event.target.value
                )
              "
              class="border rounded-lg p-2"
            >
              <option
                v-for="status in statuses"
                :key="status"
              >
                {{ status }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-6">
          <h3
            class="font-bold mb-2"
          >
            Products
          </h3>

          <div
            v-for="item in order.products"
            :key="item.id"
            class="border-b py-2"
          >
            {{ item.name }}
            × {{ item.quantity }}

            - Rs.
            {{
              item.price *
              item.quantity
            }}
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      No orders found.
    </div>
  </div>
</template>