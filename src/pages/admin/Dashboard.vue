<script setup>
import { ref, onMounted } from 'vue'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '../../firebase/config'

const loading = ref(true)
const error = ref('')

const stats = ref({
  totalProducts: 0,
  activeProducts: 0,
  featuredProducts: 0,
  outOfStockProducts: 0,
  totalOrders: 0,
  pendingOrders: 0,
  deliveredOrders: 0,
  estimatedRevenue: 0,
})

const recentOrders = ref([])

const formatPrice = (value) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

const loadStats = async () => {
  try {
    loading.value = true
    error.value = ''

    const productsSnapshot = await getDocs(
      collection(db, 'products')
    )

    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    const ordersSnapshot = await getDocs(
      collection(db, 'orders')
    )

    const orders = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    stats.value.totalProducts = products.length

    stats.value.activeProducts = products.filter(
      (product) => product.isActive !== false
    ).length

    stats.value.featuredProducts = products.filter(
      (product) => product.isFeatured === true
    ).length

    stats.value.outOfStockProducts = products.filter(
      (product) => product.availabilityStatus === 'Out of Stock'
    ).length

    stats.value.totalOrders = orders.length

    stats.value.pendingOrders = orders.filter(
      (order) => order.status === 'Pending Confirmation'
    ).length

    stats.value.deliveredOrders = orders.filter(
      (order) => order.status === 'Delivered'
    ).length

    stats.value.estimatedRevenue = orders
      .filter((order) => order.status === 'Delivered')
      .reduce((total, order) => {
        return total + Number(order.totalAmount || order.total || 0)
      }, 0)

    const recentOrdersQuery = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc'),
      limit(5)
    )

    const recentOrdersSnapshot = await getDocs(recentOrdersQuery)

    recentOrders.value = recentOrdersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load dashboard data.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStats()
})
</script>

<template>
  <div class="admin-shell">
    <div class="admin-page">
      <div class="flex flex-col gap-5 mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="admin-eyebrow">Haxon control room</p>
          <h1 class="admin-title">Welcome back, Admin</h1>
          <p class="admin-muted mt-3 max-w-2xl">Monitor product readiness, order pressure, low-stock risk, and customer activity from one clean dashboard.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button @click="loadStats" class="admin-btn-secondary">Refresh</button>
          <router-link to="/admin/products/add" class="admin-btn-primary">Add Product</router-link>
        </div>
      </div>

      <div v-if="loading" class="admin-card p-10 text-center admin-muted">Loading dashboard...</div>
      <div v-else-if="error" class="rounded-3xl border border-red-400/30 bg-red-500/10 p-6 text-red-100">{{ error }}</div>

      <div v-else class="space-y-8">
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div v-for="card in [
            ['Total Products', stats.totalProducts, `${stats.activeProducts} active`],
            ['Total Orders', stats.totalOrders, 'All customer orders'],
            ['Pending Orders', stats.pendingOrders, 'Needs admin action'],
            ['Revenue Estimate', formatPrice(stats.estimatedRevenue), 'Delivered orders only'],
            ['Low Stock', stats.outOfStockProducts, 'Review availability']
          ]" :key="card[0]" class="admin-card p-5">
            <p class="text-sm font-bold text-slate-400">{{ card[0] }}</p>
            <h2 class="mt-3 text-3xl font-black text-white">{{ card[1] }}</h2>
            <p class="mt-2 text-sm text-slate-500">{{ card[2] }}</p>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <section class="admin-card p-6">
            <div class="mb-5 flex items-center justify-between gap-4">
              <div><h2 class="admin-section-title">Recent orders</h2><p class="admin-muted text-sm">Latest customer activity</p></div>
              <router-link to="/admin/orders" class="text-sm font-bold text-red-300 hover:text-red-200">View all</router-link>
            </div>
            <div v-if="recentOrders.length === 0" class="admin-card-soft p-10 text-center admin-muted">No orders yet.</div>
            <div v-else class="admin-table-wrap">
              <table class="admin-table">
                <thead><tr><th>Customer</th><th>Status</th><th class="text-right">Total</th></tr></thead>
                <tbody>
                  <tr v-for="order in recentOrders" :key="order.id">
                    <td><p class="font-bold text-white">{{ order.customerName || order.customer?.name || 'Unnamed Customer' }}</p><p class="text-sm text-slate-400">{{ order.phone || order.customer?.phone || order.email || 'No contact saved' }}</p></td>
                    <td><span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">{{ order.status || order.orderStatus || 'No status' }}</span></td>
                    <td class="text-right font-black text-white">{{ formatPrice(order.totalAmount || order.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <aside class="admin-card p-6">
            <h2 class="admin-section-title">Quick actions</h2>
            <div class="mt-5 space-y-3">
              <router-link to="/admin/products/add" class="admin-btn-primary w-full">Add Product</router-link>
              <router-link to="/admin/orders" class="admin-btn-secondary w-full">View Orders</router-link>
              <router-link to="/admin/products" class="admin-btn-secondary w-full">Manage Products</router-link>
              <router-link to="/" class="admin-btn-secondary w-full">View Store</router-link>
            </div>
            <p class="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">Keep availability honest and confirm fitment before promising dispatch.</p>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>