import { defineStore } from 'pinia'
import { getProducts } from '../services/productService'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    search: '',
    category: 'All',
  }),

  getters: {
    filteredProducts: (state) => {
      return state.products.filter((product) => {
        const matchesSearch =
          product.name
            ?.toLowerCase()
            .includes(state.search.toLowerCase()) ||
          product.carBrand
            ?.toLowerCase()
            .includes(state.search.toLowerCase())

        const matchesCategory =
          state.category === 'All' ||
          product.category === state.category

        return matchesSearch && matchesCategory
      })
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true

      try {
        this.products = await getProducts()
      } catch (error) {
        console.error(error)
      }

      this.loading = false
    },
  },
})