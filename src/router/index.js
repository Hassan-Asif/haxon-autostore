import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Contact from '../pages/Contact.vue'

import Login from '../pages/admin/Login.vue'
import Dashboard from '../pages/admin/Dashboard.vue'
import AddProduct from '../pages/admin/AddProduct.vue'
import Orders from '../pages/admin/Orders.vue'
import { auth } from '../firebase/config'
import AdminProducts from '../pages/admin/Products.vue'
import EditProduct from '../pages/admin/EditProduct.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/products/:id', component: ProductDetails },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/contact', component: Contact },

  { path: '/admin/login', component: Login },
  { path: '/admin', component: Dashboard },
  { path: '/admin/products/add', component: AddProduct },
  {path: '/admin/orders', component: Orders,},
  {path: '/admin/products', component: AdminProducts,},
  {path: '/admin/products/edit/:id', component: EditProduct,}

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const adminRoutes = [
    '/admin',
    '/admin/orders',
    '/admin/products/add',
  ]

  if (
    adminRoutes.includes(to.path) &&
    !auth.currentUser
  ) {
    return '/admin/login'
  }
})

export default router